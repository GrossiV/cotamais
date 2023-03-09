import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import LineChart from '../Charts/LineChart.vue'

describe('LineChart', () => {
  it('renders properly', () => {
    const wrapper = shallowMount(LineChart, {
      props: { show: true, chartData: {}, chartOptions: {} }
    })
    expect(wrapper.text()).toContain(
      '* Dados ficticios, para ter acesso aos dados reais torne-se membro Cota+ Premium.'
    )
  })
  it('does not render when !show', () => {
    const wrapper = shallowMount(LineChart, {
      props: { show: false, chartData: {}, chartOptions: {} }
    })
    expect(wrapper.text()).not.toContain(
      '* Dados ficticios, para ter acesso aos dados reais torne-se membro Cota+ Premium.'
    )
  })
})
