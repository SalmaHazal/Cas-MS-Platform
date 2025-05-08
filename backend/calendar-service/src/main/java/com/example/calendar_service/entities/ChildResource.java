package com.example.calendar_service.entities;


import jakarta.persistence.*;
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
