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
        }),
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
                <template v-for="(friend, i) in friendsList" :key="i">
                    <v-list-item class="friend" :href="'#/' + friend.name" @click="chooseFriend(friend.name)">
                        <v-list-item-content>
                            <v-list-item-title>{{ friend.name }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </template>
            </v-list> 
        </v-card>
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
    .friend
    {
        position: relative;
        width: 400px !important;
    }
    .friend:hover
    {
        background-color: aliceblue;
    }
</style>