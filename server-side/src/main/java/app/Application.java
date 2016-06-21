package app;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import com.firebase.client.*;
import com.firebase.security.token.TokenGenerator;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
public class Application {
    
    public static void main(String[] args) {
        ApplicationContext ctx = SpringApplication.run(Application.class, args);
        
        System.out.println("HereAndNow back-end started");
        
        String[] beanNames = ctx.getBeanDefinitionNames();
        Arrays.sort(beanNames);
        for (String beanName : beanNames) {
            System.out.println(beanName);
        }

        runFireBaseCode();
    }

    private static void runFireBaseCode() {
        // https://www.firebase.com/docs/web/guide/login/custom.html

        // Get a reference to our posts
        String fireBaseSecret = "S2YjOL4r8GSPM0xARqe7SUlqIjVwyyOG2Myl84cr";

        Map<String, Object> payload = new HashMap<String, Object>();
        payload.put("uid", "uniqueId1");
        payload.put("some", "arbitrary");
        payload.put("data", "here");
        TokenGenerator tokenGenerator = new TokenGenerator(fireBaseSecret);
        String token = tokenGenerator.createToken(payload);

        Firebase ref = new Firebase("https://alertsystem-9f7a1.firebaseio.com/");
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

        System.out.println("Adding event listener.");

        // https://www.firebase.com/docs/android/guide/retrieving-data.html
        ref.child("reports").addChildEventListener(new ChildEventListener() {
            // Retrieve new posts as they are added to the database
            @Override
            public void onChildAdded(DataSnapshot snapshot, String previousChildKey) {
                Report newPost = snapshot.getValue(Report.class);
                System.out.println("Author: " + newPost.getAuthorDisplayName());
                System.out.println("Message: " + newPost.getDescription());
            }

            @Override
            public void onChildChanged(DataSnapshot snapshot, String reviousChildKey){
                System.out.println("The child changed");
            }
            @Override
            public void onChildRemoved(DataSnapshot snapshot){
                System.out.println("The child removed");
            }
            @Override
            public void onChildMoved(DataSnapshot snapshot, String previousChildKey){
                System.out.println("The child moved");
            }

            @Override
            public void onCancelled(FirebaseError firebaseError) {
                System.out.println("The read failed: " + firebaseError.getMessage());
            }
        });

        System.out.println("Added event listener.");
    }

}
