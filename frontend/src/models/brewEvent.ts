import {
  ConsumedIngredient,
  ConsumedIngredientPlainObject,
} from "./consumedIngredient";
import {
  ConsumedIngredientGrain,
  ConsumedIngredientGrainPlainObject,
} from "./consumedIngredientGrain";
import {
  ConsumedIngredientHop,
  ConsumedIngredientHopPlainObject,
} from "./consumedIngredientHop";
import {
  ConsumedIngredientYeast,
  ConsumedIngredientYeastPlainObject,
} from "./consumedIngredientYeast";
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

  toPlainObject(): BrewEventPlainObject {
    const plainIngredients: ConsumedIngredientPlainObject[] =
      this.ingredients.map(
        (ingredient: ConsumedIngredient): ConsumedIngredientPlainObject =>
          ingredient.toPlainObject()
      );
    const plainGrains: ConsumedIngredientGrainPlainObject[] = this.grains.map(
      (grain: ConsumedIngredientGrain): ConsumedIngredientGrainPlainObject =>
        grain.toPlainObject()
    );
    const plainHops: ConsumedIngredientHopPlainObject[] = this.hops.map(
      (hop: ConsumedIngredientHop): ConsumedIngredientHopPlainObject =>
        hop.toPlainObject()
    );
    const plainYeasts: ConsumedIngredientYeastPlainObject[] = this.yeasts.map(
      (yeast: ConsumedIngredientYeast): ConsumedIngredientYeastPlainObject =>
        yeast.toPlainObject()
    );

    return {
      id: this.id,
      name: this.name,
      desc: this.desc,
      from: this.from,
      to: this.to,
      ingredients: plainIngredients,
      grains: plainGrains,
      hops: plainHops,
      yeasts: plainYeasts,
      brewPlanID: this.brewPlanID,
    };
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

export type BrewEventPlainObject = {
  id: string;
  name: string;
  desc: string;
  from: Date;
  to: Date;
  ingredients: ConsumedIngredientPlainObject[];
  grains: ConsumedIngredientGrainPlainObject[];
  hops: ConsumedIngredientHopPlainObject[];
  yeasts: ConsumedIngredientYeastPlainObject[];
  brewPlanID: string;
};
