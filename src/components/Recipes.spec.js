import Vuex from 'vuex'
import { shallow, createLocalVue } from 'vue-test-utils'
import Recipes from './Recipes'
import sinon from 'sinon'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Recipes', () => {
  let store
  let actions
  let getters

  beforeEach(() => {

    actions = {
      getAvailableFood: sinon.spy()
    }

    getters = {
      recipesAvailable: () => [
        {
          "title":"Ham Toastie",
          "ingredients":["HamCold"]
        },
        {
          "title":"Cheese Toastie",
          "ingredients":["Cheesy","Lettuce"]
        }
      ]
    }

    let chef = {
      namespaced: true,
      state: {},
      actions,
      getters
    }

    store = new Vuex.Store({
      modules:{
        chef,
        localVue
      }
    })  
  })

  it('dispatches getAvailableFood on created', () => {
    shallow(Recipes, {
      store,
      localVue
    })
    
    expect(actions.getAvailableFood.called).toBe(true)
  })

  it('returns recipes', () => {
    const wrapper = shallow(Recipes, {
      store,
      localVue
    })
    
    const content = wrapper.html()
    expect(content).toContain('Ham Toastie')
    expect(content).toContain('HamCold')
    expect(content).toContain('Cheese Toastie')
    expect(content).toContain('Cheesy')
    expect(content).toContain('Lettuce')
  })

})