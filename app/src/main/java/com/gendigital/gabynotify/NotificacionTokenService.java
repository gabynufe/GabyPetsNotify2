package com.gendigital.gabynotify;

import android.util.Log;

import com.google.firebase.iid.FirebaseInstanceId;
import com.google.firebase.iid.FirebaseInstanceIdService;

/**
 * Created by Gaby on 23/07/2016.
 *
 * Servicio permanente que obtiene un identificador de nuestro dispositivo
 */
public class NotificacionTokenService extends FirebaseInstanceIdService {

    private static final String TAG = "FIREBASE_TOKEN";
    @Override
    public void onTokenRefresh() {
        /*
        *  llamado si el token es actualizado.
        *  Esto puede ocurrir si la seguridad del token anterior fue comprometida.
        *  Tambien es llamado cuando se genera por primera vez el token
         */

        //super.onTokenRefresh();
        // Get updated InstanceID token.
        String refreshedToken = FirebaseInstanceId.getInstance().getToken();
        Log.d(TAG, "Refreshed token: " + refreshedToken);

        // TODO: Implement this method to send any registration to your app's servers.
        sendRegistrationToServer(refreshedToken);
    }
    private void sendRegistrationToServer(String token) {
        // codigo para almacenar el token en una base de datos
        Log.d(TAG, "Token [" + token + "] enviando a server");
    }
}
