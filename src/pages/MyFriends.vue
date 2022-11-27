<script>
    export default
    {
        name: 'MyFriends',
        emits: ["friendClick"],
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
        }),
        computed: 
        {
            isEmpty: ({ chosen }) => chosen.length === 0,
        },
        methods:
        {
            chooseFriend(friend)
            {
                this.$emit('friendClick', friend);
            }
        }
    }
</script>

<template>
    <div class="subpage">
        <div class="pageTitle">My friends</div>
        <v-card class="friendsListCard">
            <v-list class="friendsList">
                <v-list-item-group multiple class="friendsListGroup">
                    <template v-for="(friend, i) in friendsList" :key="i">
                        <v-list-item :value="friend.name" class="friend" :href="'#/' + friend.name" @click="chooseFriend(friend.name)">
                            <v-list-item-action>
                                <v-checkbox :value="friend.name" v-model="chosen"/>
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title>{{ friend.name }}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </template>
                </v-list-item-group>
            </v-list> 
        </v-card>
        <v-btn
            :disabled="isEmpty"
            @click="$emit('chooseShows')"
            class="formBtn"
            :href="'#/choose-shows'"
        >
            Choose shows
        </v-btn>
    </div>
</template>

<style>
    .friendsListCard
    {
        max-width: 800px;
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
</style>