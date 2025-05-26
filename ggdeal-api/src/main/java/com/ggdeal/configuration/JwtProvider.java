package com.ggdeal.configuration;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.ggdeal.dto.UserDTO;
import com.ggdeal.model.Role;
import com.ggdeal.model.User;
import com.ggdeal.repository.UserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.security.interfaces.RSAKey;
import java.time.Instant;
import java.util.Date;
import java.util.Optional;

@Component

public class JwtProvider {

    @Value("${jwt.secretkey}")
    private String secretKey;

    @Value("${jwt.expirationtime}")
    private String expirationtime;

    @Autowired
    private UserRepository userRepository;

    public String generateToken(Long id) {
        Date now = new Date();
        long expirationInMillis = now.getTime() + this.getExpirationtimeInMillis();
        Date expirationDate = new Date(expirationInMillis);

        return JWT.create()
                .withClaim("id", id)
                .withExpiresAt(expirationDate)
                .sign(Algorithm.HMAC384(secretKey));
    }

    public UserDTO validateToken(String token) {
        DecodedJWT decodedJWT;
        try {
            JWTVerifier verifier = JWT.require(Algorithm.HMAC384(secretKey)).build();
            decodedJWT = verifier.verify(token);
            Optional<User> userSearched = userRepository.findById(decodedJWT.getClaims().get("id").asLong());
            if(userSearched.isPresent()) {
                User user = userSearched.get();
                return UserDTO.builder()
                        .id(user.getId())
                        .email(user.getEmail())
                        .created_at(user.getCreatedAt())
                        .isVerified(user.getIsVerified())
                        .avatarPath(user.getAvatarPath())
                        .numberPhone(user.getNumberPhone())
                        .username(user.getUsername())
                        .role(user.getRole())
                        .build();
            }
            return null;

        } catch (JWTVerificationException exception) {
            return null;
        }

    }

    public long getExpirationtimeInMillis() {
        if(expirationtime == null || expirationtime.isEmpty()) {
            return (3600L * 1000L);
        }
        return Long.parseLong(expirationtime) * 1000L * 60L;
    }

    public int getExpirationtimeInSeconds() {
        if(expirationtime == null || expirationtime.isEmpty()) {
            return 3600;
        }
        return Integer.parseInt(expirationtime) * 60;
    }

    public void setTokenCookie(HttpServletResponse response, String token) {
        Cookie cookie = new Cookie("tklogin", token);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(this.getExpirationtimeInSeconds());
        response.addCookie(cookie);
    }

    public void setTokenCookie(HttpServletResponse response, Long id) {
        String token = this.generateToken(id);
        Cookie cookie = new Cookie("tklogin", token);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(this.getExpirationtimeInSeconds());
        response.addCookie(cookie);
    }

    public String getTokenFromCookie(HttpServletRequest request) {
        if (request.getCookies() == null) return null;

        for (Cookie cookie : request.getCookies()) {
            if ("tklogin".equals(cookie.getName())) {
                return cookie.getValue();
            }
        }
        return null;
    }

    public void deleteTokenCookie(HttpServletResponse response) {
        Cookie cookie = new Cookie("tklogin", "");
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
    }
}
