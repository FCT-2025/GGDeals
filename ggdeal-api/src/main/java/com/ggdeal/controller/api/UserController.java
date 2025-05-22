package com.ggdeal.controller.api;

import com.ggdeal.configuration.JwtProvider;
import com.ggdeal.model.Role;
import com.ggdeal.model.User;
import com.ggdeal.repository.UserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
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
    private UserRepository userRepository;

    @Autowired
    private JwtProvider jwtProvider;


    @Autowired
    private BCryptPasswordEncoder passwordEncoder;


    @GetMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest, HttpServletResponse response) {
        User user = userRepository.findByEmail(loginRequest.getEmail());
        if(user ==  null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Username or Passsword incorrect");
        }

        boolean passWordMatches = passwordEncoder.matches(loginRequest.getPassword(),user.getPassword());

        if(!passWordMatches) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("sername or Passsword incorrect");
        }
        jwtProvider.setTokenCookie(response, jwtProvider.generateToken(user));

        return ResponseEntity.ok("User authorized");
    }



    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody User user, HttpServletResponse response) {
        String hasshedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hasshedPassword);
        user.setRole(Role.USER);

        User createdUser = userRepository.save(user);

        jwtProvider.setTokenCookie(response, jwtProvider.generateToken(user));

        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    @GetMapping("/token")
    public User getToken(HttpServletRequest request) {
        String token = jwtProvider.getTokenFromCookie(request);
        User user = jwtProvider.validateToken(token);
        return user;
    }

}
