<script setup>
import { reactive, ref, onMounted } from "vue";
import { fetchAll, save, remove } from "@/repositories/ingredientRepo";
import { fetchAll as unitFetchAll } from "@/repositories/unitRepo";
import { fetchAll as ingredientClassificationFetchAll } from "@/repositories/ingredientClassificationRepo";
import { Ingredient } from "@/models/ingredient";
import { IngredientClassification } from "@/models/ingredientClassification";
import { Unit } from "@/models/unit";
import { sortByNameAndConversionFactor } from "@/services/unit";
import { sortByName as sortClassificationByName } from "@/services/ingredientClassification";
import { sortByClassifientNameAndName } from "@/services/ingredient";
import MasterIngredientFormVue from "@/components/MasterIngredientForm.vue";
import { ElMessageBox } from "element-plus";

const tableData = reactive([]);
const unitMsts = reactive([]);
const ingredientClassificationMsts = reactive([]);
const a_ingredientData = reactive(
  new Ingredient(
    "",
    "",
    new IngredientClassification(),
    new Unit(),
    new Unit(),
    new Unit()
  )
);
const masterIngredientFormDialogVisible = ref(false);

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
  a_ingredientData.id = item.id;
  a_ingredientData.name = item.name;
  a_ingredientData.ingredientClassification = item.ingredientClassification;
  a_ingredientData.brewingUnit = item.brewingUnit;
  a_ingredientData.recievingUnit = item.recievingUnit;
  a_ingredientData.stockingUnit = item.stockingUnit;
  masterIngredientFormDialogVisible.value = true;
};

const onClickCreate = () => {
  a_ingredientData.clear();
  masterIngredientFormDialogVisible.value = true;
};

const onSubmitIngredient = async (ingredientData) => {
  masterIngredientFormDialogVisible.value = false;
  try {
    await save(ingredientData);
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

const onClickMasterIngredientFormCancel = () => {
  masterIngredientFormDialogVisible.value = false;
};

onMounted(() => {
  fetchData();
  fetchUnitMsts();
  fetchIngredientClassificationMsts();
});

const fetchIngredientClassificationMsts = async () => {
  const data = await ingredientClassificationFetchAll();
  const sortedData = sortClassificationByName(data.result);
  ingredientClassificationMsts.splice(0);
  sortedData.forEach((item) => {
    ingredientClassificationMsts.push(item);
  });
};

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
  const sortedData = sortByClassifientNameAndName(data.result);
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
          <el-table-column prop="ingredientClassification.name" label="分類" />
          <el-table-column prop="name" label="名称" />
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
      <MasterIngredientFormVue
        :ingredientData="a_ingredientData"
        :unitMsts="unitMsts"
        :ingredientClassificationMsts="ingredientClassificationMsts"
        @submitIngredient="onSubmitIngredient($event)"
        @clickCancel="onClickMasterIngredientFormCancel"
      >
      </MasterIngredientFormVue>
    </el-dialog>
  </div>
</template>
