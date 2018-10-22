<template>
    <div class="movehelpline">
        <div class="mover" />
        <div class="mover1" />
        <div class="mover2" />

        <editor-guilder
            :layout="currentLayout"
            :container="container"
        >
        </editor-guilder>
    </div>
</template>

<script>
    /**
     * global：
     *{"zoom":1,"$draging":false,"$rendered":true,"$loaded":true}
     * /

     /**
     * layout:
     *
     */

    import EditorGuider from './EditorGuider'
    import Mover from '../utils/mover'

    export default {
        name: "MoveHelpLine",
        components: {
            'editor-guilder' : EditorGuider,
        },
        data() {
            return {
                isDown: false,
                mover: {
                    top: 0,
                    left: 0,
                    width: 50,
                    height: 50,

                },
                layout:[],
                container:{}

            }
        },
        computed: {
            getMoverStyle() {
                return {
                    left: this.mover.left + 'px',
                    top: this.mover.top + 'px',
                    height: this.mover.height + 'px',
                    width: this.mover.width + 'px',
                };
            },
            currentLayout: {
                get() {
                    return this.layout;
                },
                set(layout) {
                    this.layout = layout;
                }
            },
        },
        mounted(){
            new Mover('mover','editor-helper');
            new Mover('mover1','editor-helper');
            new Mover('mover2','editor-helper');
            this.initlayout();
        },
        methods: {
            initlayout() {
                this.container = document.querySelector('.movehelpline');
                this.container.childNodes.forEach(node=>{
                    this.layout.push(node)
                })
            },
            getbox(node) {
                let clientRects = node.getBoundingClientRect();
                return {
                    left: clientRects.left - this.container.getBoundingClientRect().left,
                    top: clientRects.top - this.container.getBoundingClientRect().top,
                    width : clientRects.width,
                    height: clientRects.height
                };
            },

        }
    }
</script>

<style lang="less">
    .movehelpline {
        width: 500px;
        height: 500px;
        background-color: antiquewhite;
        margin: 0 auto;
        position: relative;

        .mover {
            position: absolute;
            width: 30px;
            height: 30px;
            background-color: red;
        }
        .mover1 {
            position: absolute;
            width: 30px;
            height: 30px;
            left: 70px;
            background-color: red;
        }
        .mover2 {
            position: absolute;
            width: 30px;
            height: 30px;
            left: 10px;
            top : 40px;
            background-color: red;
        }
    }


</style>
