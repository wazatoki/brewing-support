import { Hop } from "@/models/ingredientHop";
import { Unit } from "@/models/unit";

export function unitReferencingList(targetHops: Hop[], unit: Unit): Hop[] {
  const hops: Hop[] = [];

  targetHops.forEach((item: Hop) => {
    if (item.isReferenceUnit(unit)) {
      hops.push(item);
    }
  });

  return hops;
}

export function sortByName(hops: Hop[]): Hop[] {
  hops.sort((item_a, item_b) => {
    // 名称で並べ替え
    if (item_a.name < item_b.name) {
      return 1;
    } else {
      return -1;
    }
  });
  return hops;
}
