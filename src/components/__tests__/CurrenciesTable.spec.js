import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CurrenciesTable from '../Tables/CurrenciesTable.vue'

const MOCK_CURRENCIES = {
  source: 'BRL',
  USD: {
    name: 'Dollar',
    buy: '5.1652',
    sell: '5.1652',
    variation: '-0.064'
  },
  BTC: {
    name: 'Bitcoin',
    buy: '108754.997',
    sell: '108754.997',
    variation: '2.463'
  },
  ARS: {
    name: 'Argentine Peso',
    buy: '0.0258',
    sell: null,
    variation: '0.0'
  }
}

describe('CurrenciesTable', () => {
  it('renders properly', () => {
    const wrapper = mount(CurrenciesTable, { props: { assets: MOCK_CURRENCIES } })
    expect(wrapper.text()).toContain('Dollar')
    expect(wrapper.find('.chip--danger').isVisible()).toBe(true)
    expect(wrapper.text()).toContain('Bitcoin')
    expect(wrapper.find('.chip--success').isVisible()).toBe(true)
    expect(wrapper.text()).toContain('Argentine Peso')
    expect(wrapper.find('.chip--default').isVisible()).toBe(true)
    const quotation = wrapper.find('.asset-tile__main-info')
    quotation.trigger('click')
    expect(wrapper.emitted('focusOnChart')).toBeTruthy()
  })
})
