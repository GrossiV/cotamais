import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Alert from '../Alert.vue'

describe('Alert', () => {
  it('renders properly', () => {
    const wrapper = mount(Alert, { props: { text: 'Hello Vitest', type: 'success' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
