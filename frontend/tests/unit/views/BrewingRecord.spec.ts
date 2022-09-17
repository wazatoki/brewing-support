import { shallowMount } from "@vue/test-utils";
import BrewingRecord from "@/views/BrewingRecord.vue";

describe("BrewingRecord.vue", () => {
  it("BrewingRecord to be created", () => {
    const wrapper = shallowMount(BrewingRecord);
    expect(wrapper).toBeTruthy();
  });
});
