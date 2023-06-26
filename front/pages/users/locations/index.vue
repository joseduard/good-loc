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
    <v-card class="card br-5px white">
      <v-card-title class="justify-center orange--text">
        <h1>My reservations</h1></v-card-title
      >
      <v-row>
        <v-col sm="12" md="12">
          <v-card class="gamesList br-5px white">
            <v-card-title class="orange--text">
              <h1>Validate</h1>
            </v-card-title>
            <v-card-subtitle align="center" v-if="reserving">
              <v-row>
                <v-col
                  v-for="(game, index) in reserving.rents"
                  :key="index"
                  class="black--text"
                  md="3"
                  sm="3"
                >
                  <card-game :game="game.associatedGame" />
                  <v-btn @click="validateReservation(game.id, 'rented')"
                    >validate</v-btn
                  >
                </v-col>
              </v-row>
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
        <v-col sm="12" md="12">
          <v-card class="gamesList br-5px white">
            <v-card-title class="orange--text">
              <h1>Running location</h1>
            </v-card-title>
            <v-card-subtitle
              v-if="closing.rents.length > 0"
              align="center"
            >
              <v-row>
                <v-col
                  v-for="(game, index) in closing.rents"
                  :key="index"
                  md="6"
                  lg="3"
                >
                  <card-game :game="game.associatedGame" />
                  <v-btn @click="validateReservation(game.id, 'closed')"
                    >Close</v-btn
                  >
                </v-col>
              </v-row>
              <v-pagination
                v-if="games.length !== 0"
                v-model="pageClosing"
                :length="maxPageClosing"
                :total-visible="4"
                prev-icon="mdi-menu-left"
                next-icon="mdi-menu-right"
                @input="updatepageClosing"
              ></v-pagination>
            </v-card-subtitle>
          </v-card>
          </v-col>
          <v-col sm="12" md="12">
          <v-card class="gamesList br-5px white">
            <v-card-title class="orange--text">
              <h1>Closed</h1>
            </v-card-title>
            <v-card-subtitle
              v-if="closing.rents.length > 0"
              align="center"
            >
              <v-row>
                <v-col
                  v-for="(game, index) in closed.rents"
                  :key="index"
                  md="6"
                  lg="3"
                >
                  <card-game :game="game.associatedGame" />
                </v-col>
              </v-row>
              <v-pagination
                v-if="games.length !== 0"
                v-model="pageClosed"
                :length="maxPageClosed"
                :total-visible="4"
                prev-icon="mdi-menu-left"
                next-icon="mdi-menu-right"
                @input="updatepageClosed"
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
      reserving: { rents: {}},
      closing: { rents: {} },
      closed: { rents: {} },
      pageReserved: 1,
      pageClosing: 1,
      pageClosed: 1,
      maxPageClosed: null,
      maxPageClosing: null,
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
        }/reserved?pageSize=8&page=${this.pageReserved}`
      )
      .then((res) => {
        this.maxPageReserved = res.data.totalPages
        this.reserving = res.data
      })
    this.$axios
      .get(
        `api/user/account/rent/${
          this.$auth.$storage.getUniversal('user').id
        }/rented?pageSize=8&page=${this.pageClosing}`
      )
      .then((res) => {
        this.maxPageClosing = res.data.totalPages
        this.closing = res.data
      })
      this.$axios
      .get(
        `api/user/account/rent/${
          this.$auth.$storage.getUniversal('user').id
        }/closed?pageSize=8&page=${this.pageClosed}`
      )
      .then((res) => {
        this.maxPageClosed = res.data.totalPages
        this.closed = res.data
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
          switch (status) {
            case 'rented':
              this.reserving.rents.map((rent, index) => {
                if (rent.id === rentId) {
                  rent.status = status
                  this.closing.rents.push(rent)
                  this.reserving.rents.splice(index, 1)
                }
                return rent
              })
              this.$awn.success('status updated : ' + status)
              break
            case 'closed':
              this.closing.rents.map((rent, index) => {
                if (rent.id === rentId) {
                  rent.status = status
                  this.closed.rents.push(rent)
                  this.closing.rents.splice(index, 1)
                }

                return rent
              })
              this.$awn.success('status updated : ' + status)
              break
            case 'finished':
              this.closed.rents.map((rent, index) => {
                if (rent.id === rentId) {
                  rent.status = status
                  this.closed.rents.splice(index, 1)
                }
                return rent
              })
              this.$awn.success('status updated : ' + status)
              break
            default:
              break
          }
        })
    },
    updatePageReserved() {
      if (this.pageReserved > this.maxPageReserved) {
        this.$awn.warning('no more page')
      } else {
        this.$axios
          .$get(`api/user/account/rent/${
          this.$auth.$storage.getUniversal('user').id
        }/reserved?pageSize=8&page=${this.pageReserved}`)
          .then((response) => {
            this.reserving.rents = response.rents
          })
      }
    },
    updatepageClosing() {
      if (this.pageClosing > this.maxPageClosing) {
        this.$awn.warning('no more page')
      } else {
        this.$axios
          .$get(
            `api/user/account/rent/${
          this.$auth.$storage.getUniversal('user').id
        }/rented?pageSize=8&page=${this.pageClosing}`
          )
          .then((response) => {
            this.closing.rents = response.rents
          })
      }
    },
    updatepageClosed() {
      if (this.pageClosed > this.maxPageClosed) {
        this.$awn.warning('no more page')
      } else {
        this.$axios
          .$get(
            `api/user/account/rent/${
          this.$auth.$storage.getUniversal('user').id
        }/closed?pageSize=8&page=${this.pageClosed}`
          )
          .then((response) => {
            this.closed.rents = response.rents
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
@import '@/design/_colors.scss';
.gamesList {
  background-color: white !important;
  border-radius: 5px !important;
  border: 2px solid $color-primary !important;
}
</style>