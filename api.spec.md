# Canteen API Specification

## Description

This document outlines the specification for the Canteen API.

## Base URL

http://localhost:8000

## Endpoints

# 1. Canteen products api

### 1. Get products

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
  "message": "Successfully added new product",
  "productId": 1,
  "productName": "product name"
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
  "message": "Successfully added new category",
  "categoryName": "newCategory"
}
```

# 2. Auth api

### 1. Register user

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

- **Respose:**

```json
{
  "message": "User created successfully",
  "userId": 4
}
```

### Login user

- **URL:** /auth/login
- **Method:** POST
- **Description:** Login to get jwt token.
- **Request Body:**

```json
{
  "name": "user that already registered",
  "pin": "user pin"
}
```

- **Response:**

```json
{
  "message": "login berhasil",
  "token": "jwt token"
}
```

# 3. Subjects api

### 1. Get all mapel

- **URL:** /subjects/mapel
- **Method:** GET
- **Description:** Request to get all created mapel.
- **Response:**

```json
{
  "mapel": "mapel name"
}
```

### 2. Get all materi

- **URL:** /subjects/materi
- **Method:** GET
- **Description:** Request to get all created materi.
- **Response:**

```json
{
  [
    {
        "id": 1,
        "mapel": "Matematika",
        "materi": [
            {
                "id": 1,
                "name": "linear algebra",
                "author": "bambang alpukat",
                "lesson": "Matematika",
                "mapelId": 1
            },
            {
                "id": 2,
                "name": "calculus",
                "author": "ogiwara sayu",
                "lesson": "Matematika",
                "mapelId": 1
            },
            {
                "id": 3,
                "name": "statistic",
                "author": "ogiwara sayu",
                "lesson": "Matematika",
                "mapelId": 1
            },
            {
                "id": 4,
                "name": "vector",
                "author": "ogiwara sayu",
                "lesson": "Matematika",
                "mapelId": 1
            }
        ]
    },
    {
        "id": 2,
        "mapel": "Ilmu pengetahuan alam",
        "materi": []
    },
    {
        "id": 3,
        "mapel": "Ilmu pengetahuan sosial",
        "materi": []
    }
]
}
```

### 3. Add new mapel

- **URL:** /subjects/new-mapel
- **Method:** POST
- **Description:** Create new mapel.
- **Request Body:**

```json
{
  "mapel": "mapel name"
}
```

- **Response:**

```json
{
  "message": "Successfully added new mapel",
  "mapelName": "Mapel name"
}
```

### 4. Add materi

- **URL:** /subjects/new-materi
- **Method:** POST
- **Description:** Create new materi.
- **Request Body:**

```json
{
  "name": "",
  "author": "",
  "lesson": "",
  "mapelId": 1
}
```

- **Response:**

```json
{
  "message": "Materi successfully added",
  "Id": "Materi id",
  "Name": "Materi name"
}
```
