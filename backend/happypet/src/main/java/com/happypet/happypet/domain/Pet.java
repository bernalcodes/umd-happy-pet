package com.happypet.happypet.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;

@Entity
@Table(name = "pets")
public class Pet extends BaseEntity {
	@Column(name = "name")
	@NotEmpty
	private String name;

	@Column(name = "specs")
	private String specs;

	@Column(name = "type")
	private String type;

	@Column(name = "owner_id")
	private String owner_id;

	@Lob
	private String pet_pic;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSpecs() {
		return specs;
	}

	public void setSpecs(String specs) {
		this.specs = specs;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getOwner_id() {
		return owner_id;
	}

	public void setOwner_id(String owner_id) {
		this.owner_id = owner_id;
	}

	public String getPet_pic() {
		return pet_pic;
	}

	public void setPet_pic(String pet_pic) {
		this.pet_pic = pet_pic;
	}
}
