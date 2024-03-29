<template>
  <n-result status="404" title="404 Not Found" class="h-full">
    <template #default>
      <n-space justify="center">
        <n-text
          >Check our
          <n-a href="//github.com/XYY-huijiwiki/3d-model" target="_blank"
            >GitHub</n-a
          >
          for more details, or click the buttons below to view the
          models.</n-text
        >
      </n-space>
    </template>
    <template #footer>
      <n-space justify="center">
        <n-button
          v-for="model in modelList"
          tag="a"
          type="primary"
          class="bg-[var(--n-color)]"
          :href="`./${model}`"
          :key="model"
        >
          {{ model }}
        </n-button>
      </n-space>
    </template>
  </n-result>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { usePiniaStore } from "../pinia";
import { storeToRefs } from "pinia";
import { NResult, NButton, NSpace, NText, NA } from "naive-ui";

const { loading } = storeToRefs(usePiniaStore());

onMounted(() => {
  loading.value = false;
});

const modelList = Object.keys(import.meta.glob("../../public/*.glb")).map(
  (key) => {
    return key.replace("../../public/", "").replace(".glb", "");
  },
);
</script>
