package com.ggdeal.controller.api.auth;

import com.ggdeal.configuration.JwtProvider;
import com.ggdeal.dto.api.UserApiDTO;
import com.ggdeal.dto.admin.UserDTO;
import com.ggdeal.enums.Role;
import com.ggdeal.model.User;
import com.ggdeal.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Value("${app.media-url}")
    private String mediaUrlBase;

    @PostMapping("/login")
    @ResponseBody
    public ResponseEntity<?> login(@RequestBody User loginRequest, HttpServletResponse response) {
        User userByEmail = userRepository.findByEmail(loginRequest.getEmail()).orElse(null);
        User userByUsername = userRepository.findByUsername(loginRequest.getUsername()).orElse(null);
        User user = null;
        if(userByEmail != null) {
            user = userByEmail;
        }

        if(userByUsername != null) {
            user = userByUsername;
        }

        if(user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Username o Passsword incorrectos"));
        }

        boolean passWordMatches = passwordEncoder.matches(loginRequest.getPassword(),user.getPassword());

        if(!passWordMatches) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Username o Passsword incorrectos"));
        }
        jwtProvider.setTokenCookie(response, user.getId());

        return ResponseEntity.ok(Map.of("succes", "User authorized"));
    }

    @PostMapping("/logout")
    @ResponseBody
    public ResponseEntity<?> logout(HttpServletResponse response) {
        jwtProvider.deleteTokenCookie(response);
        return ResponseEntity.ok(Map.of("succes", "Has podido cerrar sesion"));
    }



    @PostMapping("/register")
    @ResponseBody
    public ResponseEntity<?> register(@Valid @RequestBody User user, HttpServletResponse response) {

        if (userRepository.existsByUsername(user.getUsername())) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(Map.of("error", "El nombre de usuario ya está registrado."));
        }

        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(Map.of("error", "El correo electrónico ya está registrado."));
        }

        if(user.getNumberPhone() != null && user.getNumberPhone().isBlank()) {
            user.setNumberPhone(null);
        }

        if(user.getNumberPhone() != null && !user.getNumberPhone().matches("^[0-9]{9}$")) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "El número de teléfono debe tener exactamente 9 dígitos"));
        }

        String hashedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);
        user.setRole(Role.USER);

        User createdUser = userRepository.save(user);

        jwtProvider.setTokenCookie(response, createdUser.getId());

        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    @GetMapping("/token")
    @ResponseBody
    public ResponseEntity<?> getToken(HttpServletRequest request) {
        String token = jwtProvider.getTokenFromCookie(request);

        if(token == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "No autorizado"));
        }

        UserDTO userSearched = jwtProvider.validateToken(token);

        if(userSearched == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "No autorizado"));
        }

        UserApiDTO user = new UserApiDTO(userSearched, mediaUrlBase);

        return ResponseEntity.ok(user);
    }



}
