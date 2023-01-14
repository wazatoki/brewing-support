import { Hop, HopPlainObject } from "@/models/ingredientHop";
import { Unit } from "@/models/unit";
import { createUUID } from "@/services/utils";

export const typename = "inventory_ingredient_hop";
export const prefix = typename + "-";

export class InventoryIngredientHop {
  id: string;
  hop: Hop;
  resultValue: number;
  calculatedValue: number;
  adjustedValue: number;
  note: string;

  get convertAdjustedValueToBaseUnit(): { quantity: number; baseUnit: Unit } {
    return this.hop.stockingUnit.convertToBaseUnit(this.adjustedValue);
  }

  toPlainObject(): InventoryIngredientHopPlainObject {
    return {
      id: this.id,
      hop: this.hop.toPlainObject(),
      resultValue: this.resultValue,
      calculatedValue: this.calculatedValue,
      adjustedValue: this.adjustedValue,
      note: this.note,
    };
  }

  constructor(
    id = "",
    hop = new Hop(),
    resultValue = 0,
    calculatedValue = 0,
    adjustedValue = 0,
    note = ""
  ) {
    this.id = id || prefix + createUUID();
    this.hop = hop;
    this.resultValue = resultValue;
    this.calculatedValue = calculatedValue;
    this.adjustedValue = adjustedValue;
    this.note = note;
  }
}

export type InventoryIngredientHopPlainObject = {
  id: string;
  hop: HopPlainObject;
  resultValue: number;
  calculatedValue: number;
  adjustedValue: number;
  note: string;
};
