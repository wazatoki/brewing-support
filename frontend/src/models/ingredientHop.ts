import { Unit } from "./unit";

export class Hop {
  id: string;
  name: string;
  alphaAcid: number;
  brewingUnit: Unit;
  recievingUnit: Unit;
  stockingUnit: Unit;

  constructor(
    id = "",
    name = "",
    alphaAcid: 0,
    brewingUnit: Unit,
    recievingUnit: Unit,
    stockingUnit: Unit
  ) {
    this.id = id;
    this.name = name;
    this.alphaAcid = alphaAcid;
    this.brewingUnit = brewingUnit;
    this.recievingUnit = recievingUnit;
    this.stockingUnit = stockingUnit;
  }

  clear() {
    this.id = "";
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

export interface GrainMember {
  id: string;
  name: string;
  alphaAcid: number;
  brewingUnit: Unit;
  recievingUnit: Unit;
  stockingUnit: Unit;
}
