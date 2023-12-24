
# Transport API

A web server where you can register your automobiles, drivers and automobile usage.



## Badges

![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/lmscunha/transport_api/node.js.yml)


[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

## Installation

Install the Transport API with npm

```bash
  npm i 
  cd transport_api
```
To start the server in development mode, run the following cmd:
```bash
  npm run dev
```
Then you should see a message similar to:
```bash
  Server listening on port 3333
```
## API Reference

## Automobiles
### Get all automobiles

```http
  GET /automobiles?color=foo&brand=baa
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `color` | `string` | **Optional**. Filter by colour |
| `brand` | `string` | **Optional**. Filter by brand |

#### Request Example:

```json
No body
````

#### Response Example:

```json
{
	"data": {
		"ok": true,
		"automobile": [
			{
				"id": "934e1576-0ecd-45fe-8e59-d850078cf0ea",
				"licensePlate": "AAA1A11",
				"color": "Azul",
				"brand": "Toyota"
			},
			{
				"id": "3000bdb0-49fa-40f4-883d-1acf2072473b",
				"licensePlate": "AAA1A12",
				"color": "Green",
				"brand": "Toyota"
			}
		]
	}
}
````

### Get an automobile by ID

```http
  GET /automobiles/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of the automobile |

#### Request Example:

```json
No body
````

#### Response Example:

```json
{
	"data": {
		"ok": true,
		"automobile": {
			"id": "3000bdb0-49fa-40f4-883d-1acf2072473b",
			"licensePlate": "AAA1A12",
			"color": "Green",
			"brand": "Toyota"
		}
	}
}
````

### Register an automobile 

```http
  POST /automobiles
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `licensePlate`      | `string` | **Required**. Automobile license plate |
| `color`      | `string` | **Required**. Automobile color |
| `brand`      | `string` | **Required**. Automobile brand |

#### Request Example:

```json
{
	"licensePlate": "AAA1A12", // No space - needs to be unique
	"color": "Green",
	"brand": "Toyota"
}
````

#### Response Example:


```json
{
	"data": {
		"ok": true,
		"automobile": {
			"id": "3000bdb0-49fa-40f4-883d-1acf2072473b",
			"licensePlate": "AAA1A12",
			"color": "Green",
			"brand": "Toyota"
		}
	}
}
````

### Update an automobile 

```http
  PUT /automobiles/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of the automobile |
| `licensePlate`      | `string` | **Optional**. Automobile license plate |
| `color`      | `string` | **Optional**. Automobile color |
| `brand`      | `string` | **Optional**. Automobile brand |

#### Request Example:

```json
{
	"color": "Yellow"
}
````


#### Response Example:


````
{
	"data": {
		"ok": true,
		"automobile": {
			"id": "3000bdb0-49fa-40f4-883d-1acf2072473b",
			"licensePlate": "AAA1A12",
			"color": "Yellow",
			"brand": "Toyota"
		}
	}
}
````

### Delete an automobile

```http
  DELETE /automobiles/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of the automobile |


#### Request Example:

```json
No body
````

#### Response Example:


```json
No body - Status 204
````

## Drivers
### Get all drivers

```http
  GET /drivers?name=foo
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Optional**. Filter by name |

#### Request Example:

```json
No body
````

#### Response Example:

```json
{
	"data": {
		"ok": true,
		"driver": [
			{
				"id": "608b4fb5-9eb3-46d5-bc22-d92fdc73a04e",
				"name": "John"
			},
			{
				"id": "1bd7d853-6b5e-45e0-8a92-2cba23c26287",
				"name": "Paul"
			}
		]
	}
}
````

### Get a driver by ID

```http
  GET /drivers/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of the driver |

#### Request Example:

```json
No body
````

#### Response Example:

```json
{
	"data": {
		"ok": true,
		"driver": {
			"id": "608b4fb5-9eb3-46d5-bc22-d92fdc73a04e",
			"name": "John"
		}
	}
}
````

### Register a driver

```http
  POST /drivers
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Name`      | `string` | **Required**. Driver name |

#### Request Example:

```json
{
	"name": "Paul"
}
````

#### Response Example:


```json
{
	"data": {
		"ok": true,
		"driver": {
			"id": "1bd7d853-6b5e-45e0-8a92-2cba23c26287",
			"name": "Paul"
		}
	}
}
````

### Update a driver 

```http
  PUT /drivers/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of the driver |
| `name`      | `string` | **Required**. Driver new name |


#### Request Example:

```json
{
	"name": "George"
}
````


#### Response Example:


```json
{
	"data": {
		"ok": true,
		"driver": {
			"id": "1bd7d853-6b5e-45e0-8a92-2cba23c26287",
			"name": "George"
		}
	}
}
````

### Delete a driver

```http
  DELETE /drivers/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of the driver |


#### Request Example:

```json
No body
````

#### Response Example:


```json
No body - Status 204
````
## License

[MIT](https://choosealicense.com/licenses/mit/)

