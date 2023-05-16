package com.happypet.happypet.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.happypet.happypet.domain.Customer;

public interface CustomerRepository extends JpaRepository<Customer, String> {
	@Query("SELECT c FROM Customer c WHERE c.id = ?1")
	Optional<Customer> findCustomerById(String id);

	@Query("SELECT c FROM Customer c WHERE c.email = ?1")
	Optional<Customer> findCustomerByEmail(String email);

	@Query("SELECT c FROM Customer c WHERE c.user_id = ?1")
	Optional<Customer> findCustomerByUserId(String user_id);
}
