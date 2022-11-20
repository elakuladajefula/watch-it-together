<template>
    <div class="subpage">
        <div class="pageTitle">Log in</div>
        <v-btn @click="$emit('logIn')" outlined class="formBtn">Log in</v-btn>
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
    }
</style>