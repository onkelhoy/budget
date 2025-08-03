// import statements 
// system 
import { CustomElement, html, property } from "@papit/core";
import "@papit/accordion";

// utils 
import { toMoney } from "@budget/utils-money";

// atoms
import "@budget/category-tag"

// local 
import { style } from "./style";
import { Category } from "./types";

export class CategoryOverviewItem extends CustomElement {
  static style = style;

  private balance = 0;

  @property({
    after: function (this: CategoryOverviewItem, category: Category) {
      this.balance = category.budget - category.spent;
    }
  }) category?: Category;
  @property({ type: Boolean }) open: boolean = false;

  private handleclick = () => {
    this.open = !this.open;
  }

  render() {
    return html`
      <pap-accordion open="${this.open}">
        <budget-category-tag 
          slot="button"
          name="${this.category?.name}" 
          value="${this.balance}"
          color="${this.category?.color}"
          @click="${this.handleclick}"
        >
        </budget-category-tag>
        <span slot="icon"></span>
        
        <div>
          <p>Spent: <span>${toMoney(this.category?.spent ?? 0)}</span></p>
          <p>Budget: <span>${this.category?.budget}</span></p>

          <button>Details</button>
        </div>
      </pap-accordion>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "budget-category-overview-item": CategoryOverviewItem;
  }
}