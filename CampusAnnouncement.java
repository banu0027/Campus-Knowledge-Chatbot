import java.util.ArrayList;
import java.util.List;

// Subject
public class CampusAnnouncement {

    private List<Observer> observers = new ArrayList<>();
    private String announcement;

    // Register an observer
    public void addObserver(Observer observer) {
        observers.add(observer);
    }

    // Remove an observer
    public void removeObserver(Observer observer) {
        observers.remove(observer);
    }

    // Notify all observers
    public void notifyObservers() {
        for (Observer observer : observers) {
            observer.update(announcement);
        }
    }

    // Publish a new announcement
    public void setAnnouncement(String announcement) {
        this.announcement = announcement;

        System.out.println("\nNew Campus Announcement:");
        System.out.println(announcement);

        notifyObservers();
    }
}