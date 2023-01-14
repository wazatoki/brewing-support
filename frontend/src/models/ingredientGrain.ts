import { createUUID } from "@/services/utils";
import { Unit, UnitPlainObject } from "@/models/unit";

export const typename = "grain";
export const prefix = typename + "-";

export class Grain implements GrainMember {
  id: string;
  name: string;
  potential: number;
  brewingUnit: Unit;
  recievingUnit: Unit;
  stockingUnit: Unit;

  constructor(
    id = prefix + createUUID(),
    name = "",
    potential = 0,
    brewingUnit = new Unit(),
    recievingUnit = new Unit(),
    stockingUnit = new Unit()
  ) {
    this.id = id;
    this.name = name;
    this.potential = potential;
    this.brewingUnit = brewingUnit;
    this.recievingUnit = recievingUnit;
    this.stockingUnit = stockingUnit;
  }

  clear() {
    this.name = "";
    this.potential = 0;
    this.brewingUnit = new Unit();
    this.recievingUnit = new Unit();
    this.stockingUnit = new Unit();
  }

  toPlainObject(): GrainPlainObject {
    return {
      id: this.id,
      name: this.name,
      potential: this.potential,
      brewingUnit: this.brewingUnit.toPlainObject(),
      recievingUnit: this.recievingUnit.toPlainObject(),
      stockingUnit: this.stockingUnit.toPlainObject(),
    };
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
  potential: number;
  brewingUnit: Unit;
  recievingUnit: Unit;
  stockingUnit: Unit;
}

export type GrainPlainObject = {
  id: string;
  name: string;
  potential: number;
  brewingUnit: UnitPlainObject;
  recievingUnit: UnitPlainObject;
  stockingUnit: UnitPlainObject;
};
