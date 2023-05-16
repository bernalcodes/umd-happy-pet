package com.happypet.happypet.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "vets")
public class Veterinary extends Person {
	@Column(name = "professional_card")
	@NotEmpty
	@NotNull
	private String professional_card;

	public String getProfessionalCard() {
		return professional_card;
	}

	public void setProfessionalCard(String professional_card) {
		this.professional_card = professional_card;
	}
}
