<template>
  <div id="all">
    <v-row id="imgGame">
      <v-img
        src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
        height="100"
        width="100"
      ></v-img>
    </v-row>
    <v-row>
      <v-col sm="3" md="2">
        <v-row>
          <font-awesome-icon :icon="['fab', 'google']" />
          <p>{{ game.min_players }}</p>
        </v-row>
      </v-col>
      <v-col sm="3" md="2">
        <v-row>
          <font-awesome-icon :icon="['fab', 'google']" />
          <p>{{ game.max_players }}</p>
        </v-row>
      </v-col>
      <v-col sm="3" md="2">
        <v-row>
          <font-awesome-icon :icon="['fab', 'google']" />
          <p>{{ game.playtime }}</p>
        </v-row>
      </v-col>
      <v-col sm="3" md="2">
        <v-row>
          <font-awesome-icon :icon="['fab', 'google']" />
          <p>{{ game.age_min }}</p>
        </v-row>
      </v-col>
      <v-col sm="3" md="2">
        <v-row>
          <font-awesome-icon :icon="['fab', 'google']" />
          <p>{{ game.average_learning_complexity }}</p>
        </v-row>
      </v-col>
      <v-col sm="3" md="2">
        <v-row>
          <font-awesome-icon :icon="['fab', 'google']" />
          <p>{{ game.average_strategy_complexity }}</p>
        </v-row>
      </v-col>
      <v-col sm="3" md="2">
        <v-row>
          <font-awesome-icon :icon="['fab', 'google']" />
          <p>{{ game.average_note }}</p>
        </v-row>
      </v-col>
      <v-col sm="3" md="2">
        <v-row>
          <font-awesome-icon :icon="['fab', 'google']" />
          <p>{{ game.average_price_buy }}</p>
        </v-row>
      </v-col>
      <v-col sm="3" md="2">
        <v-row>
          <font-awesome-icon :icon="['fab', 'google']" />
          <p>{{ game.average_price_location }}</p>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col sm="12" md="6">
        <h5>Description :</h5>
        <p>{{ game.name }}</p>
        <p>
          Dolor ad ex mollit eu et. Irure laborum magna non id. Sint culpa ex
          cillum duis reprehenderit reprehenderit minim excepteur irure dolor
          minim ad. Fugiat quis sint et laboris dolor ut deserunt. Incididunt
          fugiat velit elit sunt dolore nisi non id do. Culpa excepteur duis
          Lorem esse.
        </p>
      </v-col>
      <v-col sm="12" md="6">
        VIDEO
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          height="100"
          width="100"
        ></v-img>
      </v-col>
    </v-row>
    <v-row>
      <v-col sm="12" md="6">
        <v-row>
          <v-col v-for="(presta, index) in prestaGM" :key="index" sm="4" md="3">
            {{ presta.name }}
          </v-col>
        </v-row>
      </v-col>
      <v-col sm="12" md="6"> Notes </v-col>
    </v-row>
    <v-container>
      {{ $route.params.id }}
    </v-container>
  </div>
</template>
<script>
export default {
  name: 'Game',
  data() {
    return {
      game: {},
      prestaGM: [
        { name: 'test' },
        { name: 'test2' },
        { name: 'test2' },
        { name: 'test2' },
        { name: 'test2' },
        { name: 'test2' },
        { name: 'test2' },
        { name: 'test2' },
      ],
    }
  },
}
</script>
