export function load(targetHTML, targetCSS) {
  const css = $("[type=text/css]")
  css.each(() => {
    if ($(this.attr('id')).length <= 0) {
      $('head').append(this);
    }
  });
}
