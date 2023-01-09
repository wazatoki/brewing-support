import { createUUID } from "@/services/utils";

export const typename = "unit";
export const prefix = typename + "-";

export class Unit implements UnitMember {
  id: string;
  name: string;
  conversionFactor: number;
  baseUnit: Unit | null;

  isReferenceUnit(unit: Unit): boolean {
    if (this.baseUnit && this.baseUnit.id === unit.id) {
      return true;
    }
    return false;
  }

  clear(): void {
    this.name = "";
    this.conversionFactor = 1;
    this.baseUnit = null;
  }

  convertToBaseUnit(quantity: number): { quantity: number; baseUnit: Unit } {
    return {
      quantity: quantity * this.conversionFactor,
      baseUnit:
        this.baseUnit ||
        new Unit(this.id, this.name, this.conversionFactor, this.baseUnit),
    };
  }

  toPlainObject(): UnitObject {
    let baseUnit: {
      id: string;
      name: string;
      conversionFactor: number;
      baseUnit: null;
    } | null;

    if (this.baseUnit === null) {
      baseUnit = null;
    } else {
      baseUnit = {
        id: this.baseUnit.id,
        name: this.baseUnit.name,
        conversionFactor: this.baseUnit.conversionFactor,
        baseUnit: null,
      };
    }

    return {
      id: this.id,
      name: this.name,
      conversionFactor: this.conversionFactor,
      baseUnit: baseUnit,
    };
  }

  constructor(
    id = prefix + createUUID(),
    name = "",
    conversionFactor = 1,
    baseUnit: Unit | null = null
  ) {
    this.id = id;
    this.name = name;
    this.conversionFactor = conversionFactor;
    this.baseUnit = baseUnit;
  }
}

export interface UnitMember {
  id: string;
  name: string;
  conversionFactor: number;
  baseUnit: Unit | null;
}

export type UnitObject = {
  id: string;
  name: string;
  conversionFactor: number;
  baseUnit: {
    id: string;
    name: string;
    conversionFactor: number;
    baseUnit: null;
  } | null;
};
