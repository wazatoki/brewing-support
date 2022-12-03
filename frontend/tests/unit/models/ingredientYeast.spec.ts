import * as ingredientYeast from "@/models/ingredientYeast";
import * as unit from "@/models/unit";
import { createYeasts, createUnits } from "./helper";

export const yeasts: ingredientYeast.Yeast[] = [];

describe("ingredientYeast.ts", () => {
  it("Yeast shall create with no options.", () => {
    const yeast = new ingredientYeast.Yeast();
    expect(yeast.id).toContain(ingredientYeast.prefix);
    expect(yeast.name).toEqual("");
    expect(yeast.attenuation).toEqual(0);
    expect(yeast.brewingUnit.id).not.toEqual(yeast.recievingUnit.id);
    expect(yeast.recievingUnit.id).not.toEqual(yeast.stockingUnit.id);

    expect(yeast.brewingUnit.id).toContain(unit.prefix);
    expect(yeast.brewingUnit.name).toEqual("");
    expect(yeast.brewingUnit.conversionFactor).toEqual(1);
    expect(yeast.brewingUnit.baseUnit).toEqual(null);

    expect(yeast.recievingUnit.id).toContain(unit.prefix);
    expect(yeast.recievingUnit.name).toEqual("");
    expect(yeast.recievingUnit.conversionFactor).toEqual(1);
    expect(yeast.recievingUnit.baseUnit).toEqual(null);

    expect(yeast.stockingUnit.id).toContain(unit.prefix);
    expect(yeast.stockingUnit.name).toEqual("");
    expect(yeast.stockingUnit.conversionFactor).toEqual(1);
    expect(yeast.stockingUnit.baseUnit).toEqual(null);
  });

  it("Yeast shall create with options.", () => {
    const yeasts = createYeasts();
    const yeast = yeasts[1];
    expect(yeast.id).toEqual("test-yeast-id-1");
    expect(yeast.name).toEqual("test-yeast-name-1");
    expect(yeast.attenuation).toEqual(1);
    expect(yeast.brewingUnit.id).toEqual("test-unit-id-1");
    expect(yeast.recievingUnit.id).toEqual("test-unit-id-1");
    expect(yeast.stockingUnit.id).toEqual("test-unit-id-1");
  });

  it("isReferenceUnit shall be true", () => {
    const yeasts = createYeasts();
    const units = createUnits();
    const yeast = yeasts[1];
    const u = units[1];
    expect(yeast.isReferenceUnit(u)).toEqual(true);
  });

  it("isReferenceUnit shall be false", () => {
    const yeasts = createYeasts();
    const units = createUnits();
    const yeast = yeasts[2];
    const u = units[3];
    expect(yeast.isReferenceUnit(u)).toEqual(false);
  });

  it("reset instance after call clear()", () => {
    const yeasts = createYeasts();
    yeasts[1].clear();
    expect(yeasts[1].id).toContain(ingredientYeast.prefix);
    expect(yeasts[1].name).toEqual("");
    expect(yeasts[1].attenuation).toEqual(0);
    expect(yeasts[1].brewingUnit.id).not.toEqual(yeasts[1].recievingUnit.id);
    expect(yeasts[1].recievingUnit.id).not.toEqual(yeasts[1].stockingUnit.id);

    expect(yeasts[1].brewingUnit.id).toContain(unit.prefix);
    expect(yeasts[1].brewingUnit.name).toEqual("");
    expect(yeasts[1].brewingUnit.conversionFactor).toEqual(1);
    expect(yeasts[1].brewingUnit.baseUnit).toEqual(null);

    expect(yeasts[1].recievingUnit.id).toContain(unit.prefix);
    expect(yeasts[1].recievingUnit.name).toEqual("");
    expect(yeasts[1].recievingUnit.conversionFactor).toEqual(1);
    expect(yeasts[1].recievingUnit.baseUnit).toEqual(null);

    expect(yeasts[1].stockingUnit.id).toContain(unit.prefix);
    expect(yeasts[1].stockingUnit.name).toEqual("");
    expect(yeasts[1].stockingUnit.conversionFactor).toEqual(1);
    expect(yeasts[1].stockingUnit.baseUnit).toEqual(null);
  });
});
