import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import AlertRow from '../AlertRow.vue'

describe('AlertRow', () => {
  it('renders properly', () => {
    const wrapper = shallowMount(AlertRow, { props: { text: 'Hello Vitest', type: 'success' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
