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
                const opbox = this.getbox(target);
                self.top = -10;
                self.left = -10;
                this.layout
                    .filter(item=>{
                        return item !== target
                    })
                    .map(item => this.getbox(item))
                    .forEach(item =>{
                        const point = self.getClosePoint(opbox,item);
                        if(self.left === -10 && point.left !== -10) {
                            self.left = point.left; // 出现垂直线
                            if(point.edgl === 0){
                                target.style.left = self.left+'px';
                            } else if (point.edgl === 1) {
                                target.style.left = `${self.left - opbox.width/2}px`;

                            } else if (point.edgl === 2) {
                                target.style.left = `${self.left - opbox.width}px`;
                            }
                        }
                        if(self.top === -10 && point.top !== -10) {
                            self.top = point.top; // 出现水平线
                            if(point.edgt === 0){
                                target.style.top = self.top+'px';
                            } else if (point.edgt === 1) {
                                target.style.top = `${self.top - opbox.height/2}px`;

                            } else if (point.edgt === 2) {
                                target.style.top = `${self.top - opbox.height}px`;
                            }
                        }
                    })
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
            getClosePoint(opbox, boxB) {
                const opPoints = this.getPoints(opbox);
                const bPoints = this.getPoints(boxB);

                const ret = {
                    left: -10,
                    top: -10
                };
                opPoints.l.forEach((x1,i) => {
                    bPoints.l.forEach((x2) => {
                        if(Math.abs(x1 - x2) <= 3) {
                            ret.left = x2;
                            ret.edgl = i;
                            return false;
                        }
                    });

                    if(ret.left !== -10) {
                        return false;
                    }
                });

                opPoints.t.forEach( (x1,i) => {
                    bPoints.t.forEach( (x2) => {
                        if(Math.abs(x1 - x2) <= 3) {
                            ret.top = x2;
                            ret.edgt = i;
                            return false;
                        }
                    });

                    if(ret.top !== -10) {
                        return false;
                    }
                });

                return ret;
            },
            getPoints(bbox) {
                const height = bbox.height;
                const width = bbox.width;
                const left = bbox.left;
                const top = bbox.top;

                return {
                    t: [top, top + height / 2, top + height],
                    l: [left, left + width / 2, left + width]
                };
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
                    lays.push(this.getbox(layout));
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
