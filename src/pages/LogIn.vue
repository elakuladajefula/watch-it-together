<script>
    export default
    {
        name: 'LogIn',
        emits: [ "logIn" ],
    }
</script>

<template>
    <div class="subpage">
        <div class="pageTitle">Log in</div>
        <v-btn @click="$emit('logIn')" :href="'#/my-shows'" outlined class="formBtn">Log in</v-btn>
        <v-btn :href="'#/register'" outlined class="formBtn">Register</v-btn>
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
        max-width: 100px;
        margin: 10px;
    }
</style>