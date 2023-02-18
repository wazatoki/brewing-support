import { Grain } from "@/models/ingredientGrain";
import { Unit } from "@/models/unit";

export function unitReferencingList(
  targetGrains: Grain[],
  unit: Unit
): Grain[] {
  const grains: Grain[] = [];

  targetGrains.forEach((item: Grain) => {
    if (item.isReferenceUnit(unit)) {
      grains.push(item);
    }
  });

  return grains;
}

export function sortByName(grains: Grain[]): Grain[] {
  grains.sort((item_a, item_b) => {
    // 名称で並べ替え
    if (item_a.name > item_b.name) {
      return 1;
    } else {
      return -1;
    }
  });
  return grains;
}
