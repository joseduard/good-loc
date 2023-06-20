<template>
  <v-container id="cube">
    <v-dialog id="all" v-model="dialog" persistent width="50em">
      <v-card id="card">
        <v-img
          id="img"
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
        ></v-img>
        <h3 id="title">{{ gameMaster.name }}</h3>
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
        <p>{{ gameMaster.presentation }}</p>
        <v-btn :to="`/game-master-list/${gameMaster.id}`">Play</v-btn>
        <!-- TODO: change to router-link -->
      </v-card>
      <v-btn
        @click="
          dialog = false
          closeModal()
        "
        >close</v-btn
      >
    </v-dialog>
  </v-container>
</template>
<script>
export default {
  name: 'ModalGameMasterList',
  props: {
    dialogModal: {
      required: true,
      type: Boolean,
    },
    gameMaster: {
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