<script setup>
import CustomInput from './inputs/CustomInput.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Alert from '../AlertRow.vue'

const loginInput = ref('')
const hasLoginError = ref(false)
const hasPasswordError = ref(false)
const hasConfirmPasswordError = ref(false)
const passwordInput = ref('')
const confirmPasswordInput = ref('')
const router = useRouter()
const submitButton = ref(null)
const alertText = ref('')
const alertType = ref('')

function updateLogin(input) {
  loginInput.value = input
}

function updatePassword(input) {
  passwordInput.value = input
}

function updateConfirmPassword(input) {
  confirmPasswordInput.value = input
}

function validateLoginInput() {
  if (!loginInput.value) {
    hasLoginError.value = true
    return false
  }
  return true
}

function hideAlert() {
  alertText.value = ''
  alertType.value = ''
}

function validatePasswordInput() {
  if (!passwordInput.value) {
    hasPasswordError.value = true
    return false
  }
  return true
}

function validateConfirmPasswordInput() {
  if (!confirmPasswordInput.value || confirmPasswordInput.value !== passwordInput.value) {
    hasConfirmPasswordError.value = true
    if (loginInput.value && passwordInput.value) {
      alertText.value = 'As senhas digitadas precisam ser iguais.'
      alertType.value = 'danger'
    }
    return false
  }
  return true
}

function validateInputs() {
  const login = validateLoginInput()
  const password = validatePasswordInput()
  const confirmPassword = validateConfirmPasswordInput()

  return !!login && !!password && confirmPassword
}

function handleAlreadySignedupClick() {
  router.push({ name: 'login' })
}

function handleSignupClick() {
  submitButton.value.focus()
  if (!validateInputs()) {
    return
  }
  const user = {
    username: loginInput.value,
    password: passwordInput.value,
    token: null
  }

  localStorage.setItem(loginInput.value, JSON.stringify(user))

  router.push({ name: 'login' })
}
</script>

<template>
  <div class="container">
    <Alert class="alert" :type="alertType" :text="alertText" />
    <div class="signup-box">
      <h1 class="title">Cota +</h1>
      <form class="form" @submit.prevent="handleSignupClick">
        <CustomInput
          id="login"
          @onInputChange="updateLogin"
          @onInputFocus="hasLoginError = false"
          :hasError="hasLoginError"
          class="form__input"
          placeholder="usuário"
        />
        <CustomInput
          id="password"
          @onInputChange="updatePassword"
          @onInputFocus="hasPasswordError = false"
          @click="hideAlert"
          :hasError="hasPasswordError"
          class="form__input"
          type="password"
          placeholder="senha"
        />
        <CustomInput
          id="confirmPassword"
          @onInputChange="updateConfirmPassword"
          @onInputFocus="hasConfirmPasswordError = false"
          @click="hideAlert"
          :hasError="hasConfirmPasswordError"
          class="form__input"
          type="password"
          placeholder="confirme a senha"
        />
        <div class="form__footer">
          <button ref="submitButton" class="form__button form__button--primary">Registrar</button>
        </div>
      </form>
      <div class="container__footer">
        <button @click="handleAlreadySignedupClick" class="form__button form__button--secondary">
          Já sou cadastrado
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 400px;
  margin: 0 auto;
}
.alert {
  position: absolute;
  top: 24px;
  width: 100%;
}

.title {
  color: var(--primary);
  text-shadow: 1px 1px 20px var(--primary);
  font-weight: bold;
  text-align: center;
}
.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  border-radius: 15px;
}
.form__footer {
  display: flex;
  width: 100%;
  justify-items: center;
}
.form__button {
  margin: 0 auto;
  padding: 12px 32px;
  border: none;
  border-radius: 24px;
  color: white;
  font-weight: bold;
}
.form__button:focus {
  outline: none;
}
.form__button--primary {
  background-color: var(--primary);
}

.container__footer {
  text-align: center;
  width: 100%;
}
.form__button--secondary {
  padding: 0;
  color: var(--primary);
  background-color: rgba(0, 0, 0, 0);
}
@media (min-width: 768px) {
  .signup-box {
    background-color: white;
    padding: 12px 0;
    border-radius: 12px;
  }
}
</style>
