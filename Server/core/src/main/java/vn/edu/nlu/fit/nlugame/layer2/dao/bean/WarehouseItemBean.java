package vn.edu.nlu.fit.nlugame.layer2.dao.bean;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
@Getter
@ToString
public class WarehouseItemBean {
    int userId;
    int noGrowthItemId;
    int quantity;
}
