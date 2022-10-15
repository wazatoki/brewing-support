<script setup>
import { reactive, ref, onMounted } from "vue";
import { fetchAll, save, remove } from "@/repositories/ingredientHopRepo";
import { fetchAll as unitFetchAll } from "@/repositories/unitRepo";
import { Hop } from "@/models/ingredientHop";
import { Unit } from "@/models/unit";
import { sortByNameAndConversionFactor } from "@/services/unit";
import { sortByName } from "@/services/ingredientHop";
import MasterIngredientHopFormVue from "@/components/MasterIngredientHopForm.vue";
import { ElMessageBox } from "element-plus";

const tableData = reactive([]);
const unitMsts = reactive([]);
const a_hopData = reactive(
  new Hop("", "", 0, new Unit(), new Unit(), new Unit())
);
const masterIngredientHopFormDialogVisible = ref(false);

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
  a_hopData.id = item.id;
  a_hopData.name = item.name;
  a_hopData.alphaAcid = item.alphaAcid;
  a_hopData.brewingUnit = item.brewingUnit;
  a_hopData.recievingUnit = item.recievingUnit;
  a_hopData.stockingUnit = item.stockingUnit;
  masterIngredientHopFormDialogVisible.value = true;
};

const onClickCreate = () => {
  a_hopData.clear();
  masterIngredientHopFormDialogVisible.value = true;
};

const onSubmitHop = async (hopData) => {
  masterIngredientHopFormDialogVisible.value = false;
  try {
    await save(hopData);
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

const onClickMasterIngredientHopFormCancel = () => {
  masterIngredientHopFormDialogVisible.value = false;
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
          <el-table-column prop="alphaAcid" label="α酸(%)" />
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
    <el-dialog v-model="masterIngredientFormDialogVisible">
      <MasterIngredientHopFormVue
        :hopData="a_hopData"
        :unitMsts="unitMsts"
        @submitHop="onSubmitHop($event)"
        @clickCancel="onClickMasterIngredientHopFormCancel"
      >
      </MasterIngredientHopFormVue>
    </el-dialog>
  </div>
</template>
