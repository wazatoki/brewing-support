<script setup>
import { fetchAll, save, remove } from "@/repositories/unitRepo";
import { reactive, ref, onMounted } from "vue";
import MasterUnitForm from "@/components/MasterUnitForm.vue";
import { Unit } from "@/models/unit";
import { sortByNameAndConversionFactor } from "@/services/unit";
import { ElMessageBox } from "element-plus";

const tableData = reactive([]);
const a_unitData = reactive(new Unit());
const masterUnitFormDialogVisible = ref(false);

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
  a_unitData.id = item.id;
  a_unitData.name = item.name;
  a_unitData.conversionFactor = item.conversionFactor;
  a_unitData.baseUnit = item.baseUnit;
  masterUnitFormDialogVisible.value = true;
};

const onClickCreate = () => {
  a_unitData.id = "";
  a_unitData.clear();
  masterUnitFormDialogVisible.value = true;
};

const onSubmitUnit = async (unitData) => {
  masterUnitFormDialogVisible.value = false;
  try {
    await save(unitData);
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

const onClickMasterUnitFormCancel = () => {
  masterUnitFormDialogVisible.value = false;
};

onMounted(() => {
  fetchData();
});

const fetchData = async () => {
  const data = await fetchAll();
  const sortedData = sortByNameAndConversionFactor(data.result);
  tableData.splice(0);
  sortedData.forEach((item) => {
    tableData.push(item);
  });
};
</script>

<template>
  <div class="unit-master">
    <el-row>
      <el-col :span="6">
        <el-menu>
          <el-menu-item @click="onClickCreate">新規作成</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="18">
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="name" label="名称" />
          <el-table-column prop="conversionFactor" label="換算係数" />
          <el-table-column prop="baseUnit.name" label="基礎単位" />
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
    <el-dialog v-model="masterUnitFormDialogVisible">
      <MasterUnitForm
        :unitData="a_unitData"
        :unitMsts="tableData"
        @submitUnit="onSubmitUnit($event)"
        @clickCancel="onClickMasterUnitFormCancel"
      >
      </MasterUnitForm>
    </el-dialog>
  </div>
</template>
