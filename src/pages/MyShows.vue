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
      }
    },
  }
</script>

<template>
  <div class="subpage">
    <div class="pageTitle">My shows</div>
    <div class="showsContainer">
      <ShowTemplate 
        title="Game of thrones"
        seasons="8"
        firstEpisode="17.04.2011"
        source="../assets/game-of-thrones.jpg"/>
      <ShowTemplate 
        title="Game of thrones"
        seasons="8"
        firstEpisode="17.04.2011"
        source="../assets/game-of-thrones.jpg"/>
      <ShowTemplate 
        title="Game of thrones"
        seasons="8"
        firstEpisode="17.04.2011"
        source="../assets/game-of-thrones.jpg"/>
      <ShowTemplate 
        title="Game of thrones"
        seasons="8"
        firstEpisode="17.04.2011"
        source="../assets/game-of-thrones.jpg"/>
      <ShowTemplate 
        title="Game of thrones"
        seasons="8"
        firstEpisode="17.04.2011"
        source="../assets/game-of-thrones.jpg"/>
      <ShowTemplate 
        title="Game of thrones"
        seasons="8"
        firstEpisode="17.04.2011"
        source="../assets/game-of-thrones.jpg"/>
      <ShowTemplate 
        title="Game of thrones"
        seasons="8"
        firstEpisode="17.04.2011"
        source="../assets/game-of-thrones.jpg"/>
      <ShowTemplate 
        title="Game of thrones"
        seasons="8"
        firstEpisode="17.04.2011"
        source="require('.//assets/game-of-thrones.jpg')"/>
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