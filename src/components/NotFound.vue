<template>
  <n-result
    status="404"
    title="404 Not Found"
    description="You know life is always ridiculous."
    class="h-full"
  >
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
        <n-button
          tag="a"
          type="primary"
          class="bg-[var(--n-color)]"
          href="https://github.com/XYY-huijiwiki/3d-model"
          target="_blank"
        >
          GitHub
        </n-button>
      </n-space>
    </template>
  </n-result>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { usePiniaStore } from "../pinia";
import { storeToRefs } from "pinia";
import { NResult, NButton, NSpace } from "naive-ui";

const { loading } = storeToRefs(usePiniaStore());

onMounted(() => {
  loading.value = false;
});

const modelList = Object.keys(import.meta.glob("../../public/*.glb")).map(
  (key) => {
    return key.replace("../../public/", "").replace(".glb", "");
  }
);
</script>
