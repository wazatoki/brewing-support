import { Hop } from "@/models/ingredientHop";
import { Unit } from "@/models/unit";
import { createUUID } from "@/services/utils";

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

  constructor(
    id = "",
    hop: Hop,
    resultValue = 0,
    calculatedValue = 0,
    adjustedValue = 0,
    note = ""
  ) {
    this.id = id || "inventory_ingredient-hop-" + createUUID();
    this.hop = hop;
    this.resultValue = resultValue;
    this.calculatedValue = calculatedValue;
    this.adjustedValue = adjustedValue;
    this.note = note;
  }
}
