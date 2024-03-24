<script setup lang="ts">
import "@google/model-viewer";
import { ref, watch } from "vue";
import type { Ref } from "vue";
import type { ModelViewerElement } from "@google/model-viewer";
import naiveUiThemeOverrides from "./assets/naive-ui-theme-overrides.json";
import {
  NConfigProvider,
  NCard,
  NRadioGroup,
  NRadio,
  NSpace,
  NSpin,
} from "naive-ui";

let loading: Ref<boolean> = ref(true);
let modelViewer: Ref<ModelViewerElement | null> = ref(null);
let animation: Ref<string> = ref("idle");
let animations: Ref<string[]> = ref([]);
// watch modelViewer load
watch(
  modelViewer,
  () => {
    modelViewer.value?.addEventListener("load", () => {
      animations.value = modelViewer.value?.availableAnimations || [];
      loading.value = false;
      console.log(animations.value);
    });
  },
  { once: true }
);
</script>

<template>
  <n-config-provider :themeOverrides="naiveUiThemeOverrides">
    <n-spin :show="loading">
      <n-card
        class="h-[calc(100vh-1rem)] w-full"
        content-class=" flex flex-col"
      >
        <model-viewer
          ref="modelViewer"
          src="v1.glb"
          camera-controls
          shadow-intensity="1"
          autoplay
          :animation-name="animation"
          class="w-full grow"
        >
          <div slot="progress-bar"></div>
        </model-viewer>
        <div class="w-full border-t-2 pt-2">
          <n-radio-group v-model:value="animation">
            <n-space>
              <n-radio v-for="item in animations" :key="item" :value="item">
                {{ item }}
              </n-radio>
            </n-space>
          </n-radio-group>
        </div>
      </n-card>
    </n-spin>
  </n-config-provider>
</template>

<style scoped></style>
