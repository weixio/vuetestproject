<template>
    <div class="comright">
        {{count}}
    </div>
</template>
<script>

    export default {
        name: 'Comright',
        computed: {
            count () {
                return this.$store.state.count;
            }
        }

    }
</script>
