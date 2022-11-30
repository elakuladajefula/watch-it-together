<script>
    export default 
    {
        name: 'ShowTemplate',
        emits: ['addTvShow'],
        props: 
        {
            title: String,
            seasons: String,
            firstEpisode: String,
            source: String,
            showAddBtn: Boolean,
            showId: Number,
            added: Boolean,
        },
    }
</script>

<template>
    <div class="imageWithMask">
        <v-img :src="require('../assets/game-of-thrones.jpg')" class="showPoster" alt="game of thrones poster"/>
        <div class="showBg">
            <div class="showText">
                Title: "{{ title }}" <br>
                Seasons: {{ seasons }} <br>
                First episode: {{ firstEpisode }} <br>
                <v-icon v-if=showAddBtn @click="$emit('addTvShow', showId)" class="addBtn">{{ added ? "mdi-check-circle-outline" : "mdi-plus-circle-outline" }}</v-icon>
            </div>
        </div>
    </div>
</template>

<style>
    .imageWithMask 
    {
        margin: 10px;
        width: 260px;
        height: 400px;
        text-align: center;
        color: white;
        position: relative;
    }
    .showText, .showBg
    {
        display: none;
        width: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .showBg 
    {
        height: 98%;
    }
    .imageWithMask:hover .showBg 
    {
        background-color: rgba(180, 180, 180, 0.8);
    }
    .imageWithMask:hover .showBg, .showText 
    {
        display: block;
    }
    .showPoster 
    {
        width: 100%;
        height: 100%;
    }
    .showText .addBtn
    {
        color: white; 
    }
</style>