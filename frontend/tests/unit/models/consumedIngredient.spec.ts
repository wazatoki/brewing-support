import * as consumedIngredient from "@/models/consumedIngredient";
import * as ingredient from "@/models/ingredient";
import * as ingredientClassification from "@/models/ingredientClassification";
import { Unit } from "@/models/unit";
import { createConsumedIngredient, createIngredients } from "./helper";

export const consumedIngredients: consumedIngredient.ConsumedIngredient[] = [];

describe("ConsumedIngredient.ts", () => {
  it("ConsumedIngredient shall create with no options.", () => {
    const cIngredient = new consumedIngredient.ConsumedIngredient();
    expect(cIngredient.id).toContain(consumedIngredient.prefix);
    expect(cIngredient.quantity).toEqual(0);
    expect(cIngredient.ingredient.id).toContain(ingredient.prefix);
    expect(cIngredient.ingredient.name).toEqual("");
    expect(cIngredient.ingredient.ingredientClassification.id).toContain(
      ingredientClassification.prefix
    );
    expect(cIngredient.ingredient.brewingUnit).toBeInstanceOf(Unit);
    expect(cIngredient.ingredient.recievingUnit).toBeInstanceOf(Unit);
    expect(cIngredient.ingredient.stockingUnit).toBeInstanceOf(Unit);
  });

  it("ConsumedIngredient shall create with options.", () => {
    const grains = createConsumedIngredient();
    expect(grains[1].id).toContain("test-consumed_ingredient-id-1");
    expect(grains[1].quantity).toEqual(1);
    expect(grains[1].ingredient.id).toEqual("test-ingredient-id-1");
    expect(grains[1].ingredient.name).toEqual("test-ingredient-name-1");
    expect(grains[1].ingredient.ingredientClassification.id).toContain(
      "test-ingredient_classification-id-1"
    );
  });

  it("convertToBaseUnit", () => {
    const grains = createConsumedIngredient();
    jest.spyOn(grains[1].ingredient.brewingUnit, "convertToBaseUnit");
    grains[1].convertToBaseUnit;
    expect(
      grains[1].ingredient.brewingUnit.convertToBaseUnit
    ).toHaveBeenCalled();
  });

  it("convertToStockingUnit", () => {
    const grains = createConsumedIngredient();
    const result = grains[1].convertToStockingUnit;
    expect(result).toEqual({
      quantity: 1,
      stockingUnit: grains[1].ingredient.stockingUnit,
    });
  });

  it("toPlainObject", () => {
    const consumedIngredients = createConsumedIngredient();
    const ingredients = createIngredients();
    const result = consumedIngredients[2].toPlainObject();
    expect(result).toEqual({
      id: "test-consumed_ingredient-id-2",
      ingredient: ingredients[2].toPlainObject(),
      quantity: 2,
    });
  });
});
