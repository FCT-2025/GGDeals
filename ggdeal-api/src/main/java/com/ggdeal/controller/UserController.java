package com.ggdeal.controller;

import com.ggdeal.configuration.JwtProvider;
import com.ggdeal.model.User;
import com.ggdeal.repository.UserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    @Autowired
    private UserRepository userService;

    @Autowired
    private JwtProvider jwtProvider;


    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    @GetMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest, HttpServletResponse response) {
        User user = userService.findByEmail(loginRequest.getEmail());
        if(user ==  null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Username or Passsword incorrect");
        }

        boolean passWordMatches = passwordEncoder().matches(loginRequest.getPassword(),user.getPassword());

        if(!passWordMatches) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("sername or Passsword incorrect");
        }


        Cookie cookie = new Cookie("tklogin", jwtProvider.generateToken(user));
        cookie.setMaxAge(jwtProvider.getExpirationtime());
        cookie.setSecure(true);
        cookie.setPath("/");

        response.addCookie(cookie);

        return ResponseEntity.ok("Usuario authorized");
    }



    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user, HttpServletResponse response) {
        String hasshedPassword = passwordEncoder().encode(user.getPassword());
        user.setPassword(hasshedPassword);
        User createdUser = userService.save(user);

        Cookie cookie = new Cookie("tklogin", jwtProvider.generateToken(user));
        cookie.setMaxAge(jwtProvider.getExpirationtime());
        cookie.setSecure(true);
        cookie.setPath("/");

        response.addCookie(cookie);

        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }
}
