// import statements 
// system 
import { CustomElement, html, property, query } from "@papit/core";

// local 
import { style } from "./style";
import { AddEvent } from "./types";

export class AddCategoryDialog extends CustomElement {
  static style = style;

  // properties 
  @property({
    type: Boolean,
    after: function (this: AddCategoryDialog, value: boolean) {
      if (!this.dialog) return;

      if (value) this.dialog.showModal();
      else this.dialog.close();
    }
  }) open: boolean = false;

  @query("dialog") dialog!: HTMLDialogElement;

  private handlesubmit = (e: SubmitEvent) => {
    e.preventDefault();
    if (!e.currentTarget) return;
    const formelement = e.currentTarget as HTMLFormElement;

    const formdata = new FormData(formelement);
    const name = formdata.get("name") as string;

    this.dispatchEvent(new CustomEvent<AddEvent>("submit", { detail: { name } }));
    formelement.reset();
  }

  private handlereset = () => {
    this.open = false;
  }

  private handleclose = () => {
    this.open = false;
  }

  render() {
    return html`
      <dialog closedby="any" @close="${this.handleclose}">
        <h2>Add Category</h2>
        <form @submit="${this.handlesubmit}" @reset="${this.handlereset}">
          <div>
            <label for="name">Name</label>
            <input name="name" type="text" />
          </div>
          <div>
            <button type="submit">Save</button>
            <button type="reset">Cancel</button>
          </div>
        </form>
      </dialog>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "budget-add-category-dialog": AddCategoryDialog;
  }
}