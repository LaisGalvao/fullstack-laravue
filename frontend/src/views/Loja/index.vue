<template>
  <!--  -->
  <div v-if="$route.name == 'Loja'">
    <Title :btnLabel="'Salvar'" @title-btn="submit">
      <div>Customizar Loja</div>
    </Title>
    <Interface>
      <HLine :label="'Regras'" />
      <div style="margin-left: 5%"><Table /></div>
    </Interface>
  </div>
</template>

<script>
import HLine from '../../components/Layout/HLine'
import Interface from '../../components/Layout/Interface'
import Title from '../../components/Layout/Title'
import Table from '../../components/Table'
import { toast } from '@/utils'
import { api } from '@/services'
export default {
  components: {
    Interface: Interface,
    Title: Title,
    HLine: HLine,
    Table: Table
  },
  methods: {
    submit (val, form) {
      console.log(val)
      console.log(form)
      this.$store.getters.edit.map((a) => {
        val = a
        form = Object.assign(
          {},
          { group_id: this.$store.getters.groupID, ...val }
        )
        console.log(form)
        api.put('/group/update', form).then(
          (response) => {
            if (response.status === 200) {
              toast(this, 'success', 'Estilos editados com sucesso', 'Sucesso')
              this.$store.dispatch('edit', form)
            }
          },
          (error) => {
            toast(this, 'danger', 'Registro inválido', error.message)
            return Promise.reject(error)
          }
        )
      })
    }
  }
}
</script>
<style lang="stylus">
@import '../../style/colors.styl';
</style>
