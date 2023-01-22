<script setup la
  components: { Tab },ng="ts">
import Tab from './Tab.vue';
</script>
<template>
  <div class="page">
    <tab icon="fas fa-coffee" header-key="about.h" active>
      <div class="about-me">
        <h1>{{ $t("about.h1") }}</h1>
        <p>{{ $t("about.p[0]") }}</p>
        <p>{{ $t("about.p[1]") }}</p>
        <p>{{ $t("about.p[2]") }}</p>
        <p>{{ $t("about.p[3]") }}</p>
        <span class="disclaimer">{{ $t("about.disclaimer") }}</span>
      </div>
    </tab>
  </div>
</template>
<style lang="scss" scoped>
.page {
  min-width: 800px;

  .about-me {
    >h1 {
      font-weight: normal;
      font-family: monospace;
      color: #3f3f3f;
      border-bottom: 1px solid #bbbbbb;
      font-size: 1.5em;
      margin: 0 0 10px 0;
      padding: 0 0 5px 0;
    }

    .disclaimer {
      margin-top: 1in;
      font-size: 0.8em;
    }
  }
}
</style>
