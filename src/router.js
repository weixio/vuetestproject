import Vue from 'vue';
import Router from 'vue-router';
import HelloWord from '@/components/HelloWorld';
import Vuedraggable from '@/components/Vuedraggable';
import StateModleDemo from '@/components/StateModleDemo';
import MoveHelpLine from '@/components/MoveHelpLine';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'HelloWord',
            component: HelloWord,
        },
        {
            path: '/HelloWord',
            name: 'HelloWord',
            component: HelloWord,
        },

        {
            path: '/Vuedraggable',
            name: 'Vuedraggable',
            component: Vuedraggable,
        },
        {
            path: '/StateModleDemo',
            name: 'StateModleDemo',
            component: StateModleDemo,
        },
        {
            path: '/MoveHelpLine',
            name: 'MoveHelpLine',
            component: MoveHelpLine,
        },
    ],
});
