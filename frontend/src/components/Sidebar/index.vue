<template>
  <div class="wrapper">
    <div class="sidebar">
      <ul>
        <router-link
          tag="li"
          :to="{ name: 'Planos' }"
          active-class="current-page"
          ><i class="menu-icon icon-custom-home"></i
          ><span>Início</span></router-link
        >

        <router-link
          v-for="tab in tabs"
          :key="tab.key"
          :to="tab.title"
          tag="li"
          active-class="current-page"
        >
          <!-- Custom icons -->
          <i
            v-if="tab.icon.custom"
            :class="'menu-icon icon-custom-' + tab.icon.key"
          ></i>

          <span>{{ tab.title }}</span>
        </router-link>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    tabs () {
      return this.$store.state.dashboard.filter(
        (a) =>
          !a.noMenu &&
          (!a.only ||
            this.$store.state.user.groups.reduce(
              (v, g) => v || a.only.includes(g.key),
              false
            ))
      )
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '../../style/colors.styl';
@import '../../style/dimens.styl';
// @import '../../style/fonts.styl';
@import '../../style/mixins.styl';

// ----------------------------------
// Dimensions
// ----------------------------------
sidebar-width = 64px; // 20%

// ----------------------------------
// Sidebar
// ----------------------------------
.sidebar {
  background-color: #F4F4F4;
  // display flex
  // justify-content space-between
  // align-items center
  position: fixed;
  width: sidebar-width;
  top: topbar-height;
  min-height: 100%;
  z-index: 10;
  filter: drop-shadow(2px 0px 1px rgba(0, 0, 0, 0.2));
  transition: 0.2s ease-in-out;

  @media (max-width: sm) {
    top: topbar-height * topbar-sm-resize;
  }

  &:hover {
    width: 192px;

    ul li {
      justify-content: left;
      padding-left: 20px; // (64 - 24) / 2
      transition: 0s;

      span {
        opacity: 1;
        left: 20px;
      }
    }
  }
}

.wrapper {
  width: sidebar-width;
  min-height: 100%;
}

// ----------------------------------
// Items
// ----------------------------------
ul {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    position: relative;
    width: 100%;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.2s ease-in-out;
    cursor: pointer;
    nowrap();
    no-select();

    &:hover {
      background-color: #E4E4E4;
    }

    i {
      position: absolute;
      left: 20px;
      font-size: 24px;
      height: 24px;
    }

    span {
      opacity: 0;
      left: 0;
      transition: 0.2s ease-in-out;
      position: absolute;
      margin: 3px 0 0 36px;
      font-weight: bold;
    }
  }
}
</style>
