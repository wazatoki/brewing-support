import { BrewEvent } from "./brewEvent";
import { Grain } from "./ingredientGrain";
import { Hop } from "./ingredientHop";
import { Yeast } from "./ingredientYeast";
import { Unit } from "./unit";

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
  mashEfficienty: number;
  grains: GrainPlan[];
  hops: HopPlan[];
  yeastPlan: YeastPlan;
  events: BrewEvent[];

  clear() {
    this.id = "";
    this.batchNumber = 0;
    this.name = "";
    this.batchSize = 0;
    this.originalGravity = 1;
    this.finalGravity = 1;
    this.brixLevel = 0;
    this.finalBrixLevel = 0;
    this.abv = 0;
    this.ibus = 0;
    this.mashEfficienty = 0;
    this.grains = [] as GrainPlan[];
    this.hops = [] as HopPlan[];
    this.yeastPlan = {
      yeast: new Yeast(
        undefined,
        undefined,
        undefined,
        new Unit(),
        new Unit(),
        new Unit()
      ),
      quantity: 0,
    } as YeastPlan;
    this.events = [] as BrewEvent[];
  }

  constructor(
    id = "",
    batchNumber = 0,
    name = "",
    batchSize = 0,
    originalGravity = 1,
    finalGravity = 1,
    brixLevel = 0,
    finalBrixLevel = 0,
    abv = 0,
    ibus = 0,
    mashEfficienty = 0,
    grains = [] as GrainPlan[],
    hops = [] as HopPlan[],
    yeastPlan = {
      yeast: new Yeast(
        undefined,
        undefined,
        undefined,
        new Unit(),
        new Unit(),
        new Unit()
      ),
      quantity: 0,
    } as YeastPlan,
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
    this.ibus = ibus;
    this.mashEfficienty = mashEfficienty;
    this.grains = grains;
    this.hops = hops;
    this.yeastPlan = yeastPlan;
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
