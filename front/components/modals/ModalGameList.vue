<template>
  <v-dialog id="all" v-model="dialog" persistent width="50em">
    <v-card id="card">
      <v-img :src="game.img" cover></v-img>
      <v-card-title id="title">
        {{ game.name }}
      </v-card-title>
      <v-card-subtitle id="subtitle">
        <v-row>
          <v-col sm="12" md="6">
            <font-awesome-icon :icon="['fab', 'google']" />{{
              game.min_players
            }}
            to {{ game.max_players }} joueurs
          </v-col>
          <v-col sm="12" md="6">
            <font-awesome-icon
              :icon="['fab', 'google']"
              class="primary--text"
            />{{game.playtime}} min
          </v-col>
        </v-row>
        <v-row>
          <v-col sm="12" md="6">
            <font-awesome-icon :icon="['fab', 'google']" />{{ game.age_min }} - 99 ans
          </v-col>
          <v-col sm="12" md="6">
            <font-awesome-icon :icon="['fab', 'google']" />{{ game.year_published }}
          </v-col>
        </v-row>
        <v-row>
          <p v-if="showDesc">{{ game.description }}</p>
          <v-col sm="12" md="6">
            <v-btn :to="`/game-list/${game.id}`">Description</v-btn>
            <!-- TODO: change to router-link -->
          </v-col>
          <v-col sm="12" md="6">
            <v-btn @click="createRent">Rent</v-btn>
            <!-- TODO: change to router-link -->
          </v-col>
        </v-row>
      </v-card-subtitle>
    </v-card>
    <v-btn
      @click="
        dialog = false
        closeModal()
      "
      >close</v-btn
    >
  </v-dialog>
</template>

<script>
export default {
  name: 'ModalGameList',
  props: {
    dialogModal: {
      required: true,
      type: Boolean,
    },
    game: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      showDesc: false,
      dialog: this.dialogModal,
    }
  },
  methods: {
    closeModal() {
      this.$parent.dialogModal = false
    },
    createRent() {
      this.$axios.post('api/rent/create', {
        game_id: this.game.id,
        owner_id:  this.game.owner_id,
        beginning_date: new Date().toISOString().slice(0, 10),
        renter_id: this.$auth.$storage.getUniversal('user').id,
        rental_game_id: this.game.rental_id,
        status: "reserved",
        price: this.game.price_Day_Renting,
      }).then(() => {
        this.$awn.success("Location created !")
        const pseudo =  this.game.pseudo
        this.$axios.post('api/user/account/message/create', {
          receiver_pseudo:pseudo,
          sender_id:this.$auth.$storage.getUniversal('user').id,
          object:"Message de location",
          message_content:"Bonjour, vous vener de louer un jeu, veuillez contacter le propriétaire pour fixer un rendez-vous"
        })
        this.$router.push({path: "users/message"})
      }).catch((err) => {
        this.$awn.alert(err.response.data)
      })
    }
  },
}
</script>
