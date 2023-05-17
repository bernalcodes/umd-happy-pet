## Happy Pet

Happy Pet is a web-based project for veterinary practice management

Developed by Juan Bernal ([@bernalcodes](github.com/bernalcodes)) and Andrés Sanabria ([@80asv](github.com/80asv))

Minuto de Dios University Corporation, 2023

# To-do

- [x] Plan project
- [x] Define style guides
- [x] Define UI
- [x] Define stack
- [x] Model data
- [x] Design app architecture
- [x] Design tests
- [x] Develop local demo
- [X] Test local demo
- [X] Deploy demo
- [X] Test deployed demo

# Request examples

-	All requests must include the header `Authorization` with the value of a bearer token (such as `Bearer {tokenString}`)

## Log in

-	To log into a user account the provided endpoint is `/login`
-	The request should be made via `POST` method using the following JSON:
	```
	{
		"email": "customer_test",
		"password": "customer_test"
	}
	```
-	The expected response should look like this:
	-	Success:
		```
		{
			"id": "21911b48-8a0e-4352-8b65-4c1b9798fdcb",
			"enabled": true,
			"authorities": [],
			"credentialsNonExpired": true,
			"accountNonExpired": true,
			"accountNonLocked": true,
			"username": "customer_test",
			"Authorization": "Bearer {tokenString}"
		}
		```
	-	Failure: `403 UNAUTHORIZED`

## Users

-	There are available the following endpoints per operation:
	-	`CREATE`
		-	`/users/new` via `POST` method with the following request body:
			-	Customer-type User.
				```
				{
					"userDetails": {
						"email": "customer_test",
						"password": "customer_test",
						"role": "CUSTOMER",
						"profile_pic": "{base64String}"
					},
					"personDetails": {
						"name": "Customer Test Name",
						"last_name": "Customer Test Last Name",
						"phone_number": "123456789",
						"email": "customer_test@test.com",
						"address": "Test Address for Test Customer"
					}
				}
				```
			-	Veterinary-type User.
				```
				{
					"userDetails": {
						"email": "veterinary_test",
						"password": "veterinary_test",
						"role": "VETERINARY",
						"profile_pic": "{base64String}"
					},
					"personDetails": {
						"name": "Veterinary Test Name",
						"last_name": "Veterinary Test Last Name",
						"phone_number": "123456789",
						"email": "veterinary_test@test.com",
						"professional_card": "123456789"
					}
				}
				```
			-	No-type User.
				```
				{
					"userDetails": {
						"email": "user",
						"password": "password",
						"role": "",
						"profile_pic": "{base64String}"
					}
				}
				```
			-	The expected response should look like the following:
				-	Success: `User was created successfully` with `201 CREATED`
				-	Failure: `There was an error creating the user` with `500 INTERNAL SERVER ERROR`
	-	`READ`
		-	`/users/{userId}` via `GET` method
			-	The expected response should look like the following
				-	Success (with `200 OK`):
					-	Customer-type user:
						```
						{
							"id": "{userId}",
							"email": "customer_test",
							"password": "{encryptedUserPassword}",
							"role": "CUSTOMER",
							"profile_pic": "{base64String}",
							"customer_details": {
								"id": "{customerId}",
								"name": "Customer Test Name",
								"last_name": "Customer Test Last Name",
								"phone_number": "123456789",
								"email": "customer_test@test.com",
								"address": "Test Address for Test Customer"
							}
						}
						```
					- 	Veterinary-type user:
						```
						{
							"id": "21911b48-8a0e-4352-8b65-4c1b9798fdcb",
							"email": "customer_test",
							"password": "{encryptedUserPassword}",
							"role": "CUSTOMER",
							"profile_pic": "{base64String}",
							"vet_details": {
							"name": {
								"id": "{vetId}",
								"name": "Veterinary Test Name",
								"last_name": "Veterinary Test Last Name",
								"phone_number": "123456789",
								"email": "veterinary_test@test.com",
								"professional_card": "123456789"
							}
						}
						```
					-	No-type USer:
						```
						{
							"id": "{userId}",
							"email": "customer_test",
							"password": "{encryptedUserPassword}",
							"role": "CUSTOMER",
							"profile_pic": "{base64String}"
						}
						```
				-	Failure: `Requested user was not found` with `404 NOT FOUND`
		-	`/users/all` via `GET` method
			-	The expected response should be the following:
				-	Success: A list of User-type objects with `200 OK`
				-	Failure: `No users found` with `404 NOT FOUND`
	-	`UPDATE`
		-	`/users` via `PUT` method
			-	The body of the request is the same as of the creation of a user without the `personDetails` field
			-	The value of the userId will remain constant for the update process to work
				```
				{
					"userDetails": {
						"id": "{userId}",
						"email": "user",
						"password": "password",
						"role": "",
						"profile_pic": "{base64String}"
					}
				}
				```
		-	The expected response should be the following:
			-	Success: `User was updated successfully` with `200 OK`
			-	Failure: `Requested user to update was not found` with `404 NOT FOUND`
	-	`DELETE`
		-	`/users/{userId}` via `DELETE` method
		-	The expected response should be the following:
			-	Success: `User was deleted successfully` with `200 OK`
			-	Failure: `Requested user to delete was not found` with `404 NOT FOUND`

