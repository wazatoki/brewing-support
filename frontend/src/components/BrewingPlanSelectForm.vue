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
