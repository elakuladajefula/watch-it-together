<script>
  import ShowTemplate from '../components/ShowTemplate.vue';
  import FriendInvitationPopup from '../components/FriendInvitationPopup';
  import axios from "axios";

  export default 
  {
    name: 'MyShows',
    components: 
    {
      ShowTemplate,
      FriendInvitationPopup,
    },
    data: () => 
    ({
      showPopup: false,
      popupMessage: '',
      showsList: [],
      id: '',
      friendLogin: '',
      invitations: [],
    }),
    created()
    {
      this.getShows();
    },
    mounted()
    {
      this.getInvitations();
    },
    methods: 
    {
      openPopup(msg)
      {
        this.showPopup = true;
        this.popupMessage = msg;
      },
      async acceptFriend()
      {
        try 
        {
          await axios({method: 'put', url: `http://localhost:5000/friends/${this.id}/${this.friendLogin}`, headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')} });
        } 
        catch (err) 
        {
          console.log(err);
        }
        this.showPopup = false;
        if (this.invitations != '')
        {
          this.friendLogin = this.invitations[0].Login;
          this.openPopup('New friend invitation from ' + this.friendLogin);
          this.invitations.shift();
        }
      },
      async rejectFriend()
      {
        try 
        {
          await axios({method: 'put', url: `http://localhost:5000/friendstatus/${this.id}/${this.friendLogin}`, headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')} });
        } 
        catch (err) 
        {
          console.log(err);
        }
        this.showPopup = false;
        if (this.invitations != '')
        {
          this.friendLogin = this.invitations[0].Login;
          this.openPopup('New friend invitation from ' + this.friendLogin);
          this.invitations.shift();
        }
      },
      watchShow(show)
      {
        this.showsList.forEach(async (item) => 
        {
          if (item.id === show)
          {
            if (item.watched)
            {
              try 
              {
                await axios({method: 'put', url: `http://localhost:5000/mytvshows/${this.id}/${show}`, headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')} });
                item.watched = false;
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
                await axios({method: 'put', url: `http://localhost:5000/tvshows/${this.id}/${show}`, headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')} });
                item.watched = true;
              } 
              catch (err)
              {
                console.log(err);
              }
            }
          }
        });
      },
      async getShows() 
      {
        try 
        {
          this.id = localStorage.getItem('user');
          const response = await axios.get(`http://localhost:5000/mytvshows/${this.id}`, { headers: {Authorization: 'Bearer ' + localStorage.getItem('token')} });
          this.showsList = response.data;
          for(let i = 0; i < this.showsList.length; i++)
          {
            if(this.showsList[i].ShowStatus === 'ADDED')
            {
              this.showsList[i] = await this.getapi(this.showsList[i].ShowID);
              this.showsList[i].ShowStatus = 'ADDED'
              this.showsList[i].watched = false;
            }
            else
            {
              this.showsList[i] = await this.getapi(this.showsList[i].ShowID);
              this.showsList[i].ShowStatus = 'WATCHED'
              this.showsList[i].watched = true;
            }
          }
        } 
        catch (err) 
        {
          console.log(err);
        }
      },
      async getInvitations() 
      {
        try 
        {
          const response = await axios.get(`http://localhost:5000/users/${this.id}`, { headers: {Authorization: 'Bearer ' + localStorage.getItem('token')} });
          this.invitations = response.data;
          if (this.invitations != '')
          {
            this.friendLogin = this.invitations[0].Login;
            this.openPopup('New friend invitation from ' + this.friendLogin);
            this.invitations.shift();
          }
        } 
        catch (err) 
        {
          console.log(err);
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
    },
  }
</script>

<template>
  <div class="subpage">
    <div class="pageTitle">My shows</div>
    <div class="showsContainer">
      <v-list-item v-for="(item, i) in showsList" :key="i">
        <ShowTemplate 
          :title = item.name
          :firstEpisode = item.start_date
          :source = item.image_thumbnail_path
          showWatchBtn = true
          :showId = item.id
          :watched = item.watched
          @watch-tv-show='(item) => watchShow(item)'
        />
      </v-list-item>
    </div>
    <FriendInvitationPopup :togglePopup="this.showPopup" :message="this.popupMessage" @add-friend='acceptFriend()' @remove-friend='rejectFriend()'/>
  </div>
</template>

<style>
  .pageTitle
  {
    font-size: 60px;
    text-align: center;
    padding-top: 15px;
    padding-bottom: 15px;
  }

  .showsContainer 
  {
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
  }
</style>