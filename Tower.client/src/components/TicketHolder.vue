

<template>
    <div class="">
        <img :title="ticket.account.name" class="img" :src="ticket.account.picture" alt="">
    </div>
</template>


<script>
export default {
    props: { ticket: { type: Object, required: false } },
    setup(){
        return {}
    }
}
</script>


<style lang="scss" scoped>
.img{
    max-width: 30px;
}
</style>