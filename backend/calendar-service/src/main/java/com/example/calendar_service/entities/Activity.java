package com.example.calendar_service.entities;


import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@AllArgsConstructor @Data @NoArgsConstructor @ToString @Builder @Getter @Setter
public class Activity {

    @Id
    private String id;
    private String name;
    private boolean expanded;
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "activity_id") // creates a foreign key in children table
    private List<ChildResource> children;


}
