package vn.edu.nlu.fit.nlugame.layer2.dao.bean;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
@Getter
@ToString
public class ShopItemBean {
    private int id;
    private int noGrowthItemId;
    private int type;
    private int status;
}
