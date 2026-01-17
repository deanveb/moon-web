export function collapse(collapseHTMLDir, uncollapseHTMLDir, isCollapse, target) {
  target.innerHTML = "";

  if (isCollapse) {
    $(`#${target.id}`).load(collapseHTMLDir + ' #content');
  } else {
    $(`#${target.id}`).load(uncollapseHTMLDir + ' #content');
  }
}
