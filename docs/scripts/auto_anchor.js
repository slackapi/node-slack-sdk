var toggleVisibilityClass = 'invisible_until_anchor';
var hTags = ['h1', 'h2', 'h3', 'h4', 'h5'];
var headerWithIdSelector = hTags.map(function (t) { return '.auto_anchor_container ' + t + '[id]' }).join(', ');

window.addEventListener('DOMContentLoaded', (event) => {
  // Find all elements whose visibility should be toggled when anchor elements are loaded
  var toggleVisibilityEls = document.querySelectorAll('.' + toggleVisibilityClass);

  // Find the template element
  var templateEl = document.querySelector('.anchor_template');
  if (!templateEl) { return; }
  var newElementContainer = templateEl.parentElement;

  function createTemplatedElement(title, href) {
    var el = templateEl.cloneNode(true);
    var anchor = el.querySelector('a');
    anchor.setAttribute('href', href);
    anchor.innerText = title;
    return el;
  }

  // Search for headers with anchors, and create a clone of the template for each header in the document
  var headers = document.querySelectorAll(headerWithIdSelector)
  Array.prototype.map.call(headers, function (header) {
    return createTemplatedElement(header.innerText, '#' + header.id);
  }).forEach(function (newElement) {
    newElementContainer.insertBefore(newElement, templateEl);
  });

  // Remove the template
  newElementContainer.removeChild(templateEl);

  // Toggle visibility
  toggleVisibilityEls.forEach(function (tEl) {
    tEl.classList.remove(toggleVisibilityClass);
  });
});
