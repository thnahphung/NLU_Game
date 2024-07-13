package vn.edu.nlu.fit.nlugame.layer0.scheduled;

import jakarta.servlet.ServletContextEvent;
import jakarta.servlet.ServletContextListener;
import jakarta.servlet.annotation.WebListener;
import org.quartz.*;
import org.quartz.impl.StdSchedulerFactory;
import vn.edu.nlu.fit.nlugame.layer0.scheduled.jobs.*;
@WebListener
public class CronInitialization implements ServletContextListener {
    private final Scheduler scheduler = StdSchedulerFactory.getDefaultScheduler();

    public CronInitialization() throws SchedulerException {
    }

    //    @SneakyThrows
    public void contextInitialized(ServletContextEvent servletContextEvent) {
        try {
            scheduler.clear();
            /* Adding new jobs here*/
            scheduler.scheduleJob(createJob(PingPongJob.class), createDefaultTrigger(PingPongJob.class, "0/10 * * * * ?"));
            scheduler.scheduleJob(createJob(GameStateJob.class), createDefaultTrigger(GameStateJob.class, "0/30 * * * * ?"));
            scheduler.scheduleJob(createJob(TaskJob.class), createDefaultTrigger(TaskJob.class, "0 0 0 * * ?")); // repeat every day
            scheduler.start();
        } catch (SchedulerException e) {
            throw new RuntimeException(e);
        }
    }

    //    @SneakyThrows
    public void contextDestroyed(ServletContextEvent servletContextEvent) {
        try {
            scheduler.shutdown();
            scheduler.clear();
        } catch (SchedulerException e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * @param c Class extend Job
     * @return JobDetail
     */
    private JobDetail createJob(Class c) {
        return JobBuilder.newJob(c)
                .withIdentity(c.getName())
                .build();
    }

    /**
     * @param c        Class extend Job
     * @param schedule format like that "* * * ? * * *"
     *                 for more information : http://www.quartz-scheduler.org/documentation/quartz-2.3.0/cookbook/WeeklyTrigger.html
     * @return Trigger
     */
    private Trigger createDefaultTrigger(Class c, String schedule) {
        return TriggerBuilder.newTrigger()
                .withIdentity(c.getName())
                .startNow()
                .withSchedule(CronScheduleBuilder.cronSchedule(schedule))
                .build();
    }
}
