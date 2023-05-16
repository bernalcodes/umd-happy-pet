package com.happypet.happypet.services;

import com.happypet.happypet.dao.CustomerRepository;
import com.happypet.happypet.domain.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {
	@Autowired
	private CustomerRepository customerRepository;

	// CREATE Customer
	public Optional<Customer> createCustomer(Customer customer) throws Exception {
		Optional<Customer> c = customerRepository.findCustomerByEmail(customer.getEmail());
		if (c.isPresent())
			throw new Exception("Customer already exists");
		return Optional.of(customerRepository.save(customer));
	}

	// READ Customer by ID
	public Optional<Customer> readCustomerById(String customer_id) {
		Optional<Customer> c = customerRepository.findCustomerById(customer_id);
		if (!c.isPresent())
			throw new RuntimeException("Customer was not found");
		return c;
	}

	// READ Customer by email
	public Optional<Customer> readCustomerByEmail(String customer_email) {
		Optional<Customer> c = customerRepository.findCustomerByEmail(customer_email);
		if (!c.isPresent())
			throw new RuntimeException("Customer was not found");
		return c;
	}

	// READ Customer by user ID
	public Optional<Customer> readCustomerByUserId(String user_id) {
		Optional<Customer> c = customerRepository.findCustomerByUserId(user_id);
		if (!c.isPresent())
			throw new RuntimeException("Customer was not found");
		return c;
	}

	// READ all customers
	public List<Customer> readAllCustomers() throws Exception {
		List<Customer> cl = customerRepository.findAll();
		if (cl.isEmpty())
			throw new RuntimeException("No customers were found");
		return cl;
	}

	// UPDATE Customer
	public void updateCustomer(Customer customer) throws Exception {
		Optional<Customer> c = customerRepository.findById(customer.getId());
		if (!c.isPresent())
			throw new Exception("Customer was not found");
		customerRepository.save(customer);
	}

	// DELETE Customer
	public void deleteCustomer(String customer_id) throws Exception {
		Optional<Customer> c = customerRepository.findById(customer_id);
		if (!c.isPresent())
			throw new Exception("Customer was not found");
		customerRepository.deleteById(customer_id);
	}
}
