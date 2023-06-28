<template>
  <div id="all">
    <ModalGameList
      v-if="dialogModal"
      :dialog-modal="dialogModal"
      :game="gameModal"
    />
    <v-row class="row_one">
      <v-img cover :src="game.img" id="img_game"></v-img>
    </v-row>
    <v-row class="list_params">
      <v-col class="item" cols="12" md="6" lg="3">
        <v-row>
          <img cover class="icon" :src="require(`../../assets/images/007.png`)"/>
          <span v-if="game.category_name !== null">Category: {{ game.category_name }}</span>
          <span v-else> Category : N/C </span>
        </v-row>
      </v-col>
      <v-col class="item" cols="12" md="6" lg="3">
        <v-row>
          <img cover class="icon" :src="require(`../../assets/images/007.png`)"/>
          <span v-if="game.mechanic_name !== null">Mechanic : {{ game.mechanic_name }}</span>
          <span v-else> Mechanic : N/C </span>
        </v-row>
      </v-col>
      <v-col class="item" cols="12" md="6" lg="3">
        <v-row>
          <img cover class="icon" :src="require(`../../assets/images/007.png`)"/>
          <span v-if="game.playtime !== null">PlayTime: : {{ game.playtime }} min </span>
          <span v-else> PlayTime min : 30 min </span>
        </v-row>
      </v-col>
      <v-col class="item" cols="12" md="6" lg="3">
        <v-row>
          <img cover class="icon" :src="require(`../../assets/images/007.png`)"/>
          <span v-if="game.average_learning_complexity !== null">Learning : {{ game.average_learning_complexity }}/5</span>
          <span v-else> Learning : 3/5</span>
        </v-row>
      </v-col>
      <v-col class="item" cols="12" md="6" lg="3">
        <v-row>
          <img cover class="icon" :src="require(`../../assets/images/007.png`)"/>
          <span v-if="game.average_strategy_complexity !== null">Strategy complexity : {{ game.average_strategy_complexity }}/5</span>
          <span v-else> Strategy complexity : 3.3/5 </span>
        </v-row>
      </v-col>
      <v-col class="item" cols="12" md="6" lg="3">
        <v-row>
          <img cover class="icon" :src="require(`../../assets/images/007.png`)"/>
          <span v-if="game.average_note !== null"> Average Note : {{ game.average_note }} </span>
          <span v-else> Average Note : 4.1/5 </span>
        </v-row>
      </v-col>
      <v-col class="item" cols="12" md="6" lg="3">
        <v-row>
          <img cover class="icon" :src="require(`../../assets/images/007.png`)"/>
          <span v-if="game.min_players !== null">Players min : {{ game.min_players }} </span>
          <span v-else> Players min : 2</span>
        </v-row>
      </v-col>
      <v-col  class="item" cols="12" md="6" lg="3">
        <v-row>
          <img cover class="icon" :src="require(`../../assets/images/007.png`)"/>
          <span v-if="game.max_players !== null">Players max : {{ game.max_players }} </span>
          <span v-else> Players max : 6</span>
        </v-row>
      </v-col>
      <v-col  class="item" cols="12" md="6" lg="3">
        <v-row>
          <img cover class="icon" :src="require(`../../assets/images/007.png`)"/>
          <span v-if="game.publisher_name !== null">Publisher : {{ game.publisher_name }}</span>
          <span v-else> Publisher : Seb La Frite </span>
        </v-row>
      </v-col>
      <v-col  class="item" cols="12" md="6" lg="3">
        <v-row>
          <img cover class="icon" :src="require(`../../assets/images/007.png`)"/>
          <span v-if="game.year_published !== null">Birth'Year : {{ game.year_published }} </span>
          <span v-else>Birth'Year : 1984 </span>
        </v-row>
      </v-col>
    
    </v-row>

     <v-row class="game_description">
        <h1 class="gameTitle">{{ game.name }}</h1>
        <div class="gameDescription" v-html="game.description"></div>
     </v-row>
 

    <v-row id="rentings">
      <h2 class="title">Best Rentings</h2>
        <v-row>
          <v-col class="item"
            v-for="(presta, index) in gameRents"
            :key="index"
            cols="12" md="6" lg="3"
          >
            <a @click="sendGameClean(presta)">
              <row class="row_avatar">
                <v-img cover src="https://i.imgur.com/mJboO28.png" class ="img_user"></v-img>
              </row>
              <v-row class="row_info"> 
                <span>Rented by :   </span> 
                <span class="value"> {{ presta.User.pseudo }} </span>
              </v-row>
              <v-row class="row_info"> 
                <span>City : </span> 
                <span class="value"> {{ presta.User.city }} </span>
              </v-row>
              <v-row class="row_info"> 
                <span>Price per Day : </span> 
                <span class="value" > {{ presta.price_day_renting }} $</span>
              </v-row>
            </a>
          </v-col>
        </v-row>
    </v-row>

  </div>
