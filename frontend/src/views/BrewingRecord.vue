<script setup>
import "@fullcalendar/core/vdom"; // solves problem with Vite
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import BrewingRecordForm from "@/components/BrewingRecordForm.vue";
import BrewingPlanForm from "@/components/BrewingPlanForm.vue";
import { BrewEvent } from "@/models/brewEvent";
import { BrewPlan } from "@/models/brewPlan";
import { reactive, ref, onMounted, computed } from "vue";
import {
  ElRow,
  ElCol,
  ElDialog,
  ElButton,
} from "element-plus/dist/index.full.js";
import * as ingredientRepo from "@/repositories/ingredientRepo";
import * as ingredientGrainRepo from "@/repositories/ingredientGrainRepo";
import * as ingredientHopRepo from "@/repositories/ingredientHopRepo";
import * as ingredientYeastRepo from "@/repositories/ingredientYeastRepo";
import * as ingredientService from "@/services/ingredient";
import * as ingredientGrainService from "@/services/ingredientGrain";
import * as ingredientHopService from "@/services/ingredientHop";
import * as ingredientYeastService from "@/services/ingredientYeast";

import * as brewEventRepo from "@/repositories/brewEventRepo";
import { ElMessageBox } from "element-plus";
import * as brewPlanRepo from "@/repositories/brewPlanRepo";
import * as brewPlanService from "@/services/brewPlan";
import BrewingPlanSelectForm from "@/components/BrewingPlanSelectForm.vue";

const brewPlans = reactive([]);
const brewPlan = reactive(new BrewPlan());
const brewPlanSelectFormDialogVisible = ref(false);
const calendarEvents = reactive([]);

const calendarOptions = reactive({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
  headerToolbar: {
    left: "prev,next today",
    center: "title",
    right: "dayGridMonth,timeGridWeek,timeGridDay,listYear",
  },
  initialView: "timeGridWeek",
  selectable: true,
  editable: true,
  selectMirror: true,
  dayMaxEvents: true,
  weekends: true,
  events: calendarEvents,
  select: onSelectCalender,
  eventClick: onClickCalenderEvent,
  eventDrop: onChangeCalendarEvent,
  eventResize: onChangeCalendarEvent,
});

const itemMsts = reactive([]);
const grainMst = reactive([]);
const hopMst = reactive([]);
const yeastMst = reactive([]);

const brewEventDialogVisible = ref(false);
const brewPlanFormDialogVisible = ref(false);
const brewEvents = [];
const a_brewEvent = reactive(new BrewEvent());

let calendarApi;

const grainQuantitySum = computed(() => {
  return brewPlan.grains
    .map((grainPlan) => {
      return grainPlan.quantity;
    })
    .reduce((acc, elem) => Number(acc) + Number(elem), 0);
});

const grainRatioSum = computed(() => {
  return Math.round(
    brewPlan.grains
      .map((grainPlan) => {
        return grainPlan.ratio;
      })
      .reduce((acc, elem) => Number(acc) + Number(elem), 0)
  );
});

const totalIBUs = computed(() => {
  return brewPlan.hops
    .map((hopplan) => {
      return hopplan.ibus;
    })
    .reduce((acc, elem) => Number(acc) + Number(elem), 0);
});

function onSelectCalender(info) {
  calendarApi = info.view.calendar;
  calendarApi.unselect(); // clear date selection

  if (brewPlan.id) {
    brewEventClear();
    a_brewEvent.id = "";
    a_brewEvent.from = info.start;
    a_brewEvent.to = info.end;
    a_brewEvent.brewPlanID = brewPlan.id;
    brewEventDialogVisible.value = true; // 編集用ダイアログを開く
  } else {
    ElMessageBox.alert("brew planを選択してください。", {
      confirmButtonText: "OK",
    });
  }
}

function brewEventClear() {
  a_brewEvent.clear();
}

