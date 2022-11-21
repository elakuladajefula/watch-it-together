<script>
    export default
    {
        name: 'RegisterUser',
        emits: [ "logIn" ],
        data: () => 
        ({
            valid: true,
            login: '',
            loginRules: 
            [
                v => !!v || 'Login is required',
                v => (v && v.length < 30) || 'Login must be less than 30 characters',
                v => (v && v.length > 2) || 'Login must be more than 2 characters',
            ],
            password: '',
            passwordRules: 
            [
                v => !!v || 'Password is required',
                v => (v && v.length < 30) || 'Password must be less than 30 characters',
                v => (v && v.length > 2) || 'Password must be more than 2 characters',
            ],
        }),
    }
</script>

<template>
    <div class="subpage">
        <div class="pageTitle">Register</div>

        <v-form class='form' ref="registerForm" v-model="valid" lazy-validation>
            <v-text-field
                v-model="login"
                :counter="30"
                :rules="loginRules"
                label="Login"
                required
            ></v-text-field>
    
            <v-text-field
                v-model="password"
                :counter="30"
                :rules="passwordRules"
                label="Password"
                required
            ></v-text-field>
    
            <v-btn
                :disabled="!valid"
                @click="$emit('logIn')"
                class="formBtn"
                :href="'#/search-shows'"
            >
                Register
            </v-btn>
        </v-form>

        <p>
            Already registered?
            <a href="#/">Log in</a>
        </p>
    </div>
</template>

<style>
    .subpage
    {
        text-align: -webkit-center;
    }
    .form
    {
        max-width: 800px;
        padding-bottom: 60px;
    }
    .form > *
    {
        margin: 10px;
    }
</style>