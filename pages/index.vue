<template>
  <div class="home">
    <TradeList :trade-list="streamData" />
    <client-only>
      <Chart :chart-data="historyData" />
    </client-only>
  </div>
</template>

<script>
import TradeList from '@/components/TradeList'
import Chart from '@/components/Chart'
export default {
  name: 'PagesIndex',
  components: { Chart, TradeList },
  data() {
    return {
      streamData: {
        btc: {
          data: null,
          id: 'BTC',
          lastPrice: null,
          priceChange: null,
          pairsTitle: 'USD | BTC',
          isActive: true,
          isDynamicPositive: null,
        },
        bth: {
          data: null,
          id: 'BTH',
          lastPrice: null,
          priceChange: null,
          pairsTitle: 'USD | BTH',
          isActive: false,
          isDynamicPositive: null,
        },
        eth: {
          data: null,
          id: 'ETH',
          lastPrice: null,
          priceChange: null,
          pairsTitle: 'USD | ETH',
          isActive: false,
          isDynamicPositive: null,
        },
        xrp: {
          data: null,
          id: 'XRP',
          lastPrice: null,
          priceChange: null,
          pairsTitle: 'USD | XRP',
          isActive: false,
          isDynamicPositive: null,
        },
      },
      historyData: {
        btc: {
          data: null,
          isActive: false,
        },
        bth: {
          data: null,
          isActive: false,
        },
        eth: {
          data: null,
          isActive: false,
        },
        xrp: {
          data: null,
          isActive: false,
        },
      },
    }
  },
  mounted() {
    const API_KEY =
      '63163fc38a6c7d6f2a83853c409af0f118be578f69e3d0a649c65cfcb6983606'
    const VM = this
    const HOURLY_PAIR = 'histohour'
    const MINUTE_PAIR = 'histominute'

    for (const COIN_KEY in this.streamData) {
      const COIN_TYPE = this.streamData[COIN_KEY].id
      this.getPairs(COIN_KEY, COIN_TYPE, MINUTE_PAIR)
      this.getPairs(COIN_KEY, COIN_TYPE, HOURLY_PAIR)
    }

    setInterval(() => {
      for (const COIN_KEY in this.streamData) {
        const COIN = this.streamData[COIN_KEY].id
        this.getPairs(COIN_KEY, COIN, MINUTE_PAIR)
      }
    }, 60000)

    const STREAM = new WebSocket(
      'wss://streamer.cryptocompare.com/v2?api_key=' + API_KEY
    )
    STREAM.onopen = function onStreamOpen() {
      const subRequest = {
        action: 'SubAdd',
        subs: [
          '5~CCCAGG~BTC~USD',
          '5~CCCAGG~ETH~USD',
          '5~CCCAGG~BTH~USD',
          '5~CCCAGG~XRP~USD',
        ],
      }
      STREAM.send(JSON.stringify(subRequest))
    }

    STREAM.onmessage = function onStreamMessage(message) {
      const RESPONSE = JSON.parse(message.data)
      const COIN_TYPES = []

      for (const COIN_KEY in VM.streamData) {
        const COIN_TYPE = VM.streamData[COIN_KEY].id
        COIN_TYPES.push(COIN_TYPE)
      }

      if (COIN_TYPES.includes(RESPONSE.FROMSYMBOL)) {
        for (const COIN_KEY in VM.streamData) {
          const COIN_TYPE = VM.streamData[COIN_KEY].id

          if (RESPONSE.FROMSYMBOL === COIN_TYPE) {
            if (RESPONSE.PRICE) {
              if ((RESPONSE.PRICE * 10000) % 1) {
                VM.streamData[COIN_KEY].lastPrice = RESPONSE.PRICE.toFixed(4)
              } else {
                VM.streamData[COIN_KEY].lastPrice = RESPONSE.PRICE
              }
            }

            return (VM.streamData[COIN_KEY].data = RESPONSE)
          }
        }
      }
    }
  },
  methods: {
    calculatePairChange(low, high, coin) {
      const PAIR_CHANGE = 100 - (low / high) * 100

      this.streamData[coin].isDynamicPositive = PAIR_CHANGE >= 0
      this.streamData[coin].priceChange = PAIR_CHANGE.toFixed(2)
    },
    getPairs(coinKey, coinType, histoType) {
      const MINUTE_PAIR = 'histominute'
      let LIMIT_COUNT = null

      histoType === MINUTE_PAIR ? (LIMIT_COUNT = 200) : (LIMIT_COUNT = 7)

      fetch(
        `https://min-api.cryptocompare.com/data/v2/${histoType}?fsym=${coinType}&tsym=USD&limit=${LIMIT_COUNT}`
      )
        .then((response) => response.json())
        .then((res) => {
          if (histoType === MINUTE_PAIR) {
            this.calculatePairChange(
              res.Data.Data[0].low,
              res.Data.Data[res.Data.Data.length - 1].high,
              coinKey
            )
          } else {
            this.historyData[coinKey].data = res
          }
        })
    },
  },
}
</script>

<style scoped lang="sass">
.home
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
</style>
