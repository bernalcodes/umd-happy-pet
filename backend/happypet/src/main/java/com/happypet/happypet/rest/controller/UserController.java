package com.happypet.happypet.rest.controller;

import java.util.List;
import java.util.Optional;

import org.apache.tomcat.util.codec.binary.Base64;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.happypet.happypet.domain.Customer;
import com.happypet.happypet.domain.User;
import com.happypet.happypet.domain.Veterinary;
import com.happypet.happypet.services.CustomerService;
import com.happypet.happypet.services.UserService;
import com.happypet.happypet.services.VeterinaryService;

@RestController
@RequestMapping(value = "users", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserController {
	private static final Logger logger = LoggerFactory.getLogger(UserController.class);

	@Autowired
	private UserService userService;

	@Autowired
	private CustomerService customerService;

	@Autowired
	private VeterinaryService veterinaryService;

	@Autowired
	private ObjectMapper mapper;

	// CREATE User
	@PostMapping("/new")
	public ResponseEntity<String> createUser(@RequestBody ObjectNode jsonDetails) {
		try {
			User user = mapper.treeToValue(jsonDetails.get("userDetails"), User.class);
			user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
			user.setProfile_pic(Base64.decodeBase64(jsonDetails.get("userDetails").get("profile_pic").asText()));
			Optional<User> newUser = userService.createUser(user);

			if (newUser.isPresent()) {
				String userRole = jsonDetails.get("userDetails").get("role").asText();
				if (jsonDetails.get("personDetails") != null && userRole != null) {
					switch (userRole) {
						case "CUSTOMER":
							Customer newCustomer = mapper.treeToValue(jsonDetails.get("personDetails"), Customer.class);
							newCustomer.setUser_id(newUser.get().getId());
							customerService.createCustomer(newCustomer);
							logger.info("A user of type [CUSTOMER] was created");
							break;

						case "VETERINARY":
							Veterinary newVet = mapper.treeToValue(jsonDetails.get("personDetails"), Veterinary.class);
							newVet.setUser_id(newUser.get().getId());
							veterinaryService.createVet(newVet);
							logger.info("A user of type [VETERINARY] was created");
							break;
						default:
							logger.info("No type was specified for this user");
							break;
					}
				}
				return new ResponseEntity<>("User was created successfully", HttpStatus.CREATED);
			}
		} catch (Exception e) {
			logger.info("ERROR [{}] - {}", e.getClass().getSimpleName(), e.getMessage());
			e.printStackTrace();
		}
		return new ResponseEntity<>("There was an error creating the user", HttpStatus.INTERNAL_SERVER_ERROR);
	}

	// READ User
	@GetMapping("/{userId}")
	public ResponseEntity<String> readUser(@PathVariable String userId) {
		try {
			Optional<User> u = userService.readUserById(userId);
			if (u.isPresent()) {
				ObjectNode response = mapper.createObjectNode();
				ObjectNode userDetails = mapper.valueToTree(u);
				String b64pic_tostr = Base64.encodeBase64String(u.get().getProfile_pic());
				userDetails.put("profile_pic", b64pic_tostr);
				response.set("userDetails", userDetails);

				switch (u.get().getRole()) {
					case "CUSTOMER":
						Optional<Customer> c = customerService.readCustomerByUserId(u.get().getId());
						if (c.isPresent()) {
							ObjectNode cNode = mapper.valueToTree(c);
							response.set("personDetails", cNode);
						}
						break;
					case "VETERINARY":
						Optional<Veterinary> v = veterinaryService.readVetByUserId(u.get().getId());
						if (v.isPresent()) {
							ObjectNode cNode = mapper.valueToTree(v);
							response.set("personDetails", cNode);
						}
						break;
					default:
						logger.info("User does not have a role assigned");
						break;
				}
				return new ResponseEntity<>(response.toString(), HttpStatus.OK);
			}
		} catch (Exception e) {
			logger.info("ERROR [{}] - {}", e.getClass().getSimpleName(), e.getMessage());
			e.printStackTrace();
		}
		return new ResponseEntity<>("Requested user was not found", HttpStatus.NOT_FOUND);
	}

	// READ all users
	@GetMapping("/all")
	public ResponseEntity<String> readUsers() {
		try {
			List<User> ul = userService.readAllUsers();
			ArrayNode ulNode = mapper.createArrayNode();
			for (User u : ul) {
				logger.info("Reading ID: {}", u.getId());
				ObjectNode uNode = mapper.createObjectNode();
				ObjectNode userDetails = mapper.valueToTree(u);
				String b64pic_tostr = Base64.encodeBase64String(u.getProfile_pic());
				userDetails.put("profile_pic", b64pic_tostr);
				uNode.set("userDetails", userDetails);
				switch (u.getRole()) {
					case "CUSTOMER":
						try {
							Optional<Customer> c = customerService.readCustomerByUserId(u.getId());
							if (c.isPresent()) {
								ObjectNode personDetails = mapper.valueToTree(c);
								uNode.set("personDetails", personDetails);
							}
						} catch (Exception e) {
							logger.info(e.getMessage());
							uNode.set("personDetails", mapper.createObjectNode());
						}
						break;
					case "VETERINARY":
						try {
							Optional<Veterinary> v = veterinaryService.readVetByUserId(u.getId());
							if (v.isPresent()) {
								ObjectNode personDetails = mapper.valueToTree(v);
								uNode.set("personDetails", personDetails);
							}
						} catch (Exception e) {
							logger.info(e.getMessage());
							uNode.set("personDetails", mapper.createObjectNode());
						}
						break;
					default:
						logger.info("User does not have a role assigned");
						uNode.set("personDetails", mapper.createObjectNode());
						break;
				}
				ulNode.add(uNode);
			}
			return new ResponseEntity<>(ulNode.toString(), HttpStatus.OK);
		} catch (Exception e) {
			logger.info("ERROR [{}] - {}", e.getClass().getSimpleName(), e.getMessage());
			e.printStackTrace();
		}
		return new ResponseEntity<>("No users found", HttpStatus.NOT_FOUND);
	}

	// UPDATE User
	@PutMapping
	public ResponseEntity<String> updateUser(@RequestBody User user) {
		try {
			Optional<User> u = userService.readUserById(user.getId());
			if (u.isPresent()) {
				userService.saveUser(user);
				return new ResponseEntity<>("User was updated successfully", HttpStatus.OK);
			}
		} catch (Exception e) {
			logger.info("ERROR [{}] - {}", e.getClass().getSimpleName(), e.getMessage());
			e.printStackTrace();
		}
		return new ResponseEntity<>("Requested user to update was not found", HttpStatus.NOT_FOUND);
	}

	// DELETE User
	@DeleteMapping("/{userId}")
	public ResponseEntity<String> deleteUser(@PathVariable String userId) {
		try {
			Optional<User> u = userService.readUserById(userId);
			if (u.isPresent()) {
				userService.deleteUser(u.get());
				return new ResponseEntity<>("User was deleted successfully", HttpStatus.OK);
			}
		} catch (Exception e) {
			logger.info("ERROR [{}] - {}", e.getClass().getSimpleName(), e.getMessage());
			e.printStackTrace();
		}
		return new ResponseEntity<String>("Requested user to delete was not found", HttpStatus.NOT_FOUND);
	}
}
