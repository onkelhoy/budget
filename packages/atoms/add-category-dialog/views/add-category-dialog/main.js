// core
import '@papit/core';
import '@papit/translator';
import '@papit/codeblock';
import '@papit/card';
import '@papit/typography';

// component
import '@budget/add-category-dialog';

window.onload = () => {
  console.log('[demo]: window loaded');

  const target = document.querySelector("budget-add-category-dialog");
  const button = document.querySelector("button");

  button.addEventListener("click", () => {
    target.open = true;
  });

  target.addEventListener("submit", console.log)
}
