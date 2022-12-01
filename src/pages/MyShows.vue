<script>
  import ShowTemplate from '../components/ShowTemplate.vue';
  import FriendInvitationPopup from '../components/FriendInvitationPopup';
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
      showsList: 
      [
        {"title": "Game of thrones", "watched": false, "showId": 1}, 
        {"title": "Game of thrones", "watched": false, "showId": 2}, 
        {"title": "Game of thrones", "watched": false, "showId": 3}, 
        {"title": "Game of thrones", "watched": false, "showId": 4}
      ],
    }),
    mounted()
    {
      this.openPopup('New friend invitation from');
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
              //zmienić w bazie danych ststus serialu na obejrzany
              item.watched = true;
            }
          }
        });
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
          :title=item.title
          seasons="8"
          firstEpisode="17.04.2011"
          source="../assets/game-of-thrones.jpg"
          showWatchBtn=true
          :showId=item.showId
          :watched=item.watched
          @watch-tv-show='(id) => watchShow(id)'
        />
      </v-list-item>
    </div>
  </div>
  <FriendInvitationPopup :togglePopup="this.showPopup" :message="this.popupMessage" @add-friend='addFriend()' @remove-friend='removeFriend()'/>
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