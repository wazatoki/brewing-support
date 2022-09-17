import { IngredientClassification } from "@/models/ingredientClassification";

export function sortByName(
  ingredientClassifications: IngredientClassification[]
): IngredientClassification[] {
  ingredientClassifications.sort((item_a, item_b) => {
    if (item_a.name > item_b.name) {
      return 1;
    }
    return -1;
  });
  return ingredientClassifications;
}
