package com.nfc.network;


import com.nfc.network.resp.ArticeDetailEntity;
import com.nfc.network.resp.ResponseJSEntity;
import com.nfc.network.resp.StartPageEntity;
import com.nfc.network.resp.VideoDetailEntity;

import java.util.Map;

import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.Path;
import retrofit2.http.Query;
import retrofit2.http.QueryMap;
import rx.Observable;

/**
 * Created by tangdi on 12/22/17.
 */

public interface NetAPI {
    @GET(Constant.ARTICLE_DETAIL)
    Observable<HttpResult<ArticeDetailEntity>> getArtice(@Path("id") long id, @QueryMap Map<String, String> map
            , @Header(Constant.ACCESSTOKEN) String accessToken, @Header(Constant.VERSION) String version);

    @GET(Constant.ARTICLE_VIDEO)
    Observable<HttpResult<VideoDetailEntity>> getVideo(@Path("videoId") String id, @QueryMap Map<String, String> map
            , @Header(Constant.ACCESSTOKEN) String accessToken, @Header(Constant.VERSION) String version);

    @GET(Constant.START_PAGE)
    Observable<HttpResult<StartPageEntity>> getStartPage(@Query("os") String os, @Query("resolution") String resolution
            , @QueryMap Map<String, String> map);
    @GET(Constant.UPDATE_VERSION)
    Observable<HttpResult<ResponseJSEntity>> getUpDateInfo(@QueryMap Map<String, String> map, @Query("os") int os, @Query("channel") String channel, @Query("version") String version, @Query("jsVersionList") String JSVersionList);
}
