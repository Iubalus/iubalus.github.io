<script lang="ts">
import TabGroup from './TabGroup.vue';
export default {
  name: "HomePage",
  components: { TabGroup },
  data() {
    return {
      tabs: [
        {
          icon: "fas fa-book",
          slotName: "blog",
          contentLabel: "blog.tab"
        },
        {
          icon: "fas fa-coffee",
          slotName: "about",
          contentLabel: "about.tab",
          active: true
        },
        {
          icon: "fas fa-music",
          slotName: "music",
          contentLabel: "music.tab"
        },
        {
          icon: "fas fa-cogs",
          slotName: "resources",
          contentLabel: "resources.tab"
        },
        {
          icon: "fas fa-terminal",
          slotName: "console",
          contentLabel: "console.tab"
        }
      ]
    }
  }
}
</script>
<template>
  <div class="page">
    <tab-group v-model:tabs="tabs">
      <template v-slot:blog>Blog Content Here</template>
      <template v-slot:about>
        <div class="about-me">
        <h1>{{ $t("about.h1") }}</h1>
        <p>{{ $t("about.p[0]") }}</p>
        <p>{{ $t("about.p[1]") }}</p>
        <p>{{ $t("about.p[2]") }}</p>
        <p>{{ $t("about.p[3]") }}</p>
        <span class="disclaimer">{{ $t("about.disclaimer") }}</span>
      </div>
      </template>
      <template v-slot:music>Music Content Here</template>
      <template v-slot:resources>
        <ul>
          <li>
            {{ $t('resources.r1.p1') }}
            <a href="https://pages.github.com/">
              {{ $t('resources.r1.link') }}
            </a>
            {{ $t('resources.r1.p2') }}
          </li>
          <li>
            {{ $t('resources.r2.p1') }}
            <a href="https://projects.verou.me/bubbly/">
              {{ $t('resources.r2.link') }}
            </a>
            {{ $t('resources.r2.p2') }}
          </li>
        </ul>
      </template>
      <template v-slot:console>Console Content Here</template>
    </tab-group>
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
