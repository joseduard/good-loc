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
            <font-awesome-icon :icon="['fab', 'google']" />icon 1
          </v-col>
          <v-col sm="12" md="6">
            <font-awesome-icon
              :icon="['fab', 'google']"
              class="primary--text"
            />icon 2
          </v-col>
        </v-row>
        <v-row>
          <v-col sm="12" md="6">
            <font-awesome-icon :icon="['fab', 'google']" />icon 3
          </v-col>
          <v-col sm="12" md="6">
            <font-awesome-icon :icon="['fab', 'google']" />icon 4
          </v-col>
        </v-row>
        <v-row>
          <p v-if="showDesc">{{ game.description }}</p>
          <v-col sm="12" md="6">
            <v-btn :to="`/game-list/${game.id}`">Play</v-btn>
            <!-- TODO: change to router-link -->
          </v-col>
          <v-col sm="12" md="6">
            <v-btn :to="`/game-list/${game.id}`">Play</v-btn>
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
  },
}
</script>
