package com.happypet.happypet.rest.config;

import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.SecretKey;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;

public class TokenUtils {
	private static final Logger logger = LoggerFactory.getLogger(TokenUtils.class);
	private static final SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
	private static final String ACCESS_TOKEN_SECRET = Encoders.BASE64.encode(key.getEncoded());
	private static final Long ACCESS_TOKEN_VALIDITY_SECONDS = 2_592_000L;

	public static String createToken(String id, String email) {
		logger.info("Inside TokenUtils.createToken()");
		long expirationTime = ACCESS_TOKEN_VALIDITY_SECONDS * 1_000;
		Date expirationDate = new Date(System.currentTimeMillis() + expirationTime);

		Map<String, Object> extra = new HashMap<>();
		extra.put("id", id);

		return Jwts.builder()
				.setSubject(email)
				.setExpiration(expirationDate)
				.addClaims(extra)
				.signWith(Keys.hmacShaKeyFor(ACCESS_TOKEN_SECRET.getBytes()))
				.compact();
	}

	public static UsernamePasswordAuthenticationToken getAuthentication(String token) {
		logger.info("Inside TokenUtils.getAuthentication()");
		try {
			Claims claims = Jwts.parserBuilder()
					.setSigningKey(ACCESS_TOKEN_SECRET.getBytes())
					.build()
					.parseClaimsJws(token)
					.getBody();
			
			String email = claims.getSubject();
	
			return new UsernamePasswordAuthenticationToken(email, null, Collections.emptyList());
		} catch (JwtException e) {
			return null;
		}
	}
}
