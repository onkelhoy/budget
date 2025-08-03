// import statements 
// system 
import { CustomElement, property, html } from "@papit/core";

// local 
import { style } from "./style";
import { Color } from "./types";

export class CategoryTag extends CustomElement {
  static style = style;

  // properties 
  @property() color: Color = "gray";
  @property() name: string = "category";
  @property({ 
    type: Number,
    after: function (this: CategoryTag, value: number) {
      if (value >= 0) 
      {
        this.setAttribute("variant", "positive");
      }
      else 
      {
        this.setAttribute("variant", "negative");
      }
    }
  }) value: number = 0;

  render() {
    return html`
      <span class="tag">${this.name}</span>
      <div>
        <span>${this.value >= 0 ? "+" : "-"}</span>
        <span>${Math.abs(this.value)}</span>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "budget-category-tag": CategoryTag;
  }
}