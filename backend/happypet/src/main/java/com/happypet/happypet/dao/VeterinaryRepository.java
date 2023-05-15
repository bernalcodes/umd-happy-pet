package com.happypet.happypet.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.happypet.happypet.domain.Veterinary;

public interface VeterinaryRepository extends JpaRepository<Veterinary, String> {
    @Query("SELECT v FROM Veterinary v WHERE v.id = ?1")
    Optional<Veterinary> findVetById(String vet_id);

	@Query("SELECT v FROM Veterinary v WHERE v.email = ?1")
    Optional<Veterinary> findByEmail(String email);
}
