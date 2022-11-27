import * as reportIngredient from "@/services/reportIngredient";
import { ReportIngredient } from "@/models/reportIngredient";
import * as processingType from "@/models/processingType";
import { IngredientClassification } from "@/models/ingredientClassification";
import { Ingredient } from "@/models/ingredient";
import { Unit } from "@/models/unit";
import { Supplier } from "@/models/supplier";
import { BrewPlan, GrainPlan, HopPlan, YeastPlan } from "@/models/brewPlan";
import { BrewEvent } from "@/models/brewEvent";
import { Yeast } from "@/models/ingredientYeast";

const unit_g = new Unit("unit-1", "g", 1, null);
const unit_kg = new Unit("unit-2", "Kg", 1000, unit_g);
const ingredientClassifications: IngredientClassification[] = [
  new IngredientClassification("ingredient-classification-1", "molt"),
  new IngredientClassification("ingredient-classification-2", "hop"),
];
const ingredients: Ingredient[] = [
  new Ingredient(
    "ingredient-1",
    "molt-1",
    ingredientClassifications[0],
    unit_g,
    unit_kg,
    unit_g
  ),
  new Ingredient(
    "ingredient-2",
    "molt-2",
    ingredientClassifications[0],
    unit_g,
    unit_kg,
    unit_g
  ),
  new Ingredient(
    "ingredient-3",
    "hop-1",
    ingredientClassifications[1],
    unit_g,
    unit_g,
    unit_g
  ),
];
const suppliers: Supplier[] = [
  new Supplier("supplier-1", "supplier-a"),
  new Supplier("supplier-2", "supplier-b"),
];
const grains = [] as GrainPlan[];
const hops = [] as HopPlan[];
const events = [] as BrewEvent[];
const brewPlans: BrewPlan[] = [
  new BrewPlan(
    "brew-plan-1",
    1,
    "brew-plan-name-1",
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    grains,
    hops,
    {
      yeast: new Yeast("yeast-1", "yeast-name-1", 70, unit_g, unit_g, unit_g),
      quantity: 50,
    } as YeastPlan,
    events
  ),
  new BrewPlan(
    "brew-plan-2",
    2,
    "brew-plan-name-2",
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    [],
    [],
    {
      yeast: new Yeast("yeast-1", "yeast-name-1", 70, unit_g, unit_g, unit_g),
      quantity: 50,
    } as YeastPlan,
    []
  ),
];

const reportingIngredients: ReportIngredient[] = [
  new ReportIngredient(
    "id-001",
    new Date(2022, 6 - 1, 10, 10, 0),
    processingType.recieving,
    ingredients[0],
    suppliers[0],
    null,
    10
  ),
  new ReportIngredient(
    "id-002",
    new Date(2022, 6 - 1, 11, 10, 0),
    processingType.recieving,
    ingredients[1],
    suppliers[1],
    null,
    20
  ),
  new ReportIngredient(
    "id-003",
    new Date(2022, 6 - 1, 22, 10, 0),
    processingType.recieving,
    ingredients[2],
    suppliers[0],
    null,
    30
  ),
  new ReportIngredient(
    "id-004",
    new Date(2022, 6 - 1, 13, 10, 0),
    processingType.recieving,
    ingredients[0],
    suppliers[1],
    null,
    40
  ),
  new ReportIngredient(
    "id-005",
    new Date(2022, 6 - 1, 14, 10, 0),
    processingType.recieving,
    ingredients[1],
    suppliers[0],
    null,
    50
  ),
  new ReportIngredient(
    "id-006",
    new Date(2022, 6 - 1, 15, 10, 0),
    processingType.recieving,
    ingredients[2],
    suppliers[1],
    null,
    60
  ),
  new ReportIngredient(
    "id-007",
    new Date(2022, 6 - 1, 16, 10, 0),
    processingType.brewing,
    ingredients[0],
    null,
    brewPlans[0],
    10
  ),
  new ReportIngredient(
    "id-008",
    new Date(2022, 6 - 1, 17, 10, 0),
    processingType.brewing,
    ingredients[1],
    null,
    brewPlans[0],
    20
  ),
  new ReportIngredient(
    "id-009",
    new Date(2022, 6 - 1, 18, 10, 0),
    processingType.brewing,
    ingredients[2],
    null,
    brewPlans[1],
    30
  ),
  new ReportIngredient(
    "id-010",
    new Date(2022, 6 - 1, 19, 10, 0),
    processingType.brewing,
    ingredients[0],
    null,
    brewPlans[1],
    10
  ),
];
describe("reportIngredient.ts", () => {
  it("comsumedQuantity", () => {
    const result = reportIngredient.comsumedQuantity(
      ingredients[0].id,
      reportingIngredients,
      new Date(2023, 6 - 1, 19, 10, 0)
    );
    expect(result).toBe(20);
  });

  it("recievingQuantity", () => {
    const result = reportIngredient.recievedQuantity(
      ingredients[0].id,
      reportingIngredients,
      new Date(2023, 6 - 1, 19, 10, 0)
    );
    expect(result).toBe(50);
  });
});
