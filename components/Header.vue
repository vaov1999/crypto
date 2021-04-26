<template>
  <div class="header">
    <nuxt-link to="/">
      <img
        class="header__image"
        src="@/assets/images/logo-main.svg"
        alt="Crypto"
      />
    </nuxt-link>
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
  @media (max-width: $xs)
    height: 30px
    border-bottom: solid 1px $black
    &__image
      height: 11px
      width: 64px
</style>
