import { mount } from '@vue/test-utils'
import Home from './Home'

describe('Counter', () => {
  // Now mount the component and you have the wrapper
  var wrapper = mount(Home)

  it('renders the correct markup', () => {
    expect(wrapper.html()).toContain("What's for lunch")
  })

  // it's also easy to check for the existence of elements
  it('has a button', () => {
    expect(wrapper.contains('button')).toBe(true)
  })
})