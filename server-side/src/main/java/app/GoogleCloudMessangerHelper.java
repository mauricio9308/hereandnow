package app;

import com.google.android.gcm.server.Message;
import com.google.android.gcm.server.MulticastResult;
import com.google.android.gcm.server.Result;
import com.google.android.gcm.server.Sender;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by daniil.shevelev on 21-Jun-16.
 */
public class GoogleCloudMessangerHelper {

    Sender sender = new  Sender("AIzaSyAkVqIum2Ko7WwsRtk4sZ075Ky8MwIEMbk");

    GoogleCloudMessangerHelper(){
    }

    public void pushNotifications(List<User> users) {

        //Use this code to send notification message to multiple devices
        ArrayList<String> devicesList = new ArrayList<String>();

        for (User user : users) {
            String subId = user.getSubscriberID();
            devicesList.add(subId);
        }

        try {
            // use this to send message with payload data
            Message message = new Message.Builder()
                    .collapseKey("message")
                    .timeToLive(3)
                    .delayWhileIdle(true)
                    //you can get this message on client side app
                    .addData("message", "Welcome to Push Notifications")
                    .build();

            //Use this code for multicast messages
            MulticastResult multicastResult = sender.send(message, devicesList, 0);
            System.out.println("Message Result: " + multicastResult.toString());
            //Print multicast message result on console

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
