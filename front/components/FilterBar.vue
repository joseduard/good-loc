<template>
  <div class="rowFilter">
    <v-select
      v-model="selectedFilter"
      :items="dropdownItems"
      placeholder="Filter by:"
      outlined
      class="filter"
      :class="{'orange--text': selectedFilter !== null}"
    ></v-select>
    <v-select
      v-if="selectedFilter === 'Categories'"
      v-model="filter"
      :items="categories"
      placeholder="Choose a category:"
      outlined
      class="filter"
      :class="{'orange--text': filter !== null}"
    ></v-select>

    <v-select
      v-if="selectedFilter === 'Mechanics'"
      v-model="filter"
      :items="mechanics"
      placeholder="Choose a mechanic:"
      outlined
      class="filter"
      :class="{'orange--text': filter !== null}"
    ></v-select>

    <v-select
      v-if="selectedFilter === 'City'"
      v-model="filter"
      :items="cities"
      placeholder="Choose a city:"
      outlined
      class="filter"
      :class="{'orange--text': filter !== null}"
    ></v-select>
  <v-text-field
        v-model="filter"
        label="Objet du message"
        clearable
        class="input-required"
        @input="emitFiltersChange"
      ></v-text-field>

  </div>

</template>

<script>
export default {
  data() {
    return {
      filter: null,
      categories: [],
      mechanics: [],
      cities: [],
      dropdownItems: ['City', 'Categories', 'Mechanics','Name'],
      selectedName: '',
      selectedFilter: null,
    };
  },
  watch: {
    selectedFilter(newVal) {
      if (newVal === 'Categories') {
        this.fetchCategories();
      } else if (newVal === 'Mechanics') {
        this.fetchMechanics();
      } else if (newVal === 'City') {
        this.fetchCities();
      }
    },
    filter() {
      this.emitFiltersChange();
    },
  },
  methods: {
    fetchCategories() {
      this.$axios.get('api/categories').then((res) => {
        this.categories = res.data.map((category) => category.name);
      });
    },
    fetchCities() {
      this.$axios.get('api/cities').then((res) => {
        this.cities = res.data;
      });
    },
    fetchMechanics() {
      this.$axios.get('api/mechanics').then((res) => {
        this.mechanics = res.data.map((mechanic) => mechanic.name);
      });
    },
    emitFiltersChange() {
      this.$emit('filters-change', {
        filter: this.filter,
        selectedFilter: this.selectedFilter,
      });
    },
  },
};
</script>
