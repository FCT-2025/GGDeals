package com.ggdeal.repository;

import com.ggdeal.model.Reservation;
import com.ggdeal.enums.ReservationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    long countByStatus(ReservationStatus status);

}
