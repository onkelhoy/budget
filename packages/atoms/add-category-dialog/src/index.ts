import { AddCategoryDialog } from './component.js';

// export 
export * from "./component";
export * from "./types";

// Register the element with the browser

if (!window.customElements) {
  throw new Error('Custom Elements not supported');
}

if (!window.customElements.get('budget-add-category-dialog')) {
  window.customElements.define('budget-add-category-dialog', AddCategoryDialog);
}
