<script setup>
import CustomInput from './CustomInput.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// TODO Create feedback messages on login error and user not registred

const loginInput = ref('')
const hasLoginError = ref(false)
const hasPasswordError = ref(false)
const hasConfirmPasswordError = ref(false)
const passwordInput = ref('')
const confirmPasswordInput = ref('')
const router = useRouter()

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

function validateConfirmPasswordInput() {
    if (!confirmPasswordInput.value 
        || confirmPasswordInput.value !== passwordInput.value)
        {
            hasConfirmPasswordError.value = true
            return false
        }
    return true
}


function validateInputs() {
    const login = validateLoginInput();
    const password = validatePasswordInput();
    const confirmPassword = validateConfirmPasswordInput();
    
    return !!login && !!password && confirmPassword;
}

function handleAlreadySignedupClick() {
    router.push({name: 'login'})
}

function handleSignupClick() {
    if (!validateInputs()) {
        return;
    }
    const user = {
        username: loginInput.value,
        password: passwordInput.value,
        token: null
    }
    
    localStorage.setItem(loginInput.value, JSON.stringify(user));

     router.push({name: 'login'});
    // TODO remove anchor tag
}

</script>

<template>
    <h1>Cota +</h1>
    <div class="form">
        <CustomInput 
            @onInputChange="updateLogin" 
            @onInputFocus="hasLoginError=false" 
            :hasError="hasLoginError" 
            class="form__input"  
            placeholder="login"
        />
        <CustomInput 
            @onInputChange="updatePassword" 
            @onInputFocus="hasPasswordError=false" 
            :hasError="hasPasswordError" 
            class="form__input" 
            type="password" 
            placeholder="senha"
        />
        <CustomInput 
            @onInputChange="updateConfirmPassword" 
            @onInputFocus="hasConfirmPasswordError=false" 
            :hasError="hasConfirmPasswordError" 
            class="form__input" type="password" 
            placeholder="confirme a senha"
        />
        <div class="form__footer">
            <button class="form__button form__button--green" @click="handleSignupClick">Registrar</button>
            <div>
                <a @click="handleAlreadySignedupClick">Já sou cadastrado</a>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .form {
       display: flex;
       flex-direction: column;
       gap: 12px;
       background-color: rgb(26, 49, 41);
       padding: 24px;
       border-radius: 12px;
    }
    .form__footer {
        display: flex;
        width: 100%;
        flex-direction: column;
        justify-items: center;
        text-align: center;
        gap: 14px;
    }
    .form__button {
        margin: 0 auto;
        padding: 3px 15px;
        border: none;
        border-radius: 12px;
        color: white;
        font-weight: bold;
    }
    .form__button:hover {
        opacity: 0.8;
    }
    .form__button--green {
        background-color: rgb(8, 85, 66);
    }
    .form__button--outlined {
        background-color: rgba(0, 0, 0, 0);
        border: 1px solid rgb(8, 85, 66);
    }
    .form__button:hover {
        cursor: pointer;
    }
</style>