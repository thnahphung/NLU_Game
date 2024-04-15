package vn.edu.nlu.fit.nlugame.layer2.dao;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.jdbi.v3.core.Jdbi;

import java.io.File;
import java.io.FileInputStream;
import java.util.Properties;

public abstract class BaseDAO {
    private static final Properties prop = new Properties();
    private static final HikariConfig config;
    public static HikariDataSource dataSource;
    private static Jdbi jdbi;

    static {
        try {
            File file = new File("/database.properties");
            if (file.exists()) {
                prop.load(new FileInputStream(file));
            } else {
                prop.load(BaseDAO.class.getClassLoader().getResourceAsStream("database.properties"));
            }
            config = new HikariConfig();
            config.setJdbcUrl("jdbc:mysql://" + getDbHost() + ":" + getDbPort() + "/" + getDbName());
            config.setDriverClassName("com.mysql.cj.jdbc.Driver");
            config.setUsername(getUsername());
            config.setPassword(getPassword());
            config.setPoolName("db-pool-jdbi");
            config.setMinimumIdle(10);
            config.addDataSourceProperty("cachePrepStmts", "true");
            config.addDataSourceProperty("prepStmtCacheSize", "250");
            config.addDataSourceProperty("prepStmtCacheSqlLimit", "2048");
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    protected static Jdbi getJdbi() {
        if (dataSource == null || dataSource.isClosed()) {
            dataSource = new HikariDataSource(config);
            jdbi = Jdbi.create(dataSource);
        }
        return jdbi;
    }

    /**
     * call method when you need to close Jdbi instance
     * it require to return mysql connect to pool.
     */
    private static String getDbHost() {
        return prop.get("db.host").toString();
    }

    private static String getDbPort() {
        return prop.get("db.port").toString();
    }

    private static String getUsername() {
        return prop.get("db.username").toString();
    }

    private static String getPassword() {
        return prop.get("db.password").toString();
    }

    private static String getDbOption() {
        return prop.get("db.options").toString();
    }

    private static String getDbName() {
        return prop.get("db.databaseName").toString();
    }

}
