<script>
    import ShowTemplate from '../components/ShowTemplate.vue'
    import axios from "axios";

    export default
    {
        name: 'MyFriends',
        components: 
        {
            ShowTemplate,
        },
        data: () => 
        ({
            selectedItem: 1,
            friendsList: [],
            showsList: [],
            friendShowsList: [],
            chosen: [],
            chosenFriend: '',
            selectComponent: 'myFriends',
            id: '4',
        }),
        created()
        {
            this.getFriends(this.id);
        },
        computed: 
        {
            isEmpty: ({ chosen }) => chosen.length === 0,
        },
        methods:
        {
            chooseFriend(friend)
            {
                this.getFriendShows(friend);
                this.selectComponent = 'friendShows';
                this.chosenFriend = friend;
            },
            startWatching()
            {
                this.selectComponent = 'commonShows';
            },
            goBackToMyFriends()
            {
                this.selectComponent = 'myFriends'
            },
            async getFriends(id) 
            {
                try 
                {
                    const response = await axios.get(`http://localhost:5000/friends/${id}`);
                    this.friendsList = response.data;
                } 
                catch (err) 
                {
                    console.log(err);
                }
            },
            async getFriendShows(name) 
            {
                try 
                {
                    const response = await axios.get(`http://localhost:5000/tvshows/${name}`);
                    this.friendShowsList = response.data;
                } 
                catch (err) 
                {
                    console.log(err);
                }
            },
        }
    }
</script>

<template>
    <div v-if="selectComponent === 'myFriends'" class="subpage">
        <div class="pageTitle">My friends</div>
        <v-card class="friendsListCard">
            <v-list class="friendsList">
                <v-list-item-group multiple class="friendsListGroup">
                    <template v-for="(friend, i) in friendsList" :key="i">
                        <v-list-item :value="friend.Login" class="friend">
                            <v-list-item-action>
                                <v-checkbox :value="friend.Login" v-model="chosen"/>
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title @click="chooseFriend(friend.Login)">{{ friend.Login }}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </template>
                </v-list-item-group>
            </v-list> 
        </v-card>
        <v-btn :disabled="isEmpty" @click="startWatching()" class="formBtn">
            Start watching
        </v-btn>
    </div>

    <div v-else-if="selectComponent === 'commonShows'" class="subpage">
        <div class="pageTitle">What you can watch together</div>
        <v-btn @click="goBackToMyFriends()" class="formBtn">
            Go back
        </v-btn>
        <!-- tu trzeba ogarnąć połączenie z API i za pomocą showID pobierać dane -->
        <v-list-item class="showsContainer"  v-for="(show, i) in showsList" :key="i">
            <ShowTemplate 
                :title=show
                seasons="8"
                firstEpisode="17.04.2011"
                source="../assets/game-of-thrones.jpg"/>
        </v-list-item>
    </div>

    <div v-else-if="selectComponent === 'friendShows'" class="subpage">
        <div class="pageTitle">{{ this.chosenFriend }} 's shows</div>
        <v-btn @click="goBackToMyFriends()" class="formBtn">
            Go back
        </v-btn>
        <v-list-item class="showsContainer"  v-for="(show, i) in friendShowsList" :key="i">
            <ShowTemplate 
                :title=show
                seasons="8"
                firstEpisode="17.04.2011"
                source="../assets/game-of-thrones.jpg"/>
        </v-list-item>
    </div>
</template>

<style>
    .friendsListCard
    {
        max-width: 800px;
        margin-bottom: 20px;
    }
    .friendsList
    {
        padding: 0;
        display: flex;
        flex-wrap: wrap;
    }
    .friendsListGroup, .v-list-item__content
    {
        display: contents;
    }
    .friend
    {
        position: relative;
        width: 400px !important;
    }
    .friend:hover
    {
        background-color: aliceblue;
    }
    .v-input__details
    {
        display: none;
    }
    .hideComponent
    {
        display: none;
    }
</style>