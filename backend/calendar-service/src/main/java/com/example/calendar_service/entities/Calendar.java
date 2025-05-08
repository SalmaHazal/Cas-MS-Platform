package com.example.calendar_service.entities;



import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Setter
@Builder
@JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
public class Calendar {

    @Id
    private String id;

    private LocalDateTime start;

    @Column(name = "\"end\"")  // Use double quotes for databases that require it.
    private LocalDateTime end;


    private String resource;
    private String text;
    private String description;
    private String color;

}
