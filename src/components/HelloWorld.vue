<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <button id="btn" @click="dianji">点击</button>
        <button id="plus">plus</button>
        <button id="minus">minus</button>
        <!--<div>count: {{count}}</div>-->
        <Comleft></Comleft>
        <Comright></Comright>
    </div>
</template>

<script>
    /* eslint-disable */
    // const Rx = require('rx');
    // import Rx from '@/services/rx';
    import Rx from 'rxjs/Rx';
    import Comleft from './Comleft'
    import Comright from './Comright'

    export default {
        name: 'HelloWorld',
        props: {
            msg: String
        },
        components:{
            Comleft,
            Comright
        },
        data() {
            return {
                count: 0
            }
        },
        mounted() {
            // this.init();
            // this.test1();
            // this.test2();
            // this.test3();
            // this.test5();
//            this.test6();
//            this.test7();
//            this.test8()
        },
        methods: {
            dianji(){
                this.$store.commit('increment')
            },
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
            test1() {
                var observable = Rx.Observable.interval(1000);
                var subscription = observable.subscribe(x => console.log(x));

                setTimeout(() => {
                    subscription.unsubscribe();
                }, 3100)
            },
            test2() {
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
            test3() {
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
            test4() {
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
            test5() {
                let self = this;
                const plusBtn = document.getElementById('plus');
                const minusBtn = document.getElementById('minus');
                const plus$ = Rx.Observable.fromEvent(plusBtn, 'click').map(e => {
                    console.log(e)
                    return 1
                });
                const minus$ = Rx.Observable.fromEvent(minusBtn, 'click').map(e => -1);

                Rx.Observable.merge(plus$, minus$).scan((acc, n) => acc + n)
                    .subscribe(value => self.count = value);
            },
            test6() {
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
            },
            test7() {
                const source = Rx.Observable.fromPromise(new Promise(resolve => resolve(1)));
                //add 10 to the value
                const example = source.map(val => val + 10);
                //output: 11
                const subscribe = example.subscribe(val => console.log(val));
            },
            test8() {
                /**
                 Rx.Observable是Observable
                 Rx.Observable.create创建序列源source，创建source的方法有多个，比如of, from, fromPromise等
                 observer是Observer观察者，只有在Rx.Observable.create创建方法可以获取，其他创建方法内置了observer且不可访问
                 observer.next发射数据更新
                 source.map其中map就是Operators的其中一个方法，方法调用返回新的source1
                 source1.subscribe是订阅，即数据更新时的响应方法。同时返回订阅实例Subscription
                 subscription.next立即响应（不同于发射）静态数据，此时不会经过`Operators`处理
                 ! Rx.Observable.create或者Rx.Subject.create创建的source不会自动关闭，其他方式则当检测到没有序列发生变更会自动销毁source.
                 */
//                const source = Rx.Observable.create(observer => {
//                    observer.next('foo');
//                    setTimeout(() => observer.next('bar'), 1000);
//                });
//                const source1 = source.map(val => `hello ${val}`);
//                const subscription = source1.subscribe(value => console.log(value));
//                subscription.next('foo1');
//
//                // forEach和subscribe相似，同是实现订阅效果，等到promise可以监控subscription完成和失败的异常。
//                // 日志打印并没有comlete, 因为source并没有完成关闭，触发调用observer.complete()
//                const promise = source1.forEach(value => console.log(value))
//                promise.then(() => console.log('complete'), (err) => console.log(err));
                /**
                 output:
                 hello foo
                 foo1
                 hello foo
                 hello bar
                 hello bar
                 */

                /**
                 new Subject创建被观察者实例，同source一样都具备subscribe方法，表示的含义和作用也一样，即发射数据变更时响应方法。
                 subject.next立即发射数据变更，作用同observer.next
                 注意foo1是最后输出的，是因为在创建source时指定了Rx.Scheduler.async，是异步的调度器，表示在响应数据处理时是异步执行的。
                 */
                Rx.Observable.of('foo1', Rx.Scheduler.async).subscribe(value => console.log(value));

                const subject = new Rx.Subject();
                const source1 = subject.map(val => `hello ${val}`);
                const subscription = source1.subscribe(value => console.log(value));
                subject.next('foo');
                subscription.next('bar');
                /**
                 output:
                 hello foo
                 bar
                 foo1
                 */
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
