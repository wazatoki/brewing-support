import { Hop } from "@/models/ingredientHop";
import { Unit } from "@/models/unit";
import { createUUID } from "@/services/utils";

export const typename = "recieved_ingredient_hop";
export const prefix = typename + "-";

export class RecievedIngredientHop {
  id: string;
  hop: Hop;
  quantity: number;

  get convertToBaseUnit(): { quantity: number; baseUnit: Unit } {
    return this.hop.recievingUnit.convertToBaseUnit(this.quantity);
  }

  get convertToStockingUnit(): { quantity: number; stockingUnit: Unit } {
    const q =
      (this.quantity * this.hop.recievingUnit.conversionFactor) /
      this.hop.stockingUnit.conversionFactor;
    return { quantity: q, stockingUnit: this.hop.stockingUnit };
  }

  constructor(id = "", hop = new Hop(), quantity = 0) {
    this.id = id || prefix + createUUID();
    this.hop = hop;
    this.quantity = quantity;
  }
}
