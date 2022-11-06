import { Yeast } from "@/models/ingredientYeast";
import { Unit } from "@/models/unit";
import { createUUID } from "@/services/utils";

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

  constructor(
    id = "",
    yeast: Yeast,
    resultValue = 0,
    calculatedValue = 0,
    adjustedValue = 0,
    note = ""
  ) {
    this.id = id || "inventory_ingredient-yeast-" + createUUID();
    this.yeast = yeast;
    this.resultValue = resultValue;
    this.calculatedValue = calculatedValue;
    this.adjustedValue = adjustedValue;
    this.note = note;
  }
}
