package org.example.calendarservice.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@AllArgsConstructor
@Data
@NoArgsConstructor
@ToString
@Builder
@Getter @Setter
public class ChildResource {
    @Id
    private String id;

    private String name;
    private int capacity;
}
