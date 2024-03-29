<template>
  <model-viewer
    ref="modelViewer"
    :src="`${$route.params.model}.glb`"
    camera-controls
    shadow-intensity="1"
    autoplay
    :animation-name="animation"
    class="w-full grow"
  >
    <div slot="progress-bar"></div>
  </model-viewer>
  <div class="w-full border-t-2 pt-2" v-if="animations.length > 0">
    <n-radio-group v-model:value="animation">
      <n-space>
        <n-radio v-for="item in animations" :key="item" :value="item">
          {{ item }}
        </n-radio>
      </n-space>
    </n-radio-group>
  </div>
</template>

<script setup lang="ts">
import "@google/model-viewer";
import { ref, watch } from "vue";
import type { Ref } from "vue";
import type { ModelViewerElement } from "@google/model-viewer";
import { NRadioGroup, NRadio, NSpace } from "naive-ui";
import { usePiniaStore } from "../pinia";
import { storeToRefs } from "pinia";

const { loading } = storeToRefs(usePiniaStore());

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
    });
  },
  { once: true },
);
</script>

<style scoped></style>
