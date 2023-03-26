<script setup>
import {
  fetchAll,
  save,
  remove,
} from "@/repositories/ingredientClassificationRepo";
import { reactive, ref, onMounted } from "vue";
import MasterIngredientClassificationForm from "@/components/MasterIngredientClassificationForm.vue";
import { IngredientClassification } from "@/models/ingredientClassification";
import { sortByName } from "@/services/ingredientClassification";
import { ElMessageBox } from "element-plus";

const tableData = reactive([]);
const a_ingredientClassificationData = reactive(new IngredientClassification());
const masterIngredientClassificationFormDialogVisible = ref(false);

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
  a_ingredientClassificationData.id = item.id;
  a_ingredientClassificationData.name = item.name;
  masterIngredientClassificationFormDialogVisible.value = true;
};

const onClickCreate = () => {
  a_ingredientClassificationData.id = "";
  a_ingredientClassificationData.clear();
  masterIngredientClassificationFormDialogVisible.value = true;
};

const onSubmitIngredientClassification = async (
  ingredientClassificationData
) => {
  masterIngredientClassificationFormDialogVisible.value = false;
  try {
    await save(ingredientClassificationData);
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

const onClickMasterIngredientClassificationFormCancel = () => {
  masterIngredientClassificationFormDialogVisible.value = false;
};

onMounted(() => {
  fetchData();
});

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
  <div class="ingredient-classification-master">
    <el-row>
      <el-col :span="6">
        <el-menu>
          <el-menu-item @click="onClickCreate">新規作成</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="18">
        <el-table :data="tableData" stripe style="width: 100%">
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
    <el-dialog v-model="masterIngredientClassificationFormDialogVisible">
      <MasterIngredientClassificationForm
        :ingredientClassificationData="a_ingredientClassificationData"
        @submit="onSubmitIngredientClassification($event)"
        @cancel="onClickMasterIngredientClassificationFormCancel"
      >
      </MasterIngredientClassificationForm>
    </el-dialog>
  </div>
</template>
