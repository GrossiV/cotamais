import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import AssetCell from '../Tables/Cells/AssetCell.vue'

describe('AssetCell', () => {
  it('renders properly', () => {
    const wrapper = shallowMount(AssetCell, {
      slots: { heading: 'Hello Vitest', body: 'test', footer: 'succeed' }
    })

    expect(wrapper.html()).toContain('Hello Vitest')
    expect(wrapper.html()).toContain('test')
    expect(wrapper.html()).toContain('succeed')
  })
})
