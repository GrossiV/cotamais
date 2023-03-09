import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import TextBadge from '../TextBadge.vue'

describe('TextBadge', () => {
  it('renders properly', () => {
    const wrapper = shallowMount(TextBadge, { props: { text: 'Hello Vitest', type: 'success' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
