import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import CustomInput from '../forms/inputs/CustomInput.vue'

describe('CustomInput', () => {
  it('insert value on input', async () => {
    const wrapper = mount(CustomInput, {
      props: {
        type: 'text',
        placeholder: 'type anything',
        hasError: true
      }
    })

    const input = wrapper.find('input')
    expect(input.element.value).toBe('')
    input.trigger('focus')
    expect(wrapper.emitted('onInputFocus')).toBeTruthy()

    await input.setValue('New Test Value')
    expect(wrapper.emitted().onInputChange[0][0]).toEqual('New Test Value')
    expect(input.element.value).toBe('New Test Value')
  })
})
