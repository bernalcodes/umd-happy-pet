package com.happypet.happypet.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.happypet.happypet.dao.PetRepository;
import com.happypet.happypet.domain.Pet;

@Service
public class PetService {
	@Autowired
	private PetRepository petRepository;

	// CREATE Pet
	public Optional<Pet> createPet(Pet pet) throws Exception {
		Optional<Pet> p = petRepository.findPetByOwnerIdAndName(pet.getOwner_id(), pet.getName());
		if (p.isPresent())
			throw new Exception("Pet already exists");
		return Optional.of(petRepository.save(pet));
	}

	// READ Pet by ID
	public Optional<Pet> readPetById(String petId) throws Exception {
		Optional<Pet> p = petRepository.findById(petId);
		if (!p.isPresent())
			throw new Exception("Pet was not found");
		return p;
	}

	// READ pets by Owner ID
	public List<Pet> findPetsByOwnerId(String owner_id) throws Exception {
		List<Pet> pl = petRepository.findOwnerPetList(owner_id);
		if (pl.isEmpty())
			throw new Exception("No pets were found");
		return pl;
	}

	// READ all pets
	public List<Pet> readAllPets() throws Exception {
		List<Pet> pl = petRepository.findAll();
		if (pl.isEmpty())
			throw new Exception("No pets were found");
		return pl;
	}

	// UPDATE Pet
	public void updatePet(Pet pet) throws Exception {
		Optional<Pet> p = petRepository.findById(pet.getId());
		if (!p.isPresent())
			throw new Exception("Pet was not found");
		petRepository.save(pet);
	}

	// DELETE Pet
	public void deletePet(String petId) throws Exception {
		Optional<Pet> p = petRepository.findById(petId);
		if (!p.isPresent())
			throw new Exception("Pet was not found");
		petRepository.deleteById(petId);
	}
}
