// import statements 
// system 
import { CustomElement, html, property } from "@papit/core";

// local 
import { style } from "./style";
import { Category } from "./types";

export class CategoryOverviewItem extends CustomElement {
  static style = style;

  private balance = "";

  @property({
    after: function (this: CategoryOverviewItem, category: Category) {
      this.balance = category.budget - category.spent;
    }
  }) category?: Category;
  @property({ rerender: false }) 

  private handleclick = () => {

  }

  private tomoney(value: number) {
    const rounded = Math.round(value).toString();
    return rounded.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  render() {
    return html`
      <pap-accordion>
        <budget-category-tag 
          slot="button"
          name="${this.category?.name}" 
          value="${this.balance}"
          color="${this.category?.color}"
          @click="${this.handleclick}"
        >
        </budget-category-tag>
        
        <p>Spent: <span>${this.tomoney(this.category?.spent ?? 0)}</span></p>
        <p>Budget: <span>${this.category?.budget}</span></p>
      </pap-accordion>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "budget-category-overview-item": CategoryOverviewItem;
  }
}