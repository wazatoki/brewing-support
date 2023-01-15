import { createUUID } from "@/services/utils";
import { Ingredient, IngredientPlainObject } from "@/models/ingredient";
import { Supplier, SupplierPlainObject } from "@/models/supplier";
import { BrewPlan, BrewPlanPlainObject } from "@/models/brewPlan";
import { Yeast, YeastPlainObject } from "@/models/ingredientYeast";
import { Grain, GrainPlainObject } from "@/models/ingredientGrain";
import { Hop, HopPlainObject } from "@/models/ingredientHop";
import * as processingTp from "@/models/processingType";

export const typename = "report_ingredient";
export const prefix = typename + "-";

export class ReportIngredient {
  id: string;
  processingDate: Date;
  processingType: string;
  ingredient: Ingredient | Grain | Hop | Yeast;
  supplier: Supplier | null;
  brewPlan: BrewPlan | null;
  quantity: number;
  unitName: string;

  constructor(
    id = prefix + createUUID(),
    processingDate = new Date(),
    processingType = processingTp.recieving,
    ingredient: Ingredient | Grain | Hop | Yeast = new Ingredient(),
    supplier: Supplier | null = null,
    brewPlan: BrewPlan | null = null,
    quantity = 0,
    unitName = ""
  ) {
    this.id = id;
    this.processingDate = processingDate;
    this.processingType = processingType;
    this.ingredient = ingredient;
    this.supplier = supplier;
    this.brewPlan = brewPlan;
    this.quantity = quantity;
    this.unitName = unitName;
  }

  toPlainObject(): ReportIngredientplainObject {
    return {
      id: this.id,
      processingDate: this.processingDate,
      processingType: this.processingType,
      ingredient: this.ingredient.toPlainObject(),
      supplier: this.supplier ? this.supplier.toPlainObject() : null,
      brewPlan: this.brewPlan ? this.brewPlan.toPlainObject() : null,
      quantity: this.quantity,
      unitName: this.unitName,
    };
  }
}

export type ReportIngredientplainObject = {
  id: string;
  processingDate: Date;
  processingType: string;
  ingredient:
    | IngredientPlainObject
    | GrainPlainObject
    | HopPlainObject
    | YeastPlainObject;
  supplier: SupplierPlainObject | null;
  brewPlan: BrewPlanPlainObject | null;
  quantity: number;
  unitName: string;
};
