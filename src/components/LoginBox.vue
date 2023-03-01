<script setup>
import CustomInput from './CustomInput.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'



const loginInput = ref('')
const passwordInput = ref('')
const router = useRouter()

function updateLogin(input) {
    loginInput.value = input
}

function updatePassword(input) {
    passwordInput.value = input
}

function validateInputs() {
    return !!loginInput.value && !!passwordInput.value
}


function login() {
    if(!validateInputs()) {
        return 
    }
    console.log(loginInput.value, passwordInput.value)
    router.push({name: 'about'})
}

</script>

<template>
    <h1>Cota +</h1>
    <div class="form">
        <CustomInput @onInputChange="updateLogin" class="form__input"  placeholder="login"/>
        <CustomInput @onInputChange="updatePassword" class="form__input" type="password" placeholder="senha"/>
        <div class="form__footer">
            <button class="form__button" @click="login">entrar</button>
        </div>
        {{ loginInput }}
        {{ passwordInput }}
    </div>
</template>

<style scoped>
    .form {
       display: flex;
       flex-direction: column;
       gap: 8px;
    }
    .form__footer {
        display: flex;
        width: 100%;
        justify-items: center;
    }
    .form__button {
        margin: 0 auto;
        padding: 2px 16px;
        border: none;
        background-color: #f2f2f2;
    }
    .form__button:hover {
        cursor: pointer;
        
    }
</style>