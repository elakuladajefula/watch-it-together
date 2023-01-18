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
      id: '3',
      friendLogin: '',
    }),
    created()
    {
      this.getShows(this.id);
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
          await axios.put(`http://localhost:5000/friends/${this.id}/${this.friendLogin}`);
        } 
        catch (err) 
        {
          console.log(err);
        }
        this.showPopup = false;
      },
      async rejectFriend()
      {
        try 
        {
          await axios.put(`http://localhost:5000/friendstatus/${this.id}/${this.friendLogin}`);
        } 
        catch (err) 
        {
          console.log(err);
        }
        this.showPopup = false;
      },
      watchShow(id)
      {
        this.showsList.forEach(async (item) => 
        {
          if (item.showId == id)
          {
            if (item.watched)
            {
              try 
              {
                await axios.put(`http://localhost:5000/mytvshows/${this.userID}/${id}`);
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
                await axios.put(`http://localhost:5000/tvshows/${this.userID}/${id}`);
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
      async getShows(userID) 
      {
        try 
        {
          const response = await axios.get(`http://localhost:5000/tvshows/${userID}`);
          this.showsList = response.data;
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
          const response = await axios.get(`http://localhost:5000/users/${this.id}`);
          var invitations = response.data;
          invitations.forEach(element => 
          {
            this.friendLogin = element.Login;
            this.openPopup('New friend invitation from ' + this.friendLogin);
          });
        } 
        catch (err) 
        {
          console.log(err);
        }
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
          :title=item
          seasons="8"
          firstEpisode="17.04.2011"
          source="../assets/game-of-thrones.jpg"
          showWatchBtn=true
          :showId=item
          watched=false
          @watch-tv-show='(id) => watchShow(id)'
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