<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <button id="btn">点击</button>
        <button id="plus">plus</button>
        <button id="minus">minus</button>
        <div>count: {{count}}</div>
    </div>
</template>

<script>
    /* eslint-disable */
    // const Rx = require('rx');
    // import Rx from '@/services/rx';
    import Rx from 'rxjs/Rx';


    export default {
        name: 'HelloWorld',
        props: {
            msg: String
        },
        data() {
            return {
                count : 0
            }
        },
        mounted() {
            // this.init();
            // this.test1();
            // this.test2();
            // this.test3();
            // this.test5();
            this.test6();
        },
        methods: {
            init() {

                // let foo = Rx.Observable.create(observer => {
                //     console.log('Hello');
                //     observer.next(42);
                // });
                //
                // foo.subscribe(x => console.log(x));
                // foo.subscribe(y => console.log(y));

                // var observable = Rx.Observable.create(observer => {
                //     try {
                //         observer.next(1);
                //         console.log('hello');
                //         observer.next(2);
                //         observer.next(3);
                //         observer.complete();
                //         observer.next(4);
                //     } catch (err) {
                //         observer.error(err);
                //     }
                // });
                //
                // let subcription = observable.subscribe(value => {
                //     console.log(value)
                // })


                let foo = Rx.Observable.create(observer => {
                    try {
                        console.log('Hello');
                        observer.next(42);
                        observer.complete();
                        observer.next(10);
                    } catch (e) {
                        observer.error(e)
                    }

                });

                let observer = {
                    next(value) {
                        console.log(value)
                    },
                    complete() {
                        console.log('completed')
                    },
                    error(err) {
                        console.error(err)
                    }
                }
                foo.subscribe(observer);

                var clicks = Rx.Observable.fromEvent(document.querySelector('#btn'), 'click');
                clicks.subscribe(x => console.log(x));
            },
            test1(){
                var observable = Rx.Observable.interval(1000);
                var subscription = observable.subscribe(x => console.log(x));

                setTimeout(() => {
                    subscription.unsubscribe();
                }, 3100)
            },
            test2(){
                var subject = new Rx.Subject();

                subject.subscribe({
                    next: (v) => console.log('observerA: ' + v)
                });
                subject.subscribe({
                    next: (v) => console.log('observerB: ' + v)
                });

                subject.next(1);
                subject.next(2);
            },
            test3(){
                var subject = new Rx.BehaviorSubject(0); // 0 is the initial value

                subject.subscribe({
                    next: (v) => console.log('observerA: ' + v)
                });

                subject.next(1);
                subject.next(2);

                subject.subscribe({
                    next: (v) => console.log('observerB: ' + v)
                });

                // subject.next(3);

            },
            test4(){
                function multiplyByTen(input) {
                    var output = Rx.Observable.create(function subscribe(observer) {
                        input.subscribe({
                            next: (v) => observer.next(10 * v),
                            error: (err) => observer.error(err),
                            complete: () => observer.complete()
                        });
                    });
                    return output;
                }

                var input = Rx.Observable.from([1, 2, 3, 4]);
                var output = multiplyByTen(input);
                output.subscribe(x => console.log(x));
            },
            test5(){
                let self = this;
                const plusBtn = document.getElementById('plus');
                const minusBtn = document.getElementById('minus');
                const plus$ = Rx.Observable.fromEvent(plusBtn, 'click').map(e => {
                    console.log(e)
                    return 1
                });
                const minus$ = Rx.Observable.fromEvent(minusBtn, 'click').map(e => -1);

                Rx.Observable.merge(plus$, minus$).scan((acc, n) => acc + n)
                    .subscribe(value => self.count =  value);
            },
            test6(){
                const actions = {
                    editor_module_remove: null,
                    editor_module_order: null,
                    editor_toggleModulesPicker: null,
                    editor_save: null,
                    editor_save_all_platforms: null,
                    editor_popup: {
                        text: '',
                        duration: 0,
                        type: 'normal', // normal, warning, success, error, loading
                    },
                    editor_imgPicker_show: null,
                    global_popup: {
                        text: '',
                        duration: 0,
                        type: 'normal',
                    },
                    global_pop: {
                        body: '',
                        position: 'bottom',
                        visible: false,
                        target: null,
                    },
                    change_backTop_type: {
                        type: 'gray',
                        container: 'base-body',
                    },
                    editor_scroll_modules_list: null,
                    editor_current_editing_element: null,
                    editor_add_group: null,
                    editor_layouts_changed_by_history: null,
                    editor_undo: null,
                    editor_redo: null,
                    editor_history_clear: null,
                    editor_rendered: null,
                    editor_click: null,
                    editor_editing_layout: null,
                    table_editor_show: null,
                    editor_table_update: null,
                    editor_remove_layout: null,
                    editor_add_text: null,
                    editor_add_image: null,
                    editor_replace_image_of_element: null,
                    editor_current_element_changed: null,
                    editor_edit_element: null,
                    editor_module_update_alias: null,
                    editor_change_layout: null,
                    editor_mousedown: null,
                    editor_mouseup: null,
                    editor_mousemove: null,
                    editor_drag_ghost_style: null,
                    editor_font_list_change: null,
                    editor_change_element: null,
                    editor_change_washing: null,
                    editor_preview: null,
                    editor_replace_size_img: null,
                    editor_add_blank_layout: null,
                    editor_change_blank_layout: null,
                    resetImgsUsedState: null,
                    setImgsUsedState: null,
                    clearImgsUsedState: null,
                };

                const actions$ = (function generateActions$() {
                    const obs = {};
                    Object.keys(actions).forEach((action) => {
                        const handler = actions[action];
                        const observable = new Rx.Subject();
                        let map = observable.map((val) => {
                            if (typeof handler === 'function') {
                                return handler(val);
                            }
                            console.log(val)
                            return val;
                        });
                        obs[action] = map;
                    });
                    return obs;
                }());
                console.log(actions$)
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
