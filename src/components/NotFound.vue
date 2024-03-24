<template>
  <n-result
    status="404"
    title="404 Not Found"
    description="You know life is always ridiculous."
    class="h-full"
  >
    <template #footer>
      <n-button
        tag="a"
        type="primary"
        class="bg-[var(--n-color)]"
        href="https://github.com/XYY-huijiwiki/3d-model"
        target="_blank"
      >
        GitHub
      </n-button>
    </template>
  </n-result>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { usePiniaStore } from "../pinia";
import { storeToRefs } from "pinia";
import { NResult, NButton } from "naive-ui";

const { loading } = storeToRefs(usePiniaStore());
onMounted(() => {
  loading.value = false;
});
</script>

<style scoped></style>
