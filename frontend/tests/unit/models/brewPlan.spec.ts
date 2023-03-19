import { BrewEvent, BrewEventPlainObject } from "@/models/brewEvent";
import {
  BrewPlan,
  GrainPlan,
  GrainPlanPlainObject,
  HopPlan,
  HopPlanPlainObject,
  YeastPlanPlainObject,
  IngredientPlanPlainObject,
  IngredientPlan,
} from "@/models/brewPlan";
import {
  createBrewEvents,
  createBrewPlans,
  createGrainPlans,
  createHopPlans,
  createYeastPlans,
  createIngredientPlans,
} from "./helper";

describe("brewPlan.ts", () => {
  it("BrewPlan shall create with no options.", () => {
    const bp = new BrewPlan();
    expect(bp.id).toContain("brew_plan-");
    expect(bp.batchNumber).toEqual(0);
    expect(bp.name).toEqual("");
    expect(bp.batchSize).toEqual(0);
    expect(bp.originalGravity).toEqual(1);
    expect(bp.finalGravity).toEqual(1);
    expect(bp.brixLevel).toEqual(0);
    expect(bp.finalBrixLevel).toEqual(0);
    expect(bp.abv).toEqual(0);
    expect(bp.ibus).toEqual(0);
    expect(bp.mashEfficienty).toEqual(0);
    expect(bp.grains).toEqual([] as GrainPlan[]);
    expect(bp.hops).toEqual([] as HopPlan[]);
    expect(bp.yeastPlan.yeast.id).toContain("yeast-");
    expect(bp.yeastPlan.quantity).toEqual(0);
  });

  it("BrewPlan shall create with options.", () => {
    const plans = createBrewPlans();
    const bp = plans[1];
    expect(bp.id).toEqual("brew_plan-test-id-1");
    expect(bp.batchNumber).toEqual(1);
    expect(bp.name).toEqual("brew_plan-test-name-1");
    expect(bp.batchSize).toEqual(1);
    expect(bp.originalGravity).toEqual(1);
    expect(bp.finalGravity).toEqual(1);
    expect(bp.brixLevel).toEqual(1);
    expect(bp.finalBrixLevel).toEqual(1);
    expect(bp.abv).toEqual(1);
    expect(bp.ibus).toEqual(1);
    expect(bp.mashEfficienty).toEqual(1);
    expect(bp.grains.length).toEqual(9);
    expect(bp.hops.length).toEqual(9);
    expect(bp.yeastPlan.yeast.id).toContain("yeast-");
    expect(bp.yeastPlan.quantity).toEqual(1);
  });

  it("reset instance after call clear()", () => {
    const plans = createBrewPlans();
    const bp = plans[1];
    bp.clear();
    expect(bp.id).toContain("brew_plan-test-id-1");
    expect(bp.batchNumber).toEqual(0);
    expect(bp.name).toEqual("");
    expect(bp.batchSize).toEqual(0);
    expect(bp.originalGravity).toEqual(1);
    expect(bp.finalGravity).toEqual(1);
    expect(bp.brixLevel).toEqual(0);
    expect(bp.finalBrixLevel).toEqual(0);
    expect(bp.abv).toEqual(0);
    expect(bp.ibus).toEqual(0);
    expect(bp.mashEfficienty).toEqual(0);
    expect(bp.grains).toEqual([] as GrainPlan[]);
    expect(bp.hops).toEqual([] as HopPlan[]);
    expect(bp.yeastPlan.yeast.id).toContain("yeast-");
    expect(bp.yeastPlan.quantity).toEqual(0);
  });

  it("toPlainObject", () => {
    const plans = createBrewPlans();
    const grainPlanPlainObjects = createGrainPlans().map(
      (gp: GrainPlan): GrainPlanPlainObject => {
        return {
          grain: gp.grain.toPlainObject(),
          quantity: gp.quantity,
          ratio: gp.ratio,
        };
      }
    );
    const hopPlanPlainObjects = createHopPlans().map(
      (hp: HopPlan): HopPlanPlainObject => {
        return {
          hop: hp.hop.toPlainObject(),
          quantity: hp.quantity,
          alphaAcid: hp.alphaAcid,
          boilTime: hp.boilTime,
          ibus: hp.ibus,
        };
      }
    );
    const yeastPlan = createYeastPlans()[1];
    const yeastPlanObject: YeastPlanPlainObject = {
      yeast: yeastPlan.yeast.toPlainObject(),
      quantity: yeastPlan.quantity,
    };
    const IngredientPlanPlainObjects = createIngredientPlans().map(
      (ip: IngredientPlan): IngredientPlanPlainObject => {
        return {
          ingredient: ip.ingredient.toPlainObject(),
          quantity: ip.quantity,
        };
      }
    );
    const events = createBrewEvents().map(
      (event: BrewEvent): BrewEventPlainObject => event.toPlainObject()
    );
    const result = plans[2].toPlainObject();
    expect(result).toEqual({
      id: "brew_plan-test-id-2",
      batchNumber: 2,
      name: "brew_plan-test-name-2",
      batchSize: 2,
      originalGravity: 2,
      finalGravity: 2,
      brixLevel: 2,
      finalBrixLevel: 2,
      abv: 2,
      measuredOriginalGravity: 2,
      measuredFinalGravity: 2,
      measuredBrixLevel: 2,
      measuredFinalBrixLevel: 2,
      measuredAbv: 2,
      ibus: 2,
      mashEfficienty: 2,
      grains: grainPlanPlainObjects,
      hops: hopPlanPlainObjects,
      yeastPlan: yeastPlanObject,
      ingredients: IngredientPlanPlainObjects,
      events: events,
    });
  });
});
