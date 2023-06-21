<template>
  <div>
    <v-dialog v-model="showAddGameModal" persistent>
      <v-card>
        <v-card-title>Add game</v-card-title>
        <v-card-subtitle>
          <v-col md="6" sm="12"> </v-col>
          <v-text-field v-model="search" >
          </v-text-field>
          <!-- v-text field parceque je n'arrive pas faire marcher avec l'autocomplete-->
          
          <v-autocomplete
          @change="getGamesByName"
            v-model="search"
            label="Autocomplete"
            :items="games"
            return-object
            item-text="name"
          ></v-autocomplete>
          <v-img :src="game.img" :width="300"></v-img>
          {{ game.name }}
          <v-text-field v-model="pricePerDay" label="price per day">
          </v-text-field>
          <v-btn>Ajouter</v-btn>
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
      console.log('prout')
      this.$axios.$get('/api/gamesByName/' + this.search).then((response) => {
        this.games = response
      })
    },
  },
}
</script>
