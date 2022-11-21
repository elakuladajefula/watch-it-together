<script>
    export default
    {
        name: 'LogIn',
        emits: [ "logIn" ],
        data: () => 
        ({
            valid: true,
            login: '',
            loginRules: 
            [
                v => !!v || 'Login is required',
            ],
            password: '',
            passwordRules: 
            [
                v => !!v || 'Password is required',
            ],
        }),
    }
</script>

<template>
    <div class="subpage">
        <div class="pageTitle">Log in</div>

        <v-form class='form' ref="logInForm" v-model="valid" lazy-validation>
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
                :href="'#/my-shows'"
            >
                Log in
            </v-btn>
        </v-form>

        <p>
            No account?
            <a href="#/register">Register</a>
        </p>
    </div>
</template>

<style>
    .subpage
    {
        padding: 0 20px;
        text-align: center;
    }
    .formBtn
    {
        width: auto;
        margin: 10px;
    }
</style>