package app;

/**
 * Created by daniil.shevelev on 20-Jun-16.
 */
public class Report {
    private String authorDisplayName;
    private String authorUid;
    private String date;
    private String description;
    private String isAnonymous;
    private String level;
    private Location location;

    Report() {}

    public String getAuthorDisplayName() {
        return authorDisplayName;
    }

    public String getAuthorUid() {
        return authorUid;
    }

    public String getDate() {
        return date;
    }

    public String getDescription() {
        return description;
    }

    public String getIsAnonymous() {
        return isAnonymous;
    }

    public String getLevel() {
        return level;
    }

    public Location getLocation() {
        return location;
    }
}
