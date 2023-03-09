import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import TopBar from '../TopBar.vue'
import { useRouter } from 'vue-router'

vi.mock('vue-router')

describe('TopBar', () => {
  useRouter.mockReturnValue({
    push: vi.fn()
  })
  it('renders properly', () => {
    const wrapper = mount(TopBar)
    expect(wrapper.text()).toContain('Cota +')
  })
  it('handle click redirect to home', async () => {
    const wrapper = mount(TopBar)
    await wrapper.find('.logo').trigger('click')
    expect(useRouter().push).toHaveBeenCalledWith({ name: 'dashboard' })
  })
  it('handle click logout', async () => {
    const wrapper = mount(TopBar)
    await wrapper.find('.logout').trigger('click')
    expect(useRouter().push).toHaveBeenCalledWith({ name: 'login' })
  })
})
