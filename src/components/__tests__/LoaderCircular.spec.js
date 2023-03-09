import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LoaderCircular from '../LoaderCircular.vue'

describe('LoaderCircular', () => {
  it('renders properly', () => {
    const wrapper = mount(LoaderCircular)
    const loader = wrapper.find('.loader')

    expect(loader.isVisible()).toBe(true)
  })
})
