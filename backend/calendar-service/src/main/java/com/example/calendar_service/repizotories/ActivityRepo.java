package com.example.calendar_service.repizotories;



import com.example.calendar_service.entities.Activity;
import com.example.calendar_service.entities.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActivityRepo extends JpaRepository<Activity,String> {

}
