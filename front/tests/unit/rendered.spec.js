// Import the `mount()` method from Vue Test Utils
import CardGame from '@/components/CardGame.vue'

import Vuetify from 'vuetify'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { shallowMount, createLocalVue } from '@vue/test-utils'

const localVue = createLocalVue()
localVue.use(FontAwesomeIcon)
localVue.use(Vuetify)



describe('module', () => {
// The component to test
test('displays message', () => {
  // mount() returns a wrapped Vue component we can interact with
  
  const wrapper = shallowMount(CardGame, {
        propsData: {
            game: {name: 'gameName', description: 'Description', image: 'image', mechanic_name: 'DiceMech', category_name: 'CategName', price: 12, id: 'id' }
          },
          computed: {
            pageIsRentsAsRenterOrRentsAsOwner() {
              return false
            }
          },
  localVue
  }
)

  // Assert the rendered text of the component
  expect(wrapper.text()).toContain('gameName','Description', 'image', 'mechanic_name', 'category_name', 'price', 'id')
})
})
