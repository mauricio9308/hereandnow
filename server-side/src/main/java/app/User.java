package app;

import java.net.URL;

/**
 * Created by daniil.shevelev on 20-Jun-16.
 */
public class User {
    private String displayName;
    private Location location;
    private String email;
    private URL photoUrl;
    private String subscriberId;

    public User(String subscriberId, String displayName, Location location, String email, URL photoUrl) {
        this.subscriberId = subscriberId;
        this.displayName = displayName;
        this.location = location;
        this.email = email;
        this.photoUrl = photoUrl;
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

    public URL getPhotoUrl() {
        return photoUrl;
    }

    public String getSubscriberId() {
        return subscriberId;
    }
}
