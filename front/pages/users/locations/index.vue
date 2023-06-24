<template >
  <div>
    <!-- <v-card id="Locations" class="br-5px white">
            <v-card-title class="orange--text">
                <h1>Locations</h1>
            </v-card-title>
            <v-row>
                <v-col>
                    <v-card-subtitle >
                        <v-card  class="br-5px white">
                            <v-card-title class="orange--text">
                                <h2>My Games</h2>
                            </v-card-title>
                            <v-card-subtitle>
                                <v-col >
                                    <div v-for="(game,index) in games" :key="index" class="black--text">
                                        {{ game.Game.name }}
                                    </div>
                                </v-col>
                            </v-card-subtitle>
                        </v-card>
                    </v-card-subtitle>
                </v-col>
                <v-col>
                    <v-card-subtitle>
                        <v-card  class="br-5px white">
                            <v-card-title class="orange--text">
                                <h2>GM prestations</h2>
                            </v-card-title>
                            <v-card-subtitle class="black--text">
                                Coming soon
                            </v-card-subtitle>
                        </v-card>
                    </v-card-subtitle>
                </v-col>
            </v-row>
        </v-card> -->
    <v-card class="br-5px white">
      <v-card-title class="orange--text">
        <h1>My reservations</h1></v-card-title
      >
      <v-row>
        <v-col sm="12" md="6">
          <v-card class="br-5px white">
            <v-card-title class="orange--text">
              <h1>Validate</h1>
            </v-card-title>
            <p v-if="!waitingreservations.rents" class="orange--text">Rien à valider</p>
            <v-card-subtitle align="center" v-if="waitingreservations.rents">
              <div>
                <v-row>
                  <v-col
                    v-for="(game, index) in waitingreservations.rents"
                    :key="index"
                    class="black--text"
                    md="12"
                    lg="6"
                    @click="validateReservation(game.id, 'closed')"
                  >
                    <card-game :game="game.associatedGame" />

                    <!-- {{ game.associatedGame.name }}
                        <v-img :src="game.associatedGame.img" height="50" width="70" alt="game.associatedGame[0].game.name" /> -->
                  </v-col>
                </v-row>
              </div>
              <v-btn @click="nextReserved">next</v-btn>
              <v-btn>
                {{ pageReserved }}
              </v-btn>
              <v-btn @click="prevReserved">prev</v-btn>
            </v-card-subtitle>
          </v-card>
        </v-col>
        <v-col sm="12" md="6">
          <v-card class="br-5px white">
            <v-card-title class="orange--text">
              <h1>Close</h1>
            </v-card-title>
            <div>
              <v-row>
                <v-col
                  v-for="(game, index) in waitingclose.rents"
                  :key="index"
                  class="black--text"
                  @click="validateReservation(game.id, 'closed')"
                  md="12"
                  lg="6"
                >
                  <card-game :game="game.associatedGame" />

                  <!-- {{ game.associatedGame.name }}
                        <v-img :src="game.associatedGame.img" height="50" width="70" alt="game.associatedGame[0].game.name" /> -->
                </v-col>
              </v-row>
            </div>
            <v-btn @click="nextClosed">next</v-btn>
            <v-btn>
              {{ pageClosed }}
            </v-btn>
            <v-btn @click="prevClosed">prev</v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>
<script>
import CardGame from '../../../components/CardGame.vue'
export default {
  components: {
    CardGame,
  },
  data() {
    return {
      games: {},
      waitingreservations: {},
      waitingclose: {},
      pageReserved: 1,
      pageClosed: 1,
    }
  },
  mounted() {
    this.$axios
      .get(
        `api/rentingGames/${
          this.$auth.$storage.getUniversal('user').id
        }?page=1&pageSize=5`
      )
      .then((res) => {
        // console.log(res.data)
        this.games = res.data.rentingGames
        // this.games.map((game) => {
        //     this.$axios.$get(
        //         `api/games/${game.game_id}`)}).then((res) => {
        //         game.Game=res.data})
        //     console.log(game.Game.price_Day_Renting)
        //     this.games.push(game.Game)
        //     return game
      })
    this.$axios
      .get(
        `api/user/account/rent/${
          this.$auth.$storage.getUniversal('user').id
        }/reserved?pageSize=5&page=${this.pageReserved}`
      )
      .then((res) => {
        this.waitingreservations = res.data
      })
    this.$axios
      .get(
        `api/user/account/rent/${
          this.$auth.$storage.getUniversal('user').id
        }/rented?pageSize=10&page=${this.pageClosed}`
      )
      .then((res) => {
        this.waitingclose = res.data
      })
  },
  methods: {
    validateReservation(rentId, status) {
      this.$axios
        .put(`api/rent/${rentId}/updateStatus`, {
          user_id: this.$auth.$storage.getUniversal('user').id,
          status,
        })
        .then((res) => {
          if (status === 'closed') {
            this.waitingclose.rents.map((rent) => {
              if (rent.id === rentId) {
                rent.status = status
              }
              return rent
            })
            this.$awn.success('status updated : ' + status)
          } else {
            this.waitingreservations.rents.map((rent) => {
              if (rent.id === rentId) {
                rent.status = status
                this.waitingclose.rents.push(rent)
              }
              return rent
            })

            this.$awn.success('status updated : ' + status)
          }
        })
    },
    nextReserved() {
      this.pageReserved++
      this.$axios
        .get(
          `api/user/account/rent/${
            this.$auth.$storage.getUniversal('user').id
          }/reserved?pageSize=5&page=${this.pageReserved}`
        )
        .then(
          (res) => {
            this.waitingreservations = res.data
          },
          () => {
            this.pageReserved--
            this.$awn.alert('no more pages')
          }
        )
    },
    prevReserved() {
      this.pageReserved--
      this.$axios
        .get(
          `api/user/account/rent/${
            this.$auth.$storage.getUniversal('user').id
          }/reserved?pageSize=5&page=${this.pageReserved}`
        )
        .then(
          (res) => {
            this.waitingreservations = res.data
          },
          () => {
            this.pageReserved++
            this.$awn.alert('no more pages')
          }
        )
    },
    nextClosed() {
      this.pageClosed++
      this.$axios
        .get(
          `api/user/account/rent/${
            this.$auth.$storage.getUniversal('user').id
          }/rented?pageSize=5&page=${this.pageClosed}`
        )
        .then(
          (res) => {
            this.waitingclose = res.data
          },
          () => {
            this.pageClosed--
            this.$awn.alert('no more pages')
          }
        )
    },
    prevClosed() {
      this.pageClosed--
      this.$axios
        .get(
          `api/user/account/rent/${
            this.$auth.$storage.getUniversal('user').id
          }/rented?pageSize=5&page=${this.pageClosed}`
        )
        .then(
          (res) => {
            this.waitingclose = res.data
          },
          () => {
            this.pageClosed++
            this.$awn.alert('no more pages')
          }
        )
    },
  },
}
</script>