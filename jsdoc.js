var jsdoc2md = require('jsdoc-to-markdown');
var fs = require('fs');
var dmd = require('dmd');
var util = require('util');
var path = require('path');
var collectJson = require('collect-json');

/* paths used by this script */
var p = {
  src: path.resolve(__dirname, './lib/**/*.js'),
  output: path.resolve(__dirname, './docs/_reference/%s.md')
};

function writeMarkdownFile(data, classes, index) {
  var className = classes[index];
  var template = util.format('---\nlayout: page\ntitle: %s\npermalink: /reference/%s\n---\n' +
                             '{{#class name=\"%s\"}}{{>docs-main}}{{/class}}',
                             className, className, className);
  var dmdStream;
  console.log(util.format(
    'rendering %s, template: %s', className, template
  ));

  dmdStream = dmd({ template: template, partial: 'templates/*.hbs' });
  dmdStream
    .pipe(fs.createWriteStream(util.format(p.output, className)))
    .on('close', function handleDmdStreamClosed() {
      var next = index + 1;
      if (classes[next]) {
        writeMarkdownFile(data, classes, next);
      }
    });
  dmdStream.end(JSON.stringify(data));
}

jsdoc2md({ src: p.src, json: true })
  .pipe(collectJson(function renderClasses(data) {
    /* reduce the jsdoc-parse output to an array of class names */
    var classes = data.reduce(function pickClasses(prev, curr) {
      if (curr.kind === 'class') prev.push(curr.name);
      return prev;
    }, []);

    /* render an output file for each class */
    writeMarkdownFile(data, classes, 0);
  }));
