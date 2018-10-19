<template>
    <div class="editor-guider">
        <div class="editor-guider-h" :style="styleH"></div>
        <div class="editor-guider-v" :style="styleV"></div>
    </div>
</template>

<script>


    import { forEach } from 'lodash';

    import utils from '../utils/utils';

    const HIDE_OFFSET = -10;

    export default {
        name: 'editor-guider',
        props: ['global', 'layout'],
        data() {
            return {
                offset: 2,
                model: null,
                left: HIDE_OFFSET,
                top: HIDE_OFFSET
            };
        },
        computed: {
            zoom() {
                return this.global.zoom;
            },

            styleH() {
                return {
                    display: this.left >= 0 ? 'block' : 'none',
                    left: this.zoom * this.left + 'px',
                    top: this.layout.top * this.zoom + 'px',
                    height: this.layout.height * this.zoom + 'px',
                };
            },

            styleV() {
                return {
                    display: this.top >= 0 ? 'block' : 'none',
                    top: this.zoom * (this.top + this.layout.top) + 'px'
                };
            }
        },
        methods: {
            getPoints(bbox) {
                const height = bbox.height;
                const width = bbox.width;
                const left = bbox.left;
                const top = bbox.top;

                return {
                    v: [top, top + height / 2, top + height],
                    h: [left, left + width / 2, left + width]
                };
            },
            getGuidePoint(boxA, boxB) {
                const self = this;
                const aPoints = this.getPoints(boxA);
                const bPoints = this.getPoints(boxB);

                const offset = 2 * this.offset;
                const ret = {
                    left: HIDE_OFFSET,
                    top: HIDE_OFFSET
                };

                // horizontal
                forEach(aPoints.h, (x1, i) => {
                    forEach(bPoints.h, (x2) => {
                        if(Math.abs(x1 - x2) <= offset / self.zoom) {
                            ret.left = x2;
                            ret._H = x1 - x2;
                            ret._edgeH = i;
                            return false;
                        }
                    });

                    if(ret.left !== HIDE_OFFSET) {
                        return false;
                    }
                });

                // vertical
                forEach(aPoints.v, (x1, i) => {
                    forEach(bPoints.v, (x2) => {
                        if(Math.abs(x1 - x2) <= offset / self.zoom) {
                            ret.top = x2;
                            ret._V = x1 - x2;
                            ret._edgeV = i;
                            return false;
                        }
                    });

                    if(ret.top !== HIDE_OFFSET) {
                        return false;
                    }
                });

                return ret;
            },
            getBBoxList() {
                const model = this.model;
                const layout = this.layout;
                const elements = layout.elements;
                if(!model || !elements || !elements.length) {
                    return;
                }

                // 加上画布中线和边线
                const list = [{
                    rotate: 0,
                    height: layout.height,
                    width: layout.width,
                    left: 0,
                    top: 0
                }];

                return list.concat(elements)
                // 剔除自身 && 剔除选中
                    .filter(element => element !== model && !element.$selected)
                    .map(element => utils.getBBox(element));
            },
            checkGuidePoints(e) {
                const self = this;
                const bboxList = this.bboxList;
                if(!bboxList || !bboxList.length) {
                    return;
                }
                const modelBBox = utils.getBBox(this.model);

                // reset
                self.top = HIDE_OFFSET;
                self.left = HIDE_OFFSET;

                const { model } = self;
                let gapValueV = 0;
                let gapValueH = 0;

                model.$snapValue = {
                    width: 0,
                    height: 0,
                    left: 0,
                    top: 0
                };

                forEach(bboxList, bbox => {
                    const point = self.getGuidePoint(modelBBox, bbox);

                    if(self.left === HIDE_OFFSET && point.left !== HIDE_OFFSET) {
                        self.left = point.left; // 出现垂直线
                        if(!e.ctrlKey && model.$guider.snapTo) {
                            let actionData = self.actionData;
                            let dir = actionData && actionData.dir;

                            if(dir) {
                                if(point._edgeH === 1) {
                                    point._H *= 2;
                                } // 元素垂直中线对齐
                                gapValueV = point._H / (model.width / model.height); // 高度调整值

                                if(~dir.indexOf('e')) { // 使用indexOf 比正则快 /[e]/.test(dir)
                                    model.width -= point._H;

                                    if(~dir.indexOf('n')) {
                                        model.height -= gapValueV;
                                        model.top += gapValueV;
                                    }
                                    else if(~dir.indexOf('s')) {
                                        model.height -= gapValueV;
                                    }
                                }
                                else if(~dir.indexOf('w')) {
                                    model.width += point._H;
                                    model.left -= point._H;

                                    if(~dir.indexOf('n')) {
                                        model.height += gapValueV;
                                        model.top -= gapValueV;
                                    }
                                    else if(~dir.indexOf('s')) {
                                        model.height += gapValueV;
                                    }
                                }
                            }
                            else {
                                model.left -= point._H;
                                model.$snapValue.left = -point._H;
                            }
                        }
                    }
                    if(self.top === HIDE_OFFSET && point.top !== HIDE_OFFSET) {
                        self.top = point.top; // 出现水平线

                        if(!e.ctrlKey && model.$guider.snapTo) {
                            let actionData = self.actionData;
                            let dir = actionData && actionData.dir;

                            if(dir) {
                                if(point._edgeV === 1) {
                                    point._V *= 2;
                                } // 元素水平中线对齐
                                gapValueH = point._V * (model.width / model.height); // 宽度调整值

                                // 同时出现水平和垂直参考线, 且同是需要修正大小和位置避免重复修正
                                if((gapValueV !== 0 && gapValueH !== 0) || point._edgeH === 1) {
                                    return;
                                }

                                if(~dir.indexOf('s')) {
                                    model.height -= point._V;

                                    if(~dir.indexOf('e')) {
                                        model.width -= gapValueH;
                                    }
                                    else if(~dir.indexOf('w')) {
                                        model.width -= gapValueH;
                                        model.left += gapValueH;
                                    }
                                }
                                else if(~dir.indexOf('n')) {
                                    model.height += point._V;
                                    model.top -= point._V;

                                    if(~dir.indexOf('e')) {
                                        model.width += gapValueH;
                                    }
                                    else if(~dir.indexOf('w')) {
                                        model.width += gapValueH;
                                        model.left -= gapValueH;
                                    }
                                }
                            }
                            else {
                                model.top -= point._V;
                                model.$snapValue.top = -point._V;
                            }
                        }
                    }

                    if(self.left !== HIDE_OFFSET && self.top !== HIDE_OFFSET) {
                        return false;
                    }

                    return true;
                });
            }
        },
        events: {
            'editor.drag.active'(model, data) {
                if(model.$guider.show) {
                    this.model = model;
                    this.actionData = data;

                    model.$snapValue = {
                        width: 0,
                        height: 0,
                        left: 0,
                        top: 0
                    };

                    // after get snapBboxList in editor-image-cropper
                    setTimeout(() => {
                        if(model.snapBboxList) {
                            this.bboxList = [].concat(model.snapBboxList);
                        }
                        else {
                            this.bboxList = this.getBBoxList();
                        }
                    }, 0);
                }
            },
            'editor.drag.moving'(drag, model, e) {
                if(model.$guider.show) {
                    this.checkGuidePoints(e);
                }
            },
            'editor.drag.inactive'() {
                // reset
                this.left = HIDE_OFFSET;
                this.top = HIDE_OFFSET;
                this.model = null;
                this.actionData = null;
                this.bboxList = null;
            }
        },

        beforeDestroy() {
            this.$emit('destroy');
        }
    };

</script>
