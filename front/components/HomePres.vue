<template>
  <div>
    <v-row id="firstRow">
      <v-col v-for="(pres, index) in presentation" :key="index" col="4">
        <v-container id="cube">
          <v-img
            class="imgFirstRow"
            :src="require(`../assets/images/${pres.img}`)"
          ></v-img>
          <h3 class="titlePres">{{ pres.title }}</h3>
          <p>{{ pres.text }}</p>
          <p>{{ pres.text2 }}</p>
          <v-btn :to="pres.to" :color="pres.open ? 'primary' : 'black'">{{ pres.textBtn }}</v-btn>
        </v-container>
      </v-col>
    </v-row>

    
  </div>
</template>

<script>
export default {
  name: 'HomePres',
  data() {
    return {
      presentation: [
        {
          title: 'RENT',
          img: '001.png',
          text: 'Rent a game or more to play with your friends.',
          text2: 'Test the game before buying it. And enjoy🦄 !!',
          textBtn: 'RENT',
          open: true,
          to: '/game-list',
        },
        {
          title: 'BUY',
          img: '002.png',
          text: 'Buy a game to another player for less money.',
          text2: 'The solution for ecologic and less expensive board games !!',
          textBtn: 'COMING SOON',
          open: false,
          to: '/',
        },
        {
          title: 'ADOPT A GAME MASTER',
          img: '020.png',
          text: 'Some people love Unicorns 🦄.',
          text2: 'Our Game Masters are the best in the world. And they are waiting for you.',
          textBtn: 'COMING SOON',
          open: false,
          to: '/',
        },
      ],
    };
  },
};
</script>
