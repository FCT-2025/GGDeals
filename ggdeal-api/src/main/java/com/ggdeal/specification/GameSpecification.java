package com.ggdeal.specification;

import com.ggdeal.model.Game;
import com.ggdeal.model.Genre;
import com.ggdeal.model.PlatformModel;
import com.ggdeal.model.Replica;
import com.ggdeal.model.Sale;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Subquery;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class GameSpecification {

    public static Specification<Game> filterBy(Long id, String title, List<Long> genreIds,
                                               Integer releasedLastDays, Boolean isPublished,
                                               List<Long> platformModelIds, Float minPrice,
                                               Float maxPrice, Boolean inStock) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            query.distinct(true);

            if (id != null) {
                predicates.add(cb.equal(root.get("id"), id));
            }

            if (title != null && !title.isEmpty()) {
                predicates.add(cb.like(cb.lower(root.get("title")), "%" + title.toLowerCase() + "%"));
            }

            // Filtro por géneros (múltiples IDs)
            if (genreIds != null && !genreIds.isEmpty()) {
                Join<Game, Genre> genreJoin = root.join("genre", JoinType.LEFT);
                predicates.add(genreJoin.get("id").in(genreIds));
            }

            if (releasedLastDays != null && releasedLastDays > 0) {
                LocalDate daysAgo = LocalDate.now().minusDays(releasedLastDays);
                LocalDate today = LocalDate.now();
                predicates.add(cb.between(root.get("releaseDate"), daysAgo, today));
            }

            if (isPublished != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("publishedDate"), LocalDate.now()));
            }

            // Filtro por modelos de plataforma (múltiples)
            if (platformModelIds != null && !platformModelIds.isEmpty()) {
                Join<Game, Replica> replicaJoin = root.join("replicas", JoinType.INNER);
                Join<Replica, PlatformModel> platformJoin = replicaJoin.join("platformModel", JoinType.INNER);
                predicates.add(platformJoin.get("id").in(platformModelIds));
            }

            // Filtro por precio mínimo
            if (minPrice != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("price"), minPrice));
            }

            // Filtro por precio máximo
            if (maxPrice != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("price"), maxPrice));
            }

            // Filtro por stock disponible
            if (Boolean.TRUE.equals(inStock)) {
                Join<Game, Replica> replicaJoin = root.join("replicas", JoinType.INNER);
                predicates.add(cb.isFalse(replicaJoin.get("isSold")));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }

    // Especificación adicional para ordenamiento por mejores ventas
    public static Specification<Game> withBestSellingSort() {
        return (root, query, cb) -> {
            // Subquery para contar las ventas por juego
            Subquery<Long> salesCountSubquery = query.subquery(Long.class);
            var salesRoot = salesCountSubquery.from(Game.class);
            Join<Game, Replica> replicaJoin = salesRoot.join("replicas", JoinType.LEFT);
            Join<Replica, Sale> saleJoin = replicaJoin.join("sale", JoinType.LEFT);

            salesCountSubquery.select(cb.count(saleJoin.get("id")))
                    .where(cb.equal(salesRoot.get("id"), root.get("id")));

            // Ordenar por el conteo de ventas
            query.orderBy(cb.desc(salesCountSubquery));

            return cb.conjunction(); // Retorna predicado verdadero
        };
    }
}