package vn.edu.nlu.fit.nlugame.layer2.google.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Builder
public class GoogleDTO {
    private String id;
    private String name;
    private String email;
    private String picture;
    private String given_name;
    private String family_name;
    private boolean gender;
    private boolean verified_email;
}