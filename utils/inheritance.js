export function inherit(HTMLDir, CSSDir, targetId) {
  let reportStatus = '';
  $(`#${targetId}`).load(`${HTMLDir} #content`, (response, status) => {
    reportStatus = status;
  });
  $('head').append(`<link rel="stylesheet" href="${CSSDir}" type="text/css" />`);
  return reportStatus;
}
