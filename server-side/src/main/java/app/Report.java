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

    public Report(String authorDisplayName, String authorUid, String date, String description,
                  String isAnonymous, String level, Location location) {
        this.authorDisplayName = authorDisplayName;
        this.authorUid = authorUid;
        this.date = date;
        this.description = description;
        this.isAnonymous = isAnonymous;
        this.level = level;
        this.location = location;
    }

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
