<script>
    export default 
    {
        name: 'MyPopup',
        emits: ['closePopup'],
        props: ['message', 'togglePopup'],
    }
</script>

<template>
    <div v-if="togglePopup" class="popup">
        <div class="innerPopup">
            <div class="popupContent">
                <h1>{{ message }}</h1>
                <v-btn @click="$emit('closePopup')" class="popupBtn">
                    Ok
                </v-btn>
            </div>
        </div>
    </div>
</template>

<style>
    .popup
    {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 99;
        background-color: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .innerPopup
    {
		padding: 32px;
        background-color: white;
        min-width: 40%;
        border-radius: 8px;
        border: 1px solid black;
	}
    .popupContent
    {
        margin: auto;
        width: fit-content;
        justify-content: center;
    }
    .popupContent h1
    {
        padding-bottom: 20px;
    }
    .popupBtn
    {
        width: auto;
        margin: 10px;
        background-color: #11d472;
    }
    .popupBtn span
    {
        color: white;
    }
    .popupBtn:hover span
    {
        color: black;
    }
</style>