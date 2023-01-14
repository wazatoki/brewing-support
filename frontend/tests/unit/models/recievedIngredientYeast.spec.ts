import * as recievedIngredientYeast from "@/models/recievedIngredientYeast";
import * as ingredientYeast from "@/models/ingredientYeast";
import { Unit } from "@/models/unit";
import { createRecievedIngredientYeast, createYeasts } from "./helper";

export const recievedIngredientYeasts: recievedIngredientYeast.RecievedIngredientYeast[] =
  [];

describe("RecievedIngredientYeast.ts", () => {
  it("RecievedIngredientYeast shall create with no options.", () => {
    const rIngredientYeast =
      new recievedIngredientYeast.RecievedIngredientYeast();
    expect(rIngredientYeast.id).toContain(recievedIngredientYeast.prefix);
    expect(rIngredientYeast.quantity).toEqual(0);
    expect(rIngredientYeast.yeast.id).toContain(ingredientYeast.prefix);
    expect(rIngredientYeast.yeast.name).toEqual("");
    expect(rIngredientYeast.yeast.attenuation).toEqual(0);
    expect(rIngredientYeast.yeast.brewingUnit).toBeInstanceOf(Unit);
    expect(rIngredientYeast.yeast.recievingUnit).toBeInstanceOf(Unit);
    expect(rIngredientYeast.yeast.stockingUnit).toBeInstanceOf(Unit);
  });

  it("RecievedIngredientYeast shall create with options.", () => {
    const yeasts = createRecievedIngredientYeast();
    expect(yeasts[1].id).toContain("test-recieved_ingredient_yeast-id-1");
    expect(yeasts[1].quantity).toEqual(1);
    expect(yeasts[1].yeast.id).toEqual("test-yeast-id-1");
    expect(yeasts[1].yeast.name).toEqual("test-yeast-name-1");
    expect(yeasts[1].yeast.attenuation).toEqual(1);
  });

  it("convertToBaseUnit", () => {
    const yeasts = createRecievedIngredientYeast();
    jest.spyOn(yeasts[1].yeast.brewingUnit, "convertToBaseUnit");
    yeasts[1].convertToBaseUnit;
    expect(yeasts[1].yeast.brewingUnit.convertToBaseUnit).toHaveBeenCalled();
  });

  it("convertToStockingUnit", () => {
    const yeasts = createRecievedIngredientYeast();
    const result = yeasts[1].convertToStockingUnit;
    expect(result).toEqual({
      quantity: 1,
      stockingUnit: yeasts[1].yeast.stockingUnit,
    });
  });

  it("toPlainObject", () => {
    const recievedIngredientYeasts = createRecievedIngredientYeast();
    const yeasts = createYeasts();
    const result = recievedIngredientYeasts[2].toPlainObject();
    expect(result).toEqual({
      id: "test-recieved_ingredient_yeast-id-2",
      yeast: yeasts[2].toPlainObject(),
      quantity: 2,
    });
  });
});
