import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import LoaderCircular from '../LoaderCircular.vue'

describe('LoaderCircular', () => {
  it('renders properly', () => {
    const wrapper = shallowMount(LoaderCircular)
    const loader = wrapper.find('.loader')

    expect(loader.isVisible()).toBe(true)
  })
})
