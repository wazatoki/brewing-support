import { Yeast } from "@/models/ingredientYeast";
import { Unit } from "@/models/unit";
import { createUUID } from "@/services/utils";

export class RecievedIngredientYeast {
  id: string;
  yeast: Yeast;
  quantity: number;

  get convertToBaseUnit(): { quantity: number; baseUnit: Unit } {
    return this.yeast.recievingUnit.convertToBaseUnit(this.quantity);
  }

  get convertToStockingUnit(): { quantity: number; stockingUnit: Unit } {
    const q =
      (this.quantity * this.yeast.recievingUnit.conversionFactor) /
      this.yeast.stockingUnit.conversionFactor;
    return { quantity: q, stockingUnit: this.yeast.stockingUnit };
  }

  constructor(id = "", yeast: Yeast, quantity = 0) {
    this.id = id || "recieved_ingredient-yeast-" + createUUID();
    this.yeast = yeast;
    this.quantity = quantity;
  }
}
