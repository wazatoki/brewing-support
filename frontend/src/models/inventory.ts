import { InventoryIngredient } from "@/models/inventoryIngredient";
import { InventoryIngredientGrain } from "./inventoryIngredientGrain";
import { InventoryIngredientHop } from "./inventoryIngredientHop";
import { InventoryIngredientYeast } from "./inventoryIngredientYeast";
import { createUUID } from "@/services/utils";

export const typename = "inventory";
export const prefix = typename + "-";

export class Inventory implements InventoryMember {
  id: string;
  onDate: Date;
  ingredients: InventoryIngredient[];
  grains: InventoryIngredientGrain[];
  hops: InventoryIngredientHop[];
  yeasts: InventoryIngredientYeast[];
  note: string;

  clear() {
    this.onDate = new Date();
    this.ingredients = [] as InventoryIngredient[];
    this.grains = [] as InventoryIngredientGrain[];
    this.hops = [] as InventoryIngredientHop[];
    this.yeasts = [] as InventoryIngredientYeast[];
    this.note = "";
  }

  constructor(
    id = prefix + createUUID(),
    onDate = new Date(),
    ingredients = [] as InventoryIngredient[],
    grains = [] as InventoryIngredientGrain[],
    hops = [] as InventoryIngredientHop[],
    yeasts = [] as InventoryIngredientYeast[],
    note = ""
  ) {
    this.id = id;
    this.onDate = onDate;
    this.ingredients = ingredients;
    this.grains = grains;
    this.hops = hops;
    this.yeasts = yeasts;
    this.note = note;
  }
}

export interface InventoryMember {
  id: string;
  onDate: Date;
  ingredients: InventoryIngredient[];
  grains: InventoryIngredientGrain[];
  hops: InventoryIngredientHop[];
  yeasts: InventoryIngredientYeast[];
  note: string;
}
