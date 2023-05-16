package com.happypet.happypet.rest.controller;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.happypet.happypet.domain.Customer;
import com.happypet.happypet.domain.Pet;
import com.happypet.happypet.services.CustomerService;
import com.happypet.happypet.services.PetService;

@RestController
@RequestMapping(value = "customers", produces = MediaType.APPLICATION_JSON_VALUE)
public class CustomerController {
	private static final Logger logger = LoggerFactory.getLogger(CustomerController.class);

	@Autowired
	private ObjectMapper mapper;

	@Autowired
	private CustomerService customerService;

	@Autowired
	private PetService petService;

	// CREATE Customer
	@PostMapping("/new")
	public ResponseEntity<String> createCustomer(@RequestBody Customer customer) {
		try {
			Optional<Customer> savedCustomer = customerService.createCustomer(customer);
			if (savedCustomer.isPresent())
				return new ResponseEntity<>("Customer was created successfully",
						HttpStatus.CREATED);
		} catch (Exception e) {
			logger.info("ERROR [{}] - {}", e.getClass().getSimpleName(), e.getMessage());
			e.printStackTrace();
		}
		return new ResponseEntity<>("Error occurred while creating customer",
				HttpStatus.INTERNAL_SERVER_ERROR);
	}

	// CREATE Customers
	@PostMapping("/new/list")
	public ResponseEntity<String> createCustomers(@RequestBody List<Customer> customerList) {
		try {
			for (Customer customer : customerList)
				customerService.createCustomer(customer);
			return new ResponseEntity<>("List of customers created successfully", HttpStatus.CREATED);
		} catch (Exception e) {
			logger.info("ERROR [{}] - {}", e.getClass().getSimpleName(), e.getMessage());
			e.printStackTrace();
		}
		return new ResponseEntity<>("Error occurred while creating list of customer",
				HttpStatus.INTERNAL_SERVER_ERROR);
	}

	// READ Customer
	@GetMapping("/{id}")
	public ResponseEntity<String> readCustomer(@PathVariable String id) {
		try {
			Optional<Customer> customer = customerService.readCustomerById(id);
			if (customer.isPresent()) {
				ObjectNode customerNode = mapper.valueToTree(customer);
				List<Pet> petList = petService.findPetsByOwnerId(customer.get().getId());
				if (!petList.isEmpty()) {
					ArrayNode petListNode = mapper.valueToTree(petList);
					customerNode.set("petList", petListNode);
				}
				return new ResponseEntity<>(customerNode.toString(), HttpStatus.FOUND);
			}
		} catch (Exception e) {
			logger.info("ERROR [{}] - {}", e.getClass().getSimpleName(), e.getMessage());
			e.printStackTrace();
		}
		return new ResponseEntity<>("Requested customer was not found", HttpStatus.NOT_FOUND);
	}

	// READ all customers
	@GetMapping("/all")
	public ResponseEntity<String> readCustomers() {
		try {
			List<Customer> customerList = customerService.readAllCustomers();
			ArrayNode customerNodeList = mapper.createArrayNode();

			for (Customer customer : customerList) {
				ObjectNode customerNode = mapper.valueToTree(customer);
				List<Pet> petList = petService.findPetsByOwnerId(customer.getId());
				if (!petList.isEmpty()) {
					ArrayNode petListNode = mapper.valueToTree(petList);
					customerNode.set("petList", petListNode);
				}
				customerNodeList.add(customerNode);
			}
			JsonNode response = mapper.createObjectNode().set("customerList", customerNodeList);
			return new ResponseEntity<>(response.toString(), HttpStatus.OK);
		} catch (Exception e) {
			logger.info("ERROR [{}] - {}", e.getClass().getSimpleName(), e.getMessage());
			e.printStackTrace();
		}
		return new ResponseEntity<>("No users were found", HttpStatus.NOT_FOUND);
	}

	// UPDATE Customer
	@PutMapping
	public ResponseEntity<String> updateCustomer(@RequestBody Customer customer) {
		try {
			customerService.updateCustomer(customer);
			return new ResponseEntity<>("Customer was updated successfully", HttpStatus.OK);
		} catch (Exception e) {
			logger.info("ERROR [{}] - {}", e.getClass().getSimpleName(), e.getMessage());
			e.printStackTrace();
		}
		return new ResponseEntity<>("Requested customer to update was not found", HttpStatus.NOT_FOUND);
	}

	// DELETE Customer
	@DeleteMapping("/{customerId}")
	public ResponseEntity<String> deleteCustomer(@PathVariable String customerId) {
		try {
			customerService.deleteCustomer(customerId);
			return new ResponseEntity<>("Customer was deleted successfully", HttpStatus.OK);
		} catch (Exception e) {
			logger.info("ERROR [{}] - {}", e.getClass().getSimpleName(), e.getMessage());
			e.printStackTrace();
		}
		return new ResponseEntity<>("Requested customer to delete was not found", HttpStatus.NOT_FOUND);
	}
}
