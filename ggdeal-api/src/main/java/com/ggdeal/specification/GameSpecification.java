package com.ggdeal.specification;

import com.ggdeal.model.Game;
import com.ggdeal.model.Replica;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.List;


public class GameSpecification {
    public static Specification<Game> filterBy(Long id, String title, String genre, Integer releasedLastDays, Boolean isPublished, Boolean inStock) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            query.distinct(true);

            if (id != null) {
                predicates.add(cb.equal(root.get("id"), id));
            }

            if (title != null && !title.isEmpty()) {
                predicates.add(cb.like(cb.lower(root.get("title")), "%" + title.toLowerCase() + "%"));
            }
            if (genre != null && !genre.isEmpty()) {
                predicates.add(cb.equal(root.get("genre"), genre));
            }

            if (releasedLastDays != null && releasedLastDays > 0) {
                LocalDate daysAgo = LocalDate.now().minusDays(releasedLastDays);
                LocalDate today = LocalDate.now();

                predicates.add(cb.between(root.get("releaseDate"), daysAgo, today));
            }

            if (isPublished != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("publishedDate"), LocalDate.now()));
            }

            if(Boolean.TRUE.equals(inStock)) {
                Join<Game, Replica> replicaJoin = root.join("replicas", JoinType.INNER);
                predicates.add(cb.isTrue(replicaJoin.get("isSold")));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
