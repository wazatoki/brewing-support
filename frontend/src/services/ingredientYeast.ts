import { Yeast } from "@/models/ingredientYeast";
import { Unit } from "@/models/unit";

export function unitReferencingList(
  targetYeasts: Yeast[],
  unit: Unit
): Yeast[] {
  const yeasts: Yeast[] = [];

  targetYeasts.forEach((item: Yeast) => {
    if (item.isReferenceUnit(unit)) {
      yeasts.push(item);
    }
  });

  return yeasts;
}

export function sortByName(yeasts: Yeast[]): Yeast[] {
  yeasts.sort((item_a, item_b) => {
    // 名称で並べ替え
    if (item_a.name > item_b.name) {
      return 1;
    } else {
      return -1;
    }
  });
  return yeasts;
}
