package com.ggdeal.service;

import com.ggdeal.dto.ReservationStatsDTO;
import com.ggdeal.model.ReservationStatus;
import com.ggdeal.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;


@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;

    @Autowired
    public ReservationService(ReservationRepository reservationRepository) {
        this.reservationRepository = reservationRepository;
    }

    public ReservationStatsDTO getReservationStats() {
        return ReservationStatsDTO.builder()
                .active(reservationRepository.countByStatus(ReservationStatus.COMPLETED))
                .total(reservationRepository.count())
                .build();
    }

}
