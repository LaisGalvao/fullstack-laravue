<template>
  <div>
    <Topbar :user="user"></Topbar>
    <div class="frame">
      <Sidebar>
        <div class="content">
          <transition name="page-transition" mode="out-in">
            <router-view :name="$route.fullPath"></router-view>
          </transition>
        </div>
      </Sidebar>
      <div class="content"><Loja /><!-- <Home /><Usuarios /> --></div>
    </div>
  </div>
</template>

<style scoped lang="stylus">
@import '../style/colors.styl';
@import '../style/mixins.styl';
@import '../style/dimens.styl';

.frame {
  display: flex;

  &:last-child {
    flex-grow: 1;
  }

  .content {
    width: 80%;
  }
}

.page-transition-enter, .page-transition-leave-to {
  // transform translateX(-30px)
  opacity: 0;
}

.page-transition-enter-active, .page-transition-leave-active {
  transition: all 0.2s;
}
</style>

<script>
import Topbar from '@/components/Topbar'
import Sidebar from '@/components/Sidebar'
import Loja from './Loja'
/* import Usuarios from './Usuarios'
import Home from './Home' */

export default {
  name: 'Dashboard',
  components: { Topbar, Sidebar, Loja /* Home,Usuarios  */ },
  computed: {
    user () {
      return { name: this.$store.getters.userName, group: 'Nome do grupo' }
    }
  }
}
</script>
