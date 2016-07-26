package com.gendigital.gabynotify.RestAPI;

import com.gendigital.gabynotify.RestAPI.modelo.UsuarioResponse;

import retrofit2.Call;
import retrofit2.http.Field;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Path;

/**
 * Created by Gaby on 23/07/2016.
 */
public interface Endpoints {

    @FormUrlEncoded
    @POST(RestAPI_Config.KEY_POST_ID_TOKEN)
    Call<UsuarioResponse> registrarTokenID(@Field("token") String token);
/*
    Call<UsuarioResponse> registrarTokenID(@Field("token") String token, @Field("animal") String animal);
    @GET(RestAPI_Config.KEY_TOQUE_ANIMAL)
    Call<UsuarioResponse> toqueAnimal(@Path("id") String id, @Path("animal") String animal);
    */
}
