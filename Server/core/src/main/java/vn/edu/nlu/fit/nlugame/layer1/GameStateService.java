package vn.edu.nlu.fit.nlugame.layer1;

import vn.edu.nlu.fit.nlugame.layer2.dao.GameStateDAO;

public class GameStateService {
    private static final GameStateService install = new GameStateService();

    private GameStateService() {
    }

    public static GameStateService me() {
        return install;
    }

    public void gameState() {
        GameStateDAO.me().updateTimeGame();
    }

}
