import { Unit } from "@/models/unit";

export function unitReferencingList(targetUnits: Unit[], unit: Unit): Unit[] {
  const units: Unit[] = [];

  targetUnits.forEach((item: Unit) => {
    if (item.isReferenceUnit(unit)) {
      units.push(item);
    }
  });

  return units;
}

export function sortByNameAndConversionFactor(units: Unit[]): Unit[] {
  units.sort((item_a, item_b) => {
    // 基礎単位名で並べ替え base_nameがnullの場合nameで比較する
    let item_a_base_name;
    let item_b_base_name;
    if (item_a.baseUnit) {
      item_a_base_name = item_a.baseUnit.name;
    } else {
      item_a_base_name = item_a.name;
    }
    if (item_b.baseUnit) {
      item_b_base_name = item_b.baseUnit.name;
    } else {
      item_b_base_name = item_b.name;
    }

    if (item_a_base_name > item_b_base_name) {
      return 1;
    }
    if (item_a_base_name < item_b_base_name) {
      return -1;
    }

    // 基礎単位名が同じ場合は換算係数で並べ替え
    if (item_a.conversionFactor < item_b.conversionFactor) {
      return 1;
    } else {
      return -1;
    }
  });
  return units;
}
