<script>
  import ShowTemplate from '../components/ShowTemplate.vue'

  export default 
  {
    name: 'FriendShows',
    components: 
    {
      ShowTemplate,
    },
  }
</script>

<template>
  <div class="subpage">
    <div class="pageTitle">Shows</div>
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
</template>