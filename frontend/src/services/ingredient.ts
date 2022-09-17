import { Ingredient } from "@/models/ingredient";
import { IngredientClassification } from "@/models/ingredientClassification";
import { Unit } from "@/models/unit";

export function ingredientClassificationReferencingList(
  targetIngredients: Ingredient[],
  ingredientClassification: IngredientClassification
): Ingredient[] {
  const ingredients: Ingredient[] = [];

  targetIngredients.forEach((item: Ingredient) => {
    if (item.isReferenceIngredientClassification(ingredientClassification)) {
      ingredients.push(item);
    }
  });

  return ingredients;
}

export function unitReferencingList(
  targetIngredients: Ingredient[],
  unit: Unit
): Ingredient[] {
  const ingredients: Ingredient[] = [];

  targetIngredients.forEach((item: Ingredient) => {
    if (item.isReferenceUnit(unit)) {
      ingredients.push(item);
    }
  });

  return ingredients;
}

export function sortByClassifientNameAndName(
  ingredients: Ingredient[]
): Ingredient[] {
  ingredients.sort((item_a, item_b) => {
    // 分類名で並べ替え
    if (
      item_a.ingredientClassification.name >
      item_b.ingredientClassification.name
    ) {
      return 1;
    }
    if (
      item_a.ingredientClassification.name <
      item_b.ingredientClassification.name
    ) {
      return -1;
    }

    // 分類名が同じ場合は名称で並べ替え
    if (item_a.name < item_b.name) {
      return 1;
    } else {
      return -1;
    }
  });
  return ingredients;
}
