package vn.edu.nlu.fit.nlugame.layer2;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ThreadManage {
    private static final ThreadManage instance = new ThreadManage();

    private final ExecutorService executorService = Executors.newWorkStealingPool(80);

    private ThreadManage() {
    }

    public static ThreadManage me() {
        return instance;
    }

    public void execute(Runnable r) {
        executorService.execute(r);
    }


}
