import { afterEach, describe, expect, it, vi } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import DashboardView from '../../views/DashboardView.vue'
import { useRouter } from 'vue-router'
import { getStocksAndCurrencies } from '@/services/dashboard-service'
import { MOCK_CURRENCIES, MOCK_STOCKS } from '../../utils/mocks'

vi.mock('vue-router')
vi.mock('@/services/dashboard-service')

describe('DashboardView', () => {
  const getItemSpy = vi.spyOn(Storage.prototype, 'getItem')
  const setItemSpy = vi.spyOn(Storage.prototype, 'setItem')
  useRouter.mockReturnValue({
    push: vi.fn()
  })
  afterEach(() => {
    localStorage.clear()
    getItemSpy.mockClear()
    setItemSpy.mockClear()
    getStocksAndCurrencies.mockClear()
  })

  it('redirect unauthenticated user to login screen', () => {
    getStocksAndCurrencies.mockReturnValue(null)
    shallowMount(DashboardView)
    expect(useRouter().push).toHaveBeenCalledWith({ name: 'login' })
  })

  it('keep user in dashboard', () => {
    getStocksAndCurrencies.mockReturnValue({
      stocks: MOCK_STOCKS,
      currencies: MOCK_CURRENCIES
    })
    const token = Date.now()
    localStorage.setItem('loggedUser', 'usuario')
    localStorage.setItem(
      'usuario',
      JSON.stringify({
        username: 'usuario',
        password: 'senha',
        token: '1678316283385'
      })
    )
    const wrapper = mount(DashboardView)

    wrapper.vm.$emit('focusOnChart', 'USD')
  })
})
