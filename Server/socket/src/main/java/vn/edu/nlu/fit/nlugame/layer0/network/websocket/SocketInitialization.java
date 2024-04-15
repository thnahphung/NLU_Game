package vn.edu.nlu.fit.nlugame.layer0.network.websocket;


import jakarta.servlet.ServletContextEvent;
import jakarta.servlet.ServletContextListener;
import jakarta.servlet.annotation.WebListener;

@WebListener
public class SocketInitialization implements ServletContextListener {

    @Override
    public void contextInitialized(ServletContextEvent servletContextEvent) {
        System.out.println("=================================================================");
        ServerEndpoint.init();
    }

    @Override
    public void contextDestroyed(ServletContextEvent servletContextEvent) {
        ServerEndpoint.destroy();
    }
}
