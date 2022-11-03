import { Grain } from "@/models/ingredientGrain";
import { Unit } from "@/models/unit";
import { createUUID } from "@/services/utils";

export class ConsumedIngredientGrain {
  id: string;
  grain: Grain;
  quantity: number;

  get convertToBaseUnit(): { quantity: number; baseUnit: Unit } {
    return this.grain.brewingUnit.convertToBaseUnit(this.quantity);
  }

  get convertToStockingUnit(): { quantity: number; stockingUnit: Unit } {
    const q =
      (this.quantity * this.grain.brewingUnit.conversionFactor) /
      this.grain.stockingUnit.conversionFactor;
    return { quantity: q, stockingUnit: this.grain.stockingUnit };
  }

  constructor(id = "", grain: Grain, quantity = 0) {
    this.id = id || "consumed_ingredient-grain-" + createUUID();
    this.grain = grain;
    this.quantity = quantity;
  }
}
