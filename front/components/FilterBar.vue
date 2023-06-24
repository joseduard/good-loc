<template>
  <div class="rowFilter">
    <v-select
      v-model="selectedItem"
      :items="dropdownItems"
      placeholder="Filter by:"
      outlined
      class="filter"
      :class="{'orange--text': selectedItem !== null}"
    ></v-select>

    <v-select
      v-if="selectedItem === 'Categories'"
      v-model="selectedCategory"
      :items="categories"
      placeholder="Choose a category:"
      outlined
      class="filter"
      :class="{'orange--text': selectedCategory !== null}"
    ></v-select>

    <v-select
      v-if="selectedItem === 'Mechanics'"
      v-model="selectedMechanic"
      :items="mechanics"
      placeholder="Choose a mechanic:"
      outlined
      class="filter"
      :class="{'orange--text': selectedMechanic !== null}"
    ></v-select>

    <v-select
      v-if="selectedItem === 'City'"
      v-model="selectedCity"
      :items="cities"
      placeholder="Choose a city:"
      outlined
      class="filter"
      :class="{'orange--text': selectedCity !== null}"
    ></v-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedCategory: null,
      categories: [],
      selectedMechanic: null,
      mechanics: [],
      selectedCity: null,
      cities: [],
      selectedItem: null,
      dropdownItems: ['City', 'Categories', 'Mechanics'],
    };
  },
  watch: {
    selectedItem(newVal) {
      if (newVal === 'Categories') {
        this.fetchCategories();
      } else if (newVal === 'Mechanics') {
        this.fetchMechanics();
      } else if (newVal === 'City') {
        this.fetchCities();
      }
      this.emitFiltersChange();
    },
    selectedCategory() {
      this.emitFiltersChange();
    },
    selectedMechanic() {
      this.emitFiltersChange();
    },
    selectedCity() {
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
        selectedCategory: this.selectedCategory,
        selectedMechanic: this.selectedMechanic,
        selectedCity: this.selectedCity,
      });
    },
  },
};
</script>
