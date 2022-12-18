import * as ingredient from "@/models/ingredient";
import * as ingredientClassification from "@/models/ingredientClassification";
import * as unit from "@/models/unit";
import { createIngredients, createUnits } from "./helper";

export const ingredients: ingredient.Ingredient[] = [];

describe("ingredient.ts", () => {
  it("Ingredient shall create with no options.", () => {
    const ingr = new ingredient.Ingredient();
    expect(ingr.id).toContain(ingredient.prefix);
    expect(ingr.name).toEqual("");
    expect(ingr.ingredientClassification.id).toContain(
      ingredientClassification.prefix
    );
    expect(ingr.brewingUnit.id).not.toEqual(ingr.recievingUnit.id);
    expect(ingr.recievingUnit.id).not.toEqual(ingr.stockingUnit.id);

    expect(ingr.brewingUnit.id).toContain(unit.prefix);
    expect(ingr.brewingUnit.name).toEqual("");
    expect(ingr.brewingUnit.conversionFactor).toEqual(1);
    expect(ingr.brewingUnit.baseUnit).toEqual(null);

    expect(ingr.recievingUnit.id).toContain(unit.prefix);
    expect(ingr.recievingUnit.name).toEqual("");
    expect(ingr.recievingUnit.conversionFactor).toEqual(1);
    expect(ingr.recievingUnit.baseUnit).toEqual(null);

    expect(ingr.stockingUnit.id).toContain(unit.prefix);
    expect(ingr.stockingUnit.name).toEqual("");
    expect(ingr.stockingUnit.conversionFactor).toEqual(1);
    expect(ingr.stockingUnit.baseUnit).toEqual(null);
  });

  it("Ingredient shall create with options.", () => {
    const ingredients = createIngredients();
    const ingr = ingredients[1];
    expect(ingr.id).toEqual("test-ingredient-id-1");
    expect(ingr.name).toEqual("test-ingredient-name-1");
    expect(ingr.ingredientClassification.id).toEqual(
      "test-ingredient_classification-id-1"
    );
    expect(ingr.brewingUnit.id).toEqual("test-unit-id-1");
    expect(ingr.recievingUnit.id).toEqual("test-unit-id-1");
    expect(ingr.stockingUnit.id).toEqual("test-unit-id-1");
  });

  it("isReferenceUnit shall be true", () => {
    const ingredients = createIngredients();
    const units = createUnits();
    const ingr = ingredients[1];
    const u = units[1];
    expect(ingr.isReferenceUnit(u)).toEqual(true);
  });

  it("isReferenceUnit shall be false", () => {
    const ingredients = createIngredients();
    const units = createUnits();
    const ingr = ingredients[2];
    const u = units[3];
    expect(ingr.isReferenceUnit(u)).toEqual(false);
  });

  it("reset instance after call clear()", () => {
    const ingredients = createIngredients();
    const ingr = ingredients[1];
    ingr.clear();
    expect(ingr.id).toEqual("test-ingredient-id-1");
    expect(ingr.name).toEqual("");
    expect(ingr.ingredientClassification.id).toContain(
      ingredientClassification.prefix
    );
    expect(ingr.brewingUnit.id).not.toEqual(ingr.recievingUnit.id);
    expect(ingr.recievingUnit.id).not.toEqual(ingr.stockingUnit.id);

    expect(ingr.brewingUnit.id).toContain(unit.prefix);
    expect(ingr.brewingUnit.name).toEqual("");
    expect(ingr.brewingUnit.conversionFactor).toEqual(1);
    expect(ingr.brewingUnit.baseUnit).toEqual(null);

    expect(ingr.recievingUnit.id).toContain(unit.prefix);
    expect(ingr.recievingUnit.name).toEqual("");
    expect(ingr.recievingUnit.conversionFactor).toEqual(1);
    expect(ingr.recievingUnit.baseUnit).toEqual(null);

    expect(ingr.stockingUnit.id).toContain(unit.prefix);
    expect(ingr.stockingUnit.name).toEqual("");
    expect(ingr.stockingUnit.conversionFactor).toEqual(1);
    expect(ingr.stockingUnit.baseUnit).toEqual(null);
  });
});
