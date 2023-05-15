package com.happypet.happypet.rest.config;

import java.io.IOException;
import java.util.Collections;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.happypet.happypet.services.impl.UserDetailsImpl;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private static final Logger logger = LoggerFactory.getLogger(JWTAuthenticationFilter.class);
    private final ObjectMapper mapper = new ObjectMapper();

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException {
        logger.info("Inside JWTAuthenticationFilter.attemptAuthentication()");
        AuthCredentials authCredentials = new AuthCredentials();

        try {
            authCredentials = mapper.readValue(request.getReader(), AuthCredentials.class);
        } catch (IOException e) {
			logger.info("ERROR: {} - > {}", e.getClass().getSimpleName(), e.getMessage());
			e.printStackTrace();
        }

        UsernamePasswordAuthenticationToken usernamePAT = new UsernamePasswordAuthenticationToken(
                authCredentials.getEmail(), authCredentials.getPassword(), Collections.emptyList());

        return getAuthenticationManager().authenticate(usernamePAT);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
                                            Authentication authResult) throws IOException, ServletException {
        logger.info("Inside JWTAuthenticationFilter.successfulAuthentication()");
        UserDetailsImpl userDetails = (UserDetailsImpl) authResult.getPrincipal();
        String token = TokenUtils.createToken(userDetails.getId(), userDetails.getUsername());

        response.addHeader("Authorization", "Bearer " + token);
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");

        ObjectNode userJSON = mapper.valueToTree(userDetails);
        userJSON.remove("password");
        userJSON.put("Authorization", "Bearer " + token);
        String responseBody = mapper.writeValueAsString(userJSON);

        response.getWriter().write(responseBody);
        response.getWriter().flush();

        super.successfulAuthentication(request, response, chain, authResult);
    }
}
