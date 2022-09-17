export class Unit implements UnitMember {
  id: string;
  name: string;
  conversionFactor: number;
  baseUnit: Unit | null;

  isReferenceUnit(unit: Unit) {
    if (this.baseUnit && this.baseUnit.id === unit.id) {
      return true;
    }
    return false;
  }

  clear() {
    this.id = "";
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

  constructor(
    id = "",
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
