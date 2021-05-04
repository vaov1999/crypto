<template>
  <div>
    <div class="header">
      <nuxt-link to="/">
        <img
          class="header__image"
          src="@/assets/images/logo-main.svg"
          alt="Crypto"
        />
      </nuxt-link>
    </div>
    <div class="panel">Панель котировок</div>
  </div>
</template>

<style lang="sass" scoped>
.header
  display: flex
  justify-content: center
  align-items: center
  width: 100%
  height: 60px
  background-color: $darkGray
  border-bottom: solid 10px $black
  &__image
    height: 19px
    width: 108px


  @media (max-width: $lg)
    border-bottom: solid 1px $black
  @media (max-width: $xs)
    height: 30px
    &__image
      height: 11px
      width: 64px
.panel
  display: none
  align-items: center
  padding-left: 15px
  width: 100%
  height: 27px
  background-color: $darkGray
  border-bottom: solid 2px $black
  font-size: 14px
  line-height: 21px
  font-weight: 600
  color: $white
  @media (max-width: $lg)
    display: flex
</style>
