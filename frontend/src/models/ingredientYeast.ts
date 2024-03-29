import { createUUID } from "@/services/utils";
import { Unit, UnitPlainObject } from "./unit";

export const typename = "yeast";
export const prefix = typename + "-";

export class Yeast implements YeastMember {
  id: string;
  name: string;
  attenuation: number;
  brewingUnit: Unit;
  recievingUnit: Unit;
  stockingUnit: Unit;

  constructor(
    id = prefix + createUUID(),
    name = "",
    attenuation = 0,
    brewingUnit = new Unit(),
    recievingUnit = new Unit(),
    stockingUnit = new Unit()
  ) {
    this.id = id;
    this.name = name;
    this.attenuation = attenuation;
    this.brewingUnit = brewingUnit;
    this.recievingUnit = recievingUnit;
    this.stockingUnit = stockingUnit;
  }

  clear() {
    this.name = "";
    this.attenuation = 0;
    this.brewingUnit = new Unit();
    this.recievingUnit = new Unit();
    this.stockingUnit = new Unit();
  }

  toPlainObject(): YeastPlainObject {
    return {
      id: this.id,
      name: this.name,
      attenuation: this.attenuation,
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

export interface YeastMember {
  id: string;
  name: string;
  attenuation: number;
  brewingUnit: Unit;
  recievingUnit: Unit;
  stockingUnit: Unit;
}

export type YeastPlainObject = {
  id: string;
  name: string;
  attenuation: number;
  brewingUnit: UnitPlainObject;
  recievingUnit: UnitPlainObject;
  stockingUnit: UnitPlainObject;
};
