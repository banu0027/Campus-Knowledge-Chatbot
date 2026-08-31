// Adaptee
public class LegacyCampusDatabase {

    public String getCampusInfo(String query) {

        if (query.equalsIgnoreCase("library")) {
            return "Central Library is open from 8 AM to 8 PM.";
        }

        if (query.equalsIgnoreCase("canteen")) {
            return "Campus Canteen is open from 8 AM to 6 PM.";
        }

        if (query.equalsIgnoreCase("cse department")) {
            return "CSE Department is located in Block A.";
        }

        return "No information found in the legacy campus database.";
    }
}