package com.happypet.happypet.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.happypet.happypet.dao.UserRepository;
import com.happypet.happypet.domain.User;

@Service
public class UserService {
	@Autowired
	private UserRepository userRepository;

	// CREATE User
	public Optional<User> createUser(User user) throws Exception {
		Optional<User> u = userRepository.findUserByEmail(user.getEmail());
		if (u.isPresent())
			throw new Exception("User already exists");
		return Optional.of(userRepository.save(user));
	}
	
	// READ User by id
	public Optional<User> readUserById(String userId) {
		return userRepository.findById(userId);
	}
	
	// READ User by email
	public Optional<User> readUserByEmail(String userEmail) {
		return userRepository.findUserByEmail(userEmail);
	}
	
	// READ all users
	public List<User> readAllUsers() throws Exception {
		List<User> ul = userRepository.findAll();
		if (ul.isEmpty())
			throw new Exception("No users found");
		return ul;
	}

	// UPDATE User
	public void saveUser(User user) throws Exception {
		Optional<User> u = userRepository.findById(user.getId());
		if (!u.isPresent())
			throw new Exception("User was not found");
		userRepository.save(user);
	}

	// DELETE User
	public void deleteUser(User user) throws Exception {
		Optional<User> u = userRepository.findById(user.getId());
		if (!u.isPresent())
			throw new Exception("User was not found");
		userRepository.delete(user);
	}
}
