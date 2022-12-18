import * as ingredientClassification from "@/models/ingredientClassification";
import { createIngredientClassification } from "./helper";

describe("ingredientClassification.ts", () => {
  it("IngredientClassification shall create with no options.", () => {
    const ic = new ingredientClassification.IngredientClassification();
    expect(ic.id).toContain(ingredientClassification.prefix);
    expect(ic.name).toEqual("");
  });

  it("IngredientClassification shall create with options.", () => {
    const classifications = createIngredientClassification();
    const ic = classifications[1];
    expect(ic.id).toEqual("test-ingredient_classification-id-1");
    expect(ic.name).toEqual("test-ingredient_classification-name-1");
  });

  it("reset instance after call clear()", () => {
    const classifications = createIngredientClassification();
    const ic = classifications[1];
    ic.clear();
    expect(ic.id).toEqual("test-ingredient_classification-id-1");
    expect(ic.name).toEqual("");
  });
});
