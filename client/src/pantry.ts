import { COOKING_UNITS } from "../../src/constants/units.js";

interface PantryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
}

async function loadIngredients(): Promise<PantryItem[]> {
  const res = await fetch("/api/ingredients");
  return res.json() as Promise<PantryItem[]>;
}

function getList(): HTMLUListElement {
  return document.getElementById("ingredients") as HTMLUListElement;
}

async function renderList(): Promise<void> {
  const items = await loadIngredients();
  const list = getList();
  list.innerHTML = "";

  if (items.length === 0) {
    const li = document.createElement("li");
    li.className = "empty-message";
    li.textContent = "Your pantry is empty.";
    list.appendChild(li);
    return;
  }

  for (const item of items) {
    list.appendChild(buildItemRow(item));
  }
}

function buildUnitSelect(selected?: string): HTMLSelectElement {
  const sel = document.createElement("select");
  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = "— select unit —";
  placeholder.disabled = true;
  placeholder.selected = !selected;
  sel.appendChild(placeholder);

  for (const unit of COOKING_UNITS) {
    const opt = document.createElement("option");
    opt.value = unit;
    opt.textContent = unit;
    if (unit === selected) opt.selected = true;
    sel.appendChild(opt);
  }
  return sel;
}

function buildItemRow(item: PantryItem): HTMLLIElement {
  const li = document.createElement("li");
  li.dataset.id = item.id;

  const info = document.createElement("span");
  info.className = "item-info";
  info.textContent = `${item.name} — ${item.quantity} ${item.unit}`;

  const actions = document.createElement("span");
  actions.className = "item-actions";

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.addEventListener("click", () => showEditForm(li, item));

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => showDeleteConfirm(li, item));

  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);
  li.appendChild(info);
  li.appendChild(actions);
  return li;
}

function buildInlineForm(
  item: PantryItem | null,
  onSave: (name: string, quantity: number, unit: string) => Promise<void>
): HTMLLIElement {
  const li = document.createElement("li");
  li.className = "inline-form";

  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.placeholder = "Ingredient name";
  nameInput.value = item?.name ?? "";

  const quantityInput = document.createElement("input");
  quantityInput.type = "number";
  quantityInput.placeholder = "Quantity";
  quantityInput.value = item != null ? String(item.quantity) : "";

  const unitSelect = buildUnitSelect(item?.unit);

  const errorSpan = document.createElement("span");
  errorSpan.className = "form-error";

  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Save";
  saveBtn.addEventListener("click", async () => {
    const name = nameInput.value.trim();
    const quantityRaw = quantityInput.value.trim();
    const unit = unitSelect.value;

    if (!name) {
      errorSpan.textContent = "Name is required.";
      return;
    }
    if (!quantityRaw) {
      errorSpan.textContent = "Quantity is required.";
      return;
    }
    const quantity = Number(quantityRaw);
    if (!isFinite(quantity)) {
      errorSpan.textContent = "Quantity must be a number.";
      return;
    }
    if (!unit) {
      errorSpan.textContent = "A unit must be selected.";
      return;
    }

    saveBtn.disabled = true;
    try {
      await onSave(name, quantity, unit);
    } finally {
      saveBtn.disabled = false;
    }
  });

  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "Cancel";
  cancelBtn.addEventListener("click", () => renderList());

  li.appendChild(nameInput);
  li.appendChild(quantityInput);
  li.appendChild(unitSelect);
  li.appendChild(saveBtn);
  li.appendChild(cancelBtn);
  li.appendChild(errorSpan);
  return li;
}

function showAddForm(): void {
  const list = getList();
  // Remove any existing empty message
  const existing = list.querySelector(".inline-form");
  if (existing) return;

  const formLi = buildInlineForm(null, async (name, quantity, unit) => {
    await fetch("/api/ingredients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, quantity, unit }),
    });
    await renderList();
  });

  list.insertBefore(formLi, list.firstChild);
}

function showEditForm(li: HTMLLIElement, item: PantryItem): void {
  const formLi = buildInlineForm(item, async (name, quantity, unit) => {
    await fetch(`/api/ingredients/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, quantity, unit }),
    });
    await renderList();
  });

  li.replaceWith(formLi);
}

function showDeleteConfirm(li: HTMLLIElement, item: PantryItem): void {
  const actions = li.querySelector(".item-actions") as HTMLSpanElement;
  actions.innerHTML = "";

  const label = document.createElement("span");
  label.textContent = "Are you sure?";

  const yesBtn = document.createElement("button");
  yesBtn.textContent = "Yes";
  yesBtn.addEventListener("click", async () => {
    await fetch(`/api/ingredients/${item.id}`, { method: "DELETE" });
    await renderList();
  });

  const noBtn = document.createElement("button");
  noBtn.textContent = "No";
  noBtn.addEventListener("click", () => renderList());

  actions.appendChild(label);
  actions.appendChild(yesBtn);
  actions.appendChild(noBtn);
}

document.getElementById("add-ingredient-btn")?.addEventListener("click", showAddForm);

renderList();
