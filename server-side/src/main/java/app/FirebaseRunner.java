package app;

import com.firebase.client.*;
import com.firebase.security.token.TokenGenerator;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by daniil.shevelev on 21-Jun-16.
 */
public class FirebaseRunner {

    private final Firebase ref = new Firebase("https://alertsystem-9f7a1.firebaseio.com/");
    private final Set<User> users = new HashSet<User>();
    private final Date serverStarted = new Date();
    private final GoogleCloudMessangerHelper gcmHelper = new GoogleCloudMessangerHelper();

    public FirebaseRunner() {
        System.out.println("Initializing FirebaseRunner.");
        // https://www.firebase.com/docs/web/guide/login/custom.html

        // Get a reference to our posts
        String fireBaseSecret = "S2YjOL4r8GSPM0xARqe7SUlqIjVwyyOG2Myl84cr";

        Map<String, Object> payload = new HashMap<String, Object>();
        payload.put("uid", "uniqueId1");
        payload.put("some", "arbitrary");
        payload.put("data", "here");
        TokenGenerator tokenGenerator = new TokenGenerator(fireBaseSecret);
        String token = tokenGenerator.createToken(payload);

        ref.authWithCustomToken(token, new Firebase.AuthResultHandler() {
            @Override
            public void onAuthenticationError(FirebaseError error) {
                System.err.println("");
                System.err.println("Login Failed! " + error.getMessage());
            }
            @Override
            public void onAuthenticated(AuthData authData) {
                System.err.println("");
                System.out.println("Login Succeeded!");
            }
        });

    }

    public void runFireBaseCode() {
        System.out.println("Adding event listeners.");
        listenToUserChanges();
        listenToNewReports();
    }

    private void listenToNewReports(){
        // https://www.firebase.com/docs/android/guide/retrieving-data.html
        ref.child("reports").addChildEventListener(new ChildEventListener() {
            // Retrieve new posts as they are added to the database
            @Override
            public void onChildAdded(DataSnapshot snapshot, String previousChildKey) {
                Report newPost = snapshot.getValue(Report.class);
                //System.out.println("Author: " + newPost.getAuthorDisplayName());
                System.out.println("Message: " + newPost.getDescription());
                /* Ignore any old posts because:
                "he onChildAdded event is triggered once for each existing child
                and then again every time a new child is added to the specified path."
                */
                System.out.println("Date: " + newPost.getDate());
                System.out.println("TheDate: " + newPost.getTheDate());

                if( newPost.getTheDate().after(serverStarted)) {
                    List usersList = new ArrayList(users);
                    System.out.println("Processing report...");
                    List<User> localUsers = UserReportMatcher.process(newPost, usersList);
                    System.out.println("Local users: " + localUsers.size());
                    System.out.println("Done processing report");

                    if(localUsers.size()>0) {
                        gcmHelper.pushNotifications(localUsers);
                    } else {
                        System.out.println("No users in that area.");
                    }
                }
            }

            @Override
            public void onChildChanged(DataSnapshot snapshot, String reviousChildKey){
                System.out.println("The report changed");
            }
            @Override
            public void onChildRemoved(DataSnapshot snapshot){
                System.out.println("The child removed");
            }
            @Override
            public void onChildMoved(DataSnapshot snapshot, String previousChildKey){
                System.out.println("The report moved");
            }

            @Override
            public void onCancelled(FirebaseError firebaseError) {
                System.out.println("The report read failed: " + firebaseError.getMessage());
            }
        });

        System.out.println("Added event listener for reports");
    }


    private void listenToUserChanges(){
// https://www.firebase.com/docs/android/guide/retrieving-data.html
        ref.child("users").addChildEventListener(new ChildEventListener() {
            // Retrieve new posts as they are added to the database
            @Override
            public void onChildAdded(DataSnapshot snapshot, String previousChildKey) {
                User user = snapshot.getValue(User.class);
                System.out.println("User: " + user.getDisplayName());
                users.add(user);
            }

            @Override
            public void onChildChanged(DataSnapshot snapshot, String reviousChildKey){
                // TODO: This needs to be addressed
                System.out.println("The user changed");
            }
            @Override
            public void onChildRemoved(DataSnapshot snapshot){
                // TODO: This needs to be addressed
                System.out.println("The user removed");
            }
            @Override
            public void onChildMoved(DataSnapshot snapshot, String previousChildKey){
                // TODO: This needs to be addressed
                System.out.println("The user moved");
            }

            @Override
            public void onCancelled(FirebaseError firebaseError) {
                System.out.println("The user read failed: " + firebaseError.getMessage());
            }
        });

        System.out.println("Added event listener for users");
    }
}
