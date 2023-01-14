import * as ingredientGrain from "@/models/ingredientGrain";
import * as unit from "@/models/unit";
import { createGrains, createUnits } from "./helper";

export const grains: ingredientGrain.Grain[] = [];

describe("ingredientGrain.ts", () => {
  it("Grain shall create with no options.", () => {
    const g = new ingredientGrain.Grain();
    expect(g.id).toContain(ingredientGrain.prefix);
    expect(g.name).toEqual("");
    expect(g.potential).toEqual(0);
    expect(g.brewingUnit.id).not.toEqual(g.recievingUnit.id);
    expect(g.recievingUnit.id).not.toEqual(g.stockingUnit.id);

    expect(g.brewingUnit.id).toContain(unit.prefix);
    expect(g.brewingUnit.name).toEqual("");
    expect(g.brewingUnit.conversionFactor).toEqual(1);
    expect(g.brewingUnit.baseUnit).toEqual(null);

    expect(g.recievingUnit.id).toContain(unit.prefix);
    expect(g.recievingUnit.name).toEqual("");
    expect(g.recievingUnit.conversionFactor).toEqual(1);
    expect(g.recievingUnit.baseUnit).toEqual(null);

    expect(g.stockingUnit.id).toContain(unit.prefix);
    expect(g.stockingUnit.name).toEqual("");
    expect(g.stockingUnit.conversionFactor).toEqual(1);
    expect(g.stockingUnit.baseUnit).toEqual(null);
  });

  it("Grain shall create with options.", () => {
    const grains = createGrains();
    const g = grains[1];
    expect(g.id).toEqual("test-grain-id-1");
    expect(g.name).toEqual("test-grain-name-1");
    expect(g.potential).toEqual(1);
    expect(g.brewingUnit.id).toEqual("test-unit-id-1");
    expect(g.recievingUnit.id).toEqual("test-unit-id-1");
    expect(g.stockingUnit.id).toEqual("test-unit-id-1");
  });

  it("isReferenceUnit shall be true", () => {
    const grains = createGrains();
    const units = createUnits();
    const g = grains[1];
    const u = units[1];
    expect(g.isReferenceUnit(u)).toEqual(true);
  });

  it("isReferenceUnit shall be false", () => {
    const grains = createGrains();
    const units = createUnits();
    const g = grains[2];
    const u = units[3];
    expect(g.isReferenceUnit(u)).toEqual(false);
  });

  it("reset instance after call clear()", () => {
    const grains = createGrains();
    const g = grains[1];
    g.clear();
    expect(g.id).toEqual("test-grain-id-1");
    expect(g.name).toEqual("");
    expect(g.potential).toEqual(0);
    expect(g.brewingUnit.id).not.toEqual(g.recievingUnit.id);
    expect(g.recievingUnit.id).not.toEqual(g.stockingUnit.id);

    expect(g.brewingUnit.id).toContain(unit.prefix);
    expect(g.brewingUnit.name).toEqual("");
    expect(g.brewingUnit.conversionFactor).toEqual(1);
    expect(g.brewingUnit.baseUnit).toEqual(null);

    expect(g.recievingUnit.id).toContain(unit.prefix);
    expect(g.recievingUnit.name).toEqual("");
    expect(g.recievingUnit.conversionFactor).toEqual(1);
    expect(g.recievingUnit.baseUnit).toEqual(null);

    expect(g.stockingUnit.id).toContain(unit.prefix);
    expect(g.stockingUnit.name).toEqual("");
    expect(g.stockingUnit.conversionFactor).toEqual(1);
    expect(g.stockingUnit.baseUnit).toEqual(null);
  });

  it("toPlainObject", () => {
    const grains = createGrains();
    const units = createUnits();
    const result = grains[2].toPlainObject();
    expect(result).toEqual({
      id: "test-grain-id-2",
      name: "test-grain-name-2",
      potential: 2,
      brewingUnit: units[2].toPlainObject(),
      recievingUnit: units[2].toPlainObject(),
      stockingUnit: units[2].toPlainObject(),
    });
  });
});
