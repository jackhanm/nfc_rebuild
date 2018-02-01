package com.nfc.network;

import java.net.ConnectException;
import java.net.SocketTimeoutException;
import java.util.concurrent.TimeoutException;

import rx.Subscriber;

/**
 * Created by tangdi on 9/22/17.
 */

public abstract class HttpResultSubscriber<T> extends Subscriber<HttpResult<T>> {
    @Override
    public void onNext(HttpResult<T> t){
        if (t.isSuccess()) {
            onSuccess(t.getResult());
        } else {
            _onError(Integer.valueOf(t.getCode()), t.getMessage());
        }
    }

    @Override
    public void onCompleted() {

    }

    @Override
    public void onError(Throwable e) {
        e.printStackTrace();
        //在这里做全局的错误处理
        if (e instanceof ConnectException ||
                e instanceof SocketTimeoutException ||
                e instanceof TimeoutException) {
            //网络错误
            _onError(-9999, "网络连接错误");
        }else if (e instanceof ResultException) {
            //自定义的ResultException
            //由于返回200,300返回格式不统一的问题，自定义GsonResponseBodyConverter凡是300的直接抛异常
            _onError(((ResultException) e).getErrCode(),((ResultException) e).getMsg());
        }
    }


    public abstract void onSuccess(T t);

    public abstract void _onError(int status,String msg);
}
