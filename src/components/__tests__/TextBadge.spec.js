import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TextBadge from '../TextBadge.vue'

describe('TextBadge', () => {
  it('renders properly', () => {
    const wrapper = mount(TextBadge, { props: { text: 'Hello Vitest', type: 'success' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
