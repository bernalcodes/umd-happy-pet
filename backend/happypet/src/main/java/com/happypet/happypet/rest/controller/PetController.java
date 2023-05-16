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
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.happypet.happypet.domain.Pet;
import com.happypet.happypet.services.PetService;

@RestController
@RequestMapping(value = "pets", produces = MediaType.APPLICATION_JSON_VALUE)
public class PetController {
	private final Logger logger = LoggerFactory.getLogger(PetController.class);

	@Autowired
	private ObjectMapper mapper;

	@Autowired
	private PetService petService;

	// CREATE Pet
	@PostMapping("/new")
	public ResponseEntity<String> createPet(@RequestBody Pet pet) {
		try {
			Optional<Pet> createdPet = petService.createPet(pet);
			if (createdPet.isPresent())
				return new ResponseEntity<>("Pet created successfully", HttpStatus.CREATED);
		} catch (Exception e) {
			logger.info("ERROR [{}] - {}", e.getClass().getSimpleName(), e.getMessage());
			e.printStackTrace();
		}

		return new ResponseEntity<>("Error occured while creating pet", HttpStatus.INTERNAL_SERVER_ERROR);
	}

	// CREATE Pets
	@PostMapping("/new/list")
	public ResponseEntity<String> createCustomers(@RequestBody List<Pet> petList) {
		try {
			for (Pet pet : petList)
				petService.createPet(pet);
			return new ResponseEntity<>("List of pets created successfully", HttpStatus.CREATED);
		} catch (Exception e) {
			logger.info("ERROR [{}] - {}", e.getClass().getSimpleName(), e.getMessage());
			e.printStackTrace();
		}
		return new ResponseEntity<>("Error occurred while creating list of pets",
				HttpStatus.INTERNAL_SERVER_ERROR);
	}

	// READ Pet
	@GetMapping("/{petId}")
	public ResponseEntity<String> readPet(@PathVariable String petId) {
		try {
			Optional<Pet> pet = petService.readPetById(petId);
			if (pet.isPresent()) {
				ObjectNode response = mapper.valueToTree(pet);
				return new ResponseEntity<>(response.toString(), HttpStatus.OK);
			}
		} catch (Exception e) {
			logger.info("ERROR [{}] - {}", e.getClass().getSimpleName(), e.getMessage());
			e.printStackTrace();
		}
		return new ResponseEntity<>("No pets found", HttpStatus.NOT_FOUND);
	}

	// READ user's pets
	@GetMapping
	public ResponseEntity<String> readUserPets(@RequestHeader(name = "owner_id", required = true) String owner_id) {
		try {
			List<Pet> pl = petService.findPetsByOwnerId(owner_id);
			ArrayNode petNodeArray = mapper.createArrayNode();
			for (Pet p : pl) {
				ObjectNode petNode = mapper.valueToTree(p);
				petNodeArray.add(petNode);
			}
			JsonNode response = mapper.createObjectNode().set("petList", petNodeArray);
			return new ResponseEntity<>(response.toString(), HttpStatus.OK);
		} catch (Exception e) {
			logger.info("ERROR [{}] - {}", e.getClass().getSimpleName(), e.getMessage());
			e.printStackTrace();
		}
		return new ResponseEntity<>("No pets found", HttpStatus.NOT_FOUND);
	}

	// READ all pets
	@GetMapping("/all")
	public ResponseEntity<String> readPets() {
		try {
			List<Pet> petList = petService.readAllPets();
			ArrayNode petNodeArray = mapper.createArrayNode();

			for (Pet pet : petList) {
				ObjectNode petNode = mapper.valueToTree(pet);
				petNodeArray.add(petNode);
			}

			JsonNode response = mapper.createObjectNode().set("petList", petNodeArray);
			return new ResponseEntity<>(response.toString(), HttpStatus.OK);
		} catch (Exception e) {
			logger.info("ERROR [{}] - {}", e.getClass().getSimpleName(), e.getMessage());
			e.printStackTrace();
		}

		return new ResponseEntity<>("No pets found", HttpStatus.NOT_FOUND);
	}

	// UPDATE Pet
	@PutMapping
	public ResponseEntity<String> updatePet(@RequestBody Pet pet) {
		try {
			petService.updatePet(pet);
			return new ResponseEntity<>("Pet was updated successfully", HttpStatus.OK);
		} catch (Exception e) {
			logger.info("ERROR [{}] - {}", e.getClass().getSimpleName(), e.getMessage());
			e.printStackTrace();
		}
		return new ResponseEntity<>("Requested pet to update was not found", HttpStatus.NOT_FOUND);
	}

	// DELETE Pet
	@DeleteMapping("/{petId}")
	public ResponseEntity<String> deletePet(@PathVariable String petId) {
		try {
			petService.deletePet(petId);
			return new ResponseEntity<>("Pet was deleted successfully", HttpStatus.OK);
		} catch (Exception e) {
			logger.info("ERROR [{}] - {}", e.getClass().getSimpleName(), e.getMessage());
			e.printStackTrace();
		}
		return new ResponseEntity<>("Requested pet to delete was not found", HttpStatus.NOT_FOUND);
	}
}
