<script>
  import AppHeader from './components/AppHeader.vue'
  import MyShows from './pages/MyShows.vue'
  import MyFriends from './pages/MyFriends.vue'
  import SearchFriends from './pages/SearchFriends.vue'
  import SearchShows from './pages/SearchShows.vue'
  import ProfileSettings from './pages/ProfileSettings.vue'
  import LogIn from './pages/LogIn.vue'
  import RegisterUser from './pages/RegisterUser.vue'
  import FriendShows from './pages/FriendShows.vue'

  export default 
  {
    name: 'App',
    components: 
    {
      AppHeader,
    },
    data() 
    {
      return {
        currentPath: window.location.hash,
        displayMenu: false,
        chosenFriend: '/',
      }
    },
    computed: 
    {
      currentView() 
      {
        return routes[this.currentPath.slice(1) || '/']
      }
    },
    mounted() 
    {
      window.addEventListener('hashchange', () => 
      {
        this.currentPath = window.location.hash
      })
    },
    methods: 
    {
      chooseFriend(friend)
      {
        this.chosenFriend = friend;
      },
      showMenu() 
      {
        this.displayMenu = true;
      },
      hideMenu() 
      {
        this.displayMenu = false;
      }
    }
  }

  const routes = 
  {
    '/': LogIn,
    '/register': RegisterUser,
    '/my-shows': MyShows,
    '/my-friends': MyFriends,
    '/search-friends': SearchFriends,
    '/search-shows': SearchShows,
    '/profile-settings': ProfileSettings,
    chosenFriend: FriendShows,
  }
</script>

<template>
  <v-app>
    <AppHeader :display="displayMenu" @log-out='hideMenu()'></AppHeader>
    <component :is="currentView" @log-in='showMenu()' @friend-click='(friend) => chooseFriend(friend)'/>
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
</style>
