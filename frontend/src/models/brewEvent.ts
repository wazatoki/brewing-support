import { ConsumedIngredient } from "./consumedIngredient";
import { ConsumedIngredientGrain } from "./consumedIngredientGrain";
import { ConsumedIngredientHop } from "./consumedIngredientHop";
import { ConsumedIngredientYeast } from "./consumedIngredientYeast";

export class BrewEvent {
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
    this.id = "";
    this.name = "";
    this.desc = "";
    this.from = new Date();
    this.to = new Date();
    this.ingredients = [] as ConsumedIngredient[];
    this.grains = [] as ConsumedIngredientGrain[];
    this.hops = [] as ConsumedIngredientHop[];
    this.yeasts = [] as ConsumedIngredientYeast[];
    this.brewPlanID = "";
  }

  constructor(
    id = "",
    name = "",
    desc = "",
    from = new Date(),
    to = new Date(),
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
