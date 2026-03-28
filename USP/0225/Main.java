public class Main {
    public static void main(String[] args) {
        StudentRecord s1 = new StudentRecord();
        StudentRecord s2 = new StudentRecord("john", 123, 3.0);

        System.out.println(s1.name);
        System.out.println(s2.name);
    }
}

class StudentRecord{
    public String name;
    private int studentId;
    private float gpa;

    public static int numStudRec = 0;

    public StudentRecord(){
        name = "unknown";
        studentId = 0;
        gpa = 0.0f;
        numStudRec++;
    }   
}