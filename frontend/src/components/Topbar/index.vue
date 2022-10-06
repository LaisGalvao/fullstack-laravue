<template>
  <div class="wrapper">
    <div class="topbar">
      <div class="icon" @click="$router.push({ path: '/' })">
        <!--<i @click="toggleMenu" class= "menu-mobile-icon material-icons">menu</i>-->
        <i class="menu-mobile-icon material-icons">menu</i>
        <img src="@/assets/images/logo-menu.png" />
      </div>
      <div class="profile" v-if="hasUser">
        <div>
          <div class="img"></div>
        </div>
        <div style="cursor: pointer" @click="openModal">
          <span class="name">{{ user.name }}</span>
          <span class="group">{{ $store.state.user.email }}</span>
        </div>
      </div>
      <div class="button" v-if="hasButton">
        <div @click="buttonEmit">{{ btnLabel }}</div>
      </div>
    </div>

    <b-modal id="profile" v-model="modal" size="md" centered>
      <template #modal-header></template>
      <div
        class="
          d-flex
          flex-column
          justify-content-center
          align-items-center
          mb-2
        "
      >
        <span class="m-name">{{ $store.state.user.name }}</span>
        <span class="m-email">{{ $store.state.user.email }}</span>
      </div>
      <div class="d-flex flex-column justify-content-center options">
        <!--      <span @click="openModalUser"
          ><i class="material-icons-outlined">edit</i>Editar Perfil</span
        >
        <hr />
        <span @click="changePassword"
          ><i class="material-icons-outlined">vpn_key</i>Alterar a senha</span
        >
        <hr />
        <span
          ><i class="material-icons-outlined">settings</i>Configurações</span
        >
        <hr /> -->
        <span @click="logout" class="span-logout"
          ><i class="material-icons-outlined">logout</i>Sair</span
        >
      </div>
      <template #modal-footer>
        <span></span>
      </template>
    </b-modal>
  </div>
</template>

<style lang="stylus" scoped>
@import '../../style/colors.styl';
@import '../../style/dimens.styl';
// @import '../../style/fonts.styl';
@import '../../style/mixins.styl';

// ----------------------------------
// Dimensions
// ----------------------------------
logoPadding = 8px;
logoPadding-sm = logoPadding * topbar-sm-resize;
height-sm = topbar-height * topbar-sm-resize;

// ----------------------------------
// Topbar
// ----------------------------------
.topbar {
  background-color: primary;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 10;
  max-height: topbar-height;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

  @media (max-width: sm) {
    max-height: height-sm;
  }
}

.wrapper {
  height: topbar-height;

  @media (max-width: sm) {
    height: height-sm;
  }
}

// ----------------------------------
// Icon (Logo)
// ----------------------------------
.icon {
  padding: logoPadding;
  cursor: pointer;

  @media (max-width: sm) {
    padding: logoPadding-sm;
  }

  img {
    max-height: topbar-height - 2 * logoPadding;
    no-select();

    @media (max-width: sm) {
      max-height: (topbar-height - 2 * logoPadding) * topbar-sm-resize;
    }
  }

  .menu-mobile-icon {
    font-size: 48px;
    height: 48px;
    display: none;
    vertical-align: middle;
  }
}

// ----------------------------------
// Profile (User logged)
// ----------------------------------
.profile {
  margin: 0 20px 0 auto;
  display: flex;

  & > div {
    display: flex;
    flex-direction: column;
    text-align: left;
    padding: 0px 8px;
  }

  .img {
    background-color: content;
    border-radius: 8px;
    width: 48px;
    height: 48px;
  }

  .name {
    font-weight: bold;
    font-size: 1em;
    color: dark;
  }

  .group {
    font-size: 0.75em;
    color: light;
  }
}

// ----------------------------------
// Button event
// ----------------------------------
.button {
  margin-right: 2.5%;

  & > div {
    background-color: color-theme(true);
    color: color-theme();
    border-radius: 8px;
    padding: 8px 24px;
    cursor: pointer;

    @media (max-width: sm) {
      font-size: 14px;
      padding: 5px 15px;
    }
  }
}
</style>

<script>
import { api } from '../../services'
export default {
  props: {
    user: {
      type: Object,
      required: false
    },
    btnLabel: {
      type: String,
      required: false
    }
  },
  computed: {
    hasUser () {
      return !!this.user
    },
    hasButton () {
      return !!this.btnLabel
    }
  },
  data () {
    return {
      modal: false
    }
  },
  methods: {
    buttonEmit () {
      this.$emit('button')
    },
    openModal () {
      this.modal = true
    },
    logout: function () {
      // this.$store.dispatch("logout");
      // this.$router.replace({ name: "Login" });
      api.get('auth/logout', {}).then(
        (response) => {
          // if (response.status === 200) {
          this.$store.dispatch('logout', response.data)
          this.$router.replace({ name: 'Login' })
          // this.$router.go()
          // }
        },
        (error) => {
          this.$store.dispatch('logout', undefined)
          // this.$router.replace({ name: "Login" });
          this.$router.go()
          return Promise.reject(error)
        }
      )
    }
  }
}
</script>
<style lang="stylus">
.span-logout {
  cursor: pointer;
}
</style>
