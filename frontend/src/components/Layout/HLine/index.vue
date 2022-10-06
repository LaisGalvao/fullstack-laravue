<template>
  <div>
    <span></span>
    <span class="title">{{ label }}</span>
    <span></span>
  </div>
</template>

<style src="./style.styl" lang="stylus" scoped></style>

<script>
export default {
  props: {
    label: {
      type: String,
      default: 'no label'
    }
  }
}
</script>
