// import statements 
// system 
import { CustomElement, html, property, query } from "@papit/core";

// atoms 
import "@budget/add-category-dialog";
import { AddCategoryDialog, AddEvent } from "@budget/add-category-dialog";
import "@budget/island";

// molecules 
import "@budget/category-overview-item";

// local 
import { style } from "./style";
import { Category } from "./types";

export class CategoryOverviewList extends CustomElement {
  static style = style;

  @query("budget-add-category-dialog") dialog!: AddCategoryDialog;
  @property({ type: Array, attribute: false, rerender: true }) categories: Category[] = [];

  private handleadd = () => {
    if (!this.dialog) return;
    this.dialog.open = true;
  }
  private handlesubmit = (e: CustomEvent<AddEvent>) => {
    console.log(e);
    this.dispatchEvent(new CustomEvent<AddEvent>("add", { detail: e.detail }));
  }

  render() {
    return html`
      <budget-add-category-dialog @submit="${this.handlesubmit}"></budget-add-category-dialog>
      <budget-island name="Category Overview">
        <ul>
          ${this.categories.map(category => html`
            <li key="${category.id}">
              <budget-category-overview-item 
                name="${category.name}"
                budget="${category.budget}"
                color="${category.color}"
                spent="${category.spent}"
              >
              </budget-category-overview-item>
            </li>
          `)}

          ${this.categories.length === 0 && html`<span>You dont have any categories yet</span>`}
        </ul>

        <button @click="${this.handleadd}">+Add</button>
      </budget-island>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "budget-category-overview-list": CategoryOverviewList;
  }
}