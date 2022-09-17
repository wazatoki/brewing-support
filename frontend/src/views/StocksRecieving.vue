<script setup>
import { fetchAll, save, remove } from "@/repositories/recieveEventRepo";
import * as ingredientRepo from "@/repositories/ingredientRepo";
import * as supplierRepo from "@/repositories/supplierRepo";
import { reactive, ref, onMounted } from "vue";
import StocksRecievingForm from "@/components/StocksRecievingForm.vue";
import { RecieveEvent } from "@/models/recieveEvent";
import { sortBySupplierNameAndRecieveDate } from "@/services/recieveEvent";
import * as supplierServices from "@/services/supplier";
import * as ingredientService from "@/services/ingredient";
import * as utils from "@/services/utils";
import { ElMessageBox } from "element-plus";

const suppliers = reactive([]);
const ingredientMsts = reactive([]);
const tableData = reactive([]);
const recieveEventData = reactive(new RecieveEvent());
const StocksRecievingFormDialogVisible = ref(false);

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
  recieveEventData.id = item.id;
  recieveEventData.noteNO = item.noteNO;
  recieveEventData.noteDate = item.noteDate;
  recieveEventData.supplier = item.supplier;
  recieveEventData.recieveDate = item.recieveDate;
  recieveEventData.ingredients = item.ingredients;
  recieveEventData.footNote = item.footNote;
  StocksRecievingFormDialogVisible.value = true;
};

const onClickCreate = () => {
  recieveEventData.clear();
  StocksRecievingFormDialogVisible.value = true;
};

const onSubmitRecieveEvent = async (recieveEventData) => {
  StocksRecievingFormDialogVisible.value = false;
  try {
    await save(recieveEventData);
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

const onClickStocksRecievingFormDelete = async (recieveEventData) => {
  try {
    await remove(recieveEventData);
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

const onClickStocksRecievingFormCancel = () => {
  StocksRecievingFormDialogVisible.value = false;
};

onMounted(() => {
  fetchData();
  fetchSupplieres();
  fetchIngredientMsts();
});

const fetchData = async () => {
  const data = await fetchAll();
  const sortedData = sortBySupplierNameAndRecieveDate(data.result);
  tableData.splice(0);
  sortedData.forEach((item) => {
    tableData.push(item);
  });
};

const fetchSupplieres = async () => {
  const data = await supplierRepo.fetchAll();
  const sortedData = supplierServices.sortByName(data.result);
  suppliers.splice(0);
  sortedData.forEach((item) => {
    suppliers.push(item);
  });
};

const fetchIngredientMsts = async () => {
  const data = await ingredientRepo.fetchAll();
  const sortedData = ingredientService.sortByClassifientNameAndName(
    data.result
  );
  ingredientMsts.splice(0);
  sortedData.forEach((item) => {
    ingredientMsts.push(item);
  });
};

const formatDate = (row, column, cellValue) => utils.formatDate(cellValue);
</script>

<template>
  <div class="stocks-recieving">
    <el-row>
      <el-col :span="6">
        <el-menu>
          <el-menu-item @click="onClickCreate">新規作成</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="18">
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column
            prop="recieveDate"
            label="入荷日付"
            :formatter="formatDate"
          />
          <el-table-column prop="supplier.name" label="仕入先" />

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
    <el-dialog v-model="StocksRecievingFormDialogVisible">
      <StocksRecievingForm
        :recieveEventData="recieveEventData"
        :suppliers="suppliers"
        :ingredientMsts="ingredientMsts"
        @clickSubmit="onSubmitRecieveEvent($event)"
        @clickCancel="onClickStocksRecievingFormCancel"
        @clickDelete="onClickStocksRecievingFormDelete($event)"
      >
      </StocksRecievingForm>
    </el-dialog>
  </div>
</template>
