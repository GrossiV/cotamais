<script setup>
import CustomInput from './CustomInput.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const loginInput = ref('')
const hasLoginError = ref(false)
const passwordInput = ref('')
const hasPasswordError = ref(false)
const router = useRouter()

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
    <h1>Cota +</h1>
    <div class="form">
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
            <button class="form__button form__button--green" @click="handleLoginClick">Entrar</button>
            <button class="form__button form__button--outlined" @click="handleSignupClick">Registrar</button>
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
        justify-items: center;
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