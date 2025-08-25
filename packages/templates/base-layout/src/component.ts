// import statements 
// system 
import { CustomElement, html, property } from "@papit/core";

// local 
import { style } from "./style";

export class TemplateBaseLayout extends CustomElement {
  static style = style;

  @property({ context: true, type: Number }) selectedMonth!: number;

  constructor() {
    super();

    const today = new Date();
    this.selectedMonth = today.getMonth();
  }

  private handlechange = (e: Event) => {
    if (!(e.currentTarget instanceof HTMLSelectElement)) return;
    this.selectedMonth = Number(e.currentTarget.value);
    this.dispatchEvent(new Event("select"));
  }
  private handleadd = () => {
    this.dispatchEvent(new Event("add"));
  }

  render() {
    return html`
      <slot></slot>
      <div>
        <select @change="${this.handlechange}" value="${this.selectedMonth}">
          <option value="0" ${this.selectedMonth == 0 && "selected"}>January</option>
          <option value="1" ${this.selectedMonth == 1 && "selected"}>February</option>
          <option value="2" ${this.selectedMonth == 2 && "selected"}>March</option>
          <option value="3" ${this.selectedMonth == 3 && "selected"}>April</option>
          <option value="4" ${this.selectedMonth == 4 && "selected"}>May</option>
          <option value="5" ${this.selectedMonth == 5 && "selected"}>June</option>
          <option value="6" ${this.selectedMonth == 6 && "selected"}>July</option>
          <option value="7" ${this.selectedMonth == 7 && "selected"}>August</option>
          <option value="8" ${this.selectedMonth == 8 && "selected"}>September</option>
          <option value="9" ${this.selectedMonth == 9 && "selected"}>October</option>
          <option value="10" ${this.selectedMonth == 10 && "selected"}>November</option>
          <option value="11" ${this.selectedMonth == 11 && "selected"}>December</option>
        </select>

        <button @click="${this.handleadd}">+Add</button>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "budget-base-layout": TemplateBaseLayout;
  }
}