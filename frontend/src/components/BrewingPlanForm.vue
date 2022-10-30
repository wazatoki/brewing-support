<script setup>
import { reactive, ref, computed } from "vue";
import { BrewPlan } from "@/models/brewPlan";
import { Grain } from "@/models/ingredientGrain";
import { Unit } from "@/models/unit";
import { Hop } from "@/models/ingredientHop";

const props = defineProps({
  brewPlan: BrewPlan,
  grainMst: [],
  hopMst: [],
  yeastMst: [],
});

const emit = defineEmits(["submit", "cancel"]);

const form = reactive(
  new BrewPlan(
    props.brewPlan.id,
    props.brewPlan.batchNumber,
    props.brewPlan.name,
    props.brewPlan.batchSize,
    props.brewPlan.originalGravity,
    props.brewPlan.finalGravity,
    props.brewPlan.brixLevel,
    props.brewPlan.abv,
    props.brewPlan.ibus,
    props.brewPlan.mashEfficienty,
    props.brewPlan.grains,
    props.brewPlan.hops,
    props.brewPlan.yeast,
    props.brewPlan.events
  )
);

const rules = reactive({
  name: [
    { required: true, message: "batch nameは必須項目です。", trigger: "blur" },
  ],
  batchNumber: [
    {
      required: true,
      message: "batch number は必須です。",
      trigger: "blur",
    },
    {
      type: "number",
      message: "batch number 数値を入力してください。",
      trigger: "blur",
    },
  ],
});

const formRef = ref();

const grainQuantitySum = computed(() => {
  return form.grains
    .map((grainPlan) => {
      return grainPlan.quantity;
    })
    .reduce((acc, elem) => Number(acc) + Number(elem), 0);
});

const grainRatioSum = computed(() => {
  return Math.round(
    form.grains
      .map((grainPlan) => {
        return grainPlan.ratio;
      })
      .reduce((acc, elem) => Number(acc) + Number(elem), 0)
  );
});

const totalIBUs = computed(() => {
  return form.hops
    .map((hopplan) => {
      return hopplan.ibus;
    })
    .reduce((acc, elem) => Number(acc) + Number(elem), 0);
});

const addGrain = () => {
  form.grains.push({
    grain: new Grain("", "", 0, new Unit(), new Unit(), new Unit()),
    quantity: 0,
    ratio: 0,
  });
};

const addHop = () => {
  form.hops.push({
    hop: new Hop("", "", 0, new Unit(), new Unit(), new Unit()),
    quantity: 0,
    boilTime: 0,
    ibus: 0,
  });
};

const onChangeGrainParams = () => {
  const grainQuantitySum = form.grains
    .map((grainPlan) => {
      return grainPlan.quantity;
    })
    .reduce((acc, elem) => Number(acc) + Number(elem), 0);

  form.grains.forEach((grainPlan) => {
    grainPlan.ratio =
      Math.trunc((grainPlan.quantity / grainQuantitySum) * 10000) / 100;
  });
};

const onChangeHopParams = () => {
  form.hops.forEach((hopPlan) => {
    const fg = Math.pow(0.000125, form.originalGravity - 1) * 1.65;
    const ft = (1 - Math.exp(-0.04 * hopPlan.boilTime)) / 4.15;
    hopPlan.ibus =
      Math.trunc(
        ((hopPlan.hop.alphaAcid * hopPlan.quantity * (fg * ft) * 10) /
          form.batchSize) *
          10
      ) / 10;
  });
};

const onSubmit = async (formEl) => {
  if (!formEl) {
    return;
  }
  await formEl.validate((valid, fields) => {
    if (valid) {
      emit(
        "submit",
        new BrewPlan(
          form.id,
          form.batchNumber,
          form.name,
          form.batchSize,
          form.originalGravity,
          form.finalGravity,
          form.brixLevel,
          form.abv,
          form.ibus,
          form.mashEfficienty,
          form.grains,
          form.hops,
          form.yeast,
          form.events
        )
      );
      console.log("submit!");
    } else {
      console.log("error submit!", fields);
    }
  });
};

const onCancel = () => {
  emit("cancel");
};
</script>

<template>
  <el-form :model="form" :rules="rules" ref="formRef">
    <el-row>
      <el-col :span="24">
        <el-form-item
          label="batch numbre"
          :label-width="formLabelWidth"
          prop="batchNumber"
        >
          <el-input v-model.number="form.batchNumber" autocomplete="off" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item
          label="batch name"
          :label-width="formLabelWidth"
          prop="name"
        >
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item
          label="batch size(L)"
          :label-width="formLabelWidth"
          prop="batchSize"
        >
          <el-input v-model="form.batchSize" autocomplete="off" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item
          label="初期比重"
          :label-width="formLabelWidth"
          prop="originalGravity"
        >
          <el-input v-model="form.originalGravity" autocomplete="off" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          label="糖度"
          :label-width="formLabelWidth"
          prop="brixLevel"
        >
          <el-input v-model="form.brixLevel" autocomplete="off" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item
          label="最終比重"
          :label-width="formLabelWidth"
          prop="finalGravity"
        >
          <el-input v-model="form.finalGravity" autocomplete="off" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="ABV" :label-width="formLabelWidth" prop="abv">
          <el-input v-model="form.abv" autocomplete="off" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item
          label="Mash Efficienty"
          :label-width="formLabelWidth"
          prop="mashEfficienty"
        >
          <el-input v-model="form.mashEfficienty" autocomplete="off" />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="16">
        <span>Grains</span>
      </el-col>
      <el-col :span="8">
        <el-button type="primary" @click="addGrain">Add</el-button>
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
    <el-row v-for="(grainPlan, index) in form.grains" :key="grainPlan.grain.id">
      <el-col :span="8">
        <el-select
          v-model="form.grains[index].grain"
          :teleported="false"
          value-key="id"
          @blur="onChangeGrainParams"
        >
          <el-option
            v-for="item in grainMst"
            :key="item.id"
            :label="item.name"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="8">
        <el-input
          v-model="form.grains[index].quantity"
          @blur="onChangeGrainParams"
          autocomplete="off"
        />
      </el-col>
      <el-col :span="8">
        <span>{{ form.grains[index].ratio }}</span>
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

    <el-row>
      <el-col :span="16">
        <span>Hops</span>
      </el-col>
      <el-col :span="8">
        <el-button type="primary" @click="addHop">Add</el-button>
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
    <el-row v-for="(hopPlan, index) in form.hops" :key="hopPlan.hop.id">
      <el-col :span="4">
        <el-select
          v-model="form.hops[index].hop"
          :teleported="false"
          value-key="id"
          @blur="onChangeHopParams"
        >
          <el-option
            v-for="item in hopMst"
            :key="item.id"
            :label="item.name"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <span>{{ form.hops[index].hop.alphaAcid }}</span>
      </el-col>
      <el-col :span="4">
        <el-input
          v-model="form.hops[index].quantity"
          @blur="onChangeHopParams"
          autocomplete="off"
        />
      </el-col>
      <el-col :span="4">
        <el-input
          v-model="form.hops[index].boilTime"
          @blur="onChangeHopParams"
          autocomplete="off"
        />
      </el-col>
      <el-col :span="4">
        <span>{{ form.hops[index].ibus }}</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="16"><span>合計</span></el-col>
      <el-col :span="4"
        ><span>{{ totalIBUs }}</span></el-col
      >
    </el-row>

    <el-row>
      <el-col>
        <el-button type="primary" @click="onSubmit(formRef)">確定</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-col>
    </el-row>
  </el-form>
</template>
