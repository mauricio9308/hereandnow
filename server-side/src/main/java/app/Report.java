package app;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by daniil.shevelev on 20-Jun-16.
 */
public class Report {
    /*
     authorUid: "aGVnCSjSvchUOnaHCVc41bXFISo2"
     date: "2016-06-21T15:34:34.660Z"
     description: "hyde"
     event: "Robbery"
     isAnonymous: true
     level: 4
     location
     */
    private String authorDisplayName;
    private String authorUid;
    // Sample: "2016-06-21T15:34:34.660Z"
    private String date;
    private Date theDate;
    private String description;
    private String isAnonymous;
    private String level;
    private Location location;
    private String event;

    public Report(String authorDisplayName, String authorUid, String date, String description,
                  String isAnonymous, String level, Location location, String event) {
        this.authorDisplayName = authorDisplayName;
        this.authorUid = authorUid;
        this.date = date;
        this.description = description;
        this.isAnonymous = isAnonymous;
        this.level = level;
        this.location = location;
        this.event = event;

        parseTheDate();
    }

    private void parseTheDate() {
        // TODO: This can be improved
        // Sample: "2016-06-21T15:34:34.660Z"
        DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS");
        try {
            this.theDate = (Date)formatter.parse(date);
        } catch (ParseException e) {
            e.printStackTrace();
            // Will set just the date without time
            String[] chunks = date.split("T");
            String dateString = chunks[0];
            DateFormat formatter2 = new SimpleDateFormat("yyyy-MM-dd");
            try {
                this.theDate = (Date)formatter2.parse(dateString );
            } catch (ParseException e1) {
                e1.printStackTrace();
            }
        }
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

    public Date getTheDate() {
        if(theDate==null){
            parseTheDate();
        }
        return theDate;
    }

    public String getEvent() {
        return event;
    }
}
