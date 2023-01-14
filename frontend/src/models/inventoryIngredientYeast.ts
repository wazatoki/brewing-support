import { Yeast, YeastPlainObject } from "@/models/ingredientYeast";
import { Unit } from "@/models/unit";
import { createUUID } from "@/services/utils";

export const typename = "inventory_ingredient_yeast";
export const prefix = typename + "-";

export class InventoryIngredientYeast {
  id: string;
  yeast: Yeast;
  resultValue: number;
  calculatedValue: number;
  adjustedValue: number;
  note: string;

  get convertAdjustedValueToBaseUnit(): { quantity: number; baseUnit: Unit } {
    return this.yeast.stockingUnit.convertToBaseUnit(this.adjustedValue);
  }

  toPlainObject(): InventoryIngredientYeastPlainObject {
    return {
      id: this.id,
      yeast: this.yeast.toPlainObject(),
      resultValue: this.resultValue,
      calculatedValue: this.calculatedValue,
      adjustedValue: this.adjustedValue,
      note: this.note,
    };
  }

  constructor(
    id = "",
    yeast = new Yeast(),
    resultValue = 0,
    calculatedValue = 0,
    adjustedValue = 0,
    note = ""
  ) {
    this.id = id || prefix + createUUID();
    this.yeast = yeast;
    this.resultValue = resultValue;
    this.calculatedValue = calculatedValue;
    this.adjustedValue = adjustedValue;
    this.note = note;
  }
}

export type InventoryIngredientYeastPlainObject = {
  id: string;
  yeast: YeastPlainObject;
  resultValue: number;
  calculatedValue: number;
  adjustedValue: number;
  note: string;
};
