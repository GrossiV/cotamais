import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import SignupForm from '../forms/SignupForm.vue'
const mockPush = vi.fn()

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: mockPush
  })
}))

describe('SignupForm', () => {
  it('redirect to login', async () => {
    const wrapper = mount(SignupForm)

    const button = wrapper.find('.form__button--secondary')
    button.trigger('click')
    expect(mockPush).toHaveBeenCalledWith({ name: 'login' })
  })
  it('validate passwords equality and show alert', async () => {
    const wrapper = mount(SignupForm)

    const form = wrapper.find('.form')

    const loginInput = wrapper.find('#login')
    loginInput.setValue('usuario')
    const passwordInput = wrapper.find('#password')
    passwordInput.setValue('senha')
    const confirmPasswordInput = wrapper.find('#confirmPassword')
    confirmPasswordInput.setValue('confirmacao-de-senha')

    await form.trigger('submit')

    const alert = wrapper.find('.alert')
    expect(alert.text()).toBe('As senhas digitadas precisam ser iguais.')
    confirmPasswordInput.trigger('click')
    confirmPasswordInput.setValue('senha')
    await form.trigger('submit')
    expect(mockPush).toHaveBeenCalledWith({ name: 'login' })
  })
  it('validate all inputs before submit form', async () => {
    const wrapper = mount(SignupForm)

    const form = wrapper.find('.form')
    await form.trigger('submit')

    let invalidInputs = wrapper.findAll('.input--error')
    expect(invalidInputs.length).toBe(3)

    const loginInput = wrapper.find('#login')
    await loginInput.trigger('focus')
    loginInput.setValue('usuario')

    invalidInputs = wrapper.findAll('.input--error')
    expect(invalidInputs.length).toBe(2)

    const passwordInput = wrapper.find('#password')
    await passwordInput.trigger('focus')
    passwordInput.setValue('senha')

    invalidInputs = wrapper.findAll('.input--error')
    expect(invalidInputs.length).toBe(1)

    const confirmPasswordInput = wrapper.find('#confirmPassword')
    await confirmPasswordInput.trigger('focus')
    confirmPasswordInput.setValue('senha')

    invalidInputs = wrapper.findAll('.input--error')
    expect(invalidInputs.length).toBe(0)

    await form.trigger('submit')
    expect(mockPush).toHaveBeenCalledWith({ name: 'login' })
  })
})
