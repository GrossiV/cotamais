import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CurrenciesTable from '../Tables/CurrenciesTable.vue'
import { MOCK_CURRENCIES } from '../../utils/mocks'

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
