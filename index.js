import { inherit } from "/utils/inheritance.js";

function render() {
  inherit("/component/nav-bar/nav-bar.html", "/component/nav-bar/nav-bar.css", "nav-bar");
}

document.addEventListener("DOMContentLoaded", (e) => {
  render();
})
