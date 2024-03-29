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
import {
  BrewPlan,
  GrainPlan,
  HopPlan,
  IngredientPlan,
  YeastPlan,
} from "@/models/brewPlan";
import { InventoryIngredientGrain } from "@/models/inventoryIngredientGrain";
import { InventoryIngredientHop } from "@/models/inventoryIngredientHop";
import { InventoryIngredientYeast } from "@/models/inventoryIngredientYeast";
import { InventoryIngredient } from "@/models/inventoryIngredient";
import { Inventory } from "@/models/inventory";
import { RecievedIngredientGrain } from "@/models/recievedIngredientGrain";
import { RecievedIngredientHop } from "@/models/recievedIngredientHop";
import { RecievedIngredientYeast } from "@/models/recievedIngredientYeast";
import { RecievedIngredient } from "@/models/recievedIngredient";
import { RecieveEvent } from "@/models/recieveEvent";
import { Supplier } from "@/models/supplier";
import { ReportIngredient } from "@/models/reportIngredient";
import * as processingTp from "@/models/processingType";

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
  grains.push(new Grain("grain-test-id", "", 0, units[1], units[1], units[1]));
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
  hops.push(new Hop("hop-test-id", "", 0, units[1], units[1], units[1]));
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
  yeasts.push(new Yeast("yeast-test-id", "", 0, units[1], units[1], units[1]));
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
      units[1],
      units[1],
      units[1]
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
    new ConsumedIngredientGrain("consumed_ingredient_grain-id", grains[1], 0)
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
    new ConsumedIngredientHop("consumed_ingredient_hop-id", hops[1], 0)
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
    new ConsumedIngredientYeast("consumed_ingredient_yeast-id", yeasts[1], 0)
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
    new ConsumedIngredient("consumed_ingredient-id", ingredients[1], 0)
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
        "brew_plan-test-id-" + i
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

export const createIngredientPlans = () => {
  const ingredientPlans: IngredientPlan[] = [] as IngredientPlan[];
  const ingredients = createIngredients();
  for (let i = 1; i < 10; i++) {
    ingredientPlans.push({
      ingredient: ingredients[i],
      quantity: i,
    });
  }
  return ingredientPlans;
};

