<script setup lang="ts">
import "@google/model-viewer";
import naiveUiThemeOverrides from "./assets/naive-ui-theme-overrides.json";
import { NConfigProvider, NCard, NSpin } from "naive-ui";
import { usePiniaStore } from "./pinia";
import { storeToRefs } from "pinia";

const { loading } = storeToRefs(usePiniaStore());
</script>

<template>
  <n-config-provider :themeOverrides="naiveUiThemeOverrides">
    <n-spin :show="loading">
      <n-card
        class="h-[calc(100vh-1rem)] w-full"
        content-class=" flex flex-col"
      >
        <RouterView />
      </n-card>
    </n-spin>
  </n-config-provider>
</template>
