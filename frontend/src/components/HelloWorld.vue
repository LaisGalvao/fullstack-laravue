<template>
  <div class="hello">
    <FormComponent />
      <TableComponent :item="items" :field="fields"/>
  </div>
</template>

<script>
import FormComponent from './FormComponent.vue'
import TableComponent from './TableComponent.vue'
import api from '../services'
export default {
  components: { FormComponent, TableComponent: TableComponent },
  name: 'HelloWorld',
  data () {
    return {
      items: [],
      fields: [{
        key: 'url',
        label: 'Url'
      }, {
        key: 'titulo',
        label: 'Titulo'
      }, {
        key: 'label',
        label: 'Label'
      }, {
        key: 'actions',
        label: ''
      }]
    }
  },
  mounted () {
    api.get('/artigos').then((response) => {
      this.items = response.data.data
      console.log(this.items)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
