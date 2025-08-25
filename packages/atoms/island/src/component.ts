// import statements 
// system 
import { CustomElement, html, property } from "@papit/core";

// local 
import { style } from "./style";

export class Island extends CustomElement {
  static style = style;

  // properties 
  @property name: string = "";

  render() {
    return html`
      <h2>${this.name}</h2>
      <div>
        <slot></slot>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "budget-island": Island;
  }
}