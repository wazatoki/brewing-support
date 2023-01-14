import { Ingredient, IngredientPlainObject } from "@/models/ingredient";
import { Unit } from "@/models/unit";
import { createUUID } from "@/services/utils";

export const typename = "inventory_ingredient";
export const prefix = typename + "-";

export class InventoryIngredient {
  id: string;
  ingredient: Ingredient;
  resultValue: number;
  calculatedValue: number;
  adjustedValue: number;
  note: string;

  get convertAdjustedValueToBaseUnit(): { quantity: number; baseUnit: Unit } {
    return this.ingredient.stockingUnit.convertToBaseUnit(this.adjustedValue);
  }

  toPlainObject(): InventoryIngredientPlainObject {
    return {
      id: this.id,
      ingredient: this.ingredient.toPlainObject(),
      resultValue: this.resultValue,
      calculatedValue: this.calculatedValue,
      adjustedValue: this.adjustedValue,
      note: this.note,
    };
  }

  constructor(
    id = prefix + createUUID(),
    ingredient = new Ingredient(),
    resultValue = 0,
    calculatedValue = 0,
    adjustedValue = 0,
    note = ""
  ) {
    this.id = id;
    this.ingredient = ingredient;
    this.resultValue = resultValue;
    this.calculatedValue = calculatedValue;
    this.adjustedValue = adjustedValue;
    this.note = note;
  }
}

export type InventoryIngredientPlainObject = {
  id: string;
  ingredient: IngredientPlainObject;
  resultValue: number;
  calculatedValue: number;
  adjustedValue: number;
  note: string;
};
