package vn.edu.nlu.fit.nlugame.layer0.scheduled.jobs;

import org.quartz.DisallowConcurrentExecution;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import vn.edu.nlu.fit.nlugame.layer1.GameStateService;
@DisallowConcurrentExecution
public class GameStateJob implements Job {
    @Override
    public void execute(JobExecutionContext jobExecutionContext) throws JobExecutionException {
        try {
            GameStateService.me().updateTimeGame();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
