package com.happypet.happypet.rest.controller;

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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.happypet.happypet.domain.Veterinary;
import com.happypet.happypet.services.VeterinaryService;

@RestController
@RequestMapping(value = "vets", produces = MediaType.APPLICATION_JSON_VALUE)
public class VeterinaryController {
	private static final Logger logger = LoggerFactory.getLogger(VeterinaryController.class);

	@Autowired
	private ObjectMapper mapper;

	@Autowired
	private VeterinaryService veterinaryService;

	// CREATE Veterinary
	@PostMapping("/new")
	public ResponseEntity<String> createVet(@RequestBody Veterinary vet) {
		try {
			Optional<Veterinary> savedVet = veterinaryService.createVet(vet);
			if (savedVet.isPresent())
				return new ResponseEntity<>("Veterinary created successfully",
						HttpStatus.CREATED);
		} catch (Exception e) {
			logger.info("ERROR [{}] - {}", e.getClass().getSimpleName(), e.getMessage());
			e.printStackTrace();
		}
		return new ResponseEntity<>("Error occurred while creating veterinary", HttpStatus.INTERNAL_SERVER_ERROR);
	}

	// CREATE Veterinaries
	@PostMapping("/new/list")
	public ResponseEntity<String> createCustomers(@RequestBody List<Veterinary> vetList) {
		try {
			for (Veterinary vet : vetList)
				veterinaryService.createVet(vet);
			return new ResponseEntity<>("List of veterinaries created successfully", HttpStatus.CREATED);
		} catch (Exception e) {
			logger.info("ERROR [{}] - {}", e.getClass().getSimpleName(), e.getMessage());
			e.printStackTrace();
		}
		return new ResponseEntity<>("Error occurred while creating list of veterinaries",
				HttpStatus.INTERNAL_SERVER_ERROR);
	}

	// READ Veterinary
	@GetMapping("/{vetId}")
	public ResponseEntity<String> readVet(@PathVariable String vetId) {
		try {
			Optional<Veterinary> vet = veterinaryService.readVetById(vetId);
			if (vet.isPresent())
				return new ResponseEntity<String>(vet.get().toString(), HttpStatus.OK);
		} catch (Exception e) {
			logger.info("ERROR [{}] - {}", e.getClass().getSimpleName(), e.getMessage());
			e.printStackTrace();
		}
		return new ResponseEntity<>("Veterinary not found", HttpStatus.NOT_FOUND);
	}

	// READ all veterinaries
	@GetMapping
	public ResponseEntity<String> readVets() {
		try {
			List<Veterinary> vetList = veterinaryService.readAllVets();
			ArrayNode vetNodeList = mapper.createArrayNode();
			for (Veterinary veterinary : vetList) {
				ObjectNode vetNode = mapper.valueToTree(veterinary);
				vetNodeList.add(vetNode);
			}
			JsonNode response = mapper.createObjectNode().set("vetList", vetNodeList);
			return new ResponseEntity<>(response.toString(), HttpStatus.OK);
		} catch (Exception e) {
			logger.info("ERROR [{}] - {}", e.getClass().getSimpleName(), e.getMessage());
			e.printStackTrace();
		}

		return new ResponseEntity<>("No veterinaries found", HttpStatus.NOT_FOUND);
	}

	// UPDATE Veterinary
	@PutMapping
	public ResponseEntity<String> updateVet(@RequestBody Veterinary vet) {
		try {
			veterinaryService.updateVet(vet);
			return new ResponseEntity<>("Veterinary was updated successfully", HttpStatus.OK);
		} catch (Exception e) {
			logger.info("ERROR [{}] - {}", e.getClass().getSimpleName(), e.getMessage());
			e.printStackTrace();
		}
		return new ResponseEntity<>("Requested veterinary to update was not found", HttpStatus.NOT_FOUND);
	}

	// DELETE Veterinary
	@DeleteMapping("/{vetId}")
	public ResponseEntity<String> deleteVet(@PathVariable String vetId) {
		try {
			veterinaryService.deleteVet(vetId);
			return new ResponseEntity<>("Veterinary was deleted successfully", HttpStatus.OK);
		} catch (Exception e) {
			logger.info("ERROR [{}] - {}", e.getClass().getSimpleName(), e.getMessage());
			e.printStackTrace();
		}
		return new ResponseEntity<>("Requested veterinary to delete was not found", HttpStatus.NOT_FOUND);
	}
}
