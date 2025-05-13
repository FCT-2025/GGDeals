package com.ggdeal.configuration;

import com.ggdeal.model.Role;
import com.ggdeal.model.User;
import jakarta.servlet.*;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;


import java.io.IOException;

@WebFilter(filterName = "JWTFilter" , urlPatterns = "/api/ggdeal/*")
public class JwtAuthenticationFilter implements Filter
{
    @Autowired
    private JwtProvider jwtProvider;

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        Filter.super.init(filterConfig);
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
            throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) servletRequest;
        HttpServletResponse httpResponse = (HttpServletResponse) servletResponse;

        if ("POST".equalsIgnoreCase(httpRequest.getMethod())) {
            String token = httpRequest.getHeader("tklogin");


            if (token == null || token.isEmpty()) {
                httpResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                httpResponse.getWriter().write("Missing or invalid token.");
                return;
            }

            User user = jwtProvider.validateToken(token);
            if (user == null) {
                httpResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                httpResponse.getWriter().write("Invalid token.");
                return;
            }

            if (user.getRole() != Role.ADMIN) {
                httpResponse.setStatus(HttpServletResponse.SC_FORBIDDEN);
                httpResponse.getWriter().write("Forbidden: You do not have permission to access this resource.");
                return;
            }
        }

        filterChain.doFilter(servletRequest, servletResponse);
    }

    @Override
    public void destroy() {
        Filter.super.destroy();
    }
}
