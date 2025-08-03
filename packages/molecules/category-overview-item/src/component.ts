// import statements 
// system 
import { CustomElement, debounce, html, property } from "@papit/core";
import "@papit/accordion";

// utils 
import { toMoney } from "@budget/utils-money";

// atoms
import "@budget/category-tag"

// local 
import { style } from "./style";
import { Color } from "@budget/category-tag";

export class CategoryOverviewItem extends CustomElement {
  static style = style;

  private balance = 0;

  @property() name: string = "";
  @property() color: Color = "gray";
  @property({ type: Boolean }) open: boolean = false;

  @property({ 
    type: Number,
    after: function (this: CategoryOverviewItem) {
      this.calculateBalance();
    }
  }) budget: number = 0;
  @property({ 
    type: Number,
    after: function (this: CategoryOverviewItem) {
      this.calculateBalance();
    }
  }) spent: number = 0;

  constructor() {
    super();

    this.calculateBalance = debounce(this.calculateBalance, 10);
  }

  private handleclick = () => {
    this.open = !this.open;
  }

  private calculateBalance = () => {
    this.balance = this.budget - this.spent;
  }

  render() {
    return html`
      <pap-accordion open="${this.open}">
        <budget-category-tag 
          slot="button"
          name="${this.name}" 
          value="${this.balance}"
          color="${this.color}"
          @click="${this.handleclick}"
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