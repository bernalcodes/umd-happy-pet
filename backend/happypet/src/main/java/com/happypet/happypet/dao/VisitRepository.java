package com.happypet.happypet.dao;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.happypet.happypet.domain.Visit;

public interface VisitRepository extends JpaRepository<Visit, String> {
	@Query("SELECT v FROM Visit v WHERE v.id = ?1")
	Optional<Visit> findVisitById(String id);

	@Query("SELECT v From Visit v WHERE v.pet_id = ?1")
	List<Visit> findVisitsByPetId(String petId);

	@Query("SELECT v FROM Visit v WHERE v.vet_id = ?1")
	List<Visit> findVisitsByVetId(String vetId);

	@Query("SELECT v FROM Visit v WHERE v.pet_id = ?1 AND v.vet_id = ?2 AND v.date = ?3")
	Optional<Visit> findByPetIdAndVetIdAndDate(String petId, String vetId, Date date);
}
