<template>
  <div>
    <div class="interface-body">
      <!-- Interface Header -->

      <div class="interface-header" v-if="!noHeader">
        <div class="interface-header-wrapper">
          <span
            @click="filterSwitch"
            :class="'filter' + (filter ? ' actived' : '')"
            ><i class="material-icons-outlined">filter_alt</i>Filtrar</span
          >
          <span class="v-separator"></span>
          <b-form-select
            id="sort-by-select"
            @change="$emit('sort', $event, direction)"
            :options="sortOptions"
            v-model="sortBy"
            class="select"
          >
            <span class="material-icons-outlined"> arrow_drop_down </span>
            <template #first>
              <b-form-select-option :value="undefined" disabled
                >Ordenar Por</b-form-select-option
              >
            </template>
          </b-form-select>
        </div>
      </div>
    </div>
    <div class="slot-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    sortBy: undefined,
    filter: false,
    direction: true // up true = asc, down false = desc
  }),

  methods: {
    filterSwitch () {
      this.filter = !this.filter
      this.$emit('filter', this.filter)
    },
    firstSelect () {
      this.$emit('firstSelect')
    },

    toggleDirection () {
      this.direction = !this.direction
      if (this.sortBy) {
        this.$emit('sort', this.sortBy, this.direction)
      }
    }
  },
  props: {
    /*     title: { type: String, required: true }, */
    // Interface Header
    noHeader: { type: Boolean, default: false }, // true for not display header, filter and order by will not be trigger
    sortOptions: Array
  }
}
</script>
<style src="./style.styl" lang="stylus" scoped></style>
