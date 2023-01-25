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
            userID: '',
            counter: 1,
        }),
        mounted()
        {
            this.getPopular();
        },
        methods: 
        {
            async getPopular()
            {
                const randomPage = Math.floor(Math.random() * 50);
                const api_url = "https://www.episodate.com/api/most-popular?page=" + randomPage;
                this.showsList = await this.getapi(api_url);
                for (let i = 0; i < this.showsList.length; i++)
                {
                    try 
                    {
                        if(this.showsList[i].image_thumbnail_path === "https://static.episodate.com")
                        {
                            this.showsList[i].image_thumbnail_path = "https://static.episodate.com/images/no-image.png";
                        }

                        this.userID = localStorage.getItem('user');
                        const response = await axios.get(`http://localhost:5000/tvshows/${this.userID}/${this.showsList[i].id}`, { headers: {Authorization: 'Bearer ' + localStorage.getItem('token')} });

                        if (response.data)
                        {
                            this.showsList = this.showsList.filter(x => { x !== this.showsList[i] });
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
                if (this.showsList.length === 0)
                {
                    this.counter++;
                    if(this.counter <= 50)
                    {
                        this.getPopular();
                    }
                }
            },

            async searchShows()
            {
                const api_url = "https://www.episodate.com/api/search?q=";
                this.showsList = await this.getapi(api_url);
                for (let i = 0; i < this.showsList.length; i++)
                {
                    try 
                    {
                        const response = await axios.get(`http://localhost:5000/tvshows/${this.userID}/${this.showsList[i].id}`, { headers: {Authorization: 'Bearer ' + localStorage.getItem('token')} });
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
                                await axios({method: 'delete', url: `http://localhost:5000/tvshows/${this.userID}/${id}`, headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')} });
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
                                await axios({method: 'post', url: `http://localhost:5000/tvshows/${this.userID}/${id}`, headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')} });
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