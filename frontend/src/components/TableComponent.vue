<template>
  <div :v-for="item in items" :key="item.id">
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ item }}</pre>
    </b-card>
  </div>
</template>

<script>
export default {
  props: ['item']
}
</script>

<style>

</style>
