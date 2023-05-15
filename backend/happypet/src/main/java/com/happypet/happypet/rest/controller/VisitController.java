package com.happypet.happypet.rest.controller;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
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
	@PostMapping
	public ResponseEntity<String> createVisit() {
		try {
			
		} catch (Exception e) {
			logger.info("ERROR [{}] - {}", e.getClass().getSimpleName(), e.getMessage());
			e.printStackTrace();
		}
		return new ResponseEntity<>("", HttpStatus.INTERNAL_SERVER_ERROR);
	}

	// READ Visit
	@GetMapping("/{visitId}")
	public ResponseEntity<String> findVisit(@PathVariable String visitId) {
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

	// READ all visits
	@GetMapping
	public List<Visit> listVisits() {
		return visitService.readAllVisits();
	}
}
