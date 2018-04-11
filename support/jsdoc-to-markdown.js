/*
 * JSDoc to Markdown
 *
 * This script is used to convert the (generated, and then hand-edited) JSDoc comments for the interface of this
 * package to templated Markdwon files that are suitable for Jekyll to build along with the rest of the package's
 * website.
 */

const jsdoc2md = require('jsdoc-to-markdown');
const fs = require('fs');
const path = require('path');

// paths
const inputFile = `${__dirname}/jsdoc/@slack-client.js`;
const outputDir = `${__dirname}/../docs/_reference`;
const partialLocation = `${__dirname}/templates/*.hbs`;

// run jsdoc-to-markdown without the final handlebars templates to get data about the interface
const templateData = jsdoc2md.getTemplateDataSync({ files: inputFile });

// console.log('templateData');
// console.dir(templateData, {depth: null, colors: true});

// iterate through the data to build a list of just the chosen symbol names (only classes)
const classNames = templateData.reduce((classNames, identifier) => {
  if (identifier.kind === 'class') classNames.push(identifier.name);
  return classNames;
}, [])

// iterate through the chosen symbol names and run jsdoc-to-markdown again, this time using the a handlebars template
// to write out the final output
for (const className of classNames) {
  const template = `---
layout: page
title: ${className}
permalink: /reference/${className}
---
{{#class name="${className}"}}{{>docs-main}}{{/class}}`;

  console.log(`rendering ${className}`);

  const output = jsdoc2md.renderSync({ data: templateData, template: template, partial: partialLocation });
  fs.writeFileSync(path.resolve(outputDir, `${className}.md`), output);
}
