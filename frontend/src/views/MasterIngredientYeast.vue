<script setup>
import { reactive, ref, onMounted } from "vue";
import { fetchAll, save, remove } from "@/repositories/ingredientYeastRepo";
import { fetchAll as unitFetchAll } from "@/repositories/unitRepo";
import { Yeast } from "@/models/ingredientYeast";
import { Unit } from "@/models/unit";
import { sortByNameAndConversionFactor } from "@/services/unit";
import { sortByName } from "@/services/ingredientYeast";
import MasterIngredientYeastFormVue from "@/components/MasterIngredientYeastForm.vue";
import { ElMessageBox } from "element-plus";

const tableData = reactive([]);
const unitMsts = reactive([]);
const a_yeastData = reactive(
  new Yeast("", "", 0, new Unit(), new Unit(), new Unit())
);
const masterIngredientYeastFormDialogVisible = ref(false);

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
  a_yeastData.id = item.id;
  a_yeastData.name = item.name;
  a_yeastData.attenuation = item.attenuation;
  a_yeastData.brewingUnit = item.brewingUnit;
  a_yeastData.recievingUnit = item.recievingUnit;
  a_yeastData.stockingUnit = item.stockingUnit;
  masterIngredientYeastFormDialogVisible.value = true;
};

const onClickCreate = () => {
  a_yeastData.id = "";
  a_yeastData.clear();
  masterIngredientYeastFormDialogVisible.value = true;
};

const onSubmitYeast = async (yeastData) => {
  masterIngredientYeastFormDialogVisible.value = false;
  try {
    await save(yeastData);
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

const onClickMasterIngredientYeastFormCancel = () => {
  masterIngredientYeastFormDialogVisible.value = false;
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
          <el-table-column prop="attenuation" label="Attenuation(%)" />
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
    <el-dialog v-model="masterIngredientYeastFormDialogVisible">
      <MasterIngredientYeastFormVue
        :yeastData="a_yeastData"
        :unitMsts="unitMsts"
        @submitYeast="onSubmitYeast($event)"
        @clickCancel="onClickMasterIngredientYeastFormCancel"
      >
      </MasterIngredientYeastFormVue>
    </el-dialog>
  </div>
</template>
