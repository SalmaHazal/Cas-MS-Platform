package com.example.calendar_service.repizotories;


import com.example.calendar_service.entities.Calendar;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CalendarRepo extends JpaRepository<Calendar,String> {


}
