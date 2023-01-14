import { Hop, HopPlainObject } from "@/models/ingredientHop";
import { Unit } from "@/models/unit";
import { createUUID } from "@/services/utils";

export const typename = "consumed_ingredient_hop";
export const prefix = typename + "-";

export class ConsumedIngredientHop {
  id: string;
  hop: Hop;
  quantity: number;

  get convertToBaseUnit(): { quantity: number; baseUnit: Unit } {
    return this.hop.brewingUnit.convertToBaseUnit(this.quantity);
  }

  get convertToStockingUnit(): { quantity: number; stockingUnit: Unit } {
    const q =
      (this.quantity * this.hop.brewingUnit.conversionFactor) /
      this.hop.stockingUnit.conversionFactor;
    return { quantity: q, stockingUnit: this.hop.stockingUnit };
  }

  toPlainObject(): ConsumedIngredientHopPlainObject {
    return {
      id: this.id,
      hop: this.hop.toPlainObject(),
      quantity: this.quantity,
    };
  }

  constructor(id = "", hop = new Hop(), quantity = 0) {
    this.id = id || prefix + createUUID();
    this.hop = hop;
    this.quantity = quantity;
  }
}

export type ConsumedIngredientHopPlainObject = {
  id: string;
  hop: HopPlainObject;
  quantity: number;
};