## Customers

-	There are available the following endpoints per operation:
	-	`CREATE`
    -	`/customers/new` via `POST` method with the following request body:

        ```
        {
          "name": "Customer Test Name",
          "last_name": "Customer Test Last Name",
          "phone_number": "123456789",
          "email": "customer_test@test.com",
          "address": "Test Address for Test Customer"
        }
        ```
				
    - `/customers/new/list` via `POST` method
      - The body should be a list of Customer-type objects
      -	The expected response should look like the following:
        -	Success: `List of customers created successfully` with `201 CREATED`
        -	Failure: `Error occurred while creating list of customer` with `500 INTERNAL SERVER ERROR`
	-	`READ`
		-	`/customers/{customerId}` via `GET` method
			-	The expected response should look like the following
				-	Success (with `200 OK`):
					```
					{
						"id": "{customerId}",
						"name": "Customer Test Name",
						"last_name": "Customer Test Last Name",
						"phone_number": "123456789",
						"email": "customer_test@test.com",
						"address": "Test Address for Test Customer"
					}
					```
				-	Failure: `Requested customer was not found` with `400 NOT FOUND`
		-	`/customers/all` via `GET` method
			-	The expected response should be the following:
				-	Success: A list of User-type objects with `200 OK`
				-	Failure: `No customers found` with `404 NOT FOUND`
	-	`UPDATE`
		-	`/customers` via `PUT` method
			-	The body of the request is the same as the value of the `customer_details` for creation of a user
			-	The value of the customerId will remain constant for the update process to work
				```
				{
					"id": "{customerId}",
					"name": "Customer Test Name",
					"last_name": "Customer Test Last Name",
					"phone_number": "123456789",
					"email": "customer_test@test.com",
					"address": "Test Address for Test Customer"
				}
				```
		-	The expected response should be the following:
			-	Success: `Customer was updated successfully` with `200 OK`
			-	Failure: `Requested customer to update was not found` with `404 NOT FOUND`
	-	`DELETE`
		-	`/customers/{customerId}` via `DELETE` method
		-	The expected response should be the following:
			-	Success: `Customer was deleted successfully` with `200 OK`
			-	Failure: `Requested customer to delete was not found` with `404 NOT FOUND`

## Veterinaries

