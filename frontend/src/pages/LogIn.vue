<script>
    import MyPopup from '../components/MyPopup';
    import axios from "axios";

    export default
    {
        name: 'LogIn',
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
            ],
            password: '',
            passwordRules: 
            [
                v => !!v || 'Password is required',
            ],
            inputType: 'password',
            showPopup: false,
            popupMessage: '',
        }),
        methods: 
        {
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
            loginUser()
            {
                try 
                {
                    this.hash(this.password).then(async (hex) => 
                    {
                        const response = await axios.get(`http://localhost:5000/users/${this.login}/${hex}`);
                        if (response.data != '')
                        {
                            this.$store.dispatch('setToken', response.data[1]);
                            this.$store.dispatch('setUser', response.data[0].ID);
                            window.location.href = '#my-shows';
                        }
                        else
                        {
                            this.openPopup("Wrong credentials");
                        }
                    });
                } 
                catch (err)
                {
                    console.log(err);
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
        <div class="pageTitle">Log in</div>

        <v-form class='form' ref="logInForm" v-model="valid" lazy-validation>
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
                @click="loginUser"
                class="formBtn"
            >
                Log in
            </v-btn>
        </v-form>

        <MyPopup class="registerPopup" :togglePopup="this.showPopup" :message="this.popupMessage" @close-popup='closePopup()'/>

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
    .form .v-input__details
    {
        display: flex;
    }
</style>