import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.ResultSet;

public class MySQLConnection {

    public static void main(String[] args) {
        // Database credentials
        String jdbcUrl = "jdbc:mysql://localhost:3306/java_jdbc_test";
        String username = "java_user";
        String password = "strongpassword123";

        Connection connection = null;
        Statement stmt = null;
        ResultSet rs = null;

        try {
            // Step 1: Register JDBC driver
            System.out.println("Registering JDBC driver...");
            Class.forName("com.mysql.cj.jdbc.Driver");

            // Step 2: Open a connection
            System.out.println("Connecting to database...");
            connection = DriverManager.getConnection(jdbcUrl, username, password);
            System.out.println("Connection successful!");

            // Step 3: Create a statement
            System.out.println("Creating statement...");
            stmt = connection.createStatement();

            // Step 4: Execute a query
            System.out.println("Executing query: SHOW DATABASES");
            rs = stmt.executeQuery("SHOW DATABASES");

            // Step 5: Process the results
            System.out.println("Databases in your MySQL server:");
            while (rs.next()) {
                System.out.println(rs.getString(1));
            }

            // Step 6: Create a table (if it doesn't exist)
            System.out.println("Creating table 'users' if not exists...");
            String createTableSQL = "CREATE TABLE IF NOT EXISTS users " +
                                    "(id INT AUTO_INCREMENT PRIMARY KEY, " +
                                    " name VARCHAR(50), " +
                                    " email VARCHAR(50))";
            stmt.executeUpdate(createTableSQL);
            System.out.println("Table created or already exists.");

            // Step 7: Insert a record
            System.out.println("Inserting a record...");
            String insertSQL = "INSERT INTO users (name, email) VALUES ('John Doe', 'john@example.com')";
            int rowsAffected = stmt.executeUpdate(insertSQL);
            System.out.println(rowsAffected + " row(s) inserted.");

            // Step 8: Query the users table
            System.out.println("Querying the users table...");
            rs = stmt.executeQuery("SELECT * FROM users");
            System.out.println("Users in the database:");
            while (rs.next()) {
                System.out.println("ID: " + rs.getInt("id") + 
                                   ", Name: " + rs.getString("name") + 
                                   ", Email: " + rs.getString("email"));
            }

        } catch (SQLException se) {
            se.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            // Step 9: Close resources
            try {
                if (rs != null) rs.close();
                if (stmt != null) stmt.close();
                if (connection != null) connection.close();
                System.out.println("Database resources closed.");
            } catch (SQLException se) {
                se.printStackTrace();
            }
        }
        System.out.println("JDBC to MySQL connection demo completed.");
    }
}
