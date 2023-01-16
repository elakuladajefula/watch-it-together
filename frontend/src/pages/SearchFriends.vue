<script>
    import MyPopup from '../components/MyPopup';
    import axios from "axios";

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
            searchString: '',
            friendsList: [],
            id: 3,
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
            async searchFriends(userName)
            {
                try 
                {
                    this.friendsList = [];
                    const response = await axios.get(`http://localhost:5000/user/${userName}/${this.id}`);
                    var logins = response.data;
                    try 
                    {
                        logins.forEach( async element => {
                            const response2 = await axios.get(`http://localhost:5000/friendstatus/${this.id}/${element.Login}`);
                            this.friendsList.push({"name": element.Login, "added": response2.data.Status});
                        });

                    } 
                    catch (err) 
                    {
                        console.log(err);
                    }
                } 
                catch (err) 
                {
                    console.log(err);
                }
            },
            addFriend(friend)
            {
                if (!friend.added)
                {
                    friend.added = true;
                    this.sendInvitation();
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
                v-model="searchString"
                label="Search"
                clearable
                class="searchBar"
            ></v-text-field>
            <v-btn @click="searchFriends(this.searchString)" class="formBtn searchBtn">
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