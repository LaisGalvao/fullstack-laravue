<template>
  <div class="title">
    <!-- Title -->
    <slot>
      <h2>{{ title }}</h2>
    </slot>

    <!-- Button -->
    <template v-if="!noBtn">
      <div @click="$emit('title-btn')" class="title-btn">
        <!--   <i class="icon-btn material-icons">{{ btnIcon }}</i> -->
        <span>{{ btnLabel }}</span>
      </div>
    </template>
  </div>
</template>

<style src="./style.styl" lang="stylus" scoped></style>

<script>
export default {
  props: {
    title: { type: String, default: 'No Title' },
    noBtn: { type: Boolean, default: false },
    btnLabel: { type: String, default: '' }
    /*  btnIcon: { type: String, default: 'add' } */
  }
}
</script>
