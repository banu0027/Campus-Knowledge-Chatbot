public class AdapterDemo {

    public static void main(String[] args) {

        // Client uses the Target Interface
        CampusKnowledgeSource knowledgeSource =
                new CampusKnowledgeAdapter();

        System.out.println("=== Campus Knowledge Chatbot ===");

        System.out.println("\nQuery: Library");
        System.out.println(
                "Bot: " +
                knowledgeSource.getCampusInformation("library")
        );

        System.out.println("\nQuery: Canteen");
        System.out.println(
                "Bot: " +
                knowledgeSource.getCampusInformation("canteen")
        );

        System.out.println("\nQuery: CSE Department");
        System.out.println(
                "Bot: " +
                knowledgeSource.getCampusInformation("cse department")
        );

        System.out.println("\nQuery: Hostel");
        System.out.println(
                "Bot: " +
                knowledgeSource.getCampusInformation("hostel")
        );
    }
}