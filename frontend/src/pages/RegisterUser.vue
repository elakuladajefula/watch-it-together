<script>
    import MyPopup from '../components/MyPopup';
    import axios from "axios";

    export default
    {
        name: 'RegisterUser',
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
                try 
                {
                    this.hash(this.password).then(async (hex) => 
                    {
                        const response = await axios.post(`http://localhost:5000/users/${this.login}/${hex}`);
                        if (response.data.affectedRows === 1)
                        {
                            const response = await axios.get(`http://localhost:5000/users/${this.login}/${hex}`);
                            if (response.data != '')
                            {
                                this.$store.dispatch('setToken', response.data[1]);
                                this.$store.dispatch('setUser', response.data[0].ID);
                                window.location.href = '#search-shows';
                            }
                            else
                            {
                                this.openPopup("Something went wrong. Please try again.");
                            }
                        }
                        else
                        {
                            this.openPopup("Username already taken");
                        }
                    });
                } 
                catch (err)
                {
                    console.log(err);
                }
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
            async hash(string)
            {
                const utf8 = new TextEncoder().encode(string);
                const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
                const hashArray = Array.from(new Uint8Array(hashBuffer));
                const hashHex = hashArray
                    .map((bytes) => bytes.toString(16).padStart(2, '0'))
                    .join('');
                return hashHex;
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