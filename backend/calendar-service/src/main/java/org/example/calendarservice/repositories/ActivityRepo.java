package org.example.calendarservice.repositories;

import org.example.calendarservice.entities.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActivityRepo extends JpaRepository<Activity,String> {

}
