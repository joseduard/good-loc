<template>
  <v-row class="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo py-4 d-flex justify-center">
        <BtnTest />
      </v-card>
      <v-card>
        <v-card-title class="headline">
          Welcome to Good-Lock
        </v-card-title>
        <v-card-text>
          <p>
            This is a test baby baby
          </p>
          <p>
            If you have questions, please join the discord
          </p>
        </v-card-text>
        <v-spacer />
        <v-btn color="primary" nuxt to="/inspire"> Continue </v-btn>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage',
}
</script>
