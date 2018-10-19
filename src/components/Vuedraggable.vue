<template>
    <div class="vuedraggable">

        <draggable
                v-model="myArray"
                   :options="{group:'people'}"
                @start="drag=true"
                @end="drag=false">
            <div v-for="element in myArray" :key="element.id">{{element.name}}</div>
        </draggable>

    </div>
</template>
<script>

    import draggable from 'vuedraggable'

    export default {
        name: 'Comright',
        data(){
            return{
                myArray : [
                    {id : 1,name:'te1'},
                    {id : 2,name:'te2'},
                    {id : 3,name:'te3'},
                ]
            }
        },
        components: {
            draggable,
        },
        computed: {
            count () {
                return this.$store.state.count;
            }
        }

    }
</script>
