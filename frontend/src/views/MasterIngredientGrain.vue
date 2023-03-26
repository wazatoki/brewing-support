<script setup>
import { reactive, ref, onMounted } from "vue";
import { fetchAll, save, remove } from "@/repositories/ingredientGrainRepo";
import { fetchAll as unitFetchAll } from "@/repositories/unitRepo";
import { Grain } from "@/models/ingredientGrain";
import { Unit } from "@/models/unit";
import { sortByNameAndConversionFactor } from "@/services/unit";
import { sortByName } from "@/services/ingredientGrain";
import MasterIngredientGrainFormVue from "@/components/MasterIngredientGrainForm.vue";
import { ElMessageBox } from "element-plus";

const tableData = reactive([]);
const unitMsts = reactive([]);
const a_grainData = reactive(
  new Grain("", "", 0, new Unit(), new Unit(), new Unit())
);
const masterIngredientGrainFormDialogVisible = ref(false);

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
  a_grainData.id = item.id;
  a_grainData.name = item.name;
  a_grainData.potential = item.potential;
  a_grainData.brewingUnit = item.brewingUnit;
  a_grainData.recievingUnit = item.recievingUnit;
  a_grainData.stockingUnit = item.stockingUnit;
  masterIngredientGrainFormDialogVisible.value = true;
};

const onClickCreate = () => {
  a_grainData.id = "";
  a_grainData.clear();
  masterIngredientGrainFormDialogVisible.value = true;
};

const onSubmitGrain = async (grainData) => {
  masterIngredientGrainFormDialogVisible.value = false;
  try {
    await save(grainData);
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

const onClickMasterIngredientGrainFormCancel = () => {
  masterIngredientGrainFormDialogVisible.value = false;
};

onMounted(() => {
  fetchData();
  fetchUnitMsts();
});

const fetchUnitMsts = async () => {
  const data = await unitFetchAll();
  const sortedData = sortByNameAndConversionFactor(data.result);
  unitMsts.splice(0);
  sortedData.forEach((item) => {
    unitMsts.push(item);
  });
};

const fetchData = async () => {
  const data = await fetchAll();
  const sortedData = sortByName(data.result);
  tableData.splice(0);
  sortedData.forEach((item) => {
    tableData.push(item);
  });
};
</script>

<template>
  <div class="ingredient-master">
    <el-row>
      <el-col :span="6">
        <el-menu>
          <el-menu-item @click="onClickCreate">新規作成</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="18">
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="name" label="名称" />
          <el-table-column prop="potential" label="糖保有量" />
          <el-table-column prop="brewingUnit.name" label="使用単位" />
          <el-table-column prop="recievingUnit.name" label="入荷単位" />
          <el-table-column prop="stockingUnit.name" label="在庫単位" />
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
    <el-dialog v-model="masterIngredientGrainFormDialogVisible">
      <MasterIngredientGrainFormVue
        :grainData="a_grainData"
        :unitMsts="unitMsts"
        @submitGrain="onSubmitGrain($event)"
        @clickCancel="onClickMasterIngredientGrainFormCancel"
      >
      </MasterIngredientGrainFormVue>
    </el-dialog>
  </div>
</template>
