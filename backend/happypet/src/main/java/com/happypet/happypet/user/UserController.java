package com.happypet.happypet.user;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("users")
public class UserController {
	private UserRepository userRepository;

	@GetMapping
	public List<User> listUser() { return userRepository.findAll(); }
}
