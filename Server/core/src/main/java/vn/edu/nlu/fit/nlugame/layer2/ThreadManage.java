package vn.edu.nlu.fit.nlugame.layer2;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

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

    public Future<?> executeFuture(Runnable r) {
        Future<?> future = executorService.submit(r);
        return future;
    }

}
