package com.happypet.happypet.services;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
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

	// CREATE Visit
	public Optional<Visit> createVisit(Visit visit) throws Exception {
		Optional<Visit> v = visitRepository.findByPetIdAndVetIdAndDate(visit.getPet_id(), visit.getVet_id(),
				visit.getDate());
		if (v.isPresent())
			throw new Exception("Visit already exists");
		return Optional.of(visitRepository.save(visit));
	}

	// READ Visit by ID
	public Optional<Visit> readVisitById(String id) throws Exception {
		Optional<Visit> v = visitRepository.findById(id);
		if (!v.isPresent())
			throw new Exception("Visit was not found");
		return v;
	}

	// READ Visit by pet ID and vet ID and date
	public Optional<Visit> readVisitByPetIdAndVetIdAndDate(String petId, String vetId, String dateStr)
			throws Exception {
		DateFormat formatter = new SimpleDateFormat("dd-MMM-yy HH:mm:ss");
		Date date = formatter.parse(dateStr);
		Optional<Visit> v = visitRepository.findByPetIdAndVetIdAndDate(petId, vetId, date);
		if (v.isPresent())
			throw new Exception("Visit was not found");
		return v;
	}

	// READ Visits by pet ID
	public List<Visit> readVisitsByPetId(String petId) throws Exception {
		List<Visit> vl = visitRepository.findVisitsByPetId(petId);
		if (vl.isEmpty())
			throw new Exception("No visits were found");
		return vl;
	}

	// READ all visits
	public List<Visit> readAllVisits() throws Exception {
		List<Visit> vl = visitRepository.findAll();
		if (vl.isEmpty())
			throw new Exception("No visits were found");
		return vl;
	}

	// UPDATE Visit
	public void updateVisit(Visit visit) {
		Optional<Visit> v = visitRepository.findById(visit.getId());
		if (!v.isPresent())
			throw new RuntimeException("Visit was not found");
		visitRepository.save(visit);
	}

	// DELETE Visit
	public void deleteVisit(String visit_id) throws Exception {
		Optional<Visit> v = visitRepository.findById(visit_id);
		if (!v.isPresent())
			throw new RuntimeException("Visit was not found");
		visitRepository.deleteById(visit_id);
	}
}
