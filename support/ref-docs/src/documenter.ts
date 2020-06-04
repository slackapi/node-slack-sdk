import {
  root,
  text,
  list,
  listItem,
  paragraph,
  strong,
  brk,
  link,
  inlineCode,
  table,
  tableRow,
  tableCell,
  code,
  html
} from 'mdast-builder';
import {
  ApiClass,
  ApiConstructor,
  ApiConstructSignature,
  ApiDocumentedItem,
  ApiEnum,
  ApiFunction,
  ApiInterface,
  ApiItemKind,
  ApiMethod,
  ApiMethodSignature,
  ApiModel,
  ApiPackage,
  ApiParameterListMixin,
  ApiPropertyItem,
  ApiTypeAlias,
  Parameter,
  ApiDeclaredItem,
  Excerpt,
  ApiEntryPoint,
  ExcerptTokenKind
} from '@microsoft/api-extractor-model';
import {
  DocSection,
  DocParagraph,
  DocPlainText,
  DocLinkTag,
  DocSoftBreak,
  DocCodeSpan,
  DocBlock
} from '@microsoft/tsdoc';
import { Node, Parent } from 'unist';
import {
  section,
  itemSections,
  Ctor,
  itemsOfType,
  SectionTitle,
  filterUndef,
  FrontmatterEntires
} from './macros';
import 'array.prototype.flatmap';
import 'array.prototype.flat';

/**
 * Information about the context of a documentation process.
 */
export interface DocumentationContext {
  model: ApiModel;
  pkg: ApiPackage;
  pkgEntry: ApiEntryPoint;
}

/**
 * Binds a function to a documentation context.
 */
function withCtx<
  F extends (ctx: DocumentationContext, ...args: A) => R,
  A extends any[],
  R
>(ctx: DocumentationContext, fn: F): (...args: A) => R {
  return (...args: A) => fn(ctx, ...args);
}

/**
 * Heuristic that decides if a parameter utilizes object destructuring.
 */
function isDestructuredParam(param: Parameter): boolean {
  return param.name.startsWith('{') && param.name.endsWith('}');
}

/**
 * Heuristic that decides if a parameter is required or not
 */
function isRequiredParam(item: ApiDeclaredItem, param: Parameter): boolean {
  // If a `?` is found in the excerpt token before the type, we assume that this
  // parameter is optional, e.g. `?: ` before the token `string`
  return !item.excerptTokens[
    param.parameterTypeExcerpt.tokenRange.startIndex - 1
  ].text.includes('?');
}

/**
 * Prepends a list of child nodes to the first found paragraph. If no paragraph
 * is found, the children aren't inserted.
 */
function prependFirstParagraph(
  nodes: readonly Node[],
  children: readonly Node[]
): Node[] {
  // Find the first paragraph
  const firstPara = nodes.find(node => node.type === 'paragraph');
  if (firstPara !== undefined) {
    // Prepend the new children
    (firstPara as Parent).children.unshift(...children);
  }

  return nodes as Node[];
}

/**
 * Formats the name of a package as a URL-friendly slug.
 * 
 * @remarks
 * Excludes the common `@slack/` at the start of most package names and replaces
 * sequences of (1+) non-alphanumeric characters with a hyphen.
 */
export function formatPkgSlug(pkg: ApiPackage): string {
  return pkg.name
    .replace(/@slack\//i, '')
    .replace(/[^a-zA-Z0-9]+($)?/g, '-');
}

/**
 * Attempts to link to a target API item by its name.
 */
function tryLinkName(
  ctx: DocumentationContext,
  name: string,
  child: Node
): Node {
  // Attempt to find the target item
  const [target] = ctx.pkgEntry.findMembersByName(name);
  // TODO: handle multiple targets?

  // If the target isn't found, simply return the child w/o a link
  if (target === undefined) {
    return child;
  }

  // TODO: We don't solidly know the URL to link to this item. The below works
  // for GitHub-style heading `id`s.
  return link(`#${target.displayName.toLowerCase()}`, undefined, child);
}

/**
 * Formats a type excerpt (like `{}`) to be more human-friendly and possibly
 * link to the type(s) it refers to.
 */
function formatExcerptReferences(
  ctx: DocumentationContext,
  excerpt: Excerpt
): Node[] {
  // Bail early for object types/interface shorthand by searching for anything
  // that looks like an object (which starts and ends with `{` and `}`) and
  // might be followed by a number of array brackets (`[]`)
  if (excerpt.text.match(/^{(?:\s|\S)*}(?:\[\])*$/) !== null) {
    // TODO: The information about this object (its properties and such) are now
    // lost. How can we retain that information?
    return [inlineCode('object')];
  }

  return [
    // HTML `<code>` tags need to be used in order to let links within the
    // inline code segment to work.
    html('<code>'),
    ...excerpt.tokens
      // Get the relevant tokens
      .filter(
        (_, i) =>
          i >= excerpt.tokenRange.startIndex && i < excerpt.tokenRange.endIndex
      )
      // Map `Content`-kind tokens to just their text & `Reference`-kind tokens by
      // their own format function
      .map(token =>
        token.kind === ExcerptTokenKind.Content
          ? text(token.text)
          : tryLinkName(ctx, token.text, text(token.text))
      ),
    html('</code>')
  ];
}

/**
 * Converts a DocSection to an array of `mdast` paragraphs.
 */
function convertDocSection(
  ctx: DocumentationContext,
  section: DocSection
): Node[] {
  // Elements within sections are paragraphs
  return (section.nodes as readonly DocParagraph[]).map(para =>
    paragraph(
      para.nodes
        // Filter out soft breaks
        .filter(node => !(node instanceof DocSoftBreak))
        // Convert DocNodes to mdast nodes
        .map(node => {
          if (node instanceof DocPlainText) {
            // Plain text maps to `text` nodes
            return text(node.text);
          } else if (node instanceof DocLinkTag) {
            // Links map to links. The URI depends on the destination.
            if (node.codeDestination !== undefined) {
              const name = node.codeDestination.memberReferences[0]
                .memberIdentifier!.identifier;
              return tryLinkName(ctx, name, inlineCode(name));
            } else if (node.urlDestination !== undefined) {
              return link(node.urlDestination, undefined, [
                text(
                  node.linkText === undefined
                    ? node.urlDestination
                    : node.linkText
                )
              ]);
            } else {
              throw new Error('misformatted DocLinkTag');
            }
          } else if (node instanceof DocCodeSpan) {
            // Code spans map to inline code nodes
            return inlineCode(node.code);
          } else {
            throw new Error(`unknown DocNode type encountered: '${node.kind}'`);
          }
        })
    )
  );
}

/**
 * Converts a DocBlock to a titled section.
 */
function convertDocBlock(
  ctx: DocumentationContext,
  title: SectionTitle,
  block: DocBlock
): Node[] {
  return section(title, convertDocSection(ctx, block.content));
}

/**
 * Attempts to extract and format documentation from associated comments with a
 * documentable API item.
 * 
 * @remarks
 * Extracts:
 * - The description (if any).
 * - The remarks (if any).
 * - An example (if any).
 */
function itemDocumentation(
  ctx: DocumentationContext,
  item: ApiDocumentedItem
): Node[] {
  // Short circuit if there's no documentation comment for this item
  if (item.tsdocComment === undefined) {
    return [];
  }

  // Attempt to find the `@example` block
  const exampleBlock = item.tsdocComment.customBlocks.find(
    block => block.blockTag.tagNameWithUpperCase === '@EXAMPLE'
  );

  return [
    // TODO: handle `@deprecation` tags by making a big, flashy "this is
    // deprecated" alert for this item

    // Summary
    convertDocSection(ctx, item.tsdocComment.summarySection),

    // Remarks
    item.tsdocComment.remarksBlock !== undefined
      ? convertDocBlock(ctx, [5, 'Remarks'], item.tsdocComment.remarksBlock)
      : [],

    // Example
    exampleBlock !== undefined
      ? convertDocBlock(ctx, [5, 'Example'], exampleBlock)
      : []
  ].flat();
}

/**
 * Generates the title for a function-like item (e.g. a function, method,
 * constructor).
 * 
 * @remarks
 * The generated string looks like `name(param1, param2, param3)` where:
 * - `name` is either the value of this function's `name` argument (if
 *   provided) or the function-like's name.
 * - `paramX` is the name of the parameter or `opts` if the parameter is
 *   defined using object destructuring.
 */
function fnLikeTitle(item: ApiParameterListMixin, name?: string): Node[] {
  // TODO: linkify parameters?
  // TODO: configurable name for destructutred params instead of always "opts"
  return [
    text(
      `${name === undefined ? item.displayName : name}(${item.parameters
        .map(param => (isDestructuredParam(param) ? 'opts' : param.name))
        .join(', ')})`
    )
  ];
}

/**
 * Generates information about a function-like (which includes functions,
 * methods, constructors, and constructor signatures).
 * 
 * @remarks
 * Includes:
 * - Comment-provided documentation (if any).
 * - A table describing the function's parameters (if any).
 *   - Each parameter is described by its name, type, whether it's required or
 *     not, and any documentation comment-provided description. If none of the
 *     parameters have descriptions, the description column from the table is
 *     excluded.
 */
function documentFnLike(
  ctx: DocumentationContext,
  item: ApiFunction | ApiMethod | ApiConstructor | ApiConstructSignature
): Node[] {
  // Determine which parameter is an options parameter (if there is one)
  const optsParam = item.parameters.find(isDestructuredParam);
  const [optsTarget = undefined] =
    optsParam !== undefined
      ? ctx.pkgEntry.findMembersByName(optsParam.parameterTypeExcerpt.text)
      : [];
  const hasOpts = optsParam !== undefined && optsTarget !== undefined;

  // Hide the "Description" column if none of the parameters have descriptions
  const paramsHaveDesc = item.parameters.some(
    param => param.tsdocParamBlock !== undefined
  );

  const hasReturnDoc =
    item.tsdocComment !== undefined &&
    item.tsdocComment.remarksBlock !== undefined;

  return [
    // Documentation
    itemDocumentation(ctx, item),

    // Parameters
    item.parameters.length === 0
      ? []
      : [
          strong(text('Parameters:')),
          table(['center', 'center', 'center', null] as any, [
            tableRow(
              filterUndef([
                tableCell(text('Name')),
                tableCell(text('Type')),
                tableCell(text('Required')),
                paramsHaveDesc ? tableCell(text('Description')) : undefined
              ])
            ),
            ...item.parameters.map(param =>
              tableRow(
                filterUndef([
                  // Name
                  tableCell(
                    text(hasOpts && param === optsParam ? 'opts' : param.name)
                  ),

                  // Type
                  tableCell(
                    formatExcerptReferences(ctx, param.parameterTypeExcerpt)
                  ),

                  // Required
                  tableCell(text(isRequiredParam(item, param) ? '✓' : '✗')),

                  // Description
                  paramsHaveDesc
                    ? tableCell(
                        param.tsdocParamBlock === undefined
                          ? text(
                              hasOpts && param === optsParam
                                ? 'See options.'
                                : ''
                            )
                          : convertDocSection(
                              ctx,
                              param.tsdocParamBlock.content
                            )
                      )
                    : undefined
                ])
              )
            )
          ])
        ],

    // Options
    hasOpts
      ? [
          strong(text('Options:')),
          
          // We assume that `opts` is a non-empty interface
          documentClassLikeProps(ctx, optsTarget as ApiInterface) as Node
        ]
      : [],

    // Return value
    'returnTypeExcerpt' in item
      ? prependFirstParagraph(
          hasReturnDoc
            ? convertDocSection(ctx, item.tsdocComment!.returnsBlock!.content)
            : [paragraph()],
          [
            // Section title
            strong(text('Returns')),

            // Return type
            text(' '),
            ...formatExcerptReferences(ctx, item.returnTypeExcerpt),

            // Separate return title from description
            ...(hasReturnDoc ? [text(':'), brk, brk] : [])
          ]
        )
      : []
  ].flat();
}

/**
 * Generates information about the properties/fields of a class-like.
 * 
 * @remarks
 * Creates a table including the prop's/field's name, type, and a documentation
 * comment-provided description. If none of the props/fields include a
 * description, that column of the table is excluded.
 */
function documentClassLikeProps(
  ctx: DocumentationContext,
  item: ApiClass | ApiInterface
): Node | undefined {
  const props = itemsOfType(item.members, ApiPropertyItem);
  // Hide the "Description" column if none of the props have descriptions
  const propsHaveDesc = props.some(prop => prop.tsdocComment !== undefined);

  return props.length === 0
    ? undefined
    : table(['center', 'center', null] as any, [
        tableRow(
          filterUndef([
            tableCell(text('Name')),
            tableCell(text('Type')),
            propsHaveDesc ? tableCell(text('Description')) : undefined
          ])
        ),
        ...props.map(prop =>
          tableRow(
            filterUndef([
              // Name
              tableCell(text(prop.name)),

              // Type
              tableCell(formatExcerptReferences(ctx, prop.propertyTypeExcerpt)),

              // TODO: other tsdoc sections?
              // Description
              propsHaveDesc
                ? tableCell(
                    prop.tsdocComment === undefined
                      ? text('')
                      : convertDocSection(ctx, prop.tsdocComment.summarySection)
                  )
                : undefined
            ])
          )
        )
      ]);
}

/**
 * Generates information about a class or interface.
 * 
 * @remarks
 * Includes:
 * - Comment documentation associated with the class-like (if any).
 * - Constructors (formatted as `new {ClassLikeName}(parameters)`) (if any).
 * - A table of fields/properties (if any).
 * - Methods (if any).
 */
function documentClassLike(
  ctx: DocumentationContext,
  item: ApiClass | ApiInterface
): Node[] {
  const ctorKind: Ctor<ApiConstructor | ApiConstructSignature> =
    item instanceof ApiClass ? ApiConstructor : ApiConstructSignature;
  const methodKind: Ctor<ApiMethod | ApiMethodSignature> =
    item instanceof ApiClass ? ApiMethod : ApiMethodSignature;

  // Get the properties/fields documentation
  const propsTable = documentClassLikeProps(ctx, item);

  return [
    // Documentation
    itemDocumentation(ctx, item),

    // Constructor(s)
    itemsOfType(item.members, ctorKind).flatMap(ctorItem =>
      section(
        // These headings are at depth 5 to match other members
        [4, fnLikeTitle(ctorItem, `new ${item.name}`)],
        documentFnLike(ctx, ctorItem)
      )
    ),

    // Fields/properties
    propsTable === undefined ? [] : section([3, 'Fields'], propsTable),

    // Methods
    itemSections(
      [3, 'Methods'],
      itemsOfType(item.members, methodKind),
      withCtx(ctx, documentFnLike),
      fnLikeTitle
    )
  ].flat();
}

/**
 * Generates information about an enum.
 * 
 * @remarks
 * Lists all the members of the enum & any accompanying comment documentation
 * for each member.
 */
function documentEnum(ctx: DocumentationContext, item: ApiEnum): Node[] {
  return [
    // Documentation
    itemDocumentation(ctx, item),

    // Members
    section(
      [3, 'Members'],
      list(
        'unordered',
        item.members.map(member =>
          listItem(
            prependFirstParagraph(
              member.tsdocComment === undefined
                ? [paragraph()]
                : convertDocSection(ctx, member.tsdocComment.summarySection),
              [
                // Member name
                strong(text(member.name)),

                // Separate summary from member name
                text(member.tsdocComment === undefined ? '' : ': ')
              ]
            )
          )
        )
      )
    )
  ].flat();
}

/**
 * Generates information about a type alias.
 * 
 * @remarks
 * Includes the relevant definition of the type alias (the part after `=` but
 * before `;` in `type X = ...;`) and attempts to make an English description
 * of the type alias.
 */
function documentTypeAlias(
  ctx: DocumentationContext,
  item: ApiTypeAlias
): Node[] {
  // A few tokens are skipped:
  // - [0]: "export declare type "
  // - [1]: this type alias' name
  // - [2]: " = "
  // - [length - 1]: ";"
  const tokens = item.excerptTokens.filter(
    (_, i, arr) => i > 2 && i < arr.length - 1
  );

  // Attempt to describe the type alias.
  let description: Node[] = [];
  if (
    tokens
      .filter(token => token.kind === ExcerptTokenKind.Content)
      .every(token => token.text === ' | ')
  ) {
    // Follows the form `A | B | C | ... | Z`
    description = [
      text('One of:'),
      list(
        'unordered',
        tokens
          .filter(token => token.kind === ExcerptTokenKind.Reference)
          .map(token =>
            listItem(tryLinkName(ctx, token.text, inlineCode(token.text)))
          )
      )
    ];
  }

  return [
    // Documentation
    itemDocumentation(ctx, item),

    // Excerpt
    [code('ts', tokens.map(token => token.text).join(''))],

    // Description of the type alias
    description
  ].flat();
}

/**
 * Generates information about a package in an API model.
 */
export function documentPkg(model: ApiModel, pkg: ApiPackage): [FrontmatterEntires, Node] {
  // Every package is only expected to have one entry point
  if (
    pkg.members.length !== 1 ||
    pkg.members[0].kind !== ApiItemKind.EntryPoint
  ) {
    throw new Error(`expected only one entry point in package "${pkg.name}"`);
  }

  // Create the context object for this process
  const ctx: DocumentationContext = {
    model,
    pkg,
    pkgEntry: pkg.members[0] as ApiEntryPoint
  };

  // All top-level API members in this package
  const apiItems = ctx.pkgEntry.members;

  return [
    {
      // The title of the page is just the package name
      title: `"${pkg.name}"`,

      // See the `formatPkgSlug` for the format of the slug
      slug: formatPkgSlug(pkg)
    },
    root(
      [
        ...itemSections(
          [1, 'Classes'],
          itemsOfType(apiItems, ApiClass),
          withCtx(ctx, documentClassLike)
        ),

        ...itemSections(
          [1, 'Functions'],
          itemsOfType(apiItems, ApiFunction),
          withCtx(ctx, documentFnLike),
          fnLikeTitle
        ),

        ...itemSections(
          [1, 'Enums'],
          itemsOfType(apiItems, ApiEnum),
          withCtx(ctx, documentEnum)
        ),

        ...itemSections(
          [1, 'Interfaces'],
          itemsOfType(apiItems, ApiInterface),
          withCtx(ctx, documentClassLike)
        ),

        ...itemSections(
          [1, 'Type Aliases'],
          itemsOfType(apiItems, ApiTypeAlias),
          withCtx(ctx, documentTypeAlias)
        )
      ]
    )
  ];
}

/**
 * Creates an index page linking to each package in an API model.
 */
export function documentModel(model: ApiModel): [FrontmatterEntires, Node] {
  return [
    {
      title: 'Reference Documentation',
      parmalink: '/reference/'
    },
    root(
      [
        paragraph([strong(text('Packages:'))]),
        list(
          'unordered',
          model.packages.map(pkg =>
            listItem(link(formatPkgSlug(pkg), undefined, text(pkg.name)))
          )
        )
      ]
    )
  ];
}
