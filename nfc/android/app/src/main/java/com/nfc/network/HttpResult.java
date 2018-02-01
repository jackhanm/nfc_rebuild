package com.nfc.network;

/**
 * Created by tangdi on 9/22/17.
 */

public class HttpResult<T> extends BaseEntity {
    public T data;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getResult() {
        return data;
    }

    public void setResult(T result) {
        this.data = result;
    }

    public boolean isSuccess(){
        if(code != null){
            return code.equals(EnvironmentalData.CODE_SUCCESS);
        }else{
            return ret.equals(EnvironmentalData.CODE_SUCCESS);
        }
    }

    public String getCode(){
        return code;
    }

    public Object getExpand() {
        return expand;
    }

    public void setExpand(Object expand) {
        this.expand = expand;
    }

}
