package com.ggdeal.configuration;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.ggdeal.model.Role;
import com.ggdeal.model.User;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.security.interfaces.RSAKey;
import java.time.Instant;
import java.util.Date;

@Component

public class JwtProvider {

    @Value("${jwt.secretkey}")
    private String secretKey;

    @Value("${jwt.expirationtime}")
    private String expirationtime;

    public String generateToken(User user) {
        Date now = new Date();
        long expirationInMillis = now.getTime() + this.getExpirationtimeInMillis();
        Date expirationDate = new Date(expirationInMillis);

        return JWT.create()
                .withClaim("id", user.getId())
                .withClaim("email", user.getEmail())
                .withClaim("username", user.getUsername())
                .withClaim("role", user.getRole().toString())
                .withClaim("numberPhone", user.getNumberPhone())
                .withClaim("avatarPath", user.getAvatarPath())
                .withExpiresAt(expirationDate)
                .sign(Algorithm.HMAC384(secretKey));
    }

    public User validateToken(String token) {
        DecodedJWT decodedJWT;
        try {
            JWTVerifier verifier = JWT.require(Algorithm.HMAC384(secretKey)).build();
            decodedJWT = verifier.verify(token);

            return User.builder()
                    .id(decodedJWT.getClaims().get("id").asLong())
                    .email(decodedJWT.getClaim("email").asString())
                    .username(decodedJWT.getClaim("username").asString())
                    .role(Role.valueOf(decodedJWT.getClaims().get("role").asString()))
                    .numberPhone(decodedJWT.getClaim("numberPhone").asString())
                    .avatarPath(decodedJWT.getClaim("avatarPath").asString())
                    .build();

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
