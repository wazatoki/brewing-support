import { BrewEvent } from "./brewEvent";

export class BrewPlan {
  id: string;
  batchNumber: number;
  name: string;
  events: BrewEvent[];

  constructor(id = "", batchNumber = 0, name = "", events = [] as BrewEvent[]) {
    this.id = id;
    this.batchNumber = batchNumber;
    this.name = name;
    this.events = events;
  }
}

export interface BrewPlanMember {
  id: string;
  batchNumber: number;
  name: string;
  events: BrewEvent[];
}