async function onClickCalenderEvent(info) {
  await fetchBrewEvents();
  const brewEvent = brewEvents.find(
    (calenderEvent) => calenderEvent.id === info.event.id
  );
  if (brewEvent) {
    a_brewEvent.id = brewEvent.id;
    a_brewEvent.name = brewEvent.name;
    a_brewEvent.desc = brewEvent.desc;
    a_brewEvent.from = brewEvent.from;
    a_brewEvent.to = brewEvent.to;
    a_brewEvent.ingredients = brewEvent.ingredients;
    a_brewEvent.grains = brewEvent.grains;
    a_brewEvent.hops = brewEvent.hops;
    a_brewEvent.yeasts = brewEvent.yeasts;
    a_brewEvent.brewPlanID = brewEvent.brewPlanID;
    brewEventDialogVisible.value = true;
  }
}

async function onSubmitBrewEvent(submitedBrewEvent) {
  brewEventDialogVisible.value = false; // 編集用ダイアログを閉じる
  try {
    // db送信
    await brewEventRepo.save(submitedBrewEvent);

    // brewEvent更新処理
    fetchBrewEvents();
  } catch (error) {
    ElMessageBox.alert("データの保存に失敗しました。" + error.message, {
      confirmButtonText: "OK",
    });
  }
}

async function onChangeCalendarEvent(info) {
  const be = brewEvents.find((brewEvent) => brewEvent.id === info.event.id);
  if (be) {
    be.name = info.event.title;
    if (info.event.start) {
      be.from = info.event.start;
    }
    if (info.event.end) {
      be.to = info.event.end;
    }

    // db送信
    await brewEventRepo.save(be);
    // brewEvent更新処理
    fetchBrewEvents();
  }
}

async function onClickBrewingRecordFormDelete(id) {
  brewEventDialogVisible.value = false;

  // calenderEvent削除処理
  const caIndex = calendarEvents.findIndex((e) => e.id === id);
  if (caIndex >= 0) {
    calendarEvents.splice(caIndex, 1);
  }

  // brewEvent削除処理
  const beIndex = brewEvents.findIndex((e) => e.id === id);
  if (beIndex >= 0) {
    await brewEventRepo.remove(brewEvents[beIndex]);
    brewEvents.splice(beIndex, 1);
  }
}

function onClickBrewingRecordFormCancel() {
  brewEventDialogVisible.value = false;
}

const fetchBrewEvents = async () => {
  if (brewPlan.id) {
    const fetchedBrewEvents = (await brewEventRepo.fetchAll()).result;
    brewEvents.splice(0);
    calendarEvents.splice(0);
    const filteredBrewEvents = fetchedBrewEvents.filter((brewEvent) => {
      return brewEvent.brewPlanID === brewPlan.id;
    });
    filteredBrewEvents.forEach((item) => {
      const calenderEvent = {
        id: item.id,
        title: item.name,
        start: item.from,
        end: item.to,
      };
      brewEvents.push(item);
      calendarEvents.push(calenderEvent);
    });
  }
};

onMounted(() => {
  fetchIngredientMst();
  fetchBrewPlans();
  fetchGrainMst();
  fetchHopMst();
  fetchYeastMst();
});

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

const onClickBrewPlanCreate = () => {
  brewPlan.clear();
  brewPlanFormDialogVisible.value = true;
};

const onClickCancelBrewPlanForm = () => {
  brewPlanFormDialogVisible.value = false;
};

const onClickSubmitBrewPlanForm = async (brewPlanData) => {
  brewPlanFormDialogVisible.value = false;
  try {
    const id = await brewPlanRepo.save(brewPlanData);
    brewPlan.id = id;
    brewPlan.batchNumber = brewPlanData.batchNumber;
    brewPlan.name = brewPlanData.name;
    brewPlan.batchSize = brewPlanData.batchSize;
    brewPlan.originalGravity = brewPlanData.originalGravity;
    brewPlan.finalGravity = brewPlanData.finalGravity;
    brewPlan.brixLevel = brewPlanData.brixLevel;
    brewPlan.abv = brewPlanData.abv;
    brewPlan.ibus = brewPlanData.ibus;
    brewPlan.mashEfficienty = brewPlanData.mashEfficienty;
    brewPlan.grains = brewPlanData.grains;
    brewPlan.hops = brewPlanData.hops;
    brewPlan.yeastPlan = brewPlanData.yeastPlan;
    brewPlan.events = brewPlanData.events;
    fetchBrewPlans();
    fetchBrewEvents();
    ElMessageBox.alert("データの保存に成功しました。", {
      confirmButtonText: "OK",
    });
  } catch (error) {
    ElMessageBox.alert("データの保存に失敗しました。" + error.message, {
      confirmButtonText: "OK",
    });
  }
};

