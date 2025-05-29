package com.ggdeal.controller.api.user;

import com.ggdeal.configuration.JwtProvider;
import com.ggdeal.dto.PasswordChangeDTO;
import com.ggdeal.dto.UserDTO;
import com.ggdeal.dto.UserProfileDTO;
import com.ggdeal.dto.WalletRequestDTO;
import com.ggdeal.model.User;
import com.ggdeal.repository.UserRepository;
import com.ggdeal.service.storage.StorageService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;
    private final StorageService storageService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public UserController(UserRepository userRepository, JwtProvider jwtProvider, StorageService storageService, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.jwtProvider = jwtProvider;
        this.storageService = storageService;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @PostMapping("/wallet")
    private ResponseEntity<?> addMoney(@RequestBody WalletRequestDTO walletRequestDTO, HttpServletRequest request) {

        if (walletRequestDTO.getAmount() == null || walletRequestDTO.getAmount() <= 0f) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "La cantidad no debe ser negtiva o igual a cero"));
        }

        String token = jwtProvider.getTokenFromCookie(request);
        if (token == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "No tienes permisos"));
        }

        UserDTO userDTO = jwtProvider.validateToken(token);

        if (userDTO == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "No tienes permisos"));
        }

        User user = userRepository.findById(userDTO.getId()).get();

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Usuario no encontrado"));
        }

        Float totalAmount = user.updateBalance(walletRequestDTO.getAmount());
        userRepository.save(user);

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(walletRequestDTO);
    }

    @GetMapping("/wallet")
    public ResponseEntity<?> getMoney(HttpServletRequest request) {
        String token = jwtProvider.getTokenFromCookie(request);
        if (token == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "No tienes permisos"));
        }

        UserDTO userDTO = jwtProvider.validateToken(token);

        if (userDTO == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "No tienes permisos"));
        }

        User user = userRepository.findById(userDTO.getId()).get();

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Usuario no encontrado"));
        }

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(WalletRequestDTO.builder().amount(user.getAmount()).build());
    }


    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@Valid @ModelAttribute("userProfileDTO") UserProfileDTO userProfileDTO, HttpServletRequest request, HttpServletResponse response) {
        String token = jwtProvider.getTokenFromCookie(request);
        if (token == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "No tienes permisos"));
        }

        UserDTO userDTO = jwtProvider.validateToken(token);

        if (userDTO == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "No tienes permisos"));
        }

        User user = userRepository.findById(userDTO.getId()).get();

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Usuario no encontrado"));
        }

        if (userProfileDTO.getNumberPhone() != null && !userProfileDTO.getNumberPhone().matches("^[0-9]{9}$")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "El numero de telefono no es valido"));
        }

        if (!userProfileDTO.getEmail().equals(user.getEmail()) && userRepository.existsByEmail(userProfileDTO.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "Ya existe una cuenta con ese email"));
        }

        if (!userProfileDTO.getUsername().equals(user.getUsername()) && userRepository.existsByUsername(userProfileDTO.getUsername())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "Ya existe una cuenta con ese nombre de usuario"));
        }

        String path = null;

        try {
            path = storageService.storeAvatar(userProfileDTO.getAvatarPath(), user.getAvatarPath());
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "Ha habido un error" + e.getMessage()));
        }

        if (path != null) {
            user.setAvatarPath(path);
        }

        user.setNumberPhone(userProfileDTO.getNumberPhone());
        user.setEmail(userProfileDTO.getEmail());
        user.setUsername(userProfileDTO.getUsername());
        userRepository.save(user);

        jwtProvider.setTokenCookie(response, user.getId());

        return ResponseEntity.status(HttpStatus.OK).body(Map.of("message", "Se ha acutalizado correctamente los datos del usuario"));
    }

    @PutMapping("/change-password")
    public ResponseEntity<?> updatePasswordProfile(@Valid @RequestBody PasswordChangeDTO passwordChangeDTO, HttpServletRequest request) {
        String token = jwtProvider.getTokenFromCookie(request);
        if (token == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "No tienes permisos"));
        }

        UserDTO userDTO = jwtProvider.validateToken(token);

        if (userDTO == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "No tienes permisos"));
        }

        User user = userRepository.findById(userDTO.getId()).get();

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Usuario no encontrado"));
        }

        if(!bCryptPasswordEncoder.matches(passwordChangeDTO.getPassword(),user.getPassword())){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Contraseña incorrecta"));
        }

        user.setPassword(bCryptPasswordEncoder.encode(passwordChangeDTO.getNewPassword()));

        userRepository.save(user);

        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("message", "Se ha acutalizado correctamente la contraseña"));
    }

}
