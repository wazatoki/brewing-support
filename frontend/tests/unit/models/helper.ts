import { Unit } from "@/models/unit";
import { Grain } from "@/models/ingredientGrain";

export const createUnits = () => {
  const units: Unit[] = [] as Unit[];
  units.push(new Unit("unit-test-id", "", 1, null));
  units.push(new Unit("test-unit-id-1", "test-unit-name-1", 1, null));
  for (let i = 2; i < 10; i++) {
    units.push(
      new Unit("test-unit-id-" + i, "test-unit-name-" + i, i, units[1])
    );
  }
  return units;
};

export const createGrains = () => {
  const grains: Grain[] = [] as Grain[];
  const units = createUnits();
  grains.push(
    new Grain("grain-test-id", "", 0, new Unit(), new Unit(), new Unit())
  );
  for (let i = 1; i < 10; i++) {
    grains.push(
      new Grain(
        "test-grain-id-" + i,
        "test-grain-name-" + i,
        i,
        units[i],
        units[i],
        units[i]
      )
    );
  }
  return grains;
};
