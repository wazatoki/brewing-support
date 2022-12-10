import { ConsumedIngredient } from "./consumedIngredient";
import { ConsumedIngredientGrain } from "./consumedIngredientGrain";
import { ConsumedIngredientHop } from "./consumedIngredientHop";
import { ConsumedIngredientYeast } from "./consumedIngredientYeast";
import { createUUID } from "@/services/utils";

export const typename = "brew_event";
export const prefix = typename + "-";

export class BrewEvent implements BrewEventMember {
  id: string;
  name: string;
  desc: string;
  from: Date;
  to: Date;
  ingredients: ConsumedIngredient[];
  grains: ConsumedIngredientGrain[];
  hops: ConsumedIngredientHop[];
  yeasts: ConsumedIngredientYeast[];
  brewPlanID: string;

  clear() {
    this.id = prefix + createUUID();
    this.name = "";
    this.desc = "";
    this.from = new Date(0);
    this.to = new Date(0);
    this.ingredients = [] as ConsumedIngredient[];
    this.grains = [] as ConsumedIngredientGrain[];
    this.hops = [] as ConsumedIngredientHop[];
    this.yeasts = [] as ConsumedIngredientYeast[];
    this.brewPlanID = "";
  }

  constructor(
    id = prefix + createUUID(),
    name = "",
    desc = "",
    from = new Date(0),
    to = new Date(0),
    ingredients = [] as ConsumedIngredient[],
    grains = [] as ConsumedIngredientGrain[],
    hops = [] as ConsumedIngredientHop[],
    yeasts = [] as ConsumedIngredientYeast[],
    brewPlanID = ""
  ) {
    this.id = id;
    this.name = name;
    this.desc = desc;
    this.from = from;
    this.to = to;
    this.ingredients = ingredients;
    this.grains = grains;
    this.hops = hops;
    this.yeasts = yeasts;
    this.brewPlanID = brewPlanID;
  }
}

export interface BrewEventMember {
  id: string;
  name: string;
  desc: string;
  from: Date;
  to: Date;
  ingredients: ConsumedIngredient[];
  grains: ConsumedIngredientGrain[];
  hops: ConsumedIngredientHop[];
  yeasts: ConsumedIngredientYeast[];
  brewPlanID: string;
}
