<template>
  <v-container>
    <v-list>
      <v-list-item v-for="(item, i) in sidebarUser" :key="i" :to="item.to" router exact>
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title class="text-uppercase tertiary--text">{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: 'DefaultLayout',
  data() {
    return {
      items: [
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      sidebarUser: 'sidebarsItems/getSidebarUser',
    }),
  },
  mounted() {
  },
  methods: {
    ...mapActions({
    }),
  },

}

</script>
