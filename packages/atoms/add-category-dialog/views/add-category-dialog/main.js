// core
import '@papit/core';
import '@papit/translator';

// component
import '@budget/add-category-dialog';

window.onload = () => {
  console.log('[demo]: window loaded');

  const target = document.querySelector("budget-add-category-dialog");
  const button = document.querySelector("button");

  button.addEventListener("click", () => {
    target.open = true;
  });
}
