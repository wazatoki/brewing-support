import { BrewEvent, BrewEventPlainObject } from "./brewEvent";
import { Grain, GrainPlainObject } from "./ingredientGrain";
import { Hop, HopPlainObject } from "./ingredientHop";
import { Yeast, YeastPlainObject } from "./ingredientYeast";
import { createUUID } from "@/services/utils";
import { Ingredient, IngredientPlainObject } from "./ingredient";

export const typename = "brew_plan";
export const prefix = typename + "-";

export class BrewPlan {
  id: string;
  batchNumber: number;
  name: string;
  batchSize: number;
  originalGravity: number;
  finalGravity: number;
  brixLevel: number;
  finalBrixLevel: number;
  abv: number;
  ibus: number;
  measuredOriginalGravity: number;
  measuredFinalGravity: number;
  measuredBrixLevel: number;
  measuredFinalBrixLevel: number;
  measuredAbv: number;
  mashEfficienty: number;
  grains: GrainPlan[];
  hops: HopPlan[];
  yeastPlan: YeastPlan;
  ingredients: IngredientPlan[];
  events: BrewEvent[];

  clear() {
    this.batchNumber = 0;
    this.name = "";
    this.batchSize = 0;
    this.originalGravity = 1;
    this.finalGravity = 1;
    this.brixLevel = 0;
    this.finalBrixLevel = 0;
    this.abv = 0;
    this.ibus = 0;
    this.measuredOriginalGravity = 0;
    this.measuredFinalGravity = 0;
    this.measuredBrixLevel = 0;
    this.measuredFinalBrixLevel = 0;
    this.measuredAbv = 0;
    this.mashEfficienty = 0;
    this.grains = [] as GrainPlan[];
    this.hops = [] as HopPlan[];
    this.yeastPlan = {
      yeast: new Yeast(),
      quantity: 0,
    } as YeastPlan;
    this.ingredients = [] as IngredientPlan[];
    this.events = [] as BrewEvent[];
  }

  toPlainObject(): BrewPlanPlainObject {
    const grainObjects = this.grains.map(
      (grain: GrainPlan): GrainPlanPlainObject => {
        return {
          grain: grain.grain.toPlainObject(),
          quantity: grain.quantity,
          ratio: grain.ratio,
        };
      }
    );
    const hopObjects = this.hops.map((hop: HopPlan): HopPlanPlainObject => {
      return {
        hop: hop.hop.toPlainObject(),
        quantity: hop.quantity,
        alphaAcid: hop.alphaAcid,
        boilTime: hop.boilTime,
        ibus: hop.ibus,
      };
    });
    const yeastObject: YeastPlanPlainObject = {
      yeast: this.yeastPlan.yeast.toPlainObject(),
      quantity: this.yeastPlan.quantity,
    };
    const ingredientObjects = this.ingredients.map(
      (ingredient: IngredientPlan): IngredientPlanPlainObject => {
        return {
          ingredient: ingredient.ingredient.toPlainObject(),
          quantity: ingredient.quantity,
        };
      }
    );
    const eventObject = this.events.map(
      (e: BrewEvent): BrewEventPlainObject => e.toPlainObject()
    );
    return {
      id: this.id,
      batchNumber: this.batchNumber,
      name: this.name,
      batchSize: this.batchSize,
      originalGravity: this.originalGravity,
      finalGravity: this.finalGravity,
      brixLevel: this.brixLevel,
      finalBrixLevel: this.finalBrixLevel,
      abv: this.abv,
      measuredOriginalGravity: this.measuredOriginalGravity,
      measuredFinalGravity: this.measuredFinalGravity,
      measuredBrixLevel: this.measuredFinalBrixLevel,
      measuredFinalBrixLevel: this.measuredFinalBrixLevel,
      measuredAbv: this.measuredAbv,
      ibus: this.ibus,
      mashEfficienty: this.mashEfficienty,
      grains: grainObjects,
      hops: hopObjects,
      yeastPlan: yeastObject,
      ingredients: ingredientObjects,
      events: eventObject,
    };
  }

