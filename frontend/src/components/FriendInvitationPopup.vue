<script>
    export default 
    {
        name: 'FriendInvitationPopup',
        emits: ['addFriend', 'removeFriend'],
        props: ['message', 'togglePopup'],
    }
</script>

<template>
    <div v-if="togglePopup" class="popup">
        <div class="innerPopup">
            <div class="popupContent">
                <h1>{{ message }}</h1>
                <div class="btnContainer">
                    <v-btn @click="$emit('addFriend')" class="popupBtn">
                        Accept
                    </v-btn>
                    <v-btn @click="$emit('removeFriend')" class="popupBtn removeBtn">
                        Reject
                    </v-btn>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
    .btnContainer
    {
        display: flex;
        width: 100%;
        justify-content: center;
    }
    .popupBtn.removeBtn
    {
        background-color: red;
    }
</style>