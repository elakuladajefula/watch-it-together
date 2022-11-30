<script>
    import ShowTemplate from '../components/ShowTemplate.vue';
    export default
    {
        name: 'SearchShows',
        components: 
        {
            ShowTemplate,
        },
        data: () => 
        ({
            search: '',
            showsList: [],
        }),
        methods: 
        {
            searchShows()
            {
                // this.showsList = [];
                this.showsList = [{"title": "Game of thrones", "added": false, "showId": 1}, {"title": "Game of thrones", "added": false, "showId": 2}, {"title": "Game of thrones", "added": false, "showId": 3}, {"title": "Game of thrones", "added": false, "showId": 4}];
            },
            addShow(id)
            {
                this.showsList.forEach((item) => 
                {
                    if (item.showId == id)
                    {
                        if (item.added)
                        {
                            item.added = false;
                        }
                        else
                        {
                            item.added = true;
                        }
                    }
                });
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
        <div class="showsContainer">
            <v-list-item v-for="(item, i) in showsList" :key="i">
                <!-- showId będzie pobierane z API, wszystko inne w sumie też -->
                <ShowTemplate 
                    :title=item.title
                    seasons="8"
                    firstEpisode="17.04.2011"
                    source="../assets/game-of-thrones.jpg"
                    showAddBtn=true
                    :showId=item.showId
                    :added=item.added
                    @add-tv-show='(id) => addShow(id)'
                />
            </v-list-item>
        </div>
    </div>
</template>

<style>

</style>