package com.ggdeal.repository;

import com.ggdeal.model.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

     User findByEmail(String email);
     User findByUsername(String username);
     boolean existsByEmail(String email);
     boolean existsByUsername(String username);

}
