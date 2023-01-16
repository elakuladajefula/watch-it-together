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
                // this.friendsList = [];
                this.friendsList = [{"name": this.search, "added": false}, {"name": "user1", "added": false}, {"name": "user2", "added": true}, {"name": "user3", "added": false}, {"name": "user4", "added": false}, {"name": "user5", "added": true}, {"name": "user6", "added": false}, {"name": "user7", "added": false}, {"name": "user8", "added": false}, {"name": "user9", "added": false},];
            },
            addFriend(friend)
            {
                if (!friend.added)
                {
                    friend.added = true;
                }
            },
        },
    }
</script>

<template>
    <div class="subpage">
        <div class="pageTitle">Search friends</div>
        <div class="searchArea">
            <v-text-field
                v-model="search"
                label="Search"
                clearable
                class="searchBar"
            ></v-text-field>
            <v-btn @click="searchFriends()" class="formBtn searchBtn">
                <v-icon>mdi-magnify</v-icon>
            </v-btn>
        </div>
        <div class="searchResults">
            <v-list-item class="friendsList searchFriendsList" v-for="(item, i) in friendsList" :key="i">
                <v-list-item-title>{{ item.name }}</v-list-item-title>
                <v-list-item-action>
                    <v-icon @click="addFriend(item)" class="addBtn">{{ item.added ? "mdi-check-circle-outline" : "mdi-plus-circle-outline" }}</v-icon>
                </v-list-item-action>
            </v-list-item>
        </div>
        <MyPopup :togglePopup="this.showPopup" :message="this.popupMessage" @close-popup='closePopup()'/>
    </div>
</template>

<style>
    .searchArea
    {
        display: flex;
        width: fit-content;
        min-width: 45%;
        padding-bottom: 50px;
    }
    .searchBar 
    {
        max-width: 800px;
        width: 75vw;
    }
    .searchBtn
    {
        height: 56px !important;
        margin: 0 !important;
    }
    .friendsList.searchFriendsList
    {
        width: fit-content;
        min-width: 250px;
        margin: 5px;
        border: 1px solid;
        padding: 10px;
        background-color: white;
    }
    .friendsList.searchFriendsList .addBtn
    {
        color: #11d472;
        position: absolute;
        right: 10px;
    }
    .friendsList.searchFriendsList .v-list-item-title
    {
        height: 36px;
        font-size: 26px;
        padding: 5px;
    }
    .searchResults
    {
        max-height: 50vh;
        overflow-y: auto;
        width: fit-content;
    }
</style>