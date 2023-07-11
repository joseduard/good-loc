import { shallowMount, createLocalVue } from '@vue/test-utils'
import CardGame from '../../../components/CardGame.vue'
import { setupTestingVueAndVuetify } from '~/tests/setup'
import {
  textExistsInWrapper,
  transformWrapperToDOM,
} from '~/tests/test-utils/dom-related'

describe('module', () => {
  // The component to test
  test('displays message', () => {
    // mount() returns a wrapped Vue component we can interact with

    const wrapper = shallowMount(CardGame, {
      propsData: {
        game: {
          name: 'gameName',
          description: 'Description',
          image: 'image',
          mechanic_name: 'DiceMech',
          category_name: 'CategName',
          price: 12,
          id: 'id',
        },
        user: {
          pseudo: 'xd',
        },
      },
      computed: {
        pageIsRentsAsRenterOrRentsAsOwner() {
          return true
        },
      },
      ...setupTestingVueAndVuetify(),
    })

    // Assert the rendered text of the component
    // toContain ne prends qu'un seul argument si tu veux check plusieurs trucs, il faut faire plusieurs expect.
    // Fichier de testes a finir il faut bien mocker et check que les bonne  valeur sont affiché
    // console.log(wrapper.html()) <- ne pas hesiter a faire un console.log pour voir ce que contient le wrapper et le dom pour mieux comprendre

    const wrapperHTML = transformWrapperToDOM(wrapper)
    expect(textExistsInWrapper(wrapper, 'gameName')).toBe(true)
  })
})
