// Concrete Observer
public class Student implements Observer {

    private String studentName;

    public Student(String studentName) {
        this.studentName = studentName;
    }

    @Override
    public void update(String announcement) {

        System.out.println(
            studentName + " received notification: " + announcement
        );
    }
}