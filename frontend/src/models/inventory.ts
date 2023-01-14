import {
  InventoryIngredient,
  InventoryIngredientPlainObject,
} from "@/models/inventoryIngredient";
import {
  InventoryIngredientGrain,
  InventoryIngredientGrainPlainObject,
} from "./inventoryIngredientGrain";
import {
  InventoryIngredientHop,
  InventoryIngredientHopPlainObject,
} from "./inventoryIngredientHop";
import {
  InventoryIngredientYeast,
  InventoryIngredientYeastPlainObject,
} from "./inventoryIngredientYeast";
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

  toPlainObject(): InventoryPlainObject {
    const ingredients = this.ingredients.map(
      (ingredient: InventoryIngredient): InventoryIngredientPlainObject =>
        ingredient.toPlainObject()
    );
    const grains = this.grains.map(
      (grain: InventoryIngredientGrain): InventoryIngredientGrainPlainObject =>
        grain.toPlainObject()
    );
    const hops = this.hops.map(
      (hop: InventoryIngredientHop): InventoryIngredientHopPlainObject =>
        hop.toPlainObject()
    );
    const yeasts = this.yeasts.map(
      (yeast: InventoryIngredientYeast): InventoryIngredientYeastPlainObject =>
        yeast.toPlainObject()
    );

    return {
      id: this.id,
      onDate: this.onDate,
      ingredients: ingredients,
      grains: grains,
      hops: hops,
      yeasts: yeasts,
      note: this.note,
    };
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

export type InventoryPlainObject = {
  id: string;
  onDate: Date;
  ingredients: InventoryIngredientPlainObject[];
  grains: InventoryIngredientGrainPlainObject[];
  hops: InventoryIngredientHopPlainObject[];
  yeasts: InventoryIngredientYeastPlainObject[];
  note: string;
};
