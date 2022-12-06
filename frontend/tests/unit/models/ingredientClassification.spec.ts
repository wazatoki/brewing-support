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
    const g = classifications[1];
    expect(g.id).toEqual("test-ingredient_classification-id-1");
    expect(g.name).toEqual("test-ingredient_classification-name-1");
  });
});
