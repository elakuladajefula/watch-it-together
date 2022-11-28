<script>
    export default
    {
        name: 'SearchShows',
        data: () => 
        ({
            search: '',
            showsList: [],
        }),
        methods: 
        {
            searchShows()
            {
                this.showsList = [];
            },
            addShow(show)
            {
                console.log(show);
            },
        },
    }
</script>

<template>
    <div class="subpage">
        <div class="pageTitle">Search shows</div>
        <v-text-field
            v-model="search"
            label="Search"
            clearable
            class="searchBar"
        ></v-text-field>
        <v-btn @click="searchShows()" class="formBtn">
            <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-list-item v-for="(item, i) in showsList" :key="i">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
    </div>
</template>

<style>

</style>