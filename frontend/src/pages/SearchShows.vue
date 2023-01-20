<script>
    import ShowTemplate from '../components/ShowTemplate.vue';
    import axios from "axios";

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
            userID: '3',
        }),
        methods: 
        {
            async searchShows()
            {
                const api_url = "https://www.episodate.com/api/search?q=";
                this.showsList = await this.getapi(api_url);
                for (let i = 0; i < this.showsList.length; i++)
                {
                    try 
                    {
                        const response = await axios.get(`http://localhost:5000/tvshows/${this.userID}/${this.showsList[i].id}`);
                        if (response.data)
                        {
                            this.showsList[i].added = true;
                        }
                        else
                        {
                            this.showsList[i].added = false;
                        }
                    } 
                    catch (err)
                    {
                        console.log(err);
                    }
                }
            },
            async getapi(url) 
            {
                const searchString = this.search.replace(/\s+/g, '-');
                const fullUrl = url + searchString;
                const response = await fetch(fullUrl);
                
                var data = await response.json();
                return data.tv_shows;
            },
            addShow(id)
            {
                this.showsList.forEach(async (item) => 
                {
                    if (item.id == id)
                    {
                        if (item.added)
                        {
                            try 
                            {
                                await axios.delete(`http://localhost:5000/tvshows/${this.userID}/${id}`);
                                item.added = false;
                            } 
                            catch (err)
                            {
                                console.log(err);
                            }
                        }
                        else
                        {
                            try 
                            {
                                await axios.post(`http://localhost:5000/tvshows/${this.userID}/${id}`);
                                item.added = true;
                            } 
                            catch (err)
                            {
                                console.log(err);
                            }
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
            <v-list-item v-for="(item, i) in showsList" :key = "i">
                <!-- showId będzie pobierane z API, wszystko inne w sumie też -->
                <ShowTemplate 
                    :title = item.name
                    :firstEpisode = item.start_date
                    :source = item.image_thumbnail_path
                    showAddBtn = true
                    :showId = item.id
                    :added = item.added
                    @add-tv-show = '(id) => addShow(id)'
                />
            </v-list-item>
        </div>
    </div>
</template>