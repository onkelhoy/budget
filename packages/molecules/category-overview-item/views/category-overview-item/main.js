// core
import '@papit/core';
import '@papit/translator';

// component
import '@budget/category-overview-item';

window.onload = () => {
  const target = document.querySelector("budget-category-overview-item");

  target.category = {
    name: "Food",
    budget: 1000,
    spent: 1200,
    color: "orange",
  }
}
