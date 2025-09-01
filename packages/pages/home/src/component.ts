// import statements 
// system 
import { CustomElement, html, property, query } from "@papit/core";

// atoms
import { AddEvent } from "@budget/add-category-dialog";

// organisms 
import { CategoryOverviewList, Category } from "@budget/category-overview-list";
import "@budget/category-overview-list";

// templates 
import { TemplateBaseLayout } from "@budget/template-base-layout";
import "@budget/template-base-layout";

// utils 
import { toMoney } from "@budget/utils-money";

// local 
import { style } from "./style";
import { CategoryData, MonthData } from "./types";

export class PageHome extends CustomElement {
  static style = style;

  private categoryData: CategoryData[] = [];
  private monthData: MonthData = { categories: {}, history: [], overview: { balance: 0, budget: 0 } };
  private categoryOverview: Category[] = [];
  @property({ type: Date, }) date: Date = new Date();

  @query<CategoryOverviewList>({
    selector: "budget-category-overview-list",
    load: function (this: PageHome, element) {
      element.categories = this.categoryOverview;
    }
  }) categoryElement!: CategoryOverviewList;

  connectedCallback(): void {
    super.connectedCallback();
    this.date = new Date();
    const currentYear = this.date.getFullYear();
    const currentMonth = this.date.getMonth();

    this.monthData = JSON.parse(
      window.localStorage.getItem(`data-${currentMonth}-${currentYear}`)
      ?? JSON.stringify(MonthData),
    ) as MonthData;

    this.categoryData = JSON.parse(window.localStorage.getItem("categories") ?? "[]") as CategoryData[];
    this.calculateCategories();
  }

  private calculateCategories = () => {
    const currentYear = this.date.getFullYear();
    const currentMonth = this.date.getMonth();

    this.categoryOverview = this.categoryData
      .map(category => ({
        ...category,
        spent: this.monthData.categories[category.id]?.spent ?? 0,
        created: new Date(category.created),
      }))
      .filter(category => {
        const m = category.created.getMonth();
        const y = category.created.getFullYear();

        return currentYear === y && currentMonth === m;
      });

    if (this.categoryElement)
    {
      this.categoryElement.categories = this.categoryOverview;
    }
  }

  private handleSelect = (e: Event) => {
    if (!(e.currentTarget instanceof TemplateBaseLayout)) return;

    this.date.setMonth(e.currentTarget.selectedMonth);
    this.calculateCategories();
  }
  private handleadd = () => {
    console.log('add payment or income!')
  }
  private handleaddcategory = (e: CustomEvent<AddEvent>) => {
    const name = e.detail.name ?? "missing-name";
    const budget = e.detail.budget ?? 0;
    const color = e.detail.color ?? "gray";

    const category: Category = {
      id: String(this.categoryData.length),
      name,
      budget,
      color,
      spent: 0,
    }
    this.categoryData.push({
      id: category.id,
      name,
      budget,
      color,
      created: new Date().toISOString()
    });
    this.categoryOverview.push(category);
    this.monthData.categories[category.id] = { spent: category.spent, history: [] };

    if (this.categoryElement)
    {
      this.categoryElement.categories = this.categoryOverview;
      this.categoryElement.requestUpdate();
    }

    window.localStorage.setItem("categories", JSON.stringify(this.categoryData));
    window.localStorage.setItem(`data-${this.date.getMonth()}-${this.date.getFullYear()}`, JSON.stringify(this.monthData));
  }

  render() {
    return html`
      <budget-base-layout 
        @select="${this.handleSelect}"
        @add="${this.handleadd}"
      >

        <budget-island name="Brief Overview">
          <span>Budget <span>${toMoney(this.monthData.overview.budget)}kr</span></span>
          <span>Balance <span>${toMoney(this.monthData.overview.balance)}kr</span></span>
        </budget-island>

        <budget-category-overview-list
          @add="${this.handleaddcategory}"
        >
        </budget-category-overview-list>

      </budget-base-layout>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "budget-home": PageHome;
  }
}