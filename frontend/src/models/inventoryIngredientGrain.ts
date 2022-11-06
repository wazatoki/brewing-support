import { Grain } from "@/models/ingredientGrain";
import { Unit } from "@/models/unit";
import { createUUID } from "@/services/utils";

export class InventoryIngredientGrain {
  id: string;
  grain: Grain;
  resultValue: number;
  calculatedValue: number;
  adjustedValue: number;
  note: string;

  get convertAdjustedValueToBaseUnit(): { quantity: number; baseUnit: Unit } {
    return this.grain.stockingUnit.convertToBaseUnit(this.adjustedValue);
  }

  constructor(
    id = "",
    grain: Grain,
    resultValue = 0,
    calculatedValue = 0,
    adjustedValue = 0,
    note = ""
  ) {
    this.id = id || "inventory_ingredient-grain-" + createUUID();
    this.grain = grain;
    this.resultValue = resultValue;
    this.calculatedValue = calculatedValue;
    this.adjustedValue = adjustedValue;
    this.note = note;
  }
}
