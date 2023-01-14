import { Yeast, YeastPlainObject } from "@/models/ingredientYeast";
import { Unit } from "@/models/unit";
import { createUUID } from "@/services/utils";

export const typename = "recieved_ingredient-yeast";
export const prefix = typename + "-";

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

  toPlainObject(): RecievedIngredientYeastPlainObject {
    return {
      id: this.id,
      yeast: this.yeast.toPlainObject(),
      quantity: this.quantity,
    };
  }

  constructor(id = "", yeast = new Yeast(), quantity = 0) {
    this.id = id || prefix + createUUID();
    this.yeast = yeast;
    this.quantity = quantity;
  }
}

export type RecievedIngredientYeastPlainObject = {
  id: string;
  yeast: YeastPlainObject;
  quantity: number;
};
