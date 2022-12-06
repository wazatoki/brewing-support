import { Unit } from "@/models/unit";
import { Grain } from "@/models/ingredientGrain";
import { Hop } from "@/models/ingredientHop";
import { Yeast } from "@/models/ingredientYeast";
import { ConsumedIngredientGrain } from "@/models/consumedIngredientGrain";
import { ConsumedIngredientHop } from "@/models/consumedIngredientHop";
import { ConsumedIngredientYeast } from "@/models/consumedIngredientYeast";
import { IngredientClassification } from "@/models/ingredientClassification";

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

export const createIngredientClassification = () => {
  const ingredientClassifications = [] as IngredientClassification[];
  ingredientClassifications.push(
    new IngredientClassification("unit-test-id", "")
  );
  for (let i = 1; i < 10; i++) {
    ingredientClassifications.push(
      new IngredientClassification(
        "test-ingredient_classification-id-" + i,
        "test-ingredient_classification-name-" + i
      )
    );
  }
  return ingredientClassifications;
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

export const createHops = () => {
  const hops: Hop[] = [] as Hop[];
  const units = createUnits();
  hops.push(new Hop("hop-test-id", "", 0, new Unit(), new Unit(), new Unit()));
  for (let i = 1; i < 10; i++) {
    hops.push(
      new Hop(
        "test-hop-id-" + i,
        "test-hop-name-" + i,
        i,
        units[i],
        units[i],
        units[i]
      )
    );
  }
  return hops;
};

export const createYeasts = () => {
  const yeasts: Yeast[] = [] as Yeast[];
  const units = createUnits();
  yeasts.push(
    new Yeast("yeast-test-id", "", 0, new Unit(), new Unit(), new Unit())
  );
  for (let i = 1; i < 10; i++) {
    yeasts.push(
      new Yeast(
        "test-yeast-id-" + i,
        "test-yeast-name-" + i,
        i,
        units[i],
        units[i],
        units[i]
      )
    );
  }
  return yeasts;
};

export const createConsumedIngredientGrain = () => {
  const ciGrains: ConsumedIngredientGrain[] = [] as ConsumedIngredientGrain[];
  const grains = createGrains();

  ciGrains.push(
    new ConsumedIngredientGrain("consumed_ingredient-grain-id", new Grain(), 0)
  );
  for (let i = 1; i < 10; i++) {
    ciGrains.push(
      new ConsumedIngredientGrain(
        "test-consumed_ingredient-grain-id-" + i,
        grains[i],
        i
      )
    );
  }
  return ciGrains;
};

export const createConsumedIngredientHop = () => {
  const ciHops: ConsumedIngredientHop[] = [] as ConsumedIngredientHop[];
  const hops = createHops();

  ciHops.push(
    new ConsumedIngredientHop("consumed_ingredient-hop-id", new Hop(), 0)
  );
  for (let i = 1; i < 10; i++) {
    ciHops.push(
      new ConsumedIngredientHop(
        "test-consumed_ingredient-hop-id-" + i,
        hops[i],
        i
      )
    );
  }
  return ciHops;
};

export const createConsumedIngredientYeast = () => {
  const ciYeasts: ConsumedIngredientYeast[] = [] as ConsumedIngredientYeast[];
  const yeasts = createYeasts();

  ciYeasts.push(
    new ConsumedIngredientYeast("consumed_ingredient-yeast-id", new Yeast(), 0)
  );
  for (let i = 1; i < 10; i++) {
    ciYeasts.push(
      new ConsumedIngredientYeast(
        "test-consumed_ingredient-yeast-id-" + i,
        yeasts[i],
        i
      )
    );
  }
  return ciYeasts;
};
