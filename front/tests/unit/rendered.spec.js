// Import the `mount()` method from Vue Test Utils
import CardGame from '@/components/CardGame.vue'

import Vue from 'vue'
import Vuetify from 'vuetify'
import { shallowMount, createLocalVue } from '@vue/test-utils'

Vue.use(Vuetify)

const localVue = createLocalVue()

describe('module', () => {
  let vuetify
  beforeEach(() => {
    vuetify = new Vuetify()
  })
// The component to test
test('displays message', () => {
  // mount() returns a wrapped Vue component we can interact with
  
  const wrapper = shallowMount(CardGame, {
        propsData: {
            game: {name: 'gameName', description: 'Description', image: 'image', mechanic_name: 'mechanic_name', category_name: 'category_name', price: 'price', id: 'id' }
          },
          mocks: {
            $nuxt: {
              $route: '/game-list'
            }
          },
  },
  localVue,
        vuetify,
)
  delete window.location
window.location = new URL('http://localhost:3000/game-list')

  // Assert the rendered text of the component
  expect(wrapper.text()).toContain('gameName','Description', 'image', 'mechanic_name', 'category_name', 'price', 'id')
})
})
