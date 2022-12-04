import * as consumedIngredientHop from "@/models/consumedIngredientHop";
import * as ingredientHop from "@/models/ingredientHop";
import { Unit } from "@/models/unit";
import { createConsumedIngredientHop } from "./helper";

describe("ConsumedIngredientHop.ts", () => {
  it("ConsumedIngredientHop shall create with no options.", () => {
    const h = new consumedIngredientHop.ConsumedIngredientHop();
    expect(h.id).toContain(consumedIngredientHop.prefix);
    expect(h.quantity).toEqual(0);
    expect(h.hop.id).toContain(ingredientHop.prefix);
    expect(h.hop.name).toEqual("");
    expect(h.hop.alphaAcid).toEqual(0);
    expect(h.hop.brewingUnit).toBeInstanceOf(Unit);
    expect(h.hop.recievingUnit).toBeInstanceOf(Unit);
    expect(h.hop.stockingUnit).toBeInstanceOf(Unit);
  });

  it("ConsumedIngredientHop shall create with options.", () => {
    const hops = createConsumedIngredientHop();
    expect(hops[1].id).toContain("test-consumed_ingredient-hop-id-1");
    expect(hops[1].quantity).toEqual(1);
    expect(hops[1].hop.id).toEqual("test-hop-id-1");
    expect(hops[1].hop.name).toEqual("test-hop-name-1");
    expect(hops[1].hop.alphaAcid).toEqual(1);
  });

  it("convertToBaseUnit", () => {
    const hops = createConsumedIngredientHop();
    jest.spyOn(hops[1].hop.brewingUnit, "convertToBaseUnit");
    hops[1].convertToBaseUnit;
    expect(hops[1].hop.brewingUnit.convertToBaseUnit).toHaveBeenCalled();
  });

  it("convertToStockingUnit", () => {
    const hops = createConsumedIngredientHop();
    const result = hops[1].convertToStockingUnit;
    expect(result).toEqual({
      quantity: 1,
      stockingUnit: hops[1].hop.stockingUnit,
    });
  });
});
