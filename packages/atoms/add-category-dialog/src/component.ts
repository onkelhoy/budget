// import statements 
// system 
import { CustomElement, html, property, query } from "@papit/core";

// local 
import { style } from "./style";
import { AddEvent, Color } from "./types";

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
    const name = formdata.get("name") as string | null;
    const color = formdata.get("color") as Color | null;
    const budget = formdata.get("budget") as string | null;

    this.dispatchEvent(new CustomEvent<AddEvent>("submit", {
      detail: {
        name,
        budget: budget ? Number(budget) : null,
        color
      }
    }));
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
          <div class="flex radio">
            <div>
              <label for="red">red</label>  
              <input style="accent-color:red" name="color" type="radio" value="red" id="red" />
            </div>
            <div>
              <label for="yellow">yellow</label>
              <input style="accent-color:yellow;" name="color" type="radio" value="yellow" id="yellow" />
            </div>
            <div>
              <label for="blue">blue</label>
              <input style="accent-color:blue;" name="color" type="radio" value="blue" id="blue" />
            </div>
            <div>
              <label for="green">green</label>
              <input style="accent-color:green;" name="color" type="radio" value="green" id="green" />
            </div>
            <div>
              <label for="orange">orange</label>
              <input style="accent-color:orange;" name="color" type="radio" value="orange" id="orange" />
            </div>
            <div>
              <label for="gray">gray</label>
              <input style="accent-color:gray;" name="color" type="radio" value="gray" id="gray" />
            </div>
            <div>
              <label for="purple">purple</label>
              <input style="accent-color:purple;" name="color" type="radio" value="purple" id="purple" />
            </div>
            <div>
              <label for="pink">pink</label>
              <input style="accent-color:pink;" name="color" type="radio" value="pink" id="pink" />
            </div>
          </div>
          <div class="flex field">
            <label for="name">Name</label>
            <input name="name" type="text" />
          </div>
          <div class="flex field">
            <label for="budget">Budget</label>
            <input name="budget" type="number" min="0" />
          </div>

          <div class="flex mt">
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