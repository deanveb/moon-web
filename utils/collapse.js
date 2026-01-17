export function collapse(buttonElement, CSSDir, targetId) {
  $(document).ready(function() {
    $(`#${buttonElement.id}`).click(function() {
      $(`#${targetId}`).toggle();
    });
  });
}

// Load css from other file into the current file
export function init(HTMLDir) {
  $("header").load(`${HTMLDir} [type=text/css]`);
  // const css = $("[type=text/css]").load(`${HTMLDir} [type=text/css]`)
  // css.each(() => {
  //   if ($(this.attr('id')).length <= 0) {
  //     $('head').append(`<link rel="stylesheet" href="${targetCSSDir}" type="text/css" />`);
  //   }
  // });
}
