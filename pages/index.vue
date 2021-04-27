<template>
  <div class="home">
    <TradeList :trade-list="streamData" />
    <div class="charts"></div>
  </div>
</template>

<script>
import TradeList from '@/components/TradeList'
export default {
  name: 'PagesIndex',
  components: { TradeList },
  data() {
    return {
      streamData: {
        btc: {
          data: null,
          lastPrice: null,
          priceChange: null,
          pairsTitle: 'USD | BTC',
          isActive: true,
          isDynamicPositive: null,
        },
        bth: {
          data: null,
          lastPrice: null,
          priceChange: null,
          pairsTitle: 'USD | BTH',
          isActive: false,
          isDynamicPositive: null,
        },
        eth: {
          data: null,
          lastPrice: null,
          priceChange: null,
          pairsTitle: 'USD | ETH',
          isActive: false,
          isDynamicPositive: null,
        },
        xrp: {
          data: null,
          lastPrice: null,
          priceChange: null,
          pairsTitle: 'USD | XRP',
          isActive: false,
          isDynamicPositive: null,
        },
      },
    }
  },
  mounted() {
    const API_KEY =
      '63163fc38a6c7d6f2a83853c409af0f118be578f69e3d0a649c65cfcb6983606'
    const VM = this

    this.getMinutePairs()
    setInterval(() => this.getMinutePairs(), 60000)

    const ccStreamer = new WebSocket(
      'wss://streamer.cryptocompare.com/v2?api_key=' + API_KEY
    )
    ccStreamer.onopen = function onStreamOpen() {
      const subRequest = {
        action: 'SubAdd',
        subs: [
          '5~CCCAGG~BTC~USD',
          '5~CCCAGG~ETH~USD',
          '5~CCCAGG~BTH~USD',
          '5~CCCAGG~XRP~USD',
        ],
      }
      ccStreamer.send(JSON.stringify(subRequest))
    }

    ccStreamer.onmessage = function onStreamMessage(message) {
      const RESPONSE = JSON.parse(message.data)
      switch (RESPONSE.FROMSYMBOL) {
        case 'BTC':
          if (RESPONSE.PRICE) {
            VM.streamData.btc.lastPrice = RESPONSE.PRICE
          }
          return (VM.streamData.btc.data = RESPONSE)

        case 'ETH':
          if (RESPONSE.PRICE) {
            VM.streamData.eth.lastPrice = RESPONSE.PRICE
          }
          return (VM.streamData.eth.data = RESPONSE)

        case 'BTH':
          if (RESPONSE.PRICE) {
            VM.streamData.bth.lastPrice = RESPONSE.PRICE.toFixed(4)
          }
          return (VM.streamData.bth.data = RESPONSE)

        case 'XRP':
          if (RESPONSE.PRICE) {
            VM.streamData.xrp.lastPrice = RESPONSE.PRICE
          }
          return (VM.streamData.xrp.data = RESPONSE)

        default:
          console.log('WHAT??? ', RESPONSE)
      }
    }
  },
  methods: {
    calculatePairChange(low, high, coin) {
      const ACTION_1 = (low / high) * 100
      const ACTION_2 = 100 - ACTION_1

      this.streamData[coin].isDynamicPositive = ACTION_2 >= 0

      this.streamData[coin].priceChange = ACTION_2.toFixed(2)

      console.log(
        this.streamData[coin].priceChange,
        this.streamData[coin].isDynamicPositive
      )
    },
    getMinutePairs() {
      const LIMIT_COUNT = 200
      fetch(
        `https://min-api.cryptocompare.com/data/v2/histominute?fsym=BTC&tsym=USD&limit=${LIMIT_COUNT}`
      )
        .then((response) => response.json())
        .then((res) =>
          this.calculatePairChange(
            res.Data.Data[0].low,
            res.Data.Data[res.Data.Data.length - 1].high,
            'btc'
          )
        )
      fetch(
        `https://min-api.cryptocompare.com/data/v2/histominute?fsym=ETH&tsym=USD&limit=${LIMIT_COUNT}`
      )
        .then((response) => response.json())
        .then((res) =>
          this.calculatePairChange(
            res.Data.Data[0].low,
            res.Data.Data[res.Data.Data.length - 1].high,
            'eth'
          )
        )
      fetch(
        `https://min-api.cryptocompare.com/data/v2/histominute?fsym=BTH&tsym=USD&limit=${LIMIT_COUNT}`
      )
        .then((response) => response.json())
        .then((res) =>
          this.calculatePairChange(
            res.Data.Data[0].low,
            res.Data.Data[res.Data.Data.length - 1].high,
            'bth'
          )
        )
      fetch(
        `https://min-api.cryptocompare.com/data/v2/histominute?fsym=XRP&tsym=USD&limit=${LIMIT_COUNT}`
      )
        .then((response) => response.json())
        .then((res) =>
          this.calculatePairChange(
            res.Data.Data[0].low,
            res.Data.Data[res.Data.Data.length - 1].high,
            'xrp'
          )
        )
    },
  },
}
</script>

<style scoped lang="sass">
.home
  background-color: red
  height: calc(100vh - 60px)
  display: grid
  grid-template-columns: 530px 1fr
  @media (max-width: $xxl)
    grid-template-columns: 1fr 2fr
  @media (max-width: $lg)
    display: flex
    flex-direction: column
  @media (max-width: $xs)
    height: calc(100vh - 30px)
.charts
  height: 100%
  width: 100%
  background-color: #2CA15B
</style>
