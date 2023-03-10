import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import StocksTable from '../Tables/StocksTable.vue'

const MOCK_STOCKS = {
  IBOVESPA: {
    name: 'BM&F BOVESPA',
    location: 'Sao Paulo, Brazil',
    points: 105071.19,
    variation: '-1.38'
  },
  NIKKEI: {
    name: 'Nikkei 225',
    location: 'Tokyo, Japan',
    points: 28623.15,
    variation: '0.63'
  },
  NASDAQ: {
    name: 'NASDAQ Stock Market',
    location: 'New York City, United States',
    points: 11338.35,
    variation: '0.0'
  }
}

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
