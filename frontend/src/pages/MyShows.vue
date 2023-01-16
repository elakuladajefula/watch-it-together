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
    }),
    created()
    {
      this.getShows(this.id);
    },
    mounted()
    {
      this.getInvitations(this.id);
    },
    methods: 
    {
      openPopup(msg)
      {
        this.showPopup = true;
        this.popupMessage = msg;
      },
      addFriend()
      {
        this.showPopup = false;
      },
      removeFriend()
      {
        this.showPopup = false;
      },
      watchShow(id)
      {
        this.showsList.forEach((item) => 
        {
          if (item.showId == id)
          {
            if (item.watched)
            {
              item.watched = false;
            }
            else
            {
              //zmienić w bazie danych status serialu na obejrzany
              item.watched = true;
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
      async getInvitations(userID) 
      {
        try 
        {
          const response = await axios.get(`http://localhost:5000/users/${userID}`);
          var invitations = response.data;
          invitations.forEach(element => 
          {
            this.openPopup('New friend invitation from ' + element.Login);
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
    <FriendInvitationPopup :togglePopup="this.showPopup" :message="this.popupMessage" @add-friend='addFriend()' @remove-friend='removeFriend()'/>
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