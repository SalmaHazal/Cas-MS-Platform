package com.example.calendar_service.web;



import com.example.calendar_service.entities.Calendar;
import com.example.calendar_service.repizotories.CalendarRepo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.awt.print.Book;
import java.util.List;

@RestController
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@CrossOrigin(origins = "http://localhost:4200")
public class CalendarRestController {

    @Autowired
    private CalendarRepo calendarRepo;

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
