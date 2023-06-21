<template>
  <v-container>
    <v-card id="card" max-width="255">
      <v-img :src="game.img" cover></v-img>

      <v-card-title id="title">
        {{ game.name }}
      </v-card-title>
      <v-card-subtitle id="subtitle">
        <v-row>
          <v-col sm="12" md="6">
            <font-awesome-icon :icon="['fab', 'google']" size="2x" />{{
              game.min_players
            }}
            to {{ game.max_players }} joueurs
          </v-col>
          <v-col sm="12" md="6">
            <font-awesome-icon :icon="['fab', 'google']" size="2x" />{{
              game.mechanicName
            }}
          </v-col>
        </v-row>
        <v-row>
          <v-col sm="12" md="6">
            <font-awesome-icon :icon="['fab', 'google']" size="2x" />{{
              game.playtime
            }}
            minutes
          </v-col>
          <v-col sm="12" md="6">
            <!-- <font-awesome-icon :icon="['fab', 'google']" size="2x" />{{
              game.complexity
            }} -->
          </v-col>
        </v-row>
      </v-card-subtitle>
    </v-card>
  </v-container>
</template>
<script>
export default {
  props: {
    game: Object,
  },
}
</script>
