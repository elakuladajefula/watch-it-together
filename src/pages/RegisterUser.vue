<script>
    export default
    {
        name: 'RegisterUser',
        emits: [ "logIn" ],
    }
</script>

<template>
    <div class="subpage">
        <div class="pageTitle">Register</div>
        <v-btn @click="$emit('logIn')" :href="'#/my-shows'" outlined class="formBtn">Register</v-btn>
        <v-btn :href="'#/'" outlined class="formBtn">Log in</v-btn>
    </div>
</template>