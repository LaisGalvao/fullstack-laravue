<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-1"
        label="URL:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.url"
          type="text"
          placeholder="URL"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Título:" label-for="input-2">
        <b-form-input
          id="input-2"
          type="text"
          v-model="form.titulo"
          placeholder="Título"
          required
        ></b-form-input>
      </b-form-group>

       <b-form-group id="input-group-3" label="Label:" label-for="input-3">
        <b-form-input
          id="input-3"
          type="text"
          v-model="form.label"
          placeholder="Label"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="reset" variant="danger">Cancelar</b-button>
      <b-button type="submit" variant="primary">Cadastrar</b-button>

    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </div>
</template>

<script>
import api from '../services'
export default {
  data () {
    return {
      form: {
        url: '',
        titulo: '',
        label: ''
      },
      show: true
    }
  },
  methods: {
    onSubmit (event) {
      event.preventDefault()
      alert(JSON.stringify(this.form))
      api.post('artigo', JSON.stringify(this.form)).then(response => {
        console.log(response)
        this.form = response.data.data
      })
    },
    onReset (event) {
      event.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.name = ''
      this.form.food = null
      this.form.checked = []
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>
