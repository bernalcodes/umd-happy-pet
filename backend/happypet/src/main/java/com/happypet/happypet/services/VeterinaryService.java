package com.happypet.happypet.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.happypet.happypet.dao.VeterinaryRepository;
import com.happypet.happypet.domain.Veterinary;

@Service
public class VeterinaryService {
	@Autowired
	private VeterinaryRepository veterinaryRepository;

	// CREATE Veterinary
	public Optional<Veterinary> createVet(Veterinary vet) throws Exception {
		Optional<Veterinary> v = veterinaryRepository.findByEmail(vet.getEmail());
		if (v.isPresent())
			throw new Exception("Veterinary already exists");
		return Optional.of(veterinaryRepository.save(vet));
	}

	// READ Veterinary by ID
	public Optional<Veterinary> readVetById(String vet_id) throws Exception {
		Optional<Veterinary> v = veterinaryRepository.findVetById(vet_id);
		if (!v.isPresent())
			throw new Exception("Veterinary was not found");
		return v;
	}

	// READ Veterinary by email
	public Optional<Veterinary> readVetByEmail(String vet_email) throws Exception {
		Optional<Veterinary> v = veterinaryRepository.findByEmail(vet_email);
		if (!v.isPresent())
			throw new Exception("Veterinary was not found");
		return v;
	}

	// READ Veterinary by user ID
	public Optional<Veterinary> readVetByUserId(String user_id) throws Exception {
		Optional<Veterinary> v = veterinaryRepository.findByUserId(user_id);
		if (!v.isPresent())
			throw new Exception("Veterinary was not found");
		return v;
	}

	// READ all veterinaries
	public List<Veterinary> readAllVets() throws Exception {
		List<Veterinary> vl = veterinaryRepository.findAll();
		if (vl.isEmpty())
			throw new Exception("No veterinaries were found");
		return vl;
	}

	// UPDATE Veterinary
	public void updateVet(Veterinary vet) throws Exception {
		Optional<Veterinary> v = veterinaryRepository.findById(vet.getId());
		if (!v.isPresent())
			throw new Exception("Veterinary was not found");
		veterinaryRepository.save(vet);
	}

	// DELETE Veterinary
	public void deleteVet(String vet_id) throws Exception {
		Optional<Veterinary> v = veterinaryRepository.findById(vet_id);
		if (!v.isPresent())
			throw new Exception("Veterinary was not found");
		veterinaryRepository.deleteById(vet_id);
	}
}