-	There are available the following endpoints per operation:
	-	`CREATE`
    -	`/vets/new` via `POST` method with the following request body:

		```
		{
			"name": "Veterinary Test Name",
			"last_name": "Veterinary Test Last Name",
			"phone_number": "123456789",
			"email": "veterinary_test@test.com",
			"professional_card": "123456789"
		}
		```

    -	`/vets/new/list` via `POST` method
		-	The body should be a list of Veterinary-type objects
		-	The expected response should look like the following:
			-	Success: `List of veterinaries created successfully` with `201 CREATED`
			-	Failure: `Error occurred while creating list of veterinaries` with `500 INTERNAL SERVER ERROR`
	-	`READ`
		-	`/vets/{vetId}` via `GET` method
			-	The expected response should look like the following
				-	Success (with `200 OK`):
					```
					{
						"id": "{customerId}",
						"name": "Veterinary Test Name",
						"last_name": "Veterinary Test Last Name",
						"phone_number": "123456789",
						"email": "veterinary_test@test.com",
						"professional_card": "123456789"
					}
					```
				-	Failure: `Requested veterinary was not found` with `400 NOT FOUND`
		-	`/vets/all` via `GET` method
			-	The expected response should be the following:
				-	Success: A list of Veterinary-type objects with `200 OK`
				-	Failure: `No veterinaries found` with `404 NOT FOUND`
	-	`UPDATE`
		-	`/vets` via `PUT` method
			-	The body of the request is the same as the value of the `vet_details` for creation of a user
			-	The value of the vetId will remain constant for the update process to work
				```
				{
					"id": "{vetId}",
					"name": "Veterinary Test Name",
					"last_name": "Veterinary Test Last Name",
					"phone_number": "123456789",
					"email": "veterinary_test@test.com",
					"professional_card": "123456789"
				}
				```
		-	The expected response should be the following:
			-	Success: `Veterinary was updated successfully` with `200 OK`
			-	Failure: `Requested veterinary to update was not found` with `404 NOT FOUND`
	-	`DELETE`
		-	`/vets/{vetId}` via `DELETE` method
		-	The expected response should be the following:
			-	Success: `Veterinary was deleted successfully` with `200 OK`
			-	Failure: `Requested veterinary to delete was not found` with `404 NOT FOUND`

## Pets

-	There are available the following endpoints per operation:
	-	`CREATE`
    -	`/pets/new` via `POST` method with the following request body:

		```
		{
			"name": "Pet Name",
			"specs": "Pet specifications",
			"type": "petType",
			"owner_id": "{customerId}",
			"pet_pic": "{base64String}"
		}
		```

    -	`/pets/new/list` via `POST` method
		-	The body should be a list of Pet-type objects
		-	The expected response should look like the following:
			-	Success: `List of pets created successfully` with `201 CREATED`
			-	Failure: `Error occurred while creating list of pets` with `500 INTERNAL SERVER ERROR`
	-	`READ`
		-	`/pets` via `GET` method
			-	Using the header `owner_id` with the user's ID (Customer-type User) as its value
			-	The expected response should be the following:
				-	Success: A list of the user's pets as a list of Pet-type objects with `200 OK`
				-	Failure: `No pets found` with `404 NOT FOUND`
		-	`/pets/{petId}` via `GET` method
			-	The expected response should look like the following
				-	Success (with `200 OK`):
					```
					{
						"id": "{petId}",
						"name": "Pet Name",
						"specs": "Pet specifications",
						"type": "petType",
						"owner_id": "{customerId}",
						"pet_pic": "{base64String}"
					}
					```
				-	Failure: `Requested pet was not found` with `400 NOT FOUND`
		-	`/pets/all` via `GET` method
			-	The expected response should be the following:
				-	Success: A list of Pet-type objects with `200 OK`
				-	Failure: `No pets found` with `404 NOT FOUND`
	-	`UPDATE`
		-	`/pets` via `PUT` method
			-	The body of the request is the same as the one used for the creation of a pet
			-	The value of the petId will remain constant for the update process to work
				```
				{
					"id": "{petId}",
					"name": "Pet Name",
					"specs": "Pet specifications",
					"type": "petType",
					"owner_id": "{customerId}",
					"pet_pic": "{base64String}"
				}
				```
		-	The expected response should be the following:
			-	Success: `Pet was updated successfully` with `200 OK`
			-	Failure: `Requested pet to update was not found` with `404 NOT FOUND`
	-	`DELETE`
		-	`/pets/{petId}` via `DELETE` method
		-	The expected response should be the following:
			-	Success: `Pet was deleted successfully` with `200 OK`
			-	Failure: `Requested pet to delete was not found` with `404 NOT FOUND`

