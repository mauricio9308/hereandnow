package app;

import java.net.URL;

/**
 * Created by daniil.shevelev on 20-Jun-16.
 */
public class User {
    private String displayName;
    private Location location;
    private String email;
    private URL photoURL;
    private String subscriberID;

    public User(String subscriberID, String displayName, Location location, String email, URL photoURL) {
        this.subscriberID = subscriberID;
        this.displayName = displayName;
        this.location = location;
        this.email = email;
        this.photoURL = photoURL;
    }

    public User() {}

    public String getDisplayName() {
        return displayName;
    }

    public Location getLocation() {
        return location;
    }

    public String getEmail() {
        return email;
    }

    public URL getPhotoURL() {
        return photoURL;
    }

    public String getSubscriberID() {
        return subscriberID;
    }
}
