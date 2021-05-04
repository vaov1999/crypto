<template>
  <div class="home">
    <TradeList :trade-list="streamData" @toggleActiveCoin="toggleActiveCoin" />
    <client-only>
      <Chart
        v-if="historyData[currentHistoryCoin].data"
        :chart-data="historyData[currentHistoryCoin].data"
      />
      <ChartLoader v-else />
    </client-only>
  </div>
</template>

<script>
import TradeList from '@/components/TradeList'
import Chart from '@/components/Chart'
import ChartLoader from '@/components/ChartLoader'
export default {
  name: 'PagesIndex',
  components: { Chart, TradeList, ChartLoader },
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
          id: 'BTC',
          data: null,
          isActive: true,
        },
        bth: {
          data: null,
          id: 'BTH',
          isActive: false,
        },
        eth: {
          data: null,
          id: 'ETH',
          isActive: false,
        },
        xrp: {
          data: null,
          id: 'XRP',
          isActive: false,
        },
      },
    }
  },
  computed: {
    currentHistoryCoin() {
      for (const key in this.historyData) {
        if (this.historyData[key].isActive) {
          return key
        }
      }

      return false
    },
  },
  mounted() {
    const API_KEY =
      '63163fc38a6c7d6f2a83853c409af0f118be578f69e3d0a649c65cfcb6983606'
    const VM = this
    const DAY_PAIR = 'histoday'
    const HOUR_PAIR = 'histohour'

    for (const COIN_KEY in this.streamData) {
      this.getPairs(COIN_KEY, this.streamData[COIN_KEY].id, HOUR_PAIR)
    }

    for (const COIN_KEY in this.historyData) {
      this.getPairs(COIN_KEY, this.streamData[COIN_KEY].id, DAY_PAIR)
    }

    setInterval(() => {
      for (const COIN_KEY in this.streamData) {
        this.getPairs(COIN_KEY, this.streamData[COIN_KEY].id, HOUR_PAIR)
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
        COIN_TYPES.push(VM.streamData[COIN_KEY].id)
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
    toggleActiveCoin(item) {
      for (const coin in this.streamData) {
        this.streamData[coin].isActive = this.streamData[coin].id === item.id
      }
      for (const coin in this.historyData) {
        this.historyData[coin].isActive = this.historyData[coin].id === item.id
      }
    },
    calculatePairChange(low, high, coin) {
      const PAIR_CHANGE = 100 - (low / high) * 100

      this.streamData[coin].isDynamicPositive = PAIR_CHANGE >= 0
      this.streamData[coin].priceChange = PAIR_CHANGE.toFixed(2)
    },
    getPairs(coinKey, coinType, histoType) {
      const HOUR_PAIR = 'histohour'
      let LIMIT_COUNT = null

      histoType === HOUR_PAIR ? (LIMIT_COUNT = 10) : (LIMIT_COUNT = 100)

      fetch(
        `https://min-api.cryptocompare.com/data/v2/${histoType}?fsym=${coinType}&tsym=USD&limit=${LIMIT_COUNT}`
      )
        .then((response) => response.json())
        .then((res) => {
          if (histoType === HOUR_PAIR) {
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
    height: calc(100vh - 87px)
    display: flex
    flex-direction: column
  @media (max-width: $xs)
    height: calc(100vh - 57px)
</style>
