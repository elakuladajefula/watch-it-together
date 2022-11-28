<script>
    import MyPopup from '../components/MyPopup';
    export default
    {
        name: 'SearchFriends',
        components: 
        {
            MyPopup,
        },
        data: () => 
        ({
            showPopup: false,
            popupMessage: '',
        }),
        methods: 
        {
            openPopup(msg)
            {
                this.showPopup = true;
                this.popupMessage = msg;
            },
            closePopup()
            {
                this.showPopup = false;
            },
            sendInvitation()
            {
                this.openPopup('Invitation sent successfully');
            }
        },
    }
</script>

<template>
    <div class="subpage">
        <div class="pageTitle">Search friends</div>
    </div>
    <MyPopup :togglePopup="this.showPopup" :message="this.popupMessage" @close-popup='closePopup()'/>
</template>