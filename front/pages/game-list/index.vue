<template>
    <div id="all">
        <h1>Liste des jeux</h1>
        <p>Occaecat ad labore est non reprehenderit proident duis veniam sint tempor proident sit consectetur. Dolore excepteur sint enim duis magna quis in occaecat mollit et cillum nisi tempor culpa. Magna non in nisi excepteur culpa. Qui esse aliqua nisi laborum quis ea officia deserunt consectetur.</p>
        <v-text-field class="search-input" light outlined  placeholder="rehcherche jeux"></v-text-field>
        <listGames />
    </div>
</template>
<script>
import listGames from '~/components/lists/ListGames.vue'
export default {
    name: 'GameList',
    components: {
        listGames
    },
}
</script>