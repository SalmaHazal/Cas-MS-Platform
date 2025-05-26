package org.example.calendarservice.controllers;

import lombok.*;
import org.example.calendarservice.entities.Calendar;
import org.example.calendarservice.repositories.CalendarRepo;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class CalendarRestController {

    private final CalendarRepo calendarRepo;

    @PostMapping("/events")
    public Calendar createvent(@RequestBody Calendar event) {

        return calendarRepo.save(event);
    }

    @PutMapping("/events/{id}")
    public ResponseEntity<Calendar> updateEvent(@PathVariable String id, @RequestBody Calendar updatedEvent) {
        return calendarRepo.findById(id)
                .map(event -> {
                    event.setText(updatedEvent.getText());
                    event.setDescription(updatedEvent.getDescription());
                    event.setColor(updatedEvent.getColor());
                    // Add any other fields you want to update

                    Calendar savedEvent = calendarRepo.save(event);
                    return ResponseEntity.ok(savedEvent);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/events/{id}")
    public ResponseEntity<?> deleteEvent(@PathVariable String id) {
        if (calendarRepo.existsById(id)) {
            calendarRepo.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build(); // 404 if not found
        }
    }


    @GetMapping("/events")
    public List<Calendar> getAllEvents() {
        return calendarRepo.findAll();
    }



}

