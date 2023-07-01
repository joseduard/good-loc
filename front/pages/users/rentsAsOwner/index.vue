<template>
  <div>
    <v-card class="card br-5px white">
      <v-card-title class="justify-center orange--text">
        <h1>MY RENTS</h1></v-card-title
      >
      <v-row>
        <v-col sm="12" md="12">
          <h2>Rents who need validation</h2>
          <v-card v-if="reserved" class="gamesList br-5px white">
            <v-card-title class="orange--text"> </v-card-title>
            <v-card-subtitle align="center">
              <v-row>
                <v-col
                  v-for="(game, index) in getReserved.rents"
                  :key="index"
                  class="black--text"
                  md="3"
                  sm="3"
                >
                  <CardGame
                    :game="game.associatedGame"
                    :user="game.associatedUser"
                    :date-resa="game.beginning_date"
                  />
                  <ConfirmationModal
                    :name="'Validate'"
                    @dateSelected="dateSelected"
                    :nameDate="'Select a start date'"
                    @confirmation="validateReservation(game.id, 'rented')"
                  />
                </v-col>
              </v-row>
              <v-pagination
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
          <h2>Running Rent 🦄</h2>
          <v-card class="gamesList br-5px white">
            <v-card-title class="orange--text"> </v-card-title>
            <v-card-subtitle align="center">
              <v-row>
                <v-col
                  v-for="(game, index) in getRented.rents"
                  :key="index"
                  md="6"
                  lg="3"
                >
                  <CardGame
                    :game="game.associatedGame"
                    :user="game.associatedUser"
                    :date-resa="game.beginning_date"
                  />
                  <ConfirmationModal
                    :name="'Close'"
                    :nameDate="'Select a closing date'"
                    @dateSelected="dateSelected"
                    @confirmation="validateReservation(game.id, 'closed')"
                  />
                </v-col>
              </v-row>
              <v-pagination
                v-model="pageRented"
                :length="maxPageRented"
                :total-visible="4"
                prev-icon="mdi-menu-left"
                next-icon="mdi-menu-right"
                @input="updatepageRented"
              ></v-pagination>
            </v-card-subtitle>
          </v-card>
        </v-col>
        <v-col sm="12" md="12">
          <h2>Finished Rents</h2>
          <v-card v-if="closed.rents" class="gamesList br-5px white">
            <v-card-title class="orange--text"> </v-card-title>
            <v-card-subtitle align="center">
              <v-row>
                <v-col
                  v-for="(game, index) in getClosed.rents"
                  :key="index"
                  md="6"
                  lg="3"
                >
                  <CardGame
                    :game="game.associatedGame"
                    :user="game.associatedUser"
                    :date-resa="game.beginning_date"
                  />
                </v-col>
              </v-row>
              <v-pagination
                v-model="pageClosed"
                :length="getClosed.totalPages"
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
import { mapGetters, mapActions } from 'vuex'
import CardGame from '~/components/CardGame.vue'
import ConfirmationModal from '~/components/modals/ConfirmationModal.vue'
export default {
  components: {
    CardGame,
    ConfirmationModal,
  },
  data() {
    return {
      reserved: { rents: {} },
      rented: { rents: [] },
      closed: { rents: {} },
      pageReserved: 1,
      pageRented: 1,
      pageClosed: 1,
      maxPageClosed: null,
      maxPageRented: null,
      maxPageReserved: null,
      dataHolder: null,
      indexRent: null,
      selectedGame: null,
      selected:null,
    }
  },
  computed: {
        ...mapGetters({
            getRented : 'rents/getRented',
            getReserved : 'rents/getReserved',
            getClosed : 'rents/getClosed',
        }),
      },
  mounted() {
    this.loadRents()
  },
  methods: {
    ...mapActions({
      fetchRented : 'rents/fetchRented',
      fetchReserved : 'rents/fetchReserved',
      fetchClosed : 'rents/fetchClosed',
        }),
    dateSelected(picker){
      this.selected=picker
    },
    loadRents() {
      this.fetchRented(this.pageRented)
      this.fetchClosed(this.pageClosed)
      this.fetchReserved(this.pageReserved)
      this.maxPageClosed=this.getClosed.totalPages
      this.maxPageRented=this.getRented.totalPages
      this.maxPageReserved=this.getReserved.totalPages

    },
    validateReservation( id, status) {
      console.log(this.selected)
      this.$axios
        .put(`api/rent/${id}/updateStatus`, {
          user_id: this.$auth.$storage.getUniversal('user').id,
          status,
        })
        .then((res) => {
          this.$awn.success('Reservation closed')
          this.loadRents()
                })
    },
    updatePageReserved() {
      this.fetchReserved(this.pageReserved)
    },
    updatepageRented() {
      this.fetchRented(this.pageRented)
    },
    updatepageClosed() {
        this.fetchClosed(this.pageClosed)
    },
  },
}
</script>
<style lang="scss" scoped>
@import '@/design/_colors.scss';
.gamesList {
  background-color: white !important;
  border-radius: 5px !important;
  border: 1px solid $color-primary !important;
}
h1,
h2 {
  color: $color-secondary;
  margin-bottom: 5px;
  text-transform: uppercase;
}
h2 {
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
}

.rent_button {
  background-color: $color-primary !important;
  padding: 5px 10px;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 12px;
  border: none;
  border-radius: 20px 70px 35px 70px;
  cursor: pointer !important;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: $color-secondary !important;
  }
}
</style>
