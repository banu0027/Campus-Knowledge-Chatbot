// Adapter
public class CampusKnowledgeAdapter implements CampusKnowledgeSource {

    private LegacyCampusDatabase legacyDatabase;

    public CampusKnowledgeAdapter() {
        legacyDatabase = new LegacyCampusDatabase();
    }

    @Override
    public String getCampusInformation(String query) {

        // Convert the request expected by the chatbot
        // into the format understood by the legacy system.

        return legacyDatabase.getCampusInfo(query);
    }
}