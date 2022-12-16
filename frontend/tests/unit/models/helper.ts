import { Unit } from "@/models/unit";
import { Grain } from "@/models/ingredientGrain";
import { Hop } from "@/models/ingredientHop";
import { Yeast } from "@/models/ingredientYeast";
import { Ingredient } from "@/models/ingredient";
import { ConsumedIngredientGrain } from "@/models/consumedIngredientGrain";
import { ConsumedIngredientHop } from "@/models/consumedIngredientHop";
import { ConsumedIngredientYeast } from "@/models/consumedIngredientYeast";
import { IngredientClassification } from "@/models/ingredientClassification";
import { ConsumedIngredient } from "@/models/consumedIngredient";
import { BrewEvent } from "@/models/brewEvent";
import { BrewPlan, GrainPlan, HopPlan, YeastPlan } from "@/models/brewPlan";
import { InventoryIngredientGrain } from "@/models/inventoryIngredientGrain";
import { InventoryIngredientHop } from "@/models/inventoryIngredientHop";
import { InventoryIngredientYeast } from "@/models/inventoryIngredientYeast";
import { InventoryIngredient } from "@/models/inventoryIngredient";
import { Inventory } from "@/models/inventory";

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

export const createIngredients = () => {
  const ingredients: Ingredient[] = [] as Ingredient[];
  const units = createUnits();
  const ingredientClassifications = createIngredientClassification();

  ingredients.push(
    new Ingredient(
      "ingredient-test-id",
      "",
      ingredientClassifications[0],
      new Unit(),
      new Unit(),
      new Unit()
    )
  );
  for (let i = 1; i < 10; i++) {
    ingredients.push(
      new Ingredient(
        "test-ingredient-id-" + i,
        "test-ingredient-name-" + i,
        ingredientClassifications[i],
        units[i],
        units[i],
        units[i]
      )
    );
  }
  return ingredients;
};

export const createConsumedIngredientGrain = () => {
  const ciGrains: ConsumedIngredientGrain[] = [] as ConsumedIngredientGrain[];
  const grains = createGrains();

  ciGrains.push(
    new ConsumedIngredientGrain("consumed_ingredient_grain-id", new Grain(), 0)
  );
  for (let i = 1; i < 10; i++) {
    ciGrains.push(
      new ConsumedIngredientGrain(
        "test-consumed_ingredient_grain-id-" + i,
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
    new ConsumedIngredientHop("consumed_ingredient_hop-id", new Hop(), 0)
  );
  for (let i = 1; i < 10; i++) {
    ciHops.push(
      new ConsumedIngredientHop(
        "test-consumed_ingredient_hop-id-" + i,
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
    new ConsumedIngredientYeast("consumed_ingredient_yeast-id", new Yeast(), 0)
  );
  for (let i = 1; i < 10; i++) {
    ciYeasts.push(
      new ConsumedIngredientYeast(
        "test-consumed_ingredient_yeast-id-" + i,
        yeasts[i],
        i
      )
    );
  }
  return ciYeasts;
};

export const createConsumedIngredient = () => {
  const ciIngredients: ConsumedIngredient[] = [] as ConsumedIngredient[];
  const ingredients = createIngredients();

  ciIngredients.push(
    new ConsumedIngredient("consumed_ingredient-id", new Ingredient(), 0)
  );
  for (let i = 1; i < 10; i++) {
    ciIngredients.push(
      new ConsumedIngredient(
        "test-consumed_ingredient-id-" + i,
        ingredients[i],
        i
      )
    );
  }
  return ciIngredients;
};

export const createBrewEvents = () => {
  const events: BrewEvent[] = [] as BrewEvent[];
  const ingredients = createConsumedIngredient();
  const grains = createConsumedIngredientGrain();
  const hops = createConsumedIngredientHop();
  const yeasts = createConsumedIngredientYeast();
  events.push(
    new BrewEvent("brew_event-test-id", "", "", new Date(0), new Date(0))
  );
  events.push(
    new BrewEvent(
      "brew_event-test-id-1",
      "brew_event-test-name-1",
      "brew_event-test-desc-1",
      new Date("2000-1-1 9:00:00"),
      new Date("2000-1-1 23:00:00"),
      ingredients,
      grains,
      hops,
      yeasts,
      "brew_plan-test-1"
    )
  );
  for (let i = 2; i < 10; i++) {
    events.push(
      new BrewEvent(
        "brew_event-test-id-" + i,
        "brew_event-test-name-" + i,
        "brew_event-test-desc-" + i,
        new Date("2000-1-" + i + " 9:00:00"),
        new Date("2000-1-" + i + " 23:00:00"),
        ingredients,
        grains,
        hops,
        yeasts,
        "brew_plan-test-" + i
      )
    );
  }
  return events;
};

export const createGrainPlans = () => {
  const grainPlans: GrainPlan[] = [] as GrainPlan[];
  const grains = createGrains();
  for (let i = 1; i < 10; i++) {
    grainPlans.push({
      grain: grains[i],
      quantity: i,
      ratio: i,
    });
  }
  return grainPlans;
};

export const createHopPlans = () => {
  const hopPlans: HopPlan[] = [] as HopPlan[];
  const hops = createHops();
  for (let i = 1; i < 10; i++) {
    hopPlans.push({
      hop: hops[i],
      quantity: i,
      alphaAcid: i,
      boilTime: i,
      ibus: i,
    });
  }
  return hopPlans;
};

export const createYeastPlans = () => {
  const yeastPlans: YeastPlan[] = [] as YeastPlan[];
  const yeasts = createYeasts();
  for (let i = 1; i < 10; i++) {
    yeastPlans.push({
      yeast: yeasts[i],
      quantity: i,
    });
  }
  return yeastPlans;
};

export const createBrewPlans = () => {
  const plans: BrewPlan[] = [] as BrewPlan[];
  const events: BrewEvent[] = createBrewEvents();
  const grainPlans: GrainPlan[] = createGrainPlans();
  const hopPlans: HopPlan[] = createHopPlans();
  const yeastPlans: YeastPlan[] = createYeastPlans();
  plans.push(
    new BrewPlan(
      "brew_Plan-test-id",
      0,
      "",
      0,
      1,
      1,
      0,
      0,
      0,
      0,
      0,
      [] as GrainPlan[],
      [] as HopPlan[],
      {
        yeast: new Yeast(),
        quantity: 0,
      } as YeastPlan,
      [] as BrewEvent[]
    )
  );
  plans.push(
    new BrewPlan(
      "brew_plan-test-id-1",
      1,
      "brew_plan-test-name-1",
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      grainPlans,
      hopPlans,
      yeastPlans[0],
      events
    )
  );
  for (let i = 2; i < 10; i++) {
    plans.push(
      new BrewPlan(
        "brew_plan-test-id-" + i,
        i,
        "brew_plan-test-name-" + i,
        i,
        i,
        i,
        i,
        i,
        i,
        i,
        i,
        grainPlans,
        hopPlans,
        yeastPlans[i - 1],
        events
      )
    );
  }
  return plans;
};

export const createInventoryIngredientGrain = () => {
  const iiGrains: InventoryIngredientGrain[] = [] as InventoryIngredientGrain[];
  const grains = createGrains();

  iiGrains.push(
    new InventoryIngredientGrain(
      "inventory_ingredient_grain-id",
      new Grain(),
      0,
      0,
      0,
      ""
    )
  );
  for (let i = 1; i < 10; i++) {
    iiGrains.push(
      new InventoryIngredientGrain(
        "inventory_ingredient_grain-id-" + i,
        grains[i],
        i,
        i,
        i,
        "inventory_ingredient_grain-note-" + i
      )
    );
  }
  return iiGrains;
};

export const createInventoryIngredientHop = () => {
  const iiHops: InventoryIngredientHop[] = [] as InventoryIngredientHop[];
  const hops = createHops();

  iiHops.push(
    new InventoryIngredientHop(
      "inventory_ingredient_hop-id",
      new Hop(),
      0,
      0,
      0,
      ""
    )
  );
  for (let i = 1; i < 10; i++) {
    iiHops.push(
      new InventoryIngredientHop(
        "inventory_ingredient_hop-id-" + i,
        hops[i],
        i,
        i,
        i,
        "inventory_ingredient_hop-note-" + i
      )
    );
  }
  return iiHops;
};

export const createInventoryIngredientYeast = () => {
  const iiYeasts: InventoryIngredientYeast[] = [] as InventoryIngredientYeast[];
  const yeasts = createYeasts();

  iiYeasts.push(
    new InventoryIngredientYeast(
      "inventory_ingredient_yeast-id",
      new Yeast(),
      0,
      0,
      0,
      ""
    )
  );
  for (let i = 1; i < 10; i++) {
    iiYeasts.push(
      new InventoryIngredientYeast(
        "inventory_ingredient_yeast-id-" + i,
        yeasts[i],
        i,
        i,
        i,
        "inventory_ingredient_yeast-note-" + i
      )
    );
  }
  return iiYeasts;
};

export const createInventoryIngredient = () => {
  const iiIngredients: InventoryIngredient[] = [] as InventoryIngredient[];
  const ingredients = createIngredients();

  iiIngredients.push(
    new InventoryIngredient(
      "inventory_ingredient-id",
      new Ingredient(),
      0,
      0,
      0,
      ""
    )
  );
  for (let i = 1; i < 10; i++) {
    iiIngredients.push(
      new InventoryIngredient(
        "inventory_ingredient-id-" + i,
        ingredients[i],
        i,
        i,
        i,
        "inventory_ingredient-note-" + i
      )
    );
  }
  return iiIngredients;
};

export const createInventories = () => {
  const inventories: Inventory[] = [] as Inventory[];
  const ingredients = createInventoryIngredient();
  const grains = createInventoryIngredientGrain();
  const hops = createInventoryIngredientHop();
  const yeasts = createInventoryIngredientYeast();

  inventories.push(new Inventory("inventory-id", new Date(0)));

  for (let i = 1; i < 10; i++) {
    inventories.push(
      new Inventory(
        "inventory-id-" + i,
        new Date("2000-1-" + i + " 9:00:00"),
        ingredients,
        grains,
        hops,
        yeasts,
        "inventory-note-" + i
      )
    );
  }
  return inventories;
};
