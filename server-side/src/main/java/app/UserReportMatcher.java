package app;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by daniil.shevelev on 21-Jun-16.
 */
public class UserReportMatcher {

    public static List<User> process(Report report, List<User> allUsers){
        List<User> relevantUsers = new ArrayList<User>();
        Location reportLocation = report.getLocation();

        for(User user : allUsers){
            Location userLocation = user.getLocation();
            if(reportLocation.isClose(userLocation)){
                relevantUsers.add(user);
            }
        }

        return relevantUsers;
    }
}
