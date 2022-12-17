import * as recievedIngredient from "@/models/recievedIngredient";
import * as ingredient from "@/models/ingredient";
import * as ingredientClassification from "@/models/ingredientClassification";
import { Unit } from "@/models/unit";
import { createRecievedIngredient } from "./helper";

export const recievedIngredients: recievedIngredient.RecievedIngredient[] = [];

describe("RecievedIngredient.ts", () => {
  it("RecievedIngredient shall create with no options.", () => {
    const rIngredient = new recievedIngredient.RecievedIngredient();
    expect(rIngredient.id).toContain(recievedIngredient.prefix);
    expect(rIngredient.quantity).toEqual(0);
    expect(rIngredient.ingredient.id).toContain(ingredient.prefix);
    expect(rIngredient.ingredient.name).toEqual("");
    expect(rIngredient.ingredient.ingredientClassification.id).toContain(
      ingredientClassification.prefix
    );
    expect(rIngredient.ingredient.brewingUnit).toBeInstanceOf(Unit);
    expect(rIngredient.ingredient.recievingUnit).toBeInstanceOf(Unit);
    expect(rIngredient.ingredient.stockingUnit).toBeInstanceOf(Unit);
  });

  it("RecievedIngredient shall create with options.", () => {
    const grains = createRecievedIngredient();
    expect(grains[1].id).toContain("test-recieved_ingredient-id-1");
    expect(grains[1].quantity).toEqual(1);
    expect(grains[1].ingredient.id).toEqual("test-ingredient-id-1");
    expect(grains[1].ingredient.name).toEqual("test-ingredient-name-1");
    expect(grains[1].ingredient.ingredientClassification.id).toContain(
      "test-ingredient_classification-id-1"
    );
  });

  it("convertToBaseUnit", () => {
    const grains = createRecievedIngredient();
    jest.spyOn(grains[1].ingredient.brewingUnit, "convertToBaseUnit");
    grains[1].convertToBaseUnit;
    expect(
      grains[1].ingredient.brewingUnit.convertToBaseUnit
    ).toHaveBeenCalled();
  });

  it("convertToStockingUnit", () => {
    const grains = createRecievedIngredient();
    const result = grains[1].convertToStockingUnit;
    expect(result).toEqual({
      quantity: 1,
      stockingUnit: grains[1].ingredient.stockingUnit,
    });
  });
});
