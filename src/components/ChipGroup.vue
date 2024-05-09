<template>
  <div>
    <q-chip
      clickable
      v-close-popup
      v-for="(item, index) in categories"
      :key="index"
      @click="handleChipSelect(index, item)"
      :class="[
        $q.dark.isActive ? 'bg-dark' : 'custom-chip-active',
        index === clickedIndex
          ? 'custom-chip-active'
          : 'custom-chip-deactivate',
      ]"
    >
      <img class="q-pr-xs" width="20px" :src="item.icon" />
      {{ item.label }}
    </q-chip>
  </div>
</template>
<script setup>
import { computed, ref } from "vue";
const emit = defineEmits(["selectCategory", "initialScrool"]);
const props = defineProps({
  category: {
    type: Object,
  },
  itemActive: {
    type: Number,
    default: 0,
  },
});

const categories = computed(() => {
  return props.category;
});

const clickedIndex = ref(props.itemActive);

const handleChipSelect = (index, item) => {
  clickedIndex.value = index;
  window.scrollTo(0, 0);
  emit("selectCategory", item);
};
</script>
<style scoped>
.custom-chip-active {
  background: #008457;
  color: #fff !important;
}

.custom-chip-deactivate {
  background: #d5dad7;
  color: #008457 !important;
}
</style>
