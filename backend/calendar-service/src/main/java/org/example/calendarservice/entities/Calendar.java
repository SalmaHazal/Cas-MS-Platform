package org.example.calendarservice.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

import java.time.LocalDateTime;

@Entity
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
