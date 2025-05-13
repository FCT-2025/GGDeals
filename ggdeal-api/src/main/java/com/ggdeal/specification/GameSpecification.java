package com.ggdeal.specification;

import com.ggdeal.model.Game;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.List;


public class GameSpecification {
    public static Specification<Game> filterBy(Long id, String title, String genre, Integer releasedLastDays,Boolean isPublished) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (id != null) {
                predicates.add(cb.equal(root.get("id"), id));
            }

            if (title != null && !title.isEmpty()) {
                predicates.add(cb.like(cb.lower(root.get("title")), "%" + title.toLowerCase() + "%"));
            }
            if (genre != null && !genre.isEmpty()) {
                predicates.add(cb.equal(root.get("genre"), genre));
            }

            if(releasedLastDays != null && releasedLastDays > 0) {
                LocalDate daysAgo = LocalDate.now().minusDays(releasedLastDays);
                LocalDate today = LocalDate.now();

                predicates.add(cb.between(root.get("releaseDate"), daysAgo, today));
            }

            if (isPublished != null) {
                predicates.add(cb.isNotNull(root.get("isPublished")));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
