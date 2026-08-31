public class ObserverDemo {

    public static void main(String[] args) {

        // Create Subject
        CampusAnnouncement campus =
                new CampusAnnouncement();

        // Create Observers
        Student student1 =
                new Student("Arun");

        Student student2 =
                new Student("Priya");

        Student student3 =
                new Student("Karthik");

        // Register students
        campus.addObserver(student1);
        campus.addObserver(student2);
        campus.addObserver(student3);

        // Publish announcement
        campus.setAnnouncement(
            "Tomorrow is a holiday due to heavy rain."
        );

        // Remove one observer
        campus.removeObserver(student2);

        // Publish another announcement
        campus.setAnnouncement(
            "Internal exams start from Monday."
        );
    }
}