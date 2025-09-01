// import statements 
// system 
import { bind, CustomElement, debounce, html, property } from "@papit/core";
import "@papit/accordion";

// utils 
import { toMoney } from "@budget/utils-money";

// atoms
import "@budget/category-tag"
import { Color } from "@budget/category-tag"

// local 
import { style } from "./style";

export class CategoryOverviewItem extends CustomElement {
  static style = style;

  @property({
    rerender: true,
    attribute: false,
    type: Number,
  })
  private balance = 0;

  @property({ rerender: true }) name: string = "hej";
  @property({ rerender: true }) color: Color = "gray";
  @property({ type: Boolean, rerender: true }) open: boolean = false;

  @property({
    type: Number,
    rerender: true,
    after: function (this: CategoryOverviewItem) {
      this.calculateBalance();
    }
  }) budget: number = 0;
  @property({
    type: Number,
    rerender: true,
    after: function (this: CategoryOverviewItem) {
      this.calculateBalance();
    }
  }) spent: number = 0;

  @bind
  private handleclick() {
    this.open = !this.open;
  }

  @debounce(10)
  private calculateBalance() {
    this.balance = this.budget - this.spent;
  }

  render() {
    return html`
      <pap-accordion open="${this.open}">
        <budget-category-tag 
          slot="button"
          name=${this.name}
          value=${this.balance}
          color="${this.color}"
          @click=${this.handleclick}
        >
        </budget-category-tag>
        <span slot="icon"></span>
        
        <div>
          <p>Spent: <span>${toMoney(this.spent ?? 0)}</span></p>
          <p>Budget: <span>${this.budget}</span></p>

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