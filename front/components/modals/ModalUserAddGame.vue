<template>
  <div>
    <v-dialog v-model="showAddGameModal" persistent>
      <v-card>
        <v-card-title>Add game</v-card-title>
        <v-card-subtitle>
          <v-col md="6" sm="12"> </v-col>
          <v-text-field v-model="search" @change="getGamesByName">
          </v-text-field>
          <!-- v-text field parceque je n'arrive pas faire marcher avec l'autocomplete-->
          
          <v-autocomplete
            v-model="game"
            label="Autocomplete"
            :items="games"
            return-object
            item-text="name"
          ></v-autocomplete>
          <v-img :src="game.img" :width="300"></v-img>
          {{ game.name }}
          <v-text-field v-model="pricePerDay" label="price per day">
          </v-text-field>
          <v-btn @click="addGameRent">Ajouter</v-btn>
        </v-card-subtitle>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      search: '',
      games: [],
      game: [],
      pricePerDay: 0,
      cautionPrice: 0,
    }
  },
  mounted() {},
  computed: {
    ...mapGetters({
      getShowAddGameModal: 'user/getShowAddGameModal',
    }),
    showAddGameModal() {
      return this.getShowAddGameModal
    },
  },
  methods: {
    ...mapActions({
      setShowAddGameModal: 'user/setShowAddGameModal',
    }),
    getGamesByName() {
      this.$axios.$get('/api/gamesByName/' + this.search).then((response) => {
        this.games = response
      })
    },
    addGameRent(){
      this.$axios.$post('/api/rentingGames/add', {
        id: this.game.id,
        ownerId:this.$auth.$storage.getUniversal('user').id,
        priceDayRenting: this.pricePerDay,
        discountMoreDayRenting: 0,
        discountWeekRenting: 0,
        priceBuying: 0,
        cautionPrice: 0,
      }).then((response) => {
        this.$awn.success('game added')
        this.$parent.$data.user.rentingGames.push(response)
        this.setShowAddGameModal(false)
      }, (error) => {
        this.$awn.alert(error.response.data.error)
        this.setShowAddGameModal(false)
      })
    }
  },
}
</script>
