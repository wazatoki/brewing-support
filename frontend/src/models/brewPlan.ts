import { BrewEvent } from "./brewEvent";
import { Grain } from "./ingredientGrain";
import { Hop } from "./ingredientHop";
import { Yeast } from "./ingredientYeast";

export class BrewPlan {
  id: string;
  batchNumber: number;
  name: string;
  batchSize: number;
  originalGravity: number;
  finalGravity: number;
  brixLevel: number;
  abv: number;
  ibus: number;
  mashEfficienty: number;
  grains: GrainPlan[];
  hops: HopPlan[];
  yeast: Yeast;
  events: BrewEvent[];

  constructor(
    id = "",
    batchNumber = 0,
    name = "",
    batchSize = 0,
    originalGravity = 0,
    finalGravity = 0,
    brixLevel = 0,
    abv = 0,
    ibus = 0,
    mashEfficienty = 0,
    grains = [] as GrainPlan[],
    hops = [] as HopPlan[],
    yeast: Yeast,
    events = [] as BrewEvent[]
  ) {
    this.id = id;
    this.batchNumber = batchNumber;
    this.name = name;
    this.batchSize = batchSize;
    this.originalGravity = originalGravity;
    this.finalGravity = finalGravity;
    this.brixLevel = brixLevel;
    this.abv = abv;
    this.ibus = ibus;
    this.mashEfficienty = mashEfficienty;
    this.grains = grains;
    this.hops = hops;
    this.yeast = yeast;
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
  abv: number;
  ibus: number;
  mashEfficienty: number;
  grains: GrainPlan[];
  hops: HopPlan[];
  yeast: Yeast;
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
  boilTime: number;
  ibus: number;
}
