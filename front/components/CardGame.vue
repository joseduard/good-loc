<template>
  <v-container class="container-gamecard">
    <v-card id="card">
      <v-img :src="game.img" height="100px" cover></v-img>
      <v-card-title id="title">
        {{ game.name }}
        {{ $nuxt.$route.path }}
      </v-card-title>
      <v-card-subtitle
        v-if="
          $nuxt.$route.path !== '/users/rentsAsOwner' &&
          $nuxt.$route.path !== '/users/rentsAsRenter'
        "
        id="subtitle"
      >
        <v-row>
          <span v-if="game.pseudo" class="pseudo">By : {{ game.pseudo }} </span>
        </v-row>
        <v-row>
          <!-- <img class="icon" src="../assets/images/007.png" /> -->
          <font-awesome-icon class="icon primary--text" :icon="['fas', 'user-group']"  />

          <span v-if="game.min_players !== null"
            >Players : {{ game.min_players }} to {{ game.max_players }}</span
          >
          <span v-else> Players : 1 to 10 </span>
        </v-row>
        <v-row>
          <!-- <img class="icon" src="../assets/images/004.png" /> -->
          <font-awesome-icon class="icon primary--text" :icon="['fas', 'star']"  />

          <span v-if="game.average_note !== null || game.average_note !== 0.0"
            >Note : {{ game.average_note }} /5</span
          >
          <span v-else> Note : 3/5 </span>
        </v-row>
        <v-row>
          <img class="icon" src="../assets/images/icon1.png" />
          <span v-if="game.category_name !== null"
            >Category: {{ game.category_name }}</span
          >
          <span v-else> Category : Poney </span>
        </v-row>
        <v-row>
          <!-- <img class="icon" src="../assets/images/icon2.png" /> -->
          <font-awesome-icon class="icon primary--text" :icon="['fas', 'gears']"  />

          <span v-if="game.mechanic_name !== null">
            Mechanic : {{ game.mechanic_name }}</span
          >
          <span v-else> Mechanics : Dice </span>
        </v-row>
      </v-card-subtitle>
      <v-card-subtitle
        v-if="
          $nuxt.$route.path === '/users/rentsAsOwner' ||
          $nuxt.$route.path === '/users/rentsAsRenter'
        "
        id="subtitle"
      >
        <v-row>
          <img class="icon" src="../assets/images/007.png" />
          <span v-if="user.pseudo !== null"
            >Asking pseudo : {{ user.pseudo }}</span
          >
          <span v-else> Players : 1 to 10 </span>
        </v-row>
        <v-row>
          <!-- <img class="icon" src="../assets/images/004.png" /> -->
          <font-awesome-icon class="icon primary--text" :icon="['fas', 'envelope']"  />
          <span v-if="user.email !== null || user.average_note !== 0.0"
            >email : {{ user.email }}</span
          >
          <span v-else> Note : 3/5 </span>
        </v-row>
        <v-row>
          <font-awesome-icon class="icon primary--text" :icon="['fas', 'tree-city']"  />
          <span v-if="user.category_name !== null">City: {{ user.city }}</span>
          <span v-else> Category : Poney </span>
        </v-row>
        <v-row>
          <!-- <img class="icon" src="../assets/images/icon2.png" /> -->
          <font-awesome-icon class="icon primary--text" :icon="['fas', 'calendar']"  />

          <!-- date sale mais je sais pas comment parse en js :/ -->
          <span v-if="dateResa !== null"> Reserving date : {{ dateResa }}</span>
          <span v-else> Mechanics : Dice </span>
        </v-row>
      </v-card-subtitle>
    </v-card>
  </v-container>
</template>
<script>
export default {
  props: {
    game: {
      type: Object,
      required: true,
    },
    user: {
      type: Object,
      required: false,
      default: null,
    },
    dateResa: {
      type: String,
      required: false,
      default: '',
    },
  },
}
</script>
<style lang="scss" scoped>
#card {
  border: 2px solid rgba(96, 93, 93, 0.41);
  border-radius: 5px 5px 5px 5px;
  box-shadow: rgba(209, 107, 5, 0.55) 0px 2px 5px -1px,
    rgba(209, 107, 5, 0.85) 0px 1px 3px -1px;
  min-width: 250px;
  max-width: 300px;

  #title {
    padding-top: 5px;
    border-top: 1px solid rgba(243, 127, 3, 0.55);
    height: 250px !important;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    line-height: 24px;
    max-height: 30px;
  }
  #subtitle {
    height: fit-content;
    margin-top: 3px;
    font-size: 10px;
    .row {
      margin-top: 10px;
      min-height: 20px;
      .pseudo {
        padding-top: 0;
        font-size: 12px;
        margin: -10px 20px 5px auto;
        font-weight: 600;
        color: rgba(209, 107, 5, 0.85);
        text-align: right;
      }
      .col {
        padding: 2px;
      }
      // img {
      //   margin-left: 20px;
      //   margin-right: 5px;
      //   width: 20px;
      //   height: 20px;
      // }
      .icon {
        margin-left: 20px;
        margin-right: 5px;
        width: 20px;
        height: 20px;
      }

    }
  }
}
</style>
