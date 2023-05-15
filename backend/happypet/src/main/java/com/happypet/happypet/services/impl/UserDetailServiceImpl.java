package com.happypet.happypet.services.impl;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.happypet.happypet.dao.UserRepository;
import com.happypet.happypet.domain.User;

@Service
public class UserDetailServiceImpl implements UserDetailsService {
	private final UserRepository userRepository;

	public UserDetailServiceImpl(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository
				.findUserByEmail(username)
				.orElseThrow(() -> new UsernameNotFoundException(
						String.format("The user with email %s does not exist", username)));
		return new UserDetailsImpl(user);
	}
}
