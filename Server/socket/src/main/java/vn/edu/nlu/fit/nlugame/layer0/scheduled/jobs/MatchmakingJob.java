package vn.edu.nlu.fit.nlugame.layer0.scheduled.jobs;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import vn.edu.nlu.fit.nlugame.layer1.SupportingService;

public class MatchmakingJob implements Job {

    @Override
    public void execute(JobExecutionContext jobExecutionContext) throws JobExecutionException {
        SupportingService.me().startMatchmaking();
    }
}
