<script lang="ts">
import Console from './Console.vue';
import TabGroup from './TabGroup.vue';
export default {
  name: "HomePage",
  components: { TabGroup, Console },
  data() {
    return {
      musicTab: {
        loaded: false,
        html: ""
      },
      consoleTab: {
        active: false
      },
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
          contentLabel: "music.tab",
          action: () => {
            this.loadMusic();
            return true;
          }
        },
        {
          icon: "fas fa-cogs",
          slotName: "resources",
          contentLabel: "resources.tab"
        },
        {
          icon: "fas fa-terminal",
          slotName: "console",
          contentLabel: "console.tab",
          action: () => { window.open('/console/console.html', 'Console', 'width=837,height=528'); return false; }
        }
      ]
    }
  },
  methods: {
    loadMusic() {
      if (!this.musicTab.loaded) {
        this.musicTab.loaded = true;
        this.musicTab.html = '<iframe width="100%" height="450" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/477779040&color=%23dcd4d0&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>';
      }
    }
  }
}
</script>
<template>
  <div class="page">
    <div class="bar">
      <div class="welcome">
        <img :src="'/images/icon.gif'">
        <span>{{ $t("welcomeMessage") }}</span>
      </div>
    </div>
    <tab-group v-model:tabs="tabs">
      <template v-slot:blog>
        <ul class="blog-index">
          <li>
            <a href="/blogposts/20180910.html" rel="noopener" target="_blank">
              <span class="publish-date">2018.09.10</span>
              Topic 3 - Coding Healthy
            </a>
          </li>
          <li>
            <a href="/blogposts/20180708.html" rel="noopener" target="_blank">
              <span class="publish-date">2018.07.08</span>
              Topic 2 - Recovering From Mistakes</a>
          </li>
          <li>
            <a href="/blogposts/20180317.html" rel="noopener" target="_blank">
              <span class="publish-date">2018.03.17</span>
              Topic 1 - Condition Engine
            </a>
          </li>
        </ul>
      </template>
      <template v-slot:about>
        <div class="about-me">
          <h1>{{ $t("about.s1h1") }}</h1>
          <p
           v-for="p in $tm('about.s1p')"
           :key="p"
          >
            {{ p }}
          </p>          
        </div>
      </template>
      <template v-slot:music>
        <div v-if="musicTab.loaded" v-html="musicTab.html" />
      </template>
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
          <li>
            {{ $t('resources.r3.p1') }}
            <a href="https://css-tricks.com/old-timey-terminal-styling/">{{ $t('resources.r3.link') }}</a>
            {{ $t('resources.r3.p2') }}
          </li>
        </ul>
      </template>
      <template v-slot:console>
        <console v-if="consoleTab.active" />
      </template>
    </tab-group>
    <div class="bar">
      <span class="footnote">{{ $t('specialThanks') }}</span>
      <div class="social-wrap">
        <div class="social">
          <a target="_blank" href="https://github.com/Iubalus"><font-awesome-icon icon="fab fa-github" />GitHub</a>
        </div>
        <div class="social">
          <a target="_blank" href="https://soundcloud.com/user-373522736"><font-awesome-icon
              icon="fab fa-soundcloud" />SoundCloud</a>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "common";

.page {
  min-width: 800px;

  table {
    border-spacing: 0px;

    td {
      padding: 0;
    }
  }

  .offscreen {
    position: absolute;
    left: -1000px;
  }

  .bar {
    min-height: 186px;
    padding: 10px;
    background: $theme;
    margin-bottom: 0px;
    margin-top: 10px;

    &:first-of-type {
      margin-bottom: 10px;
      margin-top: 0px;
    }
  }

  .hidden {
    display: none !important;
  }

  .welcome {
    position: relative;
    height: 160px;
    margin-bottom: 10px;

    img {
      position: absolute;
      left: 10px;
      top: 0;
      height: 160px;
      padding: 10px;
      background: white;

      &:hover {
        cursor: pointer;
        filter: brightness(120%);
      }
    }

    span {
      font-family: monospace;
      font-style: italic;
      position: absolute;
      top: 115px;
      left: 177px;
      font-size: 1.4em;
      position: relative;
      background: $bubble-color;
      border-radius: .4em;
      padding: 20px;

      &:after {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        width: 0px;
        height: 0;
        border: 15px solid transparent;
        border-right-color: $bubble-color;
        border-left: 0;
        border-bottom: 0;
        margin-top: -3px;
        margin-left: -14px;
      }
    }
  }

  .about-me {
    max-width: 8.5in;
    padding: 0.5in 1in;

    >h1 {
      font-weight: normal;
      font-family: monospace;
      color:black;
      border-bottom: 1px solid #bbbbbb;
      font-size: 1.5em;
      margin: 0 0 10px 0;
      padding: 0 0 5px 0;
    }


    >div {
      margin-bottom: 10px;
    }
  }

  .footnote {
    padding: 10px 5px;
    font-style: italic;    
  }

  .control-table {
    width: 100%;

    td+td {
      padding-left: 10px;
    }
  }

  @media only screen and (max-width: 1000px) {
    
    .welcome {
      span {
        display: none;
      }
    }
  }

  .social-wrap {
    margin-top: 25px;
    width: 100%;

    .social {
      display: inline;
      font-size: 1.3em;

      &+.social {
        margin-left: 20px;
      }

      a {
        svg {
          padding-right: 5px;
          color: $social;
        }

        color:black;
        text-decoration:none;
        padding-left:10px;
      }
    }
  }

  .blog-index {
    padding: 5px 10px;
    list-style-type: none;

    li {
      padding: 10px;

      a {
        text-decoration: none;
      }

      &:hover {
        cursor: pointer;
        background: lighten($primary, 40%);
      }
    }

    &:first-of-type {
      margin-top: 0px;
    }

    .publish-date {
      padding-right: 20px;
      font-size: 0.8em;
      font-style: italic;
    }
  }
}
</style>
