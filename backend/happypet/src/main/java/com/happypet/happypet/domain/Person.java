package com.happypet.happypet.domain;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

@MappedSuperclass
public class Person extends BaseEntity {
	@Column(name = "name")
	@NotEmpty
	@NotNull
	private String name;

	@Column(name = "last_name")
	@NotEmpty
	@NotNull
	private String last_name;

	@Column(name = "phone_number")
	@NotEmpty
	@NotNull
	private String phone_number;

	@Column(name = "email")
	@NotEmpty
	@NotNull
	private String email;

	@Column(name = "user_id")
	@NotEmpty
	@NotNull
	private String user_id;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLast_name() {
		return last_name;
	}

	public void setLast_name(String last_name) {
		this.last_name = last_name;
	}

	public String getPhone_number() {
		return phone_number;
	}

	public void setPhone_number(String phone_number) {
		this.phone_number = phone_number;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getUser_id() {
		return user_id;
	}

	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}

	@Override
	public String toString() {
		return super.toString() + ", name=" + name + ", last_name=" + last_name + ", phone_number=" + phone_number
				+ ", email=" + email;
	}
}
