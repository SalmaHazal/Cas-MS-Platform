package org.example.calendarservice.repositories;

import org.example.calendarservice.entities.Calendar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CalendarRepo extends JpaRepository<Calendar,String> {

}
