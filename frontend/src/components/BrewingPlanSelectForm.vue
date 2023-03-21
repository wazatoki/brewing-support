<script setup>
import { BrewPlan } from "@/models/brewPlan";

defineProps({
  brewPlans: [],
});

const emit = defineEmits(["selectBrewPlan"]);

const rowClick = (selectedBrewPlan) => {
  const brewPlan = new BrewPlan(
    selectedBrewPlan.id,
    selectedBrewPlan.batchNumber,
    selectedBrewPlan.name,
    selectedBrewPlan.batchSize,
    selectedBrewPlan.originalGravity,
    selectedBrewPlan.finalGravity,
    selectedBrewPlan.brixLevel,
    selectedBrewPlan.finalBrixLevel,
    selectedBrewPlan.abv,
    selectedBrewPlan.measuredOriginalGravity,
    selectedBrewPlan.measuredFinalGravity,
    selectedBrewPlan.measuredBrixLevel,
    selectedBrewPlan.measuredFinalBrixLevel,
    selectedBrewPlan.measuredAbv,
    selectedBrewPlan.ibus,
    selectedBrewPlan.mashEfficienty,
    selectedBrewPlan.grains,
    selectedBrewPlan.hops,
    selectedBrewPlan.yeastPlan,
    selectedBrewPlan.events
  );
  emit("selectBrewPlan", brewPlan);
};
</script>

<template>
  <el-table :data="brewPlans" stripe style="width: 100%" @row-click="rowClick">
    <el-table-column prop="batchNumber" label="batch number" />
    <el-table-column prop="name" label="batch name" />
  </el-table>
</template>
