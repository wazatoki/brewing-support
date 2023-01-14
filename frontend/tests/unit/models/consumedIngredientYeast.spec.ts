import * as consumedIngredientYeast from "@/models/consumedIngredientYeast";
import * as ingredientYeast from "@/models/ingredientYeast";
import { Unit } from "@/models/unit";
import { createConsumedIngredientYeast, createYeasts } from "./helper";

describe("ConsumedIngredientYeast.ts", () => {
  it("ConsumedIngredientYeast shall create with no options.", () => {
    const y = new consumedIngredientYeast.ConsumedIngredientYeast();
    expect(y.id).toContain(consumedIngredientYeast.prefix);
    expect(y.quantity).toEqual(0);
    expect(y.yeast.id).toContain(ingredientYeast.prefix);
    expect(y.yeast.name).toEqual("");
    expect(y.yeast.attenuation).toEqual(0);
    expect(y.yeast.brewingUnit).toBeInstanceOf(Unit);
    expect(y.yeast.recievingUnit).toBeInstanceOf(Unit);
    expect(y.yeast.stockingUnit).toBeInstanceOf(Unit);
  });

  it("ConsumedIngredientYeast shall create with options.", () => {
    const yeasts = createConsumedIngredientYeast();
    expect(yeasts[1].id).toContain("test-consumed_ingredient_yeast-id-1");
    expect(yeasts[1].quantity).toEqual(1);
    expect(yeasts[1].yeast.id).toEqual("test-yeast-id-1");
    expect(yeasts[1].yeast.name).toEqual("test-yeast-name-1");
    expect(yeasts[1].yeast.attenuation).toEqual(1);
  });

  it("convertToBaseUnit", () => {
    const yeasts = createConsumedIngredientYeast();
    jest.spyOn(yeasts[1].yeast.brewingUnit, "convertToBaseUnit");
    yeasts[1].convertToBaseUnit;
    expect(yeasts[1].yeast.brewingUnit.convertToBaseUnit).toHaveBeenCalled();
  });

  it("convertToStockingUnit", () => {
    const yeasts = createConsumedIngredientYeast();
    const result = yeasts[1].convertToStockingUnit;
    expect(result).toEqual({
      quantity: 1,
      stockingUnit: yeasts[1].yeast.stockingUnit,
    });
  });

  it("toPlainObject", () => {
    const consumedIngredientYeasts = createConsumedIngredientYeast();
    const yeasts = createYeasts();
    const result = consumedIngredientYeasts[2].toPlainObject();
    expect(result).toEqual({
      id: "test-consumed_ingredient_yeast-id-2",
      yeast: yeasts[2].toPlainObject(),
      quantity: 2,
    });
  });
});