const fetchBrewPlans = async () => {
  const fetchedData = (await brewPlanRepo.fetchAll()).result;
  const sortedData = brewPlanService.sortByBatchNumber(fetchedData);
  brewPlans.splice(0);
  sortedData.forEach((item) => {
    brewPlans.push(item);
  });
};

const onClickBrewPlanSelect = () => {
  brewPlanSelectFormDialogVisible.value = true;
};

const onSelectBrewPlan = (selectedBrewPlan) => {
  brewPlan.id = selectedBrewPlan.id;
  brewPlan.batchNumber = selectedBrewPlan.batchNumber;
  brewPlan.name = selectedBrewPlan.name;
  brewPlan.batchSize = selectedBrewPlan.batchSize;
  brewPlan.originalGravity = selectedBrewPlan.originalGravity;
  brewPlan.finalGravity = selectedBrewPlan.finalGravity;
  brewPlan.brixLevel = selectedBrewPlan.brixLevel;
  brewPlan.abv = selectedBrewPlan.abv;
  brewPlan.ibus = selectedBrewPlan.ibus;
  brewPlan.mashEfficienty = selectedBrewPlan.mashEfficienty;
  brewPlan.grains = selectedBrewPlan.grains;
  brewPlan.hops = selectedBrewPlan.hops;
  brewPlan.yeastPlan = selectedBrewPlan.yeastPlan;
  brewPlan.events = selectedBrewPlan.events;
  brewPlanSelectFormDialogVisible.value = false;
  fetchBrewEvents();
};
</script>

