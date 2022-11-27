<script>
    import ShowTemplate from '../components/ShowTemplate.vue'
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
            friendsList: 
            [
                {name: 'friend1'},
                {name: 'friend2'},
                {name: 'friend3'},
                {name: 'friend4'},
                {name: 'friend5'},
                {name: 'friend6'},
                {name: 'friend7'},
                {name: 'friend8'},
                {name: 'friend9'},
            ],
            chosen: [],
            chosenFriend: '',
            selectComponent: 'myFriends',
        }),
        computed: 
        {
            isEmpty: ({ chosen }) => chosen.length === 0,
        },
        methods:
        {
            chooseFriend(friend)
            {
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
                        <v-list-item :value="friend.name" class="friend">
                            <v-list-item-action>
                                <v-checkbox :value="friend.name" v-model="chosen"/>
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title @click="chooseFriend(friend.name)">{{ friend.name }}</v-list-item-title>
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
        <div class="showsContainer">
            <ShowTemplate 
                title="Game of thrones"
                seasons="8"
                firstEpisode="17.04.2011"
                source="../assets/game-of-thrones.jpg"/>
            <ShowTemplate 
                title="Game of thrones"
                seasons="8"
                firstEpisode="17.04.2011"
                source="../assets/game-of-thrones.jpg"/>
            <ShowTemplate 
                title="Game of thrones"
                seasons="8"
                firstEpisode="17.04.2011"
                source="../assets/game-of-thrones.jpg"/>
        </div>
    </div>

    <div v-else-if="selectComponent === 'friendShows'" class="subpage">
        <div class="pageTitle">{{ this.chosenFriend }} 's shows</div>
        <v-btn @click="goBackToMyFriends()" class="formBtn">
            Go back
        </v-btn>
        <div class="showsContainer">
            <ShowTemplate 
                title="Game of thrones"
                seasons="8"
                firstEpisode="17.04.2011"
                source="../assets/game-of-thrones.jpg"/>
            <ShowTemplate 
                title="Game of thrones"
                seasons="8"
                firstEpisode="17.04.2011"
                source="../assets/game-of-thrones.jpg"/>
            <ShowTemplate 
                title="Game of thrones"
                seasons="8"
                firstEpisode="17.04.2011"
                source="../assets/game-of-thrones.jpg"/>
            <ShowTemplate 
                title="Game of thrones"
                seasons="8"
                firstEpisode="17.04.2011"
                source="../assets/game-of-thrones.jpg"/>
            <ShowTemplate 
                title="Game of thrones"
                seasons="8"
                firstEpisode="17.04.2011"
                source="../assets/game-of-thrones.jpg"/>
            <ShowTemplate 
                title="Game of thrones"
                seasons="8"
                firstEpisode="17.04.2011"
                source="../assets/game-of-thrones.jpg"/>
            <ShowTemplate 
                title="Game of thrones"
                seasons="8"
                firstEpisode="17.04.2011"
                source="../assets/game-of-thrones.jpg"/>
            <ShowTemplate 
                title="Game of thrones"
                seasons="8"
                firstEpisode="17.04.2011"
                source="require('.//assets/game-of-thrones.jpg')"/>
        </div>
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