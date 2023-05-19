package com.happypet.happypet.domain;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "visits")
public class Visit extends BaseEntity {
	@Column(name = "pet_id")
	@NotEmpty
	@NotNull
	private String pet_id;

	@Column(name = "vet_id")
	private String vet_id;

	@Column(name = "date")
	@NotNull
	private Date date;

	@Column(name = "temperature")
	private float temperature;

	@Column(name = "weight")
	private float weight;

	@Column(name = "resp_freq")
	private String resp_freq;

	@Column(name = "cardiac_freq")
	private String cardiac_freq;

	@Column(name = "mood")
	private String mood;

	@Column(name = "recommendation")
	private String recommendation;

	public String getPet_id() {
		return pet_id;
	}

	public void setPet_id(String pet_id) {
		this.pet_id = pet_id;
	}

	public String getVet_id() {
		return vet_id;
	}

	public void setVet_id(String vet_id) {
		this.vet_id = vet_id;
	}

	public String getResp_freq() {
		return resp_freq;
	}

	public void setResp_freq(String resp_freq) {
		this.resp_freq = resp_freq;
	}

	public String getCardiac_freq() {
		return cardiac_freq;
	}

	public void setCardiac_freq(String cardiac_freq) {
		this.cardiac_freq = cardiac_freq;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public float getTemperature() {
		return temperature;
	}

	public void setTemperature(float temperature) {
		this.temperature = temperature;
	}

	public float getWeight() {
		return weight;
	}

	public void setWeight(float weight) {
		this.weight = weight;
	}

	public String getRespFreq() {
		return resp_freq;
	}

	public void setRespFreq(String resp_freq) {
		this.resp_freq = resp_freq;
	}

	public String getCardiacFreq() {
		return cardiac_freq;
	}

	public void setCardiacFreq(String cardiac_freq) {
		this.cardiac_freq = cardiac_freq;
	}

	public String getMood() {
		return mood;
	}

	public void setMood(String mood) {
		this.mood = mood;
	}

	public String getRecommendation() {
		return recommendation;
	}

	public void setRecommendation(String recommendation) {
		this.recommendation = recommendation;
	}
}
