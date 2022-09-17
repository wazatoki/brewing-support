import { InventoryIngredient } from "@/models/inventoryIngredient";

export class Inventory {
  id: string;
  onDate: Date;
  ingredients: InventoryIngredient[];
  note: string;

  clear() {
    this.id = "";
    this.onDate = new Date();
    this.ingredients = [] as InventoryIngredient[];
    this.note = "";
  }

  constructor(
    id = "",
    onDate = new Date(),
    ingredients = [] as InventoryIngredient[],
    note = ""
  ) {
    this.id = id;
    this.onDate = onDate;
    this.ingredients = ingredients;
    this.note = note;
  }
}

export interface InventoryMember {
  id: string;
  onDate: Date;
  ingredients: InventoryIngredient[];
  note: string;
}
