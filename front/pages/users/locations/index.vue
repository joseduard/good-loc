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
    <v-card class=" card br-5px white">
      <v-card-title class="justify-center orange--text" >
        <h1 >My reservations</h1></v-card-title
      >
      <v-row>
        <v-col sm="12" md="6">
          <v-card class="card br-5px white">
            <v-card-title  class="justify-center orange--text">
              <h1>Validate</h1>
            </v-card-title>
            <v-card-subtitle align="center">
              <div
                v-for="(game, index) in waitingreservations.rents"
                :key="index"
              >
                <v-col
                  v-if="game.status === 'reserved'"
                 
                  class="black--text"
                >
                  <card-game :game="game.associatedGame" />
                  <v-btn  @click="validateReservation(game.id, 'rented')">validate</v-btn>
                </v-col>
              </div>
              <!-- <v-btn @click="nextReserved">next</v-btn>
                <v-btn>
                    {{ pageReserved }}
                </v-btn>
                <v-btn @click="prevReserved">prev</v-btn> -->
              <v-pagination
                v-if="games.length !== 0"
                v-model="pageReserved"
                :length="maxPageReserved"
                :total-visible="4"
                prev-icon="mdi-menu-left"
                next-icon="mdi-menu-right"
                @input="updatePageReserved"
              ></v-pagination>
            </v-card-subtitle>
          </v-card>
        </v-col>
        <v-col sm="12" md="6">
          <v-card class="card br-5px white">
            <v-card-title class="justify-center orange--text">
              <h1>Close</h1>
            </v-card-title>
            <v-card-subtitle align="center">
              <v-row>
                <v-col
                  v-for="(game, index) in waitingclose.rents"
                  :key="index"
                  md="6"
                  lg="6"
                ><div v-if="game.status === 'rented'">
                  <card-game
                    :game="game.associatedGame"
                    
                  />
                  <v-btn @click="validateReservation(game.id, 'closed')"
>Close</v-btn>
</div>
                  <!-- {{ game.associatedGame.name }}
                        <v-img :src="game.associatedGame.img" height="50" width="70" alt="game.associatedGame[0].game.name" /> -->
                </v-col>
              </v-row>
              <v-pagination
                v-if="games.length !== 0"
                v-model="pageClosed"
                :length="maxPageClosed"
                :total-visible="4"
                prev-icon="mdi-menu-left"
                next-icon="mdi-menu-right"
                @input="updatePageClosed"
              ></v-pagination>
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>
<script>
import CardGame from '~/components/CardGame.vue'
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
      maxPageClosed: null,
      maxPageReserved: null,
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
      })
    this.$axios
      .get(
        `api/user/account/rent/${
          this.$auth.$storage.getUniversal('user').id
        }/reserved?pageSize=5&page=${this.pageReserved}`
      )
      .then((res) => {
        this.maxPageReserved = res.data.totalPages
        this.waitingreservations = res.data
      })
    this.$axios
      .get(
        `api/user/account/rent/${
          this.$auth.$storage.getUniversal('user').id
        }/rented?pageSize=10&page=${this.pageClosed}`
      )
      .then((res) => {
        this.maxPageClosed = res.data.totalPages
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
    updatePageReserved() {
      if (this.pageReserved > this.maxPageReserved) {
        this.$awn.warning('no more page')
      } else {
        this.$axios
          .$get(`api/rentingGames/${this.user.id}?page=${this.page}&pageSize=5`)
          .then((response) => {
            this.rentingGames = response.rentingGames
          })
      }
    },
    updatePageClosed() {
      if (this.pageClosed > this.maxPageClosed) {
        this.$awn.warning('no more page')
      } else {
        this.$axios
          .$get(
            `api/rentingGames/${this.user.id}?page=${this.pageClosed}&pageSize=5`
          )
          .then((response) => {
            this.rentingGames = response.rentingGames
          })
      }
    },
    getGame(reponse) {
      reponse.Game.map((game) => {
        this.$axios.$get(`api/game/${game.game_id}`).then((res) => {
          game.Game = res.data
        })
        console.log(game.Game.price_Day_Renting)
        this.games.push(game.Game)
        return game
      })
      return reponse
    },
  },
}
</script>
<style lang="scss" scoped>
.card
{
    box-shadow: rgba(209, 107, 5, 0.691) 0px 4px 12px !important;
}
</style>