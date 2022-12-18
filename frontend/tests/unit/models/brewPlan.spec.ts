import { BrewPlan, GrainPlan, HopPlan } from "@/models/brewPlan";
import { createBrewPlans } from "./helper";

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
});
