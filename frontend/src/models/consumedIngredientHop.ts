import { Hop } from "@/models/ingredientHop";
import { Unit } from "@/models/unit";
import { createUUID } from "@/services/utils";

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

  constructor(id = "", hop: Hop, quantity = 0) {
    this.id = id || "consumed_ingredient-hop-" + createUUID();
    this.hop = hop;
    this.quantity = quantity;
  }
}
