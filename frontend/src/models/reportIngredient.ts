import { createUUID } from "@/services/utils";
import { Ingredient } from "@/models/ingredient";
import { Supplier } from "@/models/supplier";
import { BrewPlan } from "@/models/brewPlan";
import { Yeast } from "@/models/ingredientYeast";
import { Grain } from "@/models/ingredientGrain";
import { Hop } from "@/models/ingredientHop";
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
}
