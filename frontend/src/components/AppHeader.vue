<script>
  export default 
  {
    props: ['shouldDisplay'],
    name: 'AppHeader',
    emits: ['logOut'],
    data: () => 
    ({
        menuItems: 
        [
            { title: 'My shows', link: '#/my-shows' },
            { title: 'My friends', link: '#/my-friends' },
            { title: 'Search shows', link: '#/search-shows' },
            { title: 'Search friends', link: '#/search-friends' },
            { title: 'Profile settings', link: '#/profile-settings' },
            { title: 'Log out', link: '#/', event: 'logOut' },
        ],
    }),
  }
</script>

<template>
  <header class="appHeader">
    <h1 class="title" :class="{'addPadding': shouldDisplay === 'true'}">Watch it together</h1>

    <v-menu bottom left v-if="shouldDisplay === 'true'">
      <template v-slot:activator="{ on, props }">
        <v-btn class="menuButton" dark icon v-bind="props" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      
      <v-list>
        <v-list-item @click="$emit(item.event)" :href="item.link" v-for="(item, i) in menuItems" :key="i">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </header>
</template>

<style>
  .appHeader 
  {
    display: flex;
    position: sticky;
    background-color: rgb(13, 14, 68);
    color: white;
    top: 0;
    width: 100%;
    height: fit-content;
    text-align: center;
    padding: 5px 0 10px;
    z-index: 1;
  }

  .title
  {
    margin: auto;
    font-size: 46px;
  }

  .title.addPadding
  {
    padding-left: 68px;
  }

  .menuButton 
  {
    margin: auto 20px auto 0;
    background-color: transparent;
  }
</style>