<script>
    import MyPopup from '../components/MyPopup';
    export default
    {
        name: 'RegisterUser',
        emits: [ "logIn" ],
        components: 
        {
            MyPopup,
        },
        data: () => 
        ({
            valid: true,
            login: '',
            loginRules: 
            [
                v => !!v || 'Username is required',
                v => (v && v.length < 30) || 'Username must be less than 30 characters',
                v => (v && v.length > 2) || 'Username must be more than 2 characters',
            ],
            password: '',
            passwordRules: 
            [
                v => !!v || 'Password is required',
                v => (v && v.length < 30) || 'Password must be less than 30 characters',
                v => (v && v.length > 2) || 'Password must be more than 2 characters',
            ],
            inputType: 'password',
            showPopup: false,
            popupMessage: '',
        }),
        methods: 
        {
            registerUser()
            {
                this.openPopup('Username already taken');
                // this.$emit('logIn');
                // przenieść do searchShows
                // :href="'#/search-shows'"
            },
            ToggleInput()
            {
                this.inputType = this.inputType === 'password' ? 'text' : 'password';
            },
            getIcon(type)
            {
                if (type === 'password')
                {
                    return 'mdi-eye';
                }
                else
                {
                    return 'mdi-eye-off';
                }
            },
            openPopup(msg)
            {
                this.showPopup = true;
                this.popupMessage = msg;
            },
            closePopup()
            {
                this.showPopup = false;
            },
        },
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
                label="Username"
                required
                clearable
            ></v-text-field>
    
            <v-text-field
                v-model="password"
                :counter="30"
                :rules="passwordRules"
                label="Password"
                required
                :type="inputType"
                clearable
                :append-icon="getIcon(inputType)"
                @click:append="ToggleInput"
            ></v-text-field>
    
            <v-btn
                :disabled="!valid"
                @click="registerUser()"
                class="formBtn"
            >
                Register
            </v-btn>
        </v-form>

        <MyPopup class="registerPopup" :togglePopup="this.showPopup" :message="this.popupMessage" @close-popup='closePopup()'/>

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
    .registerPopup .popupBtn
    {
        background-color: red;
    }
</style>