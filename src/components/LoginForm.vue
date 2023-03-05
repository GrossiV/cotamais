<script setup>
import CustomInput from './CustomInput.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const loginInput = ref('')
const hasLoginError = ref(false)
const passwordInput = ref('')
const hasPasswordError = ref(false)
const router = useRouter()
const submitButton = ref(null)

function updateLogin(input) {
    loginInput.value = input
}

function updatePassword(input) {
    passwordInput.value = input
}

// TODO create utils to validate inputs passing value and regex;

function validateInputs() {
    const login = validateLoginInput();
    const password = validatePasswordInput();
    return !!login && !!password;
}


function validateLoginInput() {
    if (!loginInput.value)
        {
            hasLoginError.value = true
            return false
        }
    return true
}

function validatePasswordInput() {
    if (!passwordInput.value)
        {
            hasPasswordError.value = true
            return false
        }
    return true
}

function validateUser() {
    const user = JSON.parse(localStorage.getItem(loginInput.value))
    if(
        user?.username !== loginInput.value 
        || user?.password !== passwordInput.value
    ) {
        //TODO alert to inform that user does not exist;
        return false
    }

    user.token = Date.now();
    localStorage.setItem('loggedUser', loginInput.value);
    localStorage.setItem(loginInput.value, JSON.stringify(user));

    return true
}

function handleLoginClick() {
    submitButton.value.focus();
    if(!validateInputs()) {
        return 
    }
    
    if(!validateUser()) {
        return 
    }
    
    router.push({name: 'dashboard'})
}

function handleSignupClick() {
    router.push({name: 'signup'})
}

</script>

<template>
    <div class="container">
        <div class="login-box">
        <h1 class="title">Cota +</h1>
        <form
            @submit.prevent="handleLoginClick"
            class="form"
        >
            <CustomInput 
                @onInputChange="updateLogin" 
                @onInputFocus="hasLoginError=false" 
                :hasError="hasLoginError" 
                class="form__input"  
                placeholder="usuário"
            />
            <CustomInput 
                @onInputChange="updatePassword" 
                @onInputFocus="hasPasswordError=false" 
                :hasError="hasPasswordError" 
                class="form__input" type="password" 
                placeholder="senha"
            />
            <div class="form__footer">
                <button ref="submitButton" class="form__button form__button--primary">Acessar</button>
            </div>
        </form>
        <button 
            @click="handleSignupClick"
            class="form__button form__button--secondary"
        >
            Ainda não é cadastrado?
        </button>
    </div>
    </div>
</template>

<style scoped>

.container{
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 400px;
    margin: 0 auto;
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
.form__button--secondary {
    text-align: center;
    padding-top: 0;
    width: 100%;
    color: var(--primary);
    background-color: rgba(0,0,0,0);
}

@media (min-width: 768px) {
    .login-box{
        background-color: white;
        padding: 12px 0;
        border-radius: 12px;
    }
}
</style>