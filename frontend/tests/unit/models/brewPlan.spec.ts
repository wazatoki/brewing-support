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
    expect(plans[1].id).toEqual("brew_plan-test-id-1");
    expect(plans[1].batchNumber).toEqual(1);
    expect(plans[1].name).toEqual("brew_plan-test-name-1");
    expect(plans[1].batchSize).toEqual(1);
    expect(plans[1].originalGravity).toEqual(1);
    expect(plans[1].finalGravity).toEqual(1);
    expect(plans[1].brixLevel).toEqual(1);
    expect(plans[1].finalBrixLevel).toEqual(1);
    expect(plans[1].abv).toEqual(1);
    expect(plans[1].ibus).toEqual(1);
    expect(plans[1].mashEfficienty).toEqual(1);
    expect(plans[1].grains.length).toEqual(9);
    expect(plans[1].hops.length).toEqual(9);
    expect(plans[1].yeastPlan.yeast.id).toContain("yeast-");
    expect(plans[1].yeastPlan.quantity).toEqual(1);
  });
});
