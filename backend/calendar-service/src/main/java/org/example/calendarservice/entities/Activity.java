package org.example.calendarservice.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@Getter @Setter
public class Activity {
    @Id
    private String id;
    private String name;
    private boolean expanded;
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "activity_id")
    private List<ChildResource> children;


}