export const createBrewPlans = () => {
  const plans: BrewPlan[] = [] as BrewPlan[];
  const events: BrewEvent[] = createBrewEvents();
  const grainPlans: GrainPlan[] = createGrainPlans();
  const hopPlans: HopPlan[] = createHopPlans();
  const yeastPlans: YeastPlan[] = createYeastPlans();
  const ingredientPlans: IngredientPlan[] = createIngredientPlans();
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
      [] as IngredientPlan[],
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
      1,
      1,
      1,
      1,
      1,
      grainPlans,
      hopPlans,
      yeastPlans[0],
      ingredientPlans,
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
        i,
        i,
        i,
        i,
        i,
        grainPlans,
        hopPlans,
        yeastPlans[i - 1],
        ingredientPlans,
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
      grains[0],
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
      hops[0],
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
      yeasts[0],
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
      ingredients[0],
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

export const createRecievedIngredientGrain = () => {
  const riGrains: RecievedIngredientGrain[] = [] as RecievedIngredientGrain[];
  const grains = createGrains();

  riGrains.push(
    new RecievedIngredientGrain("recieved_ingredient_grain-id", grains[1], 0)
  );
  for (let i = 1; i < 10; i++) {
    riGrains.push(
      new RecievedIngredientGrain(
        "test-recieved_ingredient_grain-id-" + i,
        grains[i],
        i
      )
    );
  }
  return riGrains;
};

export const createRecievedIngredientHop = () => {
  const riHops: RecievedIngredientHop[] = [] as RecievedIngredientHop[];
  const hops = createHops();

  riHops.push(
    new RecievedIngredientHop("recieved_ingredient_hop-id", hops[1], 0)
  );
  for (let i = 1; i < 10; i++) {
    riHops.push(
      new RecievedIngredientHop(
        "test-recieved_ingredient_hop-id-" + i,
        hops[i],
        i
      )
    );
  }
  return riHops;
};

export const createRecievedIngredientYeast = () => {
  const riYeasts: RecievedIngredientYeast[] = [] as RecievedIngredientYeast[];
  const yeasts = createYeasts();

  riYeasts.push(
    new RecievedIngredientYeast("recieved_ingredient_yeast-id", yeasts[1], 0)
  );
  for (let i = 1; i < 10; i++) {
    riYeasts.push(
      new RecievedIngredientYeast(
        "test-recieved_ingredient_yeast-id-" + i,
        yeasts[i],
        i
      )
    );
  }
  return riYeasts;
};

export const createRecievedIngredient = () => {
  const riIngredients: RecievedIngredient[] = [] as RecievedIngredient[];
  const ingredients = createIngredients();

  riIngredients.push(
    new RecievedIngredient("recieved_ingredient-id", ingredients[1], 0)
  );
  for (let i = 1; i < 10; i++) {
    riIngredients.push(
      new RecievedIngredient(
        "test-recieved_ingredient-id-" + i,
        ingredients[i],
        i
      )
    );
  }
  return riIngredients;
};

export const createSuppliers = () => {
  const suppliers: Supplier[] = [] as Supplier[];
  suppliers.push(new Supplier("supplier-id", ""));
  for (let i = 1; i < 10; i++) {
    suppliers.push(new Supplier("supplier-id-" + i, "supplier-name-" + i));
  }
  return suppliers;
};

export const createRecieveEvents = () => {
  const events: RecieveEvent[] = [] as RecieveEvent[];
  const ingredients = createRecievedIngredient();
  const grains = createRecievedIngredientGrain();
  const hops = createRecievedIngredientHop();
  const yeasts = createRecievedIngredientYeast();
  const suppliers = createSuppliers();
  events.push(
    new RecieveEvent(
      "recieve_event-test-id",
      "",
      new Date(0),
      suppliers[1],
      new Date(0)
    )
  );
  for (let i = 1; i < 10; i++) {
    events.push(
      new RecieveEvent(
        "recieve_event-test-id-" + i,
        "recieve_event-test-note-no-" + i,
        new Date("2000-1-" + i + " 9:00:00"),
        suppliers[1],
        new Date("2000-1-" + i + " 10:00:00"),
        ingredients,
        grains,
        hops,
        yeasts,
        "recieve_event-test-footnote-" + i
      )
    );
  }
  return events;
};

export const createReportIngredient = () => {
  const reportIngredients: ReportIngredient[] = [] as ReportIngredient[];
  const ingredients = createIngredients();
  const grains = createGrains();
  const hops = createHops();
  const yeasts = createYeasts();
  const suppliers = createSuppliers();
  const brewPlans = createBrewPlans();
  const units = createUnits();
  reportIngredients.push(new ReportIngredient());
  reportIngredients.push(
    new ReportIngredient(
      "report_ingredient-id-1",
      new Date("2000-1-1 9:00:00"),
      processingTp.inventory,
      ingredients[1],
      null,
      null,
      100,
      units[1].name
    )
  );
  reportIngredients.push(
    new ReportIngredient(
      "report_ingredient-id-2",
      new Date("2000-1-2 9:00:00"),
      processingTp.recieving,
      ingredients[1],
      suppliers[1],
      null,
      10,
      units[1].name
    )
  );
  reportIngredients.push(
    new ReportIngredient(
      "report_ingredient-id-3",
      new Date("2000-1-3 9:00:00"),
      processingTp.brewing,
      ingredients[1],
      null,
      brewPlans[1],
      1,
      units[1].name
    )
  );
  reportIngredients.push(
    new ReportIngredient(
      "report_ingredient-id-11",
      new Date("2000-1-1 9:00:00"),
      processingTp.inventory,
      grains[1],
      null,
      null,
      200,
      units[1].name
    )
  );
  reportIngredients.push(
    new ReportIngredient(
      "report_ingredient-id-12",
      new Date("2000-1-2 9:00:00"),
      processingTp.recieving,
      grains[1],
      suppliers[1],
      null,
      20,
      units[1].name
    )
  );
  reportIngredients.push(
    new ReportIngredient(
      "report_ingredient-id-13",
      new Date("2000-1-3 9:00:00"),
      processingTp.brewing,
      grains[1],
      null,
      brewPlans[1],
      2,
      units[1].name
    )
  );
  reportIngredients.push(
    new ReportIngredient(
      "report_ingredient-id-21",
      new Date("2000-1-1 9:00:00"),
      processingTp.inventory,
      hops[1],
      null,
      null,
      300,
      units[1].name
    )
  );
  reportIngredients.push(
    new ReportIngredient(
      "report_ingredient-id-22",
      new Date("2000-1-2 9:00:00"),
      processingTp.recieving,
      hops[1],
      suppliers[1],
      null,
      30,
      units[1].name
    )
  );
  reportIngredients.push(
    new ReportIngredient(
      "report_ingredient-id-23",
      new Date("2000-1-3 9:00:00"),
      processingTp.brewing,
      hops[1],
      null,
      brewPlans[1],
      3,
      units[1].name
    )
  );
  reportIngredients.push(
    new ReportIngredient(
      "report_ingredient-id-31",
      new Date("2000-1-1 9:00:00"),
      processingTp.inventory,
      yeasts[1],
      null,
      null,
      400,
      units[1].name
    )
  );
  reportIngredients.push(
    new ReportIngredient(
      "report_ingredient-id-32",
      new Date("2000-1-2 9:00:00"),
      processingTp.recieving,
      yeasts[1],
      suppliers[1],
      null,
      40,
      units[1].name
    )
  );
  reportIngredients.push(
    new ReportIngredient(
      "report_ingredient-id-33",
      new Date("2000-1-3 9:00:00"),
      processingTp.brewing,
      yeasts[1],
      null,
      brewPlans[1],
      4,
      units[1].name
    )
  );
  return reportIngredients;
};