<template>
  <div class="brewing-record">
    <el-row>
      <el-col :span="12">
        <el-row>
          <el-col :span="12"> brew plan </el-col>
          <el-col :span="6">
            <el-button type="primary" @click="onClickBrewPlanCreate()"
              >新規作成</el-button
            >
          </el-col>
          <el-col :span="6">
            <el-button type="primary" @click="onClickBrewPlanSelect()"
              >変更</el-button
            >
          </el-col>
        </el-row>

        <div>
          <el-row>
            <el-col :span="6"> batch number </el-col>
            <el-col :span="6">
              {{ brewPlan.batchNumber }}
            </el-col>
            <el-col :span="6"> batch name </el-col>
            <el-col :span="6">
              {{ brewPlan.name }}
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6"> batch size </el-col>
            <el-col :span="6">
              {{ brewPlan.batchSize }} <span> L</span>
            </el-col>
            <el-col :span="6"> Mash Efficienty </el-col>
            <el-col :span="6">
              {{ brewPlan.mashEfficienty }}
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6"> 初期比重 </el-col>
            <el-col :span="3">
              {{ brewPlan.originalGravity }}
            </el-col>
            <el-col :span="3">
              <el-input
                v-model="brewPlan.measuredOriginalGravity"
                autocomplete="off"
              />
            </el-col>
            <el-col :span="6"> 糖度 </el-col>
            <el-col :span="3">
              {{ brewPlan.brixLevel }}
            </el-col>
            <el-col :span="3">
              <el-input
                v-model="brewPlan.measuredBrixLevel"
                autocomplete="off"
              />
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6"> 最終比重 </el-col>
            <el-col :span="3">
              {{ brewPlan.finalGravity }}
            </el-col>
            <el-col :span="3">
              <el-input
                v-model="brewPlan.measuredFinalGravity"
                autocomplete="off"
              />
            </el-col>
            <el-col :span="6"> ABV </el-col>
            <el-col :span="3">
              {{ brewPlan.abv }}
            </el-col>
            <el-col :span="3">
              <el-input v-model="brewPlan.measuredAbv" autocomplete="off" />
            </el-col>
          </el-row>
          <el-divider />
          <el-row>
            <el-col :span="24">
              <span>Grains</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <span>名称</span>
            </el-col>
            <el-col :span="8">
              <span>量（g）</span>
            </el-col>
            <el-col :span="8">
              <span>割合（％）</span>
            </el-col>
          </el-row>
          <el-row
            v-for="grainPlan in brewPlan.grains"
            :key="grainPlan.grain.id"
          >
            <el-col :span="8">
              {{ grainPlan.grain.name }}
            </el-col>
            <el-col :span="8">
              <span>{{ grainPlan.quantity }}</span>
            </el-col>
            <el-col :span="8">
              {{ grainPlan.ratio }}
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8"><span>合計</span></el-col>
            <el-col :span="8"
              ><span>{{ grainQuantitySum }}</span></el-col
            >
            <el-col :span="8"
              ><span>{{ grainRatioSum }}</span></el-col
            >
          </el-row>

          <el-divider />
          <el-row>
            <el-col :span="24">
              <span>Hops</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <span>名称</span>
            </el-col>
            <el-col :span="4">
              <span>α酸（%）</span>
            </el-col>
            <el-col :span="4">
              <span>量（g）</span>
            </el-col>
            <el-col :span="4">
              <span>煮込時間（分）</span>
            </el-col>
            <el-col :span="4">
              <span>IBUs</span>
            </el-col>
          </el-row>
          <el-row v-for="hopPlan in brewPlan.hops" :key="hopPlan.hop.id">
            <el-col :span="4">
              {{ hopPlan.hop.name }}
            </el-col>
            <el-col :span="4">
              <span>{{ hopPlan.alphaAcid }}</span>
            </el-col>
            <el-col :span="4">
              {{ hopPlan.quantity }}
            </el-col>
            <el-col :span="4">
              {{ hopPlan.boilTime }}
            </el-col>
            <el-col :span="4">
              <span>{{ hopPlan.ibus }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16"><span>合計</span></el-col>
            <el-col :span="4"
              ><span>{{ totalIBUs }}</span></el-col
            >
          </el-row>

          <el-divider />
          <el-row>
            <el-col :span="24">
              <span>酵母</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8"><span>名称</span></el-col>
            <el-col :span="8"><span>量(g)</span></el-col>
            <el-col :span="8"><span>Attenuation</span></el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              {{ brewPlan.yeastPlan.yeast.name }}
            </el-col>
            <el-col :span="8">
              {{ brewPlan.yeastPlan.quantity }}
            </el-col>
            <el-col :span="8">
              {{ brewPlan.yeastPlan.yeast.attenuation }}
            </el-col>
          </el-row>
        </div>
      </el-col>

      <el-col :span="12">
        <el-row>
          <el-col :span="24">brew event</el-col>
        </el-row>
        <div>
          <FullCalendar :options="calendarOptions" />
        </div>
      </el-col>
    </el-row>
    <el-dialog v-model="brewEventDialogVisible" @close="brewEventClear">
      <BrewingRecordForm
        :brewEvent="a_brewEvent"
        :brewPlan="brewPlan"
        :itemMsts="itemMsts"
        :grainMst="grainMst"
        :hopMst="hopMst"
        :yeastMst="yeastMst"
        @submitBrewEvent="onSubmitBrewEvent($event)"
        @clickCancel="onClickBrewingRecordFormCancel"
        @clickDelete="onClickBrewingRecordFormDelete($event)"
      >
      </BrewingRecordForm>
    </el-dialog>
    <el-dialog v-model="brewPlanFormDialogVisible" width="75%">
      <BrewingPlanForm
        :brewPlan="brewPlan"
        :grainMst="grainMst"
        :hopMst="hopMst"
        :yeastMst="yeastMst"
        @cancel="onClickCancelBrewPlanForm"
        @submit="onClickSubmitBrewPlanForm"
      ></BrewingPlanForm>
    </el-dialog>
    <el-dialog v-model="brewPlanSelectFormDialogVisible">
      <BrewingPlanSelectForm
        :brewPlans="brewPlans"
        @selectBrewPlan="onSelectBrewPlan"
      ></BrewingPlanSelectForm>
    </el-dialog>
  </div>
</template>
