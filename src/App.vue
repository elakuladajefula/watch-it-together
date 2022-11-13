<script>
  import AppHeader from './components/AppHeader.vue'
  import ShowTemplate from './components/ShowTemplate.vue'

  export default 
  {
    name: 'App',
    components: 
    {
      AppHeader,
      ShowTemplate,
    },
  }
</script>

<template>
  <v-app>
    <AppHeader></AppHeader>
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
  </v-app>
</template>

<style>
  .v-application 
  {
    background-color: rgba(255, 246, 147, 0.35);
  }

  body 
  {
    margin: 0;
  }

  .pageTitle
  {
    padding-left: 20px;
  }

  .icon 
  {
    margin: 10px;
    height: 42px;
  }

  .showsContainer 
  {
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
  }
</style>
