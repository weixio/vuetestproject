/*
 * rx.js
 * @author fengye
 */

/* basic */
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';

/* aditional Observables */
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/timer';
import 'rxjs/add/observable/range';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/interval';
import { ajax } from 'rxjs/observable/dom/ajax';
import 'rxjs/add/observable/zip';

/* operators */
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/zip';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/sampleTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/takeLast';
import 'rxjs/add/operator/skipWhile';
import 'rxjs/add/operator/mergeAll';
import 'rxjs/add/operator/concatAll';

const Rx = {
    Subject,
    ReplaySubject,
    Observable,
    ajax,
};

export default Rx;
