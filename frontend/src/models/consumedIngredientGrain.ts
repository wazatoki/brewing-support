import { Grain, GrainPlainObject } from "@/models/ingredientGrain";
import { Unit } from "@/models/unit";
import { createUUID } from "@/services/utils";

export const typename = "consumed_ingredient_grain";
export const prefix = typename + "-";

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

  toPlainObject(): ConsumedIngredientGrainPlainObject {
    return {
      id: this.id,
      grain: this.grain.toPlainObject(),
      quantity: this.quantity,
    };
  }

  constructor(id = "", grain = new Grain(), quantity = 0) {
    this.id = id || prefix + createUUID();
    this.grain = grain;
    this.quantity = quantity;
  }
}

export type ConsumedIngredientGrainPlainObject = {
  id: string;
  grain: GrainPlainObject;
  quantity: number;
};
