<template>
 <!-- Rederizando letreiro com as criptomoedas -->
  <div class="marquee h-19 overflow-hidden bg-black">
    <ul class="marquee-content h-full flex">
      <li class="flex-shrink-0 text-white scale-100" v-for="coin in tenItems" :key="coin.name">
        <div class="flex justify-between w-3/4">
          <div class="flex items-center">
            <img :src="coin.image" alt="coin logo" class="w-8 h-8 mr-4"/>
            <div class="hidden lg:block">
              <p class="uppercase font-bold ">{{ coin.symbol }} </p>
            </div>
          </div>
          <!-- Preço a ser mostrado das criptomoedas no letreiro -->
          <div>
            <p class="font-bold flex justify-center">
              {{$filters.comma_sep(coin.current_price)}}</p>
            <!-- Caso tenha queda valor da moeda, valor ficará vermelha -->
            <td class="font-bold">
              <div class="text-red-400" v-if="$filters.price_change(coin.price_change_percentage_24h)">
              {{coin.market_cap_change_percentage_24h}}%</div>
              <!-- Caso tenha alta valor da moeda, valor focará verde -->
              <div class="text-green-400" v-else>{{coin.market_cap_change_percentage_24h}}%</div>
            </td>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <section class="event">
    <div class="container mx-auto pt-18 py-24">
      <!-- Barra de pesquisa -->
      <div class="flex justify-end pb-2">
        <div class="relative">
          <input type="text" placeholder="Pesquisar" class="border border-gray-500 rounded p-2 focus:outline-none focus:ring focus:ring-gray-300" v-model="search"/></div>
      </div>
      <!-- Tabela com as criptomoedas -->
      <table class="table cursor-pointer">
        <!-- Definindo conteúdo da tabela -->
        <thead class="bg-gray-300 border-none">
          <tr class="text-center text-gray-600">
            <th class="w-1/4 p-4">Nome</th>
            <th class="w-1/4">Preço</th>
            <th class="w-1/4">Variação 24h</th>
            <th class="w-1/4">Capitalização de Mercado</th>
            <th class="w-1/4 pr-4" >Volume 24h</th>
          </tr>
        </thead>
        <!-- Dados da tabela -->
        <tbody class="divide-y">
          <tr class="text-center bg-transparent  hover:bg-black transition duration-300"
          v-for="coin in matchingNames" :key="coin.name"
          >
            <td class="font-bold text-gray-400 p-4 flex items-center">
              <img :src="coin.image" alt="coin logo" class="w-6 h-6 rounded-full mr-1"/>
              <p class="font-bold mr-4">{{coin.name}}</p>
              <p class="uppercase">{{coin.symbol}}</p>
            </td>
            <td class="font-bold text-white">${{$filters.comma_sep(coin.current_price)}}</td>
            <td class="font-bold text-white">
              <!-- Caso tenha queda valor da moeda, valor ficará vermelha -->
              <div class="text-red-500" v-if="$filters.price_change(coin.price_change_percentage_24h)">
                {{coin.market_cap_change_percentage_24h}}%
              </div>
              <!-- Caso tenha alta valor da moeda, valor focará verde -->
              <div class="text-green-500" v-else>{{coin.market_cap_change_percentage_24h}}%</div>
            </td>
            <td class="font-bold text-white"> ${{$filters.comma_sep(coin.market_cap)}}</td>
            <td class="font-bold text-white pr-4">{{$filters.comma_sep(coin.total_volume)}} </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
import './assets/tailwind.css'
import axios from 'axios'
import { computed, ref } from 'vue'

export default {
  name: 'App',
  setup () {
    const coins = ref([])
    const search = ref('')

    // api usada para coletar dados das moedas
    const getCoins = async () => {
      try {
        const res = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h')
        coins.value = res.data
      } catch (err) {
        console.log(err)
      }
    }

    setInterval(() => {
      getCoins()
    }, 1200)

    const tenItems = computed(() => {
      return coins.value.slice(0, 30)
    })

    const matchingNames = computed(() => {
      return coins.value.filter((coin) => coin.id.includes(search.value))
    })
    return { coins, tenItems, matchingNames, search }
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
}
.marquee-content li {
  width: 20%;
}
.marquee-content {
  animation: scrolling 20s linear infinite;
}
.event {
  background-image: url("./assets/bg.jpg");
  width: 100%;
}
@keyframes scrolling {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-200%);
  }
}
</style>
