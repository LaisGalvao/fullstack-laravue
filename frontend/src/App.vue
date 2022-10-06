<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="stylus">

@import 'style/colors.styl';

#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50

.form-group
    text-align left

    label
        color color-theme()
        padding 0 0.5rem
        margin 8px 0
        border-radius 1rem
        font-weight bold
        background secondary
        display inline-block !important

    .form-control, .form-control:focus, .custom-select
        background-color #F4F4F4
        color secondary
        border-color content

/*.form-control, .form-control:focus, .custom-select, .custom-select:focus
    background-color content-theme()
    color color-theme(true)
    border-color secondary*/

.form-control:focus, .custom-select:focus
    box-shadow 0 0 0 0.2rem alpha(secondary, .25)
</style>

<!--Custom icons-->
<style>
    @font-face {
        font-family: 'custom icons';
        src: url('assets/custom-icons/custom-icons.eot');
        src: url('assets/custom-icons/custom-icons.eot?#iefix') format('embedded-opentype'),
            url('assets/custom-icons/custom-icons.woff') format('woff'),
            url('assets/custom-icons/custom-icons.ttf') format('truetype'),
            url('assets/custom-icons/custom-icons.svg#custom-icons') format('svg');
        font-weight: normal;
        font-style: normal;
    }
    [class*='icon-custom-']:before{
        display: inline-block;
        font-family: 'custom icons';
        font-style: normal;
        font-weight: normal;
        line-height: 1;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        letter-spacing: normal;
        white-space: nowrap;
    }
    .icon-custom-group:before{content:'\0041';}
    .icon-custom-home:before{content:'\0042';}
    .icon-custom-maintenance:before{content:'\0043';}
    .icon-custom-system:before{content:'\0044';}
    .icon-custom-user:before{content:'\0045';}
</style>
