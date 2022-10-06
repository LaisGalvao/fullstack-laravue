<template>
  <div v-if="$route.name == 'Dashboard'">
    <Title noBtn>
      <div>Bem vindo @{{ $store.state.user.name }} ao sistema Gold</div>
    </Title>

    <!-- temporário -->
  <!--   <div v-for="card in cards" :key="card.id" class="grid-container">
      <b-card :class="card.class">
        <b-card-text
          ><span class="material-icons ico-card"> circle </span></b-card-text
        >
      </b-card>
    </div> -->
  </div>
</template>
<script>
import Title from '../../components/Layout/Title'
export default {
  data () {
    return {
      /*  cards: [
        { id: 1, class: 'text-center' },
        { id: 2, class: 'text-center' },
        { id: 3, class: 'text-center' },
        { id: 4, class: 'text-center' }
      ] */
    }
  },
  components: {
    Title
  }
}
</script>
<style lang="stylus">
.grid-container {
  display: inline-flex;
  grid-template-columns: auto auto auto;
  padding: 10px 20px;
}

.card {
  width: 300px;
  height: 300px;
  border-style: 3px dashed slategray;
}

.ico-card {
  color: slategray;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
