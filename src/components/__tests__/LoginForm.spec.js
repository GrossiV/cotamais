import { afterEach, describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import LoginForm from '../forms/LoginForm.vue'
const mockPush = vi.fn()

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: mockPush
  })
}))

describe('LoginForm', () => {
  const getItemSpy = vi.spyOn(Storage.prototype, 'getItem')
  const setItemSpy = vi.spyOn(Storage.prototype, 'setItem')
  afterEach(() => {
    localStorage.clear()
    getItemSpy.mockClear()
    setItemSpy.mockClear()
  })
  it('redirect to login', async () => {
    const wrapper = mount(LoginForm)

    const button = wrapper.find('.form__button--secondary')
    button.trigger('click')
    expect(mockPush).toHaveBeenCalledWith({ name: 'signup' })
  })
  it('validate all inputs cant submit with empty inputs', async () => {
    const wrapper = mount(LoginForm)

    const form = wrapper.find('.form')

    const loginInput = wrapper.find('#login')
    const passwordInput = wrapper.find('#password')

    await form.trigger('submit')

    let invalidInputs = wrapper.findAll('.input--error')
    expect(invalidInputs.length).toBe(2)

    await loginInput.trigger('focus')
    loginInput.setValue('usuario')
    invalidInputs = wrapper.findAll('.input--error')
    expect(invalidInputs.length).toBe(1)

    await passwordInput.trigger('focus')
    passwordInput.setValue('senha')
    invalidInputs = wrapper.findAll('.input--error')
    expect(invalidInputs.length).toBe(0)
  })
  it('should submit', async () => {
    const wrapper = mount(LoginForm)

    const form = wrapper.find('.form')

    const loginInput = wrapper.find('#login')
    loginInput.setValue('usuario')

    const passwordInput = wrapper.find('#password')
    passwordInput.setValue('senha')
    const token = Date.now()
    localStorage.setItem('loggedUser', 'usuario')
    localStorage.setItem(
      'usuario',
      JSON.stringify({
        username: 'usuario',
        password: 'senha',
        token
      })
    )

    await form.trigger('submit')
    expect(setItemSpy).toHaveBeenCalledWith(
      'usuario',
      JSON.stringify({
        username: 'usuario',
        password: 'senha',
        token
      })
    )
    expect(getItemSpy).toHaveBeenCalledWith('usuario')
    expect(mockPush).toHaveBeenCalledWith({ name: 'dashboard' })
  })
  it('validate wrong password', async () => {
    const wrapper = mount(LoginForm)

    const form = wrapper.find('.form')
    const token = Date.now()
    localStorage.setItem('loggedUser', 'usuarioCerto')
    localStorage.setItem(
      'usuarioCerto',
      JSON.stringify({
        username: 'usuarioCerto',
        password: 'senhaCerta',
        token
      })
    )

    const loginInput = wrapper.find('#login')
    loginInput.setValue('usuarioErrado')

    const passwordInput = wrapper.find('#password')
    passwordInput.setValue('senhaErrada')

    await form.trigger('submit')
    const alert = wrapper.find('.alert')
    expect(alert.text()).toBe('Usuário não cadastrado.')
  })
})
