<template>
    <div class="movehelpline">
        <div
                :style="getMoverStyle"
                class="mover"
                @mousedown="down"
                @mousemove="move"
                @mouseout="up"
        />
        <!--<EditorGuider-->
        <!--:layout="currentLayout"-->
        <!--:global="global"-->
        <!--&gt;-->
        <!--</EditorGuider>-->
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

    import EditorGuider from './editor-guider'

    export default {
        name: "MoveHelpLine",
        comments: {
            EditorGuider,
        },
        data() {
            return {
                isDown: false,
                mover: {
                    top: 0,
                    left: 0,
                    width: 50,
                    height: 50,
                }

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
            }
        },
        methods: {
            down() {
                this.isDown = true;
            },
            move(e) {
                // if (!this.isDown) return;
                const x = e.clientX;
                const y = e.clientY;
                const position = this.getBox(x,y);
                this.mover.left = position.x;
                this.mover.top = position.y;
            },
            up() {
                this.isDown = false;
            },

            getBox(x,y) {
                let movehelpline = document.querySelector('.movehelpline');
                const mx = movehelpline.getBoundingClientRect().left;
                const my = movehelpline.getBoundingClientRect().top;
                return {
                    x : x - mx,
                    y : y - my
                }



            }

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
    }


</style>
