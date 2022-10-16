import { BrewEvent } from "./brewEvent";

export class BrewPlan {
  id: string;
  batchNumber: number;
  name: string;
  //batchSize: number;
  //originalGravity: number;
  events: BrewEvent[];

  constructor(
    id = "",
    batchNumber = 0,
    name = "",
    //batchSize = 0,
    //originalGravity = 0,
    events = [] as BrewEvent[]
  ) {
    this.id = id;
    this.batchNumber = batchNumber;
    this.name = name;
    //this.batchSize = batchSize;
    //this.originalGravity = originalGravity;
    this.events = events;
  }
}

export interface BrewPlanMember {
  id: string;
  batchNumber: number;
  name: string;
  events: BrewEvent[];
}
