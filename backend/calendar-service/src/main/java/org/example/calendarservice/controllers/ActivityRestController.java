package org.example.calendarservice.controllers;

import lombok.*;
import org.example.calendarservice.entities.Activity;
import org.example.calendarservice.repositories.ActivityRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ActivityRestController {

    @Autowired
    private ActivityRepo activityRepo;

    @PostMapping("/addActivity")
    private Activity addActivity(@RequestBody Activity activity){
        return activityRepo.save(activity);
    }


    @GetMapping("/allActivities")
    private List<Activity> getAllActivity(){
        return activityRepo.findAll();
    }
}