  constructor(
    id = prefix + createUUID(),
    batchNumber = 0,
    name = "",
    batchSize = 0,
    originalGravity = 1,
    finalGravity = 1,
    brixLevel = 0,
    finalBrixLevel = 0,
    abv = 0,
    measuredOriginalGravity = 0,
    measuredFinalGravity = 0,
    measuredBrixLevel = 0,
    measuredFinalBrixLevel = 0,
    measuredAbv = 0,
    ibus = 0,
    mashEfficienty = 0,
    grains = [] as GrainPlan[],
    hops = [] as HopPlan[],
    yeastPlan = {
      yeast: new Yeast(),
      quantity: 0,
    } as YeastPlan,
    ingredients = [] as IngredientPlan[],
    events = [] as BrewEvent[]
  ) {
    this.id = id;
    this.batchNumber = batchNumber;
    this.name = name;
    this.batchSize = batchSize;
    this.originalGravity = originalGravity;
    this.finalGravity = finalGravity;
    this.brixLevel = brixLevel;
    this.finalBrixLevel = finalBrixLevel;
    this.abv = abv;
    this.measuredOriginalGravity = measuredOriginalGravity;
    this.measuredFinalGravity = measuredFinalGravity;
    this.measuredBrixLevel = measuredBrixLevel;
    this.measuredFinalBrixLevel = measuredFinalBrixLevel;
    this.measuredAbv = measuredAbv;
    this.ibus = ibus;
    this.mashEfficienty = mashEfficienty;
    this.grains = grains;
    this.hops = hops;
    this.yeastPlan = yeastPlan;
    this.ingredients = ingredients;
    this.events = events;
  }
}

export interface BrewPlanMember {
  id: string;
  batchNumber: number;
  name: string;
  batchSize: number;
  originalGravity: number;
  finalGravity: number;
  brixLevel: number;
  finalBrixLevel: number;
  abv: number;
  ibus: number;
  mashEfficienty: number;
  grains: GrainPlan[];
  hops: HopPlan[];
  yeastPlan: YeastPlan;
  ingredients: IngredientPlan[];
  events: BrewEvent[];
}

export interface GrainPlan {
  grain: Grain;
  quantity: number;
  ratio: number;
}

export interface HopPlan {
  hop: Hop;
  quantity: number;
  alphaAcid: number;
  boilTime: number;
  ibus: number;
}

export interface YeastPlan {
  yeast: Yeast;
  quantity: number;
}

export interface IngredientPlan {
  ingredient: Ingredient;
  quantity: number;
}

export type GrainPlanPlainObject = {
  grain: GrainPlainObject;
  quantity: number;
  ratio: number;
};

export type HopPlanPlainObject = {
  hop: HopPlainObject;
  quantity: number;
  alphaAcid: number;
  boilTime: number;
  ibus: number;
};

export type YeastPlanPlainObject = {
  yeast: YeastPlainObject;
  quantity: number;
};

export type IngredientPlanPlainObject = {
  ingredient: IngredientPlainObject;
  quantity: number;
};

export type BrewPlanPlainObject = {
  id: string;
  batchNumber: number;
  name: string;
  batchSize: number;
  originalGravity: number;
  finalGravity: number;
  brixLevel: number;
  finalBrixLevel: number;
  abv: number;
  measuredOriginalGravity: number;
  measuredFinalGravity: number;
  measuredBrixLevel: number;
  measuredFinalBrixLevel: number;
  measuredAbv: number;
  ibus: number;
  mashEfficienty: number;
  grains: GrainPlanPlainObject[];
  hops: HopPlanPlainObject[];
  yeastPlan: YeastPlanPlainObject;
  ingredients: IngredientPlanPlainObject[];
  events: BrewEventPlainObject[];
};
