import * as ingredientHop from "@/models/ingredientHop";
import * as unit from "@/models/unit";
import { createHops, createUnits } from "./helper";

export const hops: ingredientHop.Hop[] = [];

describe("ingredientHop.ts", () => {
  it("Hop shall create with no options.", () => {
    const hop = new ingredientHop.Hop();
    expect(hop.id).toContain(ingredientHop.prefix);
    expect(hop.name).toEqual("");
    expect(hop.alphaAcid).toEqual(0);
    expect(hop.brewingUnit.id).not.toEqual(hop.recievingUnit.id);
    expect(hop.recievingUnit.id).not.toEqual(hop.stockingUnit.id);

    expect(hop.brewingUnit.id).toContain(unit.prefix);
    expect(hop.brewingUnit.name).toEqual("");
    expect(hop.brewingUnit.conversionFactor).toEqual(1);
    expect(hop.brewingUnit.baseUnit).toEqual(null);

    expect(hop.recievingUnit.id).toContain(unit.prefix);
    expect(hop.recievingUnit.name).toEqual("");
    expect(hop.recievingUnit.conversionFactor).toEqual(1);
    expect(hop.recievingUnit.baseUnit).toEqual(null);

    expect(hop.stockingUnit.id).toContain(unit.prefix);
    expect(hop.stockingUnit.name).toEqual("");
    expect(hop.stockingUnit.conversionFactor).toEqual(1);
    expect(hop.stockingUnit.baseUnit).toEqual(null);
  });

  it("Hop shall create with options.", () => {
    const hops = createHops();
    const hop = hops[1];
    expect(hop.id).toEqual("test-hop-id-1");
    expect(hop.name).toEqual("test-hop-name-1");
    expect(hop.alphaAcid).toEqual(1);
    expect(hop.brewingUnit.id).toEqual("test-unit-id-1");
    expect(hop.recievingUnit.id).toEqual("test-unit-id-1");
    expect(hop.stockingUnit.id).toEqual("test-unit-id-1");
  });

  it("isReferenceUnit shall be true", () => {
    const hops = createHops();
    const units = createUnits();
    const hop = hops[1];
    const u = units[1];
    expect(hop.isReferenceUnit(u)).toEqual(true);
  });

  it("isReferenceUnit shall be false", () => {
    const hops = createHops();
    const units = createUnits();
    const hop = hops[2];
    const u = units[3];
    expect(hop.isReferenceUnit(u)).toEqual(false);
  });

  it("reset instance after call clear()", () => {
    const hops = createHops();
    const hop = hops[1];
    hop.clear();
    expect(hop.id).toEqual("test-hop-id-1");
    expect(hop.name).toEqual("");
    expect(hop.alphaAcid).toEqual(0);
    expect(hop.brewingUnit.id).not.toEqual(hop.recievingUnit.id);
    expect(hop.recievingUnit.id).not.toEqual(hop.stockingUnit.id);

    expect(hop.brewingUnit.id).toContain(unit.prefix);
    expect(hop.brewingUnit.name).toEqual("");
    expect(hop.brewingUnit.conversionFactor).toEqual(1);
    expect(hop.brewingUnit.baseUnit).toEqual(null);

    expect(hop.recievingUnit.id).toContain(unit.prefix);
    expect(hop.recievingUnit.name).toEqual("");
    expect(hop.recievingUnit.conversionFactor).toEqual(1);
    expect(hop.recievingUnit.baseUnit).toEqual(null);

    expect(hop.stockingUnit.id).toContain(unit.prefix);
    expect(hop.stockingUnit.name).toEqual("");
    expect(hop.stockingUnit.conversionFactor).toEqual(1);
    expect(hop.stockingUnit.baseUnit).toEqual(null);
  });
});
