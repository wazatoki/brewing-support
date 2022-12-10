import { Ingredient } from "@/models/ingredient";
import { Unit } from "@/models/unit";
import { createUUID } from "@/services/utils";

export const typename = "consumed_ingredient";
export const prefix = typename + "-";

export class ConsumedIngredient {
  id: string;
  ingredient: Ingredient;
  quantity: number;

  get convertToBaseUnit(): { quantity: number; baseUnit: Unit } {
    return this.ingredient.brewingUnit.convertToBaseUnit(this.quantity);
  }

  get convertToStockingUnit(): { quantity: number; stockingUnit: Unit } {
    const q =
      (this.quantity * this.ingredient.brewingUnit.conversionFactor) /
      this.ingredient.stockingUnit.conversionFactor;
    return { quantity: q, stockingUnit: this.ingredient.stockingUnit };
  }

  constructor(id = "", ingredient = new Ingredient(), quantity = 0) {
    this.id = id || prefix + createUUID();
    this.ingredient = ingredient;
    this.quantity = quantity;
  }
}
