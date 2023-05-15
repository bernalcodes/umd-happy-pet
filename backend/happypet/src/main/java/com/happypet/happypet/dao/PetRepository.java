package com.happypet.happypet.dao;

import com.happypet.happypet.domain.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PetRepository extends JpaRepository<Pet, String> {
    @Query("SELECT p FROM Pet p WHERE p.id = ?1")
    Optional<Pet> findPetById(String id);

    @Query("SELECT p FROM Pet p WHERE p.owner_id = ?1 AND p.name = ?2")
    Optional<Pet> findPetByOwnerIdAndName(String user_id, String pet_name);

    @Query("SELECT p FROM Pet p WHERE p.owner_id = ?1")
    List<Pet> findOwnerPetList(String owner_id);
}
