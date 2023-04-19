package com.happypet.happypet.system;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.happypet.happypet.user.User;
import com.happypet.happypet.user.UserRepository;

@Service
public class UserDetailServiceImpl implements UserDetailsService {
	@Autowired
	UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository
				.findOneByEmail(username)
				.orElseThrow(() -> new UsernameNotFoundException(
						String.format("The user with email %s does not exist", username)));

		return new UserDetailsImpl(user);

	}
}
