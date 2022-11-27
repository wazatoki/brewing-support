import { Unit } from "@/models/unit";

export const createUnits = () => {
  const units: Unit[] = [] as Unit[];
  units.push(new Unit("", "", 1, null));
  units.push(new Unit("test-unit-id-1", "test-unit-name-1", 1, null));
  for (let i = 2; i < 10; i++) {
    units.push(
      new Unit("test-unit-id-" + i, "test-unit-name-" + i, i, units[1])
    );
  }
  return units;
};

const units = createUnits();

describe("unit.ts", () => {
  it("Unit shall create with no options.", () => {
    const u = new Unit();
    expect(u.id).toEqual("");
    expect(u.name).toEqual("");
    expect(u.conversionFactor).toEqual(1);
    expect(u.baseUnit).toEqual(null);
  });

  it("Unit shall create with options.", () => {
    const u = units[1];
    expect(u.id).toEqual("test-unit-id-1");
    expect(u.name).toEqual("test-unit-name-1");
    expect(u.conversionFactor).toEqual(1);
    expect(u.baseUnit).toEqual(null);
  });

  it("isReferenceUnit shall be true", () => {
    const u = units[1];
    const u1 = units[2];
    expect(u1.isReferenceUnit(u)).toEqual(true);
  });

  it("isReferenceUnit shall be false", () => {
    const u = units[2];
    const u1 = units[3];
    expect(u1.isReferenceUnit(u)).toEqual(false);
  });

  it("reset instance after call clear()", () => {
    const units = createUnits();
    units[1].clear();
    expect(units[1].id).toEqual("");
    expect(units[1].name).toEqual("");
    expect(units[1].conversionFactor).toEqual(1);
    expect(units[1].baseUnit).toEqual(null);
  });

  it("convertToBaseUnit", () => {
    const result = units[2].convertToBaseUnit(10);
    expect(result.quantity).toEqual(20);
    expect(result.baseUnit.id).toEqual("test-unit-id-1");
  });
});
