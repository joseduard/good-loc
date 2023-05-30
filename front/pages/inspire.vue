<!-- eslint-disable vue/first-attribute-linebreak -->
<template>
  <v-row>
    <v-col id="inspire" class="text-center">
      <img src="/v.png" alt="Vuetify.js" class="mb-5" />
      <blockquote class="blockquote">
        &#8220;First, solve the problem. Then, write the code.&#8221;
        <footer>
          <small>
            <em class="inspire-info">&mdash;John Johnson</em>
          </small>
        </footer>
      </blockquote>
      <font-awesome-icon icon="quote-right" size="2x" />
      <font-awesome-icon icon="wifi" size="1x" />
      <!-- <font-awesome-icon :icon="['fas', 'wifi']" /> -->
      <!-- <font-awesome-icon :icon="['fas', 'coffee']" /> -->
      <font-awesome-icon icon="quote-right" size="2x" />
      <br />
      <v-btn v-tippy="{
        placement: 'top',
        content: 'This is a tooltip',
        theme: 'light',
      }" @click="test()">
        <font-awesome-icon icon="quote-right" size="2x" />

      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import 'vue-awesome-notifications/dist/styles/style.css';
export default {
  name: 'InspirePage',
  data() {
    return {
      //
    }
  },
  computed: {
    ...mapGetters({
      getGamesList: 'games/getGamesList',
    }),
    listGames() {
      return this.getGamesList;
    },
  },
  watch: {

  },
  mounted() {
    this.loadDatas();
  },

  methods: {
    ...mapActions({
      setGamesList: 'games/setGamesList',
    }),
    test() {
      this.$awn.info('This is a info message')
      this.$debugLog('This is a debug message')
    },
    loadDatas() {
      this.setGamesList()
        .then((response) => {
          this.$debugLog('Games list loaded');
        })
        .catch((error) => {
          this.$debugLog(error, 'error')
        })
    }
  },
}
</script>
