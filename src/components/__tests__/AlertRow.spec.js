import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AlertRow from '../AlertRow.vue'

describe('AlertRow', () => {
  it('renders properly', () => {
    const wrapper = mount(AlertRow, { props: { text: 'Hello Vitest', type: 'success' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
