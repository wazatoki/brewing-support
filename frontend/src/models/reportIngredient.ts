import { createUUID } from "@/services/utils";
import { Ingredient } from "@/models/ingredient";
import { Supplier } from "./supplier";
import { BrewPlan } from "./brewPlan";
import { Yeast } from "./ingredientYeast";
import { Grain } from "./ingredientGrain";
import { Hop } from "./ingredientHop";

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
    id = "",
    processingDate: Date,
    processingType: string,
    ingredient: Ingredient,
    supplier: Supplier | null,
    brewPlan: BrewPlan | null,
    quantity: number,
    unitName = ""
  ) {
    this.id = id || "report_ingredient-" + createUUID();
    this.processingDate = processingDate;
    this.processingType = processingType;
    this.ingredient = ingredient;
    this.supplier = supplier;
    this.brewPlan = brewPlan;
    this.quantity = quantity;
    this.unitName = unitName;
  }
}