</template>
<script>
import ModalGameList from '~/components/modals/ModalGameList.vue'
export default {
  name: 'Game',
  middleware: 'auth',
  components: {
    ModalGameList,
  },
  data() {
    return {
      game: {},
      gameRents: {},
      dialogModal: false,
      gameModal: {},
      test: false,
    }
  },
  mounted() {
    this.$axios.$get(`api/game/${this.$route.params.id}`).then((res) => {
      this.game = res
      console.log(res)
    })
    this.$axios
      .$get(`api/bestRentingGames/${this.$route.params.id}`)
      .then((res) => {
        this.gameRents = res
      })
  },
  methods: {
    sendGameClean(game) {
      this.dialogModal = true
      game.Game.price_Day_Renting = game.price_day_renting
      game.Game.owner_id = game.User.id
      game.Game.rental_id = game.id
      this.gameModal = game.Game
    },
  },
}
</script>


<style lang="scss" scoped>
@import '@/design/_colors.scss';

#all {
  color: $color-primary;
}
.row_one {
  margin: -10px auto 0 auto ;
  max-width: 700px;
}
#img_game {
  box-shadow: rgb(85, 91, 255) 0px 0px 0px 6px, rgb(31, 193, 27) 0px 0px 0px 10px, rgb(255, 217, 19) 0px 0px 0px 15px, rgb(255, 156, 85) 0px 0px 0px 18px, rgb(255, 85, 85) 0px 0px 0px 20px;
  height: 300px;
}
.v-responsive {
    position: relative;
    overflow: hidden;
    flex: 1 0 auto;
    max-width: 100%;
    display: flex;
}
.list_params {
  margin: 20px auto 0 auto;
  padding: 20px 0 20px 0;
  max-width: 100%;
  background-color: $color-secondary;
  .item{
    margin-bottom: 10px;
    span{
      color: white;
    }
  }
}
img {
  margin-left: 20px;
  margin-right: 5px;
  width: 20px;
  height: 20px;
}
.game_description {
  margin: 20px auto 0 auto;
  padding: 20px;
  max-width: 100%;
  .gameTitle {
    color: $color-secondary;
    text-align: center;
    margin-bottom: 20px;
  }
  .gameDescription {
    color: $color-secondary;
    margin: 20px;
  }
}
#rentings {
  margin: 20px auto 0 auto;
  padding: 20px;
  max-width: 100%;
  background-color: $color-secondary;
  .row{
    max-width: 100%;
  }
  .title{
    font-size: 30px !important;
    text-transform: uppercase;
    font-weight: bold;
    text-align: center;
    margin-bottom: 20px;
  }
  .item {
    max-width: 100%;
    margin-bottom: 10px;
    border : 1px solid $color-primary;
    border-radius:5px;
    margin:10px;
    padding: 10px;
    .row_avatar {
      margin: 0 auto 10px auto;
      width: 70%;
      height:100px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .row_info {
      margin: 10px auto 10px auto;
      .value {
        font-weight: bold;
        color: $color-primary !important;
        line-height: 25px;
        font-size: 20px;
      }

    }
    .img_user {
      height: 100px;
    
    }
    span {
      color: white;
    }
    a:hover{
      cursor: pointer;
      background-color: $color-primary;
      color:black;
    }
  }
}
</style>
