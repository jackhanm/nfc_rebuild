package com.nfc.network;

import android.util.Log;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.lang.reflect.Proxy;
import java.util.concurrent.TimeUnit;

import okhttp3.OkHttpClient;
import okhttp3.logging.HttpLoggingInterceptor;
import retrofit2.Retrofit;
import retrofit2.adapter.rxjava.RxJavaCallAdapterFactory;
import retrofit2.converter.gson.GsonConverterFactory;

/**
 * Created by tangdi on 9/22/17.
 */

public class NetWorkFactory {

    private final Gson gson;

    private OkHttpClient okHttpClient;

    private NetWorkFactory(){
        gson = new GsonBuilder()
                .setDateFormat("yyyy-MM-dd hh:mm:ss")
                .create();
    }

    private static class SingletonHolder{
        private static final NetWorkFactory _INSTANCE = new NetWorkFactory();
    }

    public static NetWorkFactory getInstance(){
        return SingletonHolder._INSTANCE;
    }

    public <T> T createService(Class<T> serviceClass){
        okHttpClient = getOkHttpClient();
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(Constant.BASE_URL)
                .client(okHttpClient)
                .addConverterFactory(ResponseConverterFactory.create())
                .addConverterFactory(GsonConverterFactory.create())
                .addCallAdapterFactory(RxJavaCallAdapterFactory.create())
                .build();
        //return retrofit.create(serviceClass);
        return (T) Proxy.newProxyInstance(serviceClass.getClassLoader(), new Class<?>[] { serviceClass }, new ProxyHandler(retrofit.create(serviceClass)));
    }

    HttpLoggingInterceptor loggingInterceptor = new HttpLoggingInterceptor(new HttpLoggingInterceptor.Logger() {
        @Override
        public void log(String message) {
            //打印retrofit日志
            Log.i("RetrofitLog","retrofitBack ======================= "+message);
        }
    });


    private static final long DEFAULT_TIMEOUT = 10;
    private OkHttpClient getOkHttpClient(){
        loggingInterceptor.setLevel(HttpLoggingInterceptor.Level.BODY);
        //定制OkHttp
        OkHttpClient.Builder builder = new OkHttpClient.Builder();
        builder.connectTimeout(DEFAULT_TIMEOUT, TimeUnit.SECONDS);
        builder.writeTimeout(DEFAULT_TIMEOUT,TimeUnit.SECONDS);
        builder.addInterceptor(loggingInterceptor);
        //设置缓存
        //File httpCacheDirectory = new File(SDCardUtils.getRootDirectoryPath(),"这里是你的网络缓存存放的地址");
        //builder.cache(new Cache(httpCacheDirectory,10*1024*1024));

        return builder.build();
    }

}
