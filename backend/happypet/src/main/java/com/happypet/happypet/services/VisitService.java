package com.happypet.happypet.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.happypet.happypet.dao.VisitRepository;
import com.happypet.happypet.domain.Visit;

@Service
public class VisitService {
	@Autowired
	private VisitRepository visitRepository;

	public List<Visit> readAllVisits() {
		return visitRepository.findAll();
	}

	public Optional<Visit> readVisitById(String id) throws Exception {
		Optional<Visit> v = visitRepository.findById(id);
		if (!v.isPresent())
			throw new Exception("No visit found with provided ID");
		return v;
	}

	public List<Visit> readVisitsByPetId(String petId) throws Exception {
		List<Visit> vl = visitRepository.findVisitsByPetId(petId);
		if (vl.isEmpty())
			throw new Exception("No visits found for provided pet ID");
		return vl;
	}
}
