import { createUUID } from "@/services/utils";
import { Unit } from "./unit";

export const typename = "hop";
export const prefix = typename + "-";

export class Hop {
  id: string;
  name: string;
  alphaAcid: number;
  brewingUnit: Unit;
  recievingUnit: Unit;
  stockingUnit: Unit;

  constructor(
    id = prefix + createUUID(),
    name = "",
    alphaAcid = 0,
    brewingUnit = new Unit(),
    recievingUnit = new Unit(),
    stockingUnit = new Unit()
  ) {
    this.id = id;
    this.name = name;
    this.alphaAcid = alphaAcid;
    this.brewingUnit = brewingUnit;
    this.recievingUnit = recievingUnit;
    this.stockingUnit = stockingUnit;
  }

  clear() {
    this.id = prefix + createUUID();
    this.name = "";
    this.alphaAcid = 0;
    this.brewingUnit = new Unit();
    this.recievingUnit = new Unit();
    this.stockingUnit = new Unit();
  }

  isReferenceUnit(unit: Unit) {
    if (
      (this.brewingUnit && this.brewingUnit.id === unit.id) ||
      (this.recievingUnit && this.recievingUnit.id === unit.id) ||
      (this.stockingUnit && this.stockingUnit.id === unit.id)
    ) {
      return true;
    }
    return false;
  }
}

export interface HopMember {
  id: string;
  name: string;
  alphaAcid: number;
  brewingUnit: Unit;
  recievingUnit: Unit;
  stockingUnit: Unit;
}
