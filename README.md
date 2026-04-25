# 🚗 Cars API (Vehicle Marketplace Backend)

A RESTful API built with Node.js, Express, and MongoDB (Mongoose) for managing vehicle listings with advanced search, filtering, and scalable schema design.

---

# ⚙️ Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- dotenv
- slugify
- nodemon (dev)

---

# 📁 Project Structure (High Level)

- src/
  - config/
  - controllers/
  - middleware/
  - models/
  - routes/
  - seed/
  - utils/
- app.js

---

# 🚀 Features

## 🚗 Vehicle Listing System

- Create, Read, Update, Delete listings
- Vehicle data includes:
  - make & model
  - price & year
  - mileage
  - condition (new / used)
  - status (available / sold / removed / pending)
  - transmission & fuel type
  - color & images
  - location (city, province, geo coordinates)

---

## 🔎 Advanced Search System

- Full-text + fuzzy search
- Structured query parsing:
  "Toyota 2020 diesel"
  → parsed into:
  - make = Toyota
  - year = 2020
  - fuel_type = diesel

- Multi-field search:
  - make
  - model
  - keywords
  - fuel type
  - transmission

---

## 💡 Smart Suggestion System

- Autocomplete suggestions based on:
  - make + model
  - search keywords

---

## 🌍 Geo Support

- MongoDB 2dsphere index
- Ready for:
  - nearest listing search
  - location-based filtering (future feature)

---

# ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/automotive

---

# 🛠️ Installation & Setup

## 1. Clone Repository

```bash
git clone https://github.com/haloalfii/automotive-api
cd automotive-api

---

## 2. Install Dependencies

```bash
npm install

---

## 3. Setup Environment

Create `.env` file:

```.env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/automotive

---

## 4. Run MongoDB

Make sure MongoDB is running:

mongod

or use MongoDB Atlas.

---

## 5. Run Development Server

npm run dev

Server will run at:
http://localhost:3000

---

# 📡 API Endpoints

## 🚗 Listings

POST /api/listings → Create listing  
GET /api/listings → Get all listings  
GET /api/listings/:id → Get listing detail  
PATCH /api/listings/:id → Update listing  
DELETE /api/listings/:id → Soft delete listing

---

## 🔎 Search

GET /api/listings/search?q=

Example:
GET /api/listings/search?q=toyota 2020 diesel

---

## 💡 Suggestion

GET /api/listings/search/suggest?q=

Example:
GET /api/listings/search/suggest?q=toy

---

# 🧠 Schema Design Rationale

## 🚗 1. Vehicle-Centric Design

Each listing represents a real-world vehicle with:

- make & model separation
- structured pricing & specs
- lifecycle status management

---

## ⚡ 2. Performance-Driven Indexing

Indexes added on:

- price
- year
- make/model
- status
- category
- fuel_type & transmission

Ensures fast filtering at scale.

---

## 🌍 3. Geo-Ready Architecture

location.coordinates uses 2dsphere index for:

- future nearest search
- map integration
- location-based ranking

---

## 🔧 4. Flexible Attributes System

attributes uses Map type to support dynamic fields:

- avoids schema explosion
- supports multiple vehicle types

---

## 🔎 5. Hybrid Search Strategy

- structured query parsing (intent-based search)
- fuzzy fallback search
- keyword indexing

Balances:

- accuracy
- flexibility
- performance

---

## 🔗 6. SEO-Friendly Slug

Each listing includes slug:

- used for clean URLs
- improves frontend routing

