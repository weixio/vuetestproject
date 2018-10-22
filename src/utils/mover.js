import { debounce } from 'lodash'
import EventBus from '../utils/EventBus';

export default class Mover {
    constructor(className,containerclass){
        this.className = className;
        this.containerclass = containerclass;
        this.container;
        this.mover;
        this.isDown = false;
        this.beforeMovePosition;
        this.beforeMoveBox;
        this.init();
        this.addEvents();
    }

    init(){
        this.mover = document.querySelector(`.${this.className}`);
        this.container = document.querySelector(`.${this.containerclass}`);
    }

    addEvents(){
        const self = this;
        const mousedown = function(e){
            self.isDown = true;
            const x = e.clientX;
            const y = e.clientY;
            self.beforeMovePosition = {x : x,y: y};
            let box = self.getPosition();
            self.beforeMoveBox = {left:box.left,top:box.top};
            document.addEventListener('mousemove',debounce(mousemove,10));
            document.addEventListener('mouseup',mouseup);

            //事件

        }
        const mousemove = function(e){
            if (!self.isDown) return;
            const x = e.clientX;
            const y = e.clientY;
            self.mover.style.left = self.beforeMoveBox.left*1 + (x - self.beforeMovePosition.x)+'px';
            self.mover.style.top = self.beforeMoveBox.top*1 + (y - self.beforeMovePosition.y)+'px';
            EventBus.$emit('editor.guilder.move',self.getMousePosition(e),e.target);
        }
        const mouseup = function(){
            self.isDown = false;
            document.removeEventListener('mousemove',mousemove);
            EventBus.$emit('editor.guilder.up');
        }

        self.mover.addEventListener('mousedown',mousedown);
    }


    getBox(node) {
        const movebox = node.getBoundingClientRect();
        return {
            left : movebox.left,
            top : movebox.top,
            width: movebox.width,
            height: movebox.height,
        }
    }
    getRelaBox(e){
        const node = e.target;
        let box = this.getBox(node);
        return{
            left : box.left - this.container.getBoundingClientRect().left,
            top : box.top - this.container.getBoundingClientRect().top,
            width: box.width,
            height: box.height,
        }
    }
    getMousePosition(e){
        let clientX = e.clientX;
        let clientY = e.clientY;
        let containerBox = this.getBox(this.container);
        return{
            left : clientX - containerBox.left,
            top : clientY - containerBox.top
        }
    }

    getPosition(){

        let left = this.mover.style.left;
        if(!left){
            left = window.getComputedStyle(this.mover,null).left;
        }
        let top = this.mover.style.top;
        if(!top){
            top = window.getComputedStyle(this.mover,null).top;
        }
        return {
            left : left.replace('px',''),
            top : top.replace('px',''),
        }
    }

}
