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
            id: '',
            chosenFriendsShows: [],
        }),
        created()
        {
            this.getFriends();
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
            async startWatching()
            {   
                await this.getSelectedUsersShows();
                // check what common elements have those arrays
                for (var i = 0; i < this.chosenFriendsShows.length; i++)
                {
                    this.showsList = this.showsList.filter(x => this.chosenFriendsShows[i].indexOf(x) !== -1)
                }
                for(let j = 0; j < this.showsList.length; j++)
                {
                    this.showsList[j] = await this.getapi(this.showsList[j]);
                }
                this.selectComponent = 'commonShows';
            },
            async getSelectedUsersShows()
            {
                // get all selected users' shows and put into arrays
                for (var i = 0; i < this.chosen.length; i++)
                {
                    try 
                    {
                        const response = await axios.get(`http://localhost:5000/friendtvshows/${this.chosen[i]}`, { headers: {Authorization: 'Bearer ' + this.$store.state.token} });
                        
                        var temp = response.data;
                        var temp2 = [];
                        for (var k = 0; k < temp.length; k++)
                        {
                            temp2[k] = temp[k].ShowID;
                        }
                        this.chosenFriendsShows[i] = temp2;
                    } 
                    catch (err) 
                    {
                        console.log(err);
                    }
                }

                // get user's shows and put into array
                var list = await this.getMyShows();
                for (var j = 0; j < list.length; j++)
                {
                    this.showsList[j] = list[j].ShowID;
                }
            },
            goBackToMyFriends()
            {
                this.selectComponent = 'myFriends'
            },
            async getFriends() 
            {
                try 
                {
                    this.id = this.$store.state.user;
                    const response = await axios.get(`http://localhost:5000/friends/${this.id}`, { headers: {Authorization: 'Bearer ' + this.$store.state.token} });
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
                    const response = await axios.get(`http://localhost:5000/friendtvshows/${name}`, { headers: {Authorization: 'Bearer ' + this.$store.state.token} });
                    this.friendShowsList = response.data;
                    for(let i = 0; i < this.friendShowsList.length; i++)
                    {
                        this.friendShowsList[i] = await this.getapi(this.friendShowsList[i].ShowID);
                    }
                } 
                catch (err) 
                {
                    console.log(err);
                }
            },
            async getMyShows() 
            {
                try 
                {
                    const response = await axios.get(`http://localhost:5000/mytvshowsid/${this.id}`, { headers: {Authorization: 'Bearer ' + this.$store.state.token} });
                    return response.data;
                } 
                catch (err) 
                {
                    console.log(err);
                    return null;
                }
            },
            async getapi(id) 
            {
                const api_url = "https://www.episodate.com/api/show-details?q=";
                const fullUrl = api_url + id;
                const response = await fetch(fullUrl);
                
                var data = await response.json();
                return data.tvShow;
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
        <div class="showsContainer">
            <v-list-item v-for="(item, i) in showsList" :key="i">
                <ShowTemplate 
                    :title = item.name
                    :firstEpisode = item.start_date
                    :source = item.image_thumbnail_path
                />
            </v-list-item>
        </div>
    </div>

    <div v-else-if="selectComponent === 'friendShows'" class="subpage">
        <div class="pageTitle">{{ this.chosenFriend }} 's shows</div>
        <v-btn @click="goBackToMyFriends()" class="formBtn">
            Go back
        </v-btn>
        <div class="showsContainer">
            <v-list-item v-for="(item, i) in friendShowsList" :key="i">
                <ShowTemplate 
                    :title = item.name
                    :firstEpisode = item.start_date
                    :source = item.image_thumbnail_path
                />
            </v-list-item>
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