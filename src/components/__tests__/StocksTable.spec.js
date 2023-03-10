import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import StocksTable from '../Tables/StocksTable.vue'
import { MOCK_STOCKS } from '../../utils/mocks'

describe('StocksTable', () => {
  it('renders properly', () => {
    const wrapper = mount(StocksTable, { props: { assets: MOCK_STOCKS } })
    expect(wrapper.text()).toContain('Sao Paulo, Brazil')
    expect(wrapper.text()).toContain('Tokyo, Japan')
    expect(wrapper.text()).toContain('New York City, United States')
    expect(wrapper.find('.danger').isVisible()).toBe(true)
    expect(wrapper.findAll('.danger').length).toBe(1)
    expect(wrapper.find('.success').isVisible()).toBe(true)
    expect(wrapper.findAll('.success').length).toBe(1)
    expect(wrapper.findAll('.asset-tile__main-info').length).toBe(3)
  })
})
