<template>
    <div class="comleft">
        {{count}},{{doneTodos}}
        <button @click="change">leftComponent</button>
    </div>
</template>
<script>
    import {mapState} from 'vuex'
    import { mapGetters } from 'vuex'
    export default {
        name: 'Comleft',
        computed: {
            ...mapState([
                // 映射 this.count 为 store.state.count
                'count'
            ]),
            doneTodosCount () {
                return this.$store.getters.doneTodos
            },
            ...mapGetters([
                'doneTodos',
            ])
        },
        methods:{
            change(){
                this.$store.commit('increment')
            }
        }

    }
</script>
