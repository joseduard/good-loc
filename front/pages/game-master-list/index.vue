<template>
    <div id="all">
        <h1>Liste des Game Masters</h1>
        <p>Occaecat ad labore est non reprehenderit proident duis veniam sint tempor proident sit consectetur. Dolore excepteur sint enim duis magna quis in occaecat mollit et cillum nisi tempor culpa. Magna non in nisi excepteur culpa. Qui esse aliqua nisi laborum quis ea officia deserunt consectetur.</p>
        <v-text-field class="search-input" light outlined  placeholder="rehcherche jeux"></v-text-field>
        <listGameMasters  />
    </div>
</template>
<script>
import listGameMasters from '~/components/lists/ListGameMasters.vue'
export default {
    name: 'GameMasterList',
    components: {
        listGameMasters,
    },
    data() {
        return {
            value:'',
            dialogModal:false,
        }
    },
}
</script>