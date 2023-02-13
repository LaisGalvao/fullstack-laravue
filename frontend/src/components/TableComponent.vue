<template>
  <b-table striped hover :items="item" :fields="field">
    <template v-slot:cell()="{ value, item, field: { key }}">
      <template v-if="edit != item.id">{{ value }}</template>
    <b-form-input v-else v-model="item[key]" />
    </template>

    <template v-slot:cell(actions)="{ item: { id }}">
        <b-dropdown variant="primary" text="Ações">
          <b-dropdown-item @click="onEdit(id)">{{ edit === id ? 'Save' : 'Edit' }}</b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item @click="onDelete(id)">Delete</b-dropdown-item>
        </b-dropdown>
      </template></b-table>
</template>

<script>
export default {
  data () {
    return {
      edit: null
    }
  },
  props: ['item', 'field'],
  methods: {
    onEdit (id) {
      this.edit = this.edit !== id ? id : null
    },
    onDelete (id) {
      return id
    }
  }
}
</script>

<style>

</style>
