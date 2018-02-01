package com.nfc.network;

import rx.Observable;
import rx.Scheduler;
import rx.android.schedulers.AndroidSchedulers;
import rx.schedulers.Schedulers;

/**
 * Created by tangdi on 9/22/17.
 */

public class TransformUtils {

    private static Throwable mRefreshTokenError = null;

    public static <T> Observable.Transformer<T,T> defaultSchedulers(){
        return new Observable.Transformer<T, T>() {
            @Override
            public Observable<T> call(Observable<T> tObservable) {
                return tObservable.observeOn(AndroidSchedulers.mainThread())
                        .subscribeOn(Schedulers.io());

            }
        };
    }


    /**
     * 工作线程
     * @param <T>
     * @return
     */
    public static <T> Observable.Transformer<T,T> all_io(){
        return new Observable.Transformer<T, T>() {
            @Override
            public Observable<T> call(Observable<T> tObservable) {
                return tObservable.observeOn(Schedulers.io()).subscribeOn(Schedulers.io());
            }
        };
    }

    /**
     * 可自定义线程
     */
    public static <T> Observable.Transformer<T, T> rxSchedulerHelper(final Scheduler scheduler) {
        return new Observable.Transformer<T, T>() {
            @Override
            public Observable<T> call(Observable<T> tObservable) {
                return tObservable.subscribeOn(scheduler)
                        .unsubscribeOn(AndroidSchedulers.mainThread())
                        .observeOn(AndroidSchedulers.mainThread());
            }
        };

    }


    /**
     * Refresh the token when the current token is invalid.
     *
     * @return Observable
     */

}
