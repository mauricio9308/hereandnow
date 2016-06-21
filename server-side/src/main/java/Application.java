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

        // Attach an listener to read the data at our posts reference
        ref.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot snapshot) {
                System.out.println("*****\nNew data was:\n");
                System.out.println(snapshot.getValue());
                // TODO: We'd trigger the processing and push-notifications here
            }
            @Override
            public void onCancelled(FirebaseError firebaseError) {
                System.out.println("The read failed: " + firebaseError.getMessage());
            }
        });

        System.out.println("Added event listener.");
    }

}
