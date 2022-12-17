import * as recievedIngredientHop from "@/models/recievedIngredientHop";
import * as ingredientHop from "@/models/ingredientHop";
import { Unit } from "@/models/unit";
import { createRecievedIngredientHop } from "./helper";

export const recievedIngredientHops: recievedIngredientHop.RecievedIngredientHop[] =
  [];

describe("RecievedIngredientHop.ts", () => {
  it("RecievedIngredientHop shall create with no options.", () => {
    const rIngredientHop = new recievedIngredientHop.RecievedIngredientHop();
    expect(rIngredientHop.id).toContain(recievedIngredientHop.prefix);
    expect(rIngredientHop.quantity).toEqual(0);
    expect(rIngredientHop.hop.id).toContain(ingredientHop.prefix);
    expect(rIngredientHop.hop.name).toEqual("");
    expect(rIngredientHop.hop.alphaAcid).toEqual(0);
    expect(rIngredientHop.hop.brewingUnit).toBeInstanceOf(Unit);
    expect(rIngredientHop.hop.recievingUnit).toBeInstanceOf(Unit);
    expect(rIngredientHop.hop.stockingUnit).toBeInstanceOf(Unit);
  });

  it("RecievedIngredientHop shall create with options.", () => {
    const hops = createRecievedIngredientHop();
    expect(hops[1].id).toContain("test-recieved_ingredient_hop-id-1");
    expect(hops[1].quantity).toEqual(1);
    expect(hops[1].hop.id).toEqual("test-hop-id-1");
    expect(hops[1].hop.name).toEqual("test-hop-name-1");
    expect(hops[1].hop.alphaAcid).toEqual(1);
  });

  it("convertToBaseUnit", () => {
    const hops = createRecievedIngredientHop();
    jest.spyOn(hops[1].hop.brewingUnit, "convertToBaseUnit");
    hops[1].convertToBaseUnit;
    expect(hops[1].hop.brewingUnit.convertToBaseUnit).toHaveBeenCalled();
  });

  it("convertToStockingUnit", () => {
    const hops = createRecievedIngredientHop();
    const result = hops[1].convertToStockingUnit;
    expect(result).toEqual({
      quantity: 1,
      stockingUnit: hops[1].hop.stockingUnit,
    });
  });
});
