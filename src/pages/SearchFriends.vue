<script>
    import MyPopup from '../components/MyPopup';
    export default
    {
        name: 'SearchFriends',
        components: 
        {
            MyPopup,
        },
        data: () => 
        ({
            showPopup: false,
            popupMessage: '',
            search: '',
            friendsList: [],
        }),
        methods: 
        {
            openPopup(msg)
            {
                this.showPopup = true;
                this.popupMessage = msg;
            },
            closePopup()
            {
                this.showPopup = false;
            },
            sendInvitation()
            {
                this.openPopup('Invitation sent successfully');
            },
            searchFriends()
            {
                this.searchFriends = [];
            },
            addFriend(friend)
            {
                console.log(friend);
            },
        },
    }
</script>

<template>
    <div class="subpage">
        <div class="pageTitle">Search friends</div>
        <v-text-field
            v-model="search"
            label="Search"
            clearable
            class="searchBar"
        ></v-text-field>
        <v-btn @click="searchFriends()" class="formBtn">
            <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-list-item v-for="(item, i) in friendsList" :key="i">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
    </div>
    <MyPopup :togglePopup="this.showPopup" :message="this.popupMessage" @close-popup='closePopup()'/>
</template>

<style>
    .searchBar 
    {
        max-width: 800px;
    }
</style>