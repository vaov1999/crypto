<template>
  <div class="trade-list">
    <div class="trade-list__head">Панель котировок</div>
    <table class="trade-list__table">
      <thead>
        <tr class="head">
          <th class="head-column">Валютные пары</th>
          <th class="head-column">Изменение</th>
          <th class="head-column">Цена</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in tradeList"
          :key="index"
          class="item"
          :class="{ 'item--active': item.isActive }"
        >
          <td class="item-column">{{ item.pairsTitle }}</td>
          <td class="item-column">
            <img
              v-show="item.isDynamicPositive"
              src="@/assets/images/arrow-green.svg"
            />
            <img
              v-show="!item.isDynamicPositive"
              src="@/assets/images/arrow-red.svg"
            />
            <span class="change-number">{{ item.priceChange }} %</span>
          </td>
          <td class="item-column">{{ item.lastPrice }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'TradeList',
  props: {
    tradeList: {
      type: Object,
      default: () => false,
    },
  },
}
</script>

<style scoped lang="sass">
.trade-list
  width: 100%
  height: 100%
  background-color: $darkGray
  border-right: solid $black 10px
  &__head
    padding: 22px 35px
    font-size: $fs1
    color: $white
    text-transform: uppercase
    border-bottom: solid 3px $black
  &__table
    width: 100%
    padding: 20px 40px 20px 35px
    border-collapse: collapse
    .head-column
      padding-top: 20px
      padding-bottom: 7px
      text-align: left
      font-size: $fs3
      color: $lightGray
    .head-column:first-child
      padding-left: 35px
    .head-column:last-child
      padding-right: 35px
      text-align: right
    .item
      height: 46px
    .item--active
      background: $gd
    .item-column
      vertical-align: middle
      font-size: $fs2
      color: $white
      font-weight: 600
      &:first-child
        padding-left: 35px
      &:last-child
        text-align: right
        padding-right: 40px
    .change-number
      margin-left: 8px


  @media (max-width: $xxl)
    &__table
      .head-column
        font-size: $fs4
      .item-column
        font-size: $fs4
  @media (max-width: $lg)
    overflow-y: auto
    height: 300px
    border-right: none
    order: 2
    &__head
      display: none
    &__table
      overflow-y: auto
</style>
