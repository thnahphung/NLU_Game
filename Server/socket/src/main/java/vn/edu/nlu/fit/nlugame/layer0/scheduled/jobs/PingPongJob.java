package vn.edu.nlu.fit.nlugame.layer0.scheduled.jobs;

import org.quartz.DisallowConcurrentExecution;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import vn.edu.nlu.fit.nlugame.layer1.PingPongService;

@DisallowConcurrentExecution
public class PingPongJob implements Job {

    @Override
    public void execute(JobExecutionContext jobExecutionContext) throws JobExecutionException {
        try {
            PingPongService.me().pingPong();
        }catch (Exception e){
            e.printStackTrace();
        }
    }
}
