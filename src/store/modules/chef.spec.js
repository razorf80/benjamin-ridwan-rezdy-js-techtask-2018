// getters.spec.js
import { expect } from 'chai'
import { getters } from './chef'

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
      "title":"Mushroom Toastie",
      "ingredients":["Mushroom"]
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
      "title":"Mushroom",
      "best-before":"2018-10-12",
      "use-by":"2018-10-017"
    },
  ]
}

const realDateNow = Date.now.bind(global.Date);

describe('getters', () => {
  beforeAll(() => {
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
    expect(result['Ham']).to.not.exist;
  })

  it('show only recipe with non expiry ingredient', () => {
    
    // get the result from the getter
    const ingredientsAvailable = getters.ingredientsAvailable(state)
    const result = getters.recipesAvailable(state, {ingredientsAvailable})

    // assert the result
    expect(result.length).to.equal(2);
    expect(result[0].title).to.equal("Mushroom Toastie");
    expect(result[1].title).to.equal("Cheese Toastie");
  })
})