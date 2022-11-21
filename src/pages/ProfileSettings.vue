<script>
    export default
    {
        name: 'ProfileSettings',
        emits: [ "changePassword" ],
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
        }),
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
            ></v-text-field>
    
            <v-text-field
                v-model="newPassword"
                :counter="30"
                :rules="newPasswordRules"
                label="New password"
                required
            ></v-text-field>

            <v-text-field
                v-model="repeatNewPassword"
                :counter="30"
                :rules="repeatNewPasswordRules"
                label="Repeat new password"
                required
            ></v-text-field>
    
            <v-btn
                :disabled="!valid"
                @click="$emit('changePassword')"
                class="formBtn"
                :href="'#/search-shows'"
            >
                Save changes
            </v-btn>
        </v-form>
    </div>
</template>

<style>
    .settingsHeader 
    {
        padding-bottom: 20px;
    }
</style>