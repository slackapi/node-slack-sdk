import { Children, heading, text } from 'mdast-builder';
import { ApiItem } from '@microsoft/api-extractor-model';
import { Node } from 'unist';
import 'array.prototype.flatmap';

/**
 * A constructor for an object `T` that takes the tuple of arguments `A`.
 */
export type Ctor<T extends object, A extends any[] = any[]> = new (
  ...args: A
) => T;

/**
 * Gets all API items that are a certain type (e.g. `ApiClass`).
 */
export function itemsOfType<I extends ApiItem>(
  items: readonly ApiItem[],
  itemType: Ctor<I>
): I[] {
  return items.filter(item => item instanceof itemType) as I[];
}

/**
 * The format of a section title. The first element is the heading's depth and
 * the section element is the text or children of the heading.
 */
export type SectionTitle = [number, string | Children];

/**
 * A section is a group of nodes that has a title heading.
 */
export function section(
  title: SectionTitle,
  children: Node | readonly Node[]
): Node[] {
  // TODO: anchor title?
  return [
    heading(title[0], typeof title[1] === 'string' ? text(title[1]) : title[1]),
    ...(Array.isArray(children) ? children : [children])
  ];
}

/**
 * A section where each API item is its own section **if** there are any items
 * at all.
 *
 * @param title - The title of the whole section
 * @param items - The items in this section
 * @param mapper - A function that creates the children for each item
 * @param namer - An optional function that decides the name of each item's
 *                section
 */
export function itemSections<I extends ApiItem>(
  title: SectionTitle,
  items: readonly I[],
  mapper: (item: I) => Node | readonly Node[],
  namer?: (item: I) => SectionTitle[1]
): Node[] {
  return items.length === 0
    ? []
    : section(
        title,

        // Map each item to its own section
        items.flatMap(item => section(
          [
            title[0] + 1,
            namer === undefined ? item.displayName : namer(item)
          ],
          mapper(item)
        )),
      );
}

/**
 * Filters out any elements from an array that are `undefined`.
 */
export function filterUndef<T>(arr: T[]): Exclude<T, undefined>[] {
  return arr.filter(elem => elem !== undefined) as Exclude<T, undefined>[];
}


/**
 * Entries in a file's frontmatter.
 */
export type FrontmatterEntires = Record<string, string>;

/**
 * Formats a simple map of keys and values as a frontmatter node.
 */
export function stringifyFrontmatter(entries: FrontmatterEntires): string {
  return `---\n${
    Object.entries(entries)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n')
    }\n---`;
}
