package com.happypet.happypet.rest.controller;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
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
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.happypet.happypet.domain.Visit;
import com.happypet.happypet.services.VisitService;

@RestController
@RequestMapping(value = "visits", produces = MediaType.APPLICATION_JSON_VALUE)
public class VisitController {
	private static final Logger logger = LoggerFactory.getLogger(VisitController.class);

	@Autowired
	private ObjectMapper mapper;

	@Autowired
	private VisitService visitService;

	// CREATE Visit
	@PostMapping("/new")
	public ResponseEntity<String> createVisit(@RequestBody ObjectNode visit) {
		try {
			Visit newVisit = new Visit();
			newVisit.setPet_id(visit.get("pet_id").asText());
			String visitDate = visit.get("date").asText();
			String parsedVisitDate = visitDate.replace("T", " ");
			DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm");
			Date date = formatter.parse(parsedVisitDate);
			newVisit.setDate(date);
			Optional<Visit> createdVisit = visitService.createVisit(newVisit);
			if (createdVisit.isPresent())
				return new ResponseEntity<>("Visit created successfully", HttpStatus.CREATED);
		} catch (Exception e) {
			logger.info("ERROR [{}] - {}", e.getClass().getSimpleName(), e.getMessage());
			e.printStackTrace();
		}
		return new ResponseEntity<>("Error occurred while creating visit", HttpStatus.INTERNAL_SERVER_ERROR);
	}

	// CREATE Visits
	@PostMapping("/new/list")
	public ResponseEntity<String> createCustomers(@RequestBody List<Visit> visitList) {
		try {
			for (Visit visit : visitList)
				visitService.createVisit(visit);
			return new ResponseEntity<>("List of visits created successfully", HttpStatus.CREATED);
		} catch (Exception e) {
			logger.info("ERROR [{}] - {}", e.getClass().getSimpleName(), e.getMessage());
			e.printStackTrace();
		}
		return new ResponseEntity<>("Error occurred while creating list of pets",
				HttpStatus.INTERNAL_SERVER_ERROR);
	}

	// READ Visit
	@GetMapping("/{visitId}")
	public ResponseEntity<String> readVisit(@PathVariable String visitId) {
		try {
			Optional<Visit> visit = visitService.readVisitById(visitId);
			ObjectNode visitNode = mapper.valueToTree(visit);
			return new ResponseEntity<>(visitNode.toString(), HttpStatus.OK);
		} catch (Exception e) {
			logger.info("ERROR [{}] - {}", e.getClass().getSimpleName(), e.getMessage());
			e.printStackTrace();
		}
		return new ResponseEntity<>("No visit with provided ID was found", HttpStatus.NOT_FOUND);
	}

	// READ Visit by pet ID and vet ID and date
	@GetMapping("/args")
	public ResponseEntity<String> readVisitMultiParam(
			@RequestHeader(name = "petId", required = true) String petId,
			@RequestHeader(name = "vetId", required = true) String vetId,
			@RequestHeader(name = "date", required = true) String date) {
		try {
			Optional<Visit> v = visitService.readVisitByPetIdAndVetIdAndDate(petId, vetId, date);
			ObjectNode visitNode = mapper.valueToTree(v);
			return new ResponseEntity<>(visitNode.toString(), HttpStatus.OK);
		} catch (Exception e) {
			logger.info("ERROR [{}] - {}", e.getClass().getSimpleName(), e.getMessage());
			e.printStackTrace();
		}
		return new ResponseEntity<>("No visit with provided data was found", HttpStatus.NOT_FOUND);
	}

	// READ all visits
	@GetMapping("/all")
	public ResponseEntity<String> readVisits() {
		try {
			List<Visit> visitList = visitService.readAllVisits();
			ArrayNode visitNodeList = mapper.createArrayNode();
			for (Visit visit : visitList) {
				ObjectNode visitNode = mapper.valueToTree(visit);
				visitNodeList.add(visitNode);
			}
			return new ResponseEntity<>(visitNodeList.toString(), HttpStatus.OK);
		} catch (Exception e) {
			logger.info("ERROR [{}] - {}", e.getClass().getSimpleName(), e.getMessage());
			e.printStackTrace();
		}
		return new ResponseEntity<>("No visits found", HttpStatus.NOT_FOUND);
	}

	// UPDATE Visit
	@PutMapping
	public ResponseEntity<String> updateVisit(@RequestBody Visit visit) {
		try {
			visitService.updateVisit(visit);
			return new ResponseEntity<String>("Visit was updated successfully", HttpStatus.OK);
		} catch (Exception e) {
			logger.info("ERROR [{}] - {}", e.getClass().getSimpleName(), e.getMessage());
			e.printStackTrace();
		}
		return new ResponseEntity<>("Requested visit to update was not found", HttpStatus.NOT_FOUND);
	}

	// DELETE Visit
	@DeleteMapping("/{visitId}")
	public ResponseEntity<String> deleteVisit(@PathVariable String visitId) {
		try {
			visitService.deleteVisit(visitId);
			return new ResponseEntity<String>("Visit was deleted successfully", HttpStatus.OK);
		} catch (Exception e) {
			logger.info("ERROR [{}] - {}", e.getClass().getSimpleName(), e.getMessage());
			e.printStackTrace();
		}
		return new ResponseEntity<>("Requested visit to delete was not found", HttpStatus.NOT_FOUND);
	}
}
