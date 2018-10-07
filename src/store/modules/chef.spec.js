// getters.spec.js
import { expect } from 'chai'
import { getters, mutations, actions } from './chef'
import sinon from 'sinon'
import kitchen from '../../api/kitchen'
import {todayDate} from '../../util/Date'

const state = {
  recipes: [
    {
      "title":"Ham Toastie",
      "ingredients":["Ham"]
    },
    {
      "title":"Cheese Toastie",
      "ingredients":["Cheese"]
    },
    {
      "title":"Cheese1 Toastie",
      "ingredients":["Cheese1"]
    },
    {
      "title":"Mushroom Toastie",
      "ingredients":["Mushroom"]
    },
    {
      "title":"Mushroom1 Toastie",
      "ingredients":["Mushroom1"]
    },
    {
      "title":"Mushroom2 Toastie",
      "ingredients":["Mushroom2"]
    },
    {
      "title":"Mushroom3 Toastie",
      "ingredients":["Mushroom3"]
    },
  ],
  ingredients: [
    {  
      "title":"Ham",
      "best-before":"2018-10-12",
      "use-by":"2018-10-01"
    },
    {  
      "title":"Cheese",
      "best-before":"2017-10-1",
      "use-by":"2018-10-17"
    },
    {  
      "title":"Cheese1",
      "best-before":"2017-09-1",
      "use-by":"2018-10-17"
    },
    {  
      "title":"Mushroom",
      "best-before":"2018-10-06",
      "use-by":"2018-10-07"
    },
    {  
      "title":"Mushroom1",
      "best-before":"2018-10-12",
      "use-by":"2018-10-17"
    },
    {  
      "title":"Mushroom2",
      "best-before":"2018-10-12",
      "use-by":"2018-10-17"
    },
    {  
      "title":"Mushroom3",
      "best-before":"2018-10-12",
      "use-by":"2018-10-17"
    },
  ]
}

const realDateNow = Date.now.bind(global.Date);

describe('getters', () => {
  beforeAll(() => {
    //test date is 06/10/2018
    const dateNowStub = jest.fn(() => 1538793743715);
    global.Date.now = dateNowStub;
  })

  afterAll(() => {
    global.Date.now = realDateNow;
  })

  it('filteredExpiredRecipes', () => {
    // get the result from the getter
    const result = getters.ingredientsAvailable(state)

    // assert the result
    expect(result['Cheese']).to.exist;
    expect(result['Mushroom']).to.exist;
    expect(result['Ham']).to.not.exist;
  })

  it('show only recipe with non expiry ingredient', () => {
    
    // get the result from the getter
    const ingredientsAvailable = getters.ingredientsAvailable(state)
    const result = getters.recipesAvailable(state, {ingredientsAvailable})

    // assert the result
    expect(result.length).to.equal(6);
    expect(result[0].title).to.equal("Mushroom Toastie");
    expect(result[1].title).to.equal("Mushroom1 Toastie");
    expect(result[2].title).to.equal("Mushroom2 Toastie");
    expect(result[3].title).to.equal("Mushroom3 Toastie");
    expect(result[4].title).to.equal("Cheese Toastie");
    expect(result[5].title).to.equal("Cheese1 Toastie");
  })

  it('should set the recipes', () => {
    
    const testState = {
      recipes: [],
      ingredients: []
    };

    const recipes = [{title:'Fish And Chips'}];
    const ingredients = [{name:'Fish'}];

    mutations.setRecipes(testState,recipes);
    expect(testState.recipes).to.equal(recipes);

    mutations.setIngredients(testState,ingredients);
    expect(testState.ingredients).to.equal(ingredients);
  })

  it('should set the state on get available recipes', () => {
    
    var testState = {
      recipes: [],
      ingredients: []
    };

    let stub = sinon.stub(kitchen, 'getAvailable')
    //stub.resolves([{label:'a'}],[{item:'v'}])

    let mockCommit = sinon.spy()
    
    actions.getAvailableFood({commit:mockCommit}, testState)
    expect(stub.called).to.equal(true);
  })
})