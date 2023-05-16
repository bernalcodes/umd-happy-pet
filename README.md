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
- [ ] Test local demo
- [ ] Deploy demo
- [ ] Test deployed demo

# Request examples

## Log in

-	To log into a user account the provided endpoint is `/login`
-	The request should be made via `POST` method using the following JSON:
	```
	{
		"email": "customer_test",
		"password": "customer_test"
	}
	```
-	The expected output should look like this:
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

## Users

-	For the users there are available the following endpoints:
  	-	`/users/new` via `POST` method for User creation
		-	For the creation of **customer-type** user:
			-	Request via `POST`
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
						"last_name": "Customer Test Last Name 2",
						"phone_number": "123456789",
						"email": "customer_test@test.com",
						"address": "Test Address for Test Customer"
					}
				}
				```
		-	For the creation of a **veterinary-type** user:
			-	Request via `POST`
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
						"last_name": "Veterinary Test Last Name 2",
						"phone_number": "123456789",
						"email": "veterinary_test@test.com",
						"professional_card": "123456789"
					}
				}
				```
  	-	`/users/{userId}` via `GET` method for querying the User data:
		-	The expected response will look like the following
			```
			{
				"id": "21911b48-8a0e-4352-8b65-4c1b9798fdcb",
				"email": "customer_test",
				"password": "{encryptedUserPassword}",
				"role": "CUSTOMER",
				"profile_pic": "{base64String}"
			}
			```

## Customers

## Veterinaries

## Pets

## Visits

# To be continued

Constant updates on the app's development progress should be added here
