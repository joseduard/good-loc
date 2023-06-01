<template>
  <v-app dark>
    <!-- Sidebar -->
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app>
      <!-- Sidebar List -->
      <v-list>
        <v-list-item :to="item.to" router exact>
          <!-- eslint-disable vue/first-attribute-linebreak -->
          <v-list-item-action>
            <font-awesome-icon :icon="['fas', 'home']" class="primary--text" />
          </v-list-item-action>
          <!-- eslint-enable vue/first-attribute-linebreak -->
          <v-list-item-content>
            <v-list-item-title class="text-uppercase tertiary--text">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <UnauthenticatedUserSidebar v-if="!isUser" />
      <UserSidebar v-if="isUser" />
    </v-navigation-drawer>
    <!-- Header -->
    <v-app-bar id="header" :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon color="primary" @click.stop="drawer = !drawer" />
      <v-toolbar-title> <img class="logo" :src="logo" :alt="item.title" /></v-toolbar-title>
      <v-spacer />
      <v-btn text color="tertiary" :to="{ name: 'inspire' }">
        <span>Liste des jeux</span>
      </v-btn>
      <v-btn text color="tertiary" :to="{ name: 'inspire' }">
        <span class="white--text">Liste de GM</span>
      </v-btn>
      <v-btn text color="tertiary ">
        <span>Se connecter</span>
      </v-btn>
    </v-app-bar>
    <!-- main content -->
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <!-- footer -->
    <v-footer :absolute="!fixed" app>
      <v-spacer />
      <span class="tertiary--text d-flex text-center align-center"> &copy; {{ title }} {{ new Date().getFullYear()
      }}</span>
      <v-spacer />
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import UnauthenticatedUserSidebar from '~/components/sidebars/UnauthenticatedUserSidebar.vue'
import UserSidebar from '~/components/sidebars/UserSidebar.vue'
export default {
  name: 'DefaultLayout',
  components: {
    UnauthenticatedUserSidebar,
    UserSidebar,
  },
  data() {
    return {
      // to fix when the back-end is ready
      isUser: false,
      logo: require('~/assets/logo.png'),
      clipped: false,
      drawer: false,
      fixed: false,
      item: {
        icon: 'mdi-apps',
        title: 'Accueil',
        to: '/',
        color: 'primary',
      },
      miniVariant: false,
      right: false,
      rightDrawer: false,
      title: 'Good Lock',
    }
  },
  computed: {
    ...mapGetters({
    }),
  },
  mounted() {
    // this.$vuetify.theme.dark = true
  },
  methods: {
    ...mapActions({
    }),
  },

}
</script>
