import * as Vuex from 'vuex'

export default new Vuex.Store(
{
    strict: true,
    state: 
    {
        token: null,
        user: null,
        isUserLoggedIn: false,
    },
    mutations: 
    {
        setToken (state, token) 
        {
            state.token = token;
            state.isUserLoggedIn = !!(token);
            localStorage.setItem('token', token);
            localStorage.setItem('logged', state.isUserLoggedIn);
            setTimeout(function(){ window.location.reload(); }, 10);
        },
        setUser (state, user) 
        {
            state.user = user;
            localStorage.setItem('user', user);
        }
    },
    actions: 
    {
        setToken ({commit}, token) 
        {
            commit('setToken', token);
        },
        setUser ({commit}, user) 
        {
            commit('setUser', user);
        }
    }
})