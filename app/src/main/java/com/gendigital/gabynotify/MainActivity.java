package com.gendigital.gabynotify;


import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;

import com.gendigital.gabynotify.RestAPI.Endpoints;
import com.gendigital.gabynotify.RestAPI.RestAPI_Adapter;
import com.gendigital.gabynotify.RestAPI.modelo.UsuarioResponse;
import com.google.firebase.iid.FirebaseInstanceId;

import java.util.concurrent.ExecutionException;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MainActivity extends AppCompatActivity {

    private static final String TAG = "MainActivity";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public void leerNotificacion(View v) {
        String token = FirebaseInstanceId.getInstance().getToken();
        Log.d(TAG, "InstanceID token: " + token);
        enviarTokenRegistro(token);
    }

    private void enviarTokenRegistro(String token){
        Log.d("TOKEN", token);
        RestAPI_Adapter restApiAdapter = new RestAPI_Adapter();
        Endpoints endponits = restApiAdapter.establecerConexionRestAPI();
        Call<UsuarioResponse> usuarioResponseCall = endponits.registrarTokenID(token);
        //Call<UsuarioResponse> usuarioResponseCall = endponits.registrarTokenID(token, ANIMAL_EMISOR);

        usuarioResponseCall.enqueue(new Callback<UsuarioResponse>() {
            @Override
            public void onResponse(Call<UsuarioResponse> call, Response<UsuarioResponse> response) {

                UsuarioResponse usuarioResponse = response.body();
                Log.d("FIREBASE_RESPONSE", response.body().toString());

                Log.d("FIREBASE_TOKEN", usuarioResponse.getToken());
                Log.d("FIREBASE_ID", usuarioResponse.getId());
            }

            @Override
            public void onFailure(Call<UsuarioResponse> call, Throwable t) {

            }
        });
    }
}
