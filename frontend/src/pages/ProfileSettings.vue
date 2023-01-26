<script>
    import MyPopup from '../components/MyPopup';
    import axios from "axios";
    import bcrypt from "bcryptjs";

    export default
    {
        name: 'ProfileSettings',
        components: 
        {
            MyPopup,
        },
        data: () => 
        ({
            valid: true,
            oldPassword: '',
            oldPasswordRules: 
            [
                v => !!v || 'Old password is required',
            ],
            newPassword: '',
            newPasswordRules: 
            [
                v => !!v || 'New password is required',
                v => (v && v.length < 30) || 'Password must be less than 30 characters',
                v => (v && v.length > 2) || 'Password must be more than 2 characters',
            ],
            repeatNewPassword: '',
            repeatNewPasswordRules: 
            [
                v => !!v || 'Repeat new password',
            ],
            inputType1: 'password',
            inputType2: 'password',
            inputType3: 'password',
            showPopup: false,
            popupMessage: '',
        }),
        computed: 
        {
            passwordConfirmationRule() 
            {
                return () => (this.newPassword === this.repeatNewPassword) || 'Password must match';
            },
            changePasswordRule() 
            {
                return () => (this.oldPassword !== this.newPassword) || 'New password has to be different from the old one';
            },
        },
        methods: 
        {
            ToggleInput1()
            {
                this.inputType1 = this.inputType1 === 'password' ? 'text' : 'password';
            },
            ToggleInput2()
            {
                this.inputType2 = this.inputType2 === 'password' ? 'text' : 'password';
            },
            ToggleInput3()
            {
                this.inputType3 = this.inputType3 === 'password' ? 'text' : 'password';
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
            async changePassword()
            {
                try 
                {
                    const id = localStorage.getItem('user');
                    const pass2Check = await axios.get(`http://localhost:5000/verifyUsersByID/${id}`);
                    if(bcrypt.compareSync(this.oldPassword, pass2Check.data.Password))
                    {
                        this.hash(this.newPassword).then(async (pass) => 
                        {
                            const response = await axios({method: 'put', url: `http://localhost:5000/users/${pass}/${id}`, headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')} });
                            if (response.data.affectedRows > 0)
                            {
                                this.openPopup('Password changed successfully');
                            }
                            else
                            {
                                this.openPopup('Something went wrong. Please try again.');
                            }
                        })
                    }
                    else
                    {
                        this.openPopup('Incorrect old password');
                    }
                } 
                catch (err) 
                {
                    console.log(err);
                }
            },
            async hash(string)
            {
                const salt = bcrypt.genSaltSync(10);
                return bcrypt.hashSync(string, salt);
            },
        },
    }
</script>

<template>
    <div class="subpage">
        <div class="pageTitle">Profile settings</div>
        <h2 class="settingsHeader">Change your password</h2>

        <v-form class='form' ref="changePasswordForm" v-model="valid" lazy-validation>
            <v-text-field
                v-model="oldPassword"
                :counter="30"
                :rules="oldPasswordRules"
                label="Old password"
                required
                :type="inputType1"
                clearable
                :append-icon="getIcon(inputType1)"
                @click:append="ToggleInput1"
            >
            </v-text-field>
            
    
            <v-text-field
                v-model="newPassword"
                :counter="30"
                :rules="newPasswordRules.concat(changePasswordRule)"
                label="New password"
                required
                :type="inputType2"
                clearable
                :append-icon="getIcon(inputType2)"
                @click:append="ToggleInput2"
            ></v-text-field>

            <v-text-field
                v-model="repeatNewPassword"
                :counter="30"
                :rules="repeatNewPasswordRules.concat(passwordConfirmationRule)" 
                label="Repeat new password"
                required
                :type="inputType3"
                clearable
                :append-icon="getIcon(inputType3)"
                @click:append="ToggleInput3"
            ></v-text-field>
    
            <v-btn
                :disabled="!valid"
                @click="changePassword()"
                class="formBtn"
            >
                Save changes
            </v-btn>
        </v-form>

		<MyPopup :togglePopup="this.showPopup" :message="this.popupMessage" @close-popup='closePopup()'/>
    </div>
</template>

<style>
    .settingsHeader 
    {
        padding-bottom: 20px;
    }
</style>