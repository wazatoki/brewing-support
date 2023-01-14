import * as recievedIngredient from "@/models/recievedIngredient";
import * as ingredient from "@/models/ingredient";
import * as ingredientClassification from "@/models/ingredientClassification";
import { Unit } from "@/models/unit";
import { createRecievedIngredient, createIngredients } from "./helper";

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
    const recievedIngredients = createRecievedIngredient();
    expect(recievedIngredients[1].id).toContain(
      "test-recieved_ingredient-id-1"
    );
    expect(recievedIngredients[1].quantity).toEqual(1);
    expect(recievedIngredients[1].ingredient.id).toEqual(
      "test-ingredient-id-1"
    );
    expect(recievedIngredients[1].ingredient.name).toEqual(
      "test-ingredient-name-1"
    );
    expect(
      recievedIngredients[1].ingredient.ingredientClassification.id
    ).toContain("test-ingredient_classification-id-1");
  });

  it("convertToBaseUnit", () => {
    const recievedIngredients = createRecievedIngredient();
    jest.spyOn(
      recievedIngredients[1].ingredient.brewingUnit,
      "convertToBaseUnit"
    );
    recievedIngredients[1].convertToBaseUnit;
    expect(
      recievedIngredients[1].ingredient.brewingUnit.convertToBaseUnit
    ).toHaveBeenCalled();
  });

  it("convertToStockingUnit", () => {
    const recievedIngredients = createRecievedIngredient();
    const result = recievedIngredients[1].convertToStockingUnit;
    expect(result).toEqual({
      quantity: 1,
      stockingUnit: recievedIngredients[1].ingredient.stockingUnit,
    });
  });

  it("toPlainObject", () => {
    const recievedIngredients = createRecievedIngredient();
    const ingredients = createIngredients();
    const result = recievedIngredients[2].toPlainObject();
    expect(result).toEqual({
      id: "test-recieved_ingredient-id-2",
      ingredient: ingredients[2].toPlainObject(),
      quantity: 2,
    });
  });
});
