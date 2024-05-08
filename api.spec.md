# Canteen API Specification

## Description

This document outlines the specification for the Canteen API.

## Base URL

http://localhost:8000

## Endpoints

### 1. Get Products

- **URL:** `/canteen/products`
- **Method:** `GET`
- **Description:** Get all products with their categories.
- **Response example:**

```json
[
  {
    "id": 1,
    "name": "Alat tulis",
    "products": [
      {
        "id": 1,
        "name": "pulpen",
        "price": 2000,
        "stock": 20,
        "rating": 4.5,
        "reviewers": 21,
        "shopName": "toko rusdi imoet",
        "categoryId": 1
      },
      {
        "id": 2,
        "name": "pensil",
        "price": 5000,
        "stock": 43,
        "rating": 4.6,
        "reviewers": 21,
        "shopName": "toko rusdi imoet",
        "categoryId": 1
      }
    ]
  },
  {
    "id": 2,
    "name": "Makanan",
    "products": [
      {
        "id": 3,
        "name": "nasi padang",
        "price": 20000,
        "stock": 129,
        "rating": 4.8,
        "reviewers": 36,
        "shopName": "slamet kopling",
        "categoryId": 2
      },
      {
        "id": 4,
        "name": "bakso tanpa tepung",
        "price": 50000,
        "stock": 189,
        "rating": 4.9,
        "reviewers": 24,
        "shopName": "slamet kopling",
        "categoryId": 2
      }
    ]
  },
  {
    "id": 3,
    "name": "Minuman",
    "products": []
  }
]
```

### 2. Add Product

- **URL:** /canteen/add-product
- **Method:** POST
- **Description:** Add a new product.
- **Example Request Body:**

```json
{
  "name": "Product Name",
  "price": 1000,
  "stock": 50,
  "rating": 4.2,
  "reviewers": 10,
  "shopName": "Shop Name",
  "categoryId": 1
}
```

- **Response exampe:**

```json
{
  "id": 5,
  "name": "Product Name",
  "price": 1000,
  "stock": 50,
  "rating": 4.2,
  "reviewers": 10,
  "shopName": "Shop Name",
  "categoryId": 1
}
```

### 3. Update Product

- **URL:** /canteen/update-product/:id
- **Method:** PUT
- **Description:** Update an existing product.
- **Request Parameters:**
- **id:** Product ID (integer)
- **Request Body:**

```json
{
  "name": "Updated Product Name",
  "price": 1500,
  "stock": 40,
  "rating": 4.5,
  "reviewers": 12,
  "shopName": "Updated Shop Name",
  "categoryId": 1
}
```

- **Response:**

```json
{
  "id": 5,
  "name": "Updated Product Name",
  "price": 1500,
  "stock": 40,
  "rating": 4.5,
  "reviewers": 12,
  "shopName": "Updated Shop Name",
  "categoryId": 1
}
```

### 4. Add Category

- **URL:** /canteen/add-category
- **Method:** POST
- **Description:** Add a new category.
- **Request Body:**

```json
{
  "name": "Category Name"
}
```

- **Example Response body**

```json
{
  "id": 4,
  "name": "Makanan"
}
```

### 5. Register user

- **URL:** /auth/register
- **Method:** POST
- **Description:** Add a new user.
- **Request Body:**

```json
{
  "name": "string,max 50 char",
  "pin": "6 digit pin",
  "alamat": "optional",
  "kelas": "enum kelas"
}
```

```
enum Kelas {
  KELAS_10_SMA
  KELAS_11_SMA
  KELAS_12_SMA
}
```

- **Expected respose:**

```json
{
  "id": number,
  "name":"created user name"
}
```
