package app;

/**
 * Created by daniil.shevelev on 20-Jun-16.
 */
public class Location {
    private long lat;
    private long lng;

    Location(){}

    public Location(long lat, long lng) {
        this.lat = lat;
        this.lng = lng;
    }

    public long getLat() {
        return lat;
    }

    public long getLng() {
        return lng;
    }

    public boolean isClose(Location otherLocation){
        // TODO
        return false;
    }

    public boolean isClose(Location otherLocation, int threashold){
        // TODO
        return false;
    }
}
