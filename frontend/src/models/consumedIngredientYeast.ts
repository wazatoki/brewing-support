import { Yeast } from "@/models/ingredientYeast";
import { Unit } from "@/models/unit";
import { createUUID } from "@/services/utils";

export const typename = "consumed_ingredient-yeast";
export const prefix = typename + "-";

export class ConsumedIngredientYeast {
  id: string;
  yeast: Yeast;
  quantity: number;

  get convertToBaseUnit(): { quantity: number; baseUnit: Unit } {
    return this.yeast.brewingUnit.convertToBaseUnit(this.quantity);
  }

  get convertToStockingUnit(): { quantity: number; stockingUnit: Unit } {
    const q =
      (this.quantity * this.yeast.brewingUnit.conversionFactor) /
      this.yeast.stockingUnit.conversionFactor;
    return { quantity: q, stockingUnit: this.yeast.stockingUnit };
  }

  constructor(id = "", yeast = new Yeast(), quantity = 0) {
    this.id = id || prefix + createUUID();
    this.yeast = yeast;
    this.quantity = quantity;
  }
}
