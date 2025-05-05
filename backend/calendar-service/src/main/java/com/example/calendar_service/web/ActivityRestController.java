package com.example.calendar_service.web;



import com.example.calendar_service.entities.Activity;

import com.example.calendar_service.repizotories.ActivityRepo;
import lombok.*;
import lombok.experimental.PackagePrivate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Data @AllArgsConstructor @NoArgsConstructor @Getter @Setter @ToString
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
