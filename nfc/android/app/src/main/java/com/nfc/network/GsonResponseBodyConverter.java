package com.nfc.network;

import com.google.gson.Gson;

import java.io.IOException;
import java.lang.reflect.Type;

import okhttp3.ResponseBody;
import retrofit2.Converter;

/**
 * Created by tangdi on 9/22/17.
 */

public class GsonResponseBodyConverter<T> implements Converter<ResponseBody, T> {

    private final Gson gson;

    private final Type type;

    public GsonResponseBodyConverter(Gson gson, Type type){
        this.gson = gson;
        this.type = type;
    }

    @Override
    public T convert(ResponseBody value) throws IOException {
        String response = value.string();
        //应答消息体
        /**
         * 同时满足公告平台和业务平台的两个头
         */
        BaseEntity httpResult = gson.fromJson(response, BaseEntity.class);
        if(httpResult.code != null){
            if(httpResult.code.equals(EnvironmentalData.CODE_SUCCESS)){
                return gson.fromJson(response, type);
            }else{
                //CustomToast.showToast(httpResult.message);
                //ErrorResponse errorResponse = gson.fromJson(response,ErrorResponse.class);
                //抛一个自定义ResultException 传入失败时候的状态码，和信息
                if(httpResult.code.equals("10000")){
                    throw new TokenException();
                }else if(httpResult.code.equals("10001") || httpResult.code.equals("10003") || httpResult.code.equals("10002")){
                    throw new RefreshTokenException();
                }else{
                    throw new ResultException(Integer.valueOf(httpResult.code),httpResult.message);
                }
            }
        }else{
            if(httpResult.ret.equals(EnvironmentalData.CODE_SUCCESS)){
                return gson.fromJson(response, type);
            }else{
                //CustomToast.showToast(httpResult.message);
                //ErrorResponse errorResponse = gson.fromJson(response,ErrorResponse.class);
                //抛一个自定义ResultException 传入失败时候的状态码，和信息
                if(httpResult.code.equals("10000")){
                    throw new TokenException();
                }else if(httpResult.code.equals("10001") || httpResult.code.equals("10003") || httpResult.code.equals("10002")){
                    throw new RefreshTokenException();
                }else{
                    throw new ResultException(Integer.valueOf(httpResult.code),httpResult.message);
                }
            }
        }
    }
}
