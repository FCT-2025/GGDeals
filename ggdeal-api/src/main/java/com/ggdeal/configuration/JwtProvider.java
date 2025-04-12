package com.ggdeal.configuration;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.ggdeal.model.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.security.interfaces.RSAKey;
import java.time.Instant;
import java.util.Date;

@Component

public class JwtProvider {

    @Value("jwt.secretkey")
    private String secretKey;

    @Value("jwt.expirationtime")
    private String expirationtime;

    public String generateToken(User user) {
        Date now = new Date();
        long expirationInMillis = now.getTime() + (getExpirationtime() * 2 * 60 * 60 * 1000);
        Date expirationDate = new Date(expirationInMillis);

        return JWT.create()
                .withClaim("id", user.getId())
                .withClaim("email", user.getEmail())
                .withClaim("username", user.getUsername())
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
                    .username(decodedJWT.getClaims().get("email").asString())
                    .email(decodedJWT.getClaims().get("username").asString())
                    .build();

        } catch (JWTVerificationException exception) {
            return null;
        }

    }

    public int getExpirationtime() {
        return Integer.parseInt(expirationtime);
    }
}