## Visits

-	There are available the following endpoints per operation:
	-	`CREATE`
    -	`/visits/new` via `POST` method with the following request body:

		```
		{
			"pet_id": "{petId}",
			"vet_id": "{vetId}",
			"date": {visitDate},
			"temperature": {petTemp},
			"weight": {petWeight},
			"resp_freq": {petRespFreq},
			"cardiac_freq": {petCardiacFreq},
			"mood": "{petMood}",
			"recommendation": "{vetRecommendation}"
		}
		```

    -	`/visits/new/list` via `POST` method
		-	The body should be a list of Visit-type objects
		-	The expected response should look like the following:
			-	Success: `List of visits created successfully` with `201 CREATED`
			-	Failure: `Error occurred while creating list of visits` with `500 INTERNAL SERVER ERROR`
	-	`READ`
		-	`/visits/{visitId}` via `GET` method
			-	The expected response should look like the following
				-	Success (with `200 OK`):
					```
					{
						"id": "{visitId}",
						"pet_id": "{petId}",
						"vet_id": "{vetId}",
						"date": {visitDate},
						"temperature": {petTemp},
						"weight": {petWeight},
						"resp_freq": {petRespFreq},
						"cardiac_freq": {petCardiacFreq},
						"mood": "{petMood}",
						"recommendation": "{vetRecommendation}"
					}
					```
				-	Failure: `Requested visit was not found` with `400 NOT FOUND`
		-	`visits/args` via `GET` method
			-	Using the following headers:
				-	`ownerId` with the pet's ID as its value
				-	`vetId` with the vet's ID as its value
				-	`date` with the visit's date string as its value
			-	The expected response should be the following:
				-	Success (with `200 OK`):
					```
					{
						"id": "{visitId}",
						"pet_id": "{petId}",
						"vet_id": "{vetId}",
						"date": {visitDate},
						"temperature": {petTemp},
						"weight": {petWeight},
						"resp_freq": {petRespFreq},
						"cardiac_freq": {petCardiacFreq},
						"mood": "{petMood}",
						"recommendation": "{vetRecommendation}"
					}
					```
				-	Failure: `No visit with provided data was found` with `404 NOT FOUND`
		-	`/visits/all` via `GET` method
			-	The expected response should be the following:
				-	Success: A list of Visit-type objects with `200 OK`
				-	Failure: `No visits found` with `404 NOT FOUND`
	-	`UPDATE`
		-	`/pets` via `PUT` method
			-	The body of the request is the same as the one used for the creation of a visit
			-	The value of the petId will remain constant for the update process to work
				```
				{
					"id": "{visitId}",
					"pet_id": "{petId}",
					"vet_id": "{vetId}",
					"date": {visitDate},
					"temperature": {petTemp},
					"weight": {petWeight},
					"resp_freq": {petRespFreq},
					"cardiac_freq": {petCardiacFreq},
					"mood": "{petMood}",
					"recommendation": "{vetRecommendation}"
				}
				```
		-	The expected response should be the following:
			-	Success: `Visit was updated successfully` with `200 OK`
			-	Failure: `Requested visit to update was not found` with `404 NOT FOUND`
	-	`DELETE`
		-	`/visits/{visitId}` via `DELETE` method
		-	The expected response should be the following:
			-	Success: `Visit was deleted successfully` with `200 OK`
			-	Failure: `Requested visit to delete was not found` with `404 NOT FOUND`

***
