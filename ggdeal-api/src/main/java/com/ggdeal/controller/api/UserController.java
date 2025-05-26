package com.ggdeal.controller.api;

import com.ggdeal.configuration.JwtProvider;
import com.ggdeal.dto.UserDTO;
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

import java.util.Map;

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
        jwtProvider.setTokenCookie(response, user.getId());

        return ResponseEntity.ok("User authorized");
    }



    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody User user, HttpServletResponse response) {

        if (userRepository.existsByUsername(user.getUsername())) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(Map.of("username", "El nombre de usuario ya está registrado."));
        }

        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(Map.of("email", "El correo electrónico ya está registrado."));
        }


        String hashedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);
        user.setRole(Role.USER);

        User createdUser = userRepository.save(user);

        jwtProvider.setTokenCookie(response, createdUser.getId());

        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    @GetMapping("/token")
    public UserDTO getToken(HttpServletRequest request) {
        String token = jwtProvider.getTokenFromCookie(request);
        UserDTO user = jwtProvider.validateToken(token);
        return user;
    }

}
