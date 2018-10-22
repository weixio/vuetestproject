<template>

    <div class="editor-helper">
        <div class="editor-helper-h" :style="styleH"></div>
        <div class="editor-helper-v" :style="styleV"></div>
    </div>

</template>

<script>
    import EventBus from '../utils/EventBus';

    export default {

        name: "editor-guilder",
        props: {
            layout: {
                type: Array,
                required: false,
                default: () => ([]),
            },
            container: {}
        },

        mounted() {
            EventBus.$on('editor.guilder.down', ()=> {

            });
            EventBus.$on('editor.guilder.move', (position,target)=> {
                const self = this;
                const opbox = this.getMid(this.getbox(target));
                self.top = -10;
                self.left = -10;
                this.layout
                    .filter(item=>{
                        return item !== target
                    })
                    .map(item => this.getMid(this.getbox(item)))
                    .forEach(item =>{
                        if((opbox.left - item.right) <= 10
                        && (opbox.left - item.right) > 0){
                            self.left = item.right;
                            target.style.left = self.left+'px';
                        }
                    })

                // console.log('过滤',filter);
            });
            EventBus.$on('editor.guilder.up', ()=> {
                this.top = -10;
                this.left = -10;
            });
        },
        data() {
            return{
                left: -10,
                top : -10,
            }
        },
        methods:{
            getMid(box){
                const cal = {
                    left : box.left,
                    right:box.left + box.width,
                    top : box.top,
                    bottom: box.top + box.height,
                    width : box.width,
                    height: box.height,
                    left_mid: box.left + (box.width / 2),
                    top_mid: box.top + (box.height /2),
                }
                return cal;
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
        },
        computed: {
            getlayout() {
                let lays = [];
                this.layout.forEach(layout=>{
                    lays.push(this.getMid(layout));
                });
                return lays;
            },

            styleH() {
                return {
                    display: this.left >= 0 ? 'block' : 'none',
                    left: this.left + 'px',
                    // top: this.layout.top + 'px',
                    // height: this.layout.height + 'px',
                };
            },

            styleV() {
                return {
                    display: this.top >= 0 ? 'block' : 'none',
                    top: this.top + 'px',
                    // top: (this.top + this.layout.top) + 'px'
                };
            }
        },
    }
</script>

<style lang="less">
    .editor-helper{
        /*position: absolute;*/
        /*top: 0;*/
        /*left: 0;*/
        /*width: 100%;*/
        /*height: 100%;*/


        .editor-helper-h,
        .editor-helper-v{
            border-style: dashed;
            border-color: black;
            border-width: 0;
            position: absolute;
            z-index: 5;
        }

        .editor-helper-h{
            border-left-width: 1px;
            height: 100%;

        }
        .editor-helper-v{
            border-top-width: 1px;
            width: 100%;

        }

    }

</style>
