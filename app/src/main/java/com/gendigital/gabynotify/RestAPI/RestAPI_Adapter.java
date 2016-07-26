package com.gendigital.gabynotify.RestAPI;

import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

/**
 * Created by Gaby on 23/07/2016.
 */
public class RestAPI_Adapter {
    public Endpoints establecerConexionRestAPI(){
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(RestAPI_Config.ROOT_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .build()
                ;

        return retrofit.create(Endpoints.class);
    }
}
