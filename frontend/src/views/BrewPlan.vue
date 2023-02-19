<script setup>
import { fetchAll, save, remove } from "@/repositories/brewPlanRepo";
import { reactive, ref, onMounted } from "vue";
import BrewingPlanForm from "@/components/BrewingPlanForm.vue";
import { BrewPlan } from "@/models/brewPlan";
import { sortByBatchNumber } from "@/services/brewPlan";
import { ElMessageBox } from "element-plus";
import * as ingredientRepo from "@/repositories/ingredientRepo";
import * as ingredientGrainRepo from "@/repositories/ingredientGrainRepo";
import * as ingredientHopRepo from "@/repositories/ingredientHopRepo";
import * as ingredientYeastRepo from "@/repositories/ingredientYeastRepo";
import * as ingredientService from "@/services/ingredient";
import * as ingredientGrainService from "@/services/ingredientGrain";
import * as ingredientHopService from "@/services/ingredientHop";
import * as ingredientYeastService from "@/services/ingredientYeast";

const itemMsts = reactive([]);
const grainMst = reactive([]);
const hopMst = reactive([]);
const yeastMst = reactive([]);
const tableData = reactive([]);
const selectedData = reactive(new BrewPlan());
const brewingPlanFormDialogVisible = ref(false);

const onClickDelete = async (index) => {
  await ElMessageBox.confirm("データを削除しますか?", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "alert",
  });
  const item = tableData[index];
  try {
    await remove(item);
    ElMessageBox.alert("データの削除に成功しました。", {
      confirmButtonText: "OK",
    });
    fetchData();
  } catch (error) {
    ElMessageBox.alert("データの削除に失敗しました。" + error.message, {
      confirmButtonText: "OK",
    });
  }
};

const onClickEdit = (index) => {
  const item = tableData[index];
  selectedData.id = item.id;
  selectedData.batchNumber = item.batchNumber;
  selectedData.name = item.name;
  selectedData.batchSize = item.batchSize;
  selectedData.originalGravity = item.originalGravity;
  selectedData.finalGravity = item.finalGravity;
  selectedData.brixLevel = item.brixLevel;
  selectedData.finalBrixLevel = item.finalBrixLevel;
  selectedData.abv = item.abv;
  selectedData.ibus = item.ibus;
  selectedData.mashEfficienty = item.mashEfficienty;
  selectedData.grains = item.grains;
  selectedData.hops = item.hops;
  selectedData.yeastPlan = item.yeastPlan;
  selectedData.events = item.events;
  brewingPlanFormDialogVisible.value = true;
};

const onClickCreate = () => {
  selectedData.clear();
  selectedData.id = "";
  brewingPlanFormDialogVisible.value = true;
};

const onSubmitBrewPlan = async (BrewPlanData) => {
  brewingPlanFormDialogVisible.value = false;
  try {
    await save(BrewPlanData);
    ElMessageBox.alert("データの保存に成功しました。", {
      confirmButtonText: "OK",
    });
    fetchData();
  } catch (error) {
    ElMessageBox.alert("データの保存に失敗しました。" + error.message, {
      confirmButtonText: "OK",
    });
  }
};

const onClickBrewingPlanFormFormCancel = () => {
  brewingPlanFormDialogVisible.value = false;
};

onMounted(() => {
  fetchData();
  fetchIngredientMst();
  fetchGrainMst();
  fetchHopMst();
  fetchYeastMst();
});

const fetchData = async () => {
  const data = await fetchAll();
  const sortedData = sortByBatchNumber(data.result);
  tableData.splice(0);
  sortedData.forEach((item) => {
    tableData.push(item);
  });
};

const fetchIngredientMst = async () => {
  const fetchedData = (await ingredientRepo.fetchAll()).result;
  const sortedData =
    ingredientService.sortByClassifientNameAndName(fetchedData);
  itemMsts.splice(0);
  sortedData.forEach((item) => {
    itemMsts.push(item);
  });
};

const fetchGrainMst = async () => {
  const fetchedData = (await ingredientGrainRepo.fetchAll()).result;
  const sortedData = ingredientGrainService.sortByName(fetchedData);
  grainMst.splice(0);
  sortedData.forEach((item) => {
    grainMst.push(item);
  });
};

const fetchHopMst = async () => {
  const fetchedData = (await ingredientHopRepo.fetchAll()).result;
  const sortedData = ingredientHopService.sortByName(fetchedData);
  hopMst.splice(0);
  sortedData.forEach((item) => {
    hopMst.push(item);
  });
};

const fetchYeastMst = async () => {
  const fetchedData = (await ingredientYeastRepo.fetchAll()).result;
  const sortedData = ingredientYeastService.sortByName(fetchedData);
  yeastMst.splice(0);
  sortedData.forEach((item) => {
    yeastMst.push(item);
  });
};
</script>

<template>
  <div class="brew-plan">
    <el-row>
      <el-col :span="6">
        <el-menu>
          <el-menu-item @click="onClickCreate">新規作成</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="18">
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="batchNumber" label="batch numbre" />
          <el-table-column prop="name" label="名称" />
          <el-table-column>
            <template #default="scope">
              <el-button @click="onClickEdit(scope.$index, scope.row)"
                >修正</el-button
              >
              <el-button
                type="danger"
                @click="onClickDelete(scope.$index, scope.row)"
                >削除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-dialog v-model="brewingPlanFormDialogVisible">
      <BrewingPlanForm
        :brewPlan="selectedData"
        :grainMst="grainMst"
        :hopMst="hopMst"
        :yeastMst="yeastMst"
        @submit="onSubmitBrewPlan($event)"
        @cancel="onClickBrewingPlanFormFormCancel"
      >
      </BrewingPlanForm>
    </el-dialog>
  </div>
</template>
