import { Unit, prefix } from "@/models/unit";
import { createUnits } from "./helper";

describe("unit.ts", () => {
  it("Unit shall create with no options.", () => {
    const u = new Unit();
    expect(u.id).toContain(prefix);
    expect(u.name).toEqual("");
    expect(u.conversionFactor).toEqual(1);
    expect(u.baseUnit).toEqual(null);
  });

  it("Unit shall create with options.", () => {
    const units = createUnits();
    const u = units[1];
    expect(u.id).toEqual("test-unit-id-1");
    expect(u.name).toEqual("test-unit-name-1");
    expect(u.conversionFactor).toEqual(1);
    expect(u.baseUnit).toEqual(null);
  });

  it("isReferenceUnit shall be true", () => {
    const units = createUnits();
    const u = units[1];
    const u1 = units[2];
    expect(u1.isReferenceUnit(u)).toEqual(true);
  });

  it("isReferenceUnit shall be false", () => {
    const units = createUnits();
    const u = units[2];
    const u1 = units[3];
    expect(u1.isReferenceUnit(u)).toEqual(false);
  });

  it("reset instance after call clear()", () => {
    const units = createUnits();
    const u = units[1];
    u.clear();
    expect(u.id).toEqual("test-unit-id-1");
    expect(u.name).toEqual("");
    expect(u.conversionFactor).toEqual(1);
    expect(u.baseUnit).toEqual(null);
  });

  it("convertToBaseUnit", () => {
    const units = createUnits();
    const result = units[2].convertToBaseUnit(10);
    expect(result.quantity).toEqual(20);
    expect(result.baseUnit.id).toEqual("test-unit-id-1");
  });

  it("toPlainObject", () => {
    const units = createUnits();
    const result = units[2].toPlainObject();
    expect(result).toEqual({
      id: "test-unit-id-2",
      name: "test-unit-name-2",
      conversionFactor: 2,
      baseUnit: {
        id: "test-unit-id-1",
        name: "test-unit-name-1",
        conversionFactor: 1,
        baseUnit: null,
      },
    });
  });
});
