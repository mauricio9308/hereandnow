package app;

import java.awt.geom.Point2D;

/**
 * Created by daniil.shevelev on 20-Jun-16.
 */
public class Location {
    private Double lat;
    private Double lng;

    public Point2D getPoint() {
        if(point==null){
            setThePonintLocation();
        }
        return point;
    }

    private Point2D point;

    public String getGeohash() {
        return geohash;
    }

    private String geohash;

    final private Double DEFAULT_THREASHOLD = 10D;

    Location(){}

    public Location(Double lat, Double lng, String geohash) {
        this.lat = lat;
        this.lng = lng;

        setThePonintLocation();

        this.geohash = geohash;
    }

    private void setThePonintLocation() {
        this.point = new Point2D.Double(lat,lng);
    }

    public Double getLat() {
        return lat;
    }

    public Double getLng() {
        return lng;
    }

    public boolean isClose(Location otherLocation){
        // E.g. Cancun: lat:21.9007778 Double:-102.3166435
        Double x = otherLocation.getLat();
        Double y = otherLocation.getLng();
        Point2D otherCoordinate =  new Point2D.Double(x,y);

        Point2D thePoint = getPoint();
        Double distance = thePoint.distance(otherCoordinate);
        if(distance < DEFAULT_THREASHOLD){
            System.out.println("Location is close. Distance is: " + distance);
            System.out.println("Location 1: " + lat + ":" + lng);
            System.out.println("Location 2: " + x + ":" + y);
            return true;
        }
        System.out.println("Location is further than " + DEFAULT_THREASHOLD);
        System.out.println("Location 1: " + lat + ":" + lng);
        System.out.println("Location 2: " + x + ":" + y);
        return false;
    }

    // Not used at for now.
    public boolean isClose(Location otherLocation, int threashold){
        Double x = otherLocation.getLat();
        Double y = otherLocation.getLng();
        Point2D otherCoordinate =  new Point2D.Double(x,y);

        Double distance = point.distance(otherCoordinate);
        if(distance < threashold){
            System.out.println("Location is close.");
            System.out.println("Location 1: " + lat + ":" + lng);
            System.out.println("Location 2: " + x + ":" + y);
            return true;
        }
        System.out.println("Location is further than " + threashold);
        System.out.println("Location 1: " + lat + ":" + lng);
        System.out.println("Location 2: " + x + ":" + y);
        return false;
    }
}
