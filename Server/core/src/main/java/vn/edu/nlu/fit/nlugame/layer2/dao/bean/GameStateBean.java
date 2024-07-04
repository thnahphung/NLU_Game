package vn.edu.nlu.fit.nlugame.layer2.dao.bean;

import lombok.*;
import org.jdbi.v3.core.mapper.reflect.ColumnName;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
@Getter
@ToString
public class GameStateBean {
    @ColumnName("id")
    private int id;
    @ColumnName("current_date")
    private int currentDate;
    @ColumnName("times_of_day")
    private int timesOfDay;
    @ColumnName("current_weather")
    private int currentWeather;
    @ColumnName("current_season")
    private int currentSeason;
    @ColumnName("times_of_season")
    private int timesOfSeason;
}
