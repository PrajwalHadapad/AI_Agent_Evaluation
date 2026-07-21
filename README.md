# 🧠 AI-Powered Multi-Agent LLM Response Evaluation Platform

A production-grade platform for evaluating AI-generated responses using multiple autonomous judge agents. Built with a modular, scalable architecture designed for extensibility and real-world deployment.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Milestones](#milestones)
- [License](#license)

---

## Overview

This platform enables systematic evaluation of Large Language Model (LLM) outputs through a **multi-agent judging pipeline**. Multiple specialized AI judge agents independently assess LLM responses against reference knowledge, producing aggregated quality scores and detailed feedback.

### Key Capabilities (Planned)

| Module                     | Description                                                |
| -------------------------- | ---------------------------------------------------------- |
| **Evaluation Input**       | Submit prompts and LLM responses for evaluation            |
| **Reference Knowledge Base** | Upload and manage ground-truth reference documents        |
| **RAG Pipeline**           | Retrieve relevant context using vector similarity search   |
| **Multi-Agent Judges**     | Multiple AI agents independently score and critique responses |
| **Dashboard**              | Visualize evaluation results with interactive analytics    |
| **Batch Evaluation**       | Process large-scale evaluations asynchronously             |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (React 19)                   │
│              Vite · Tailwind CSS · React Router              │
└──────────────────────────┬──────────────────────────────────┘
                           │  REST API (Axios)
┌──────────────────────────▼──────────────────────────────────┐
│                    Backend (FastAPI + Uvicorn)                │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────────┐              │
│  │   API    │  │ Services │  │  RAG Pipeline │              │
│  │  Routes  │  │  Layer   │  │  (LangChain)  │              │
│  └────┬─────┘  └────┬─────┘  └──────┬───────┘              │
│       │              │               │                       │
│  ┌────▼──────────────▼───────────────▼───────┐              │
│  │          Database Layer                    │              │
│  │   MongoDB (Data)  ·  ChromaDB (Vectors)   │              │
│  └───────────────────────────────────────────┘              │
└─────────────────────────────────────────────────────────────┘
```

---

## Tech Stack

### Frontend

| Technology     | Purpose             |
| -------------- | ------------------- |
| React 19       | UI Framework        |
| Vite           | Build Tool          |
| Tailwind CSS   | Utility-first CSS   |
| React Router   | Client-side Routing |
| Axios          | HTTP Client         |

### Backend

| Technology            | Purpose                 |
| --------------------- | ----------------------- |
| Python 3.12           | Runtime                 |
| FastAPI               | Web Framework           |
| Uvicorn               | ASGI Server             |
| Pydantic              | Data Validation         |
| python-dotenv         | Environment Management  |

### Databases

| Technology | Purpose              |
| ---------- | -------------------- |
| MongoDB    | Primary Data Store   |
| ChromaDB   | Vector Database      |

### AI / ML

| Technology            | Purpose                     |
| --------------------- | --------------------------- |
| LangChain             | LLM Orchestration           |
| Sentence Transformers | Text Embeddings             |
| HuggingFace Datasets  | Dataset Management          |

---

## Project Structure

```
project-root/
│
├── backend/
│   ├── api/                  # API route definitions
│   │   └── routes/           # Endpoint handlers
│   ├── core/                 # App configuration & settings
│   ├── models/               # MongoDB document models
│   ├── schemas/              # Pydantic request/response schemas
│   ├── services/             # Business logic layer
│   ├── database/             # Database connection managers
│   ├── utils/                # Shared utilities & logging
│   ├── rag/                  # RAG pipeline components
│   ├── datasets/             # Dataset loaders & processors
│   ├── uploads/              # File upload storage
│   ├── vector_store/         # ChromaDB vector store management
│   ├── main.py               # FastAPI application entry point
│   ├── requirements.txt      # Python dependencies
│   └── .env.example          # Environment variable template
│
├── frontend/
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Route-level page components
│   │   ├── layouts/          # Page layout wrappers
│   │   ├── services/         # API client & external services
│   │   ├── hooks/            # Custom React hooks
│   │   ├── utils/            # Helper functions
│   │   ├── assets/           # Images, icons, fonts
│   │   └── styles/           # Global & shared styles
│   ├── package.json          # Node.js dependencies
│   ├── vite.config.js        # Vite configuration
│   ├── tailwind.config.js    # Tailwind CSS configuration
│   └── .env.example          # Environment variable template
│
├── README.md                 # Project documentation
└── .gitignore                # Git ignore rules
```

---

## Getting Started

### Prerequisites

- **Python** 3.12+
- **Node.js** 18+
- **MongoDB** (local or cloud instance)

### Backend Setup

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Copy environment template
cp .env.example .env

# Start the development server
uvicorn main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`
Interactive docs at `http://localhost:8000/docs`

### Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`

---

## Environment Variables

### Backend (`backend/.env`)

| Variable              | Description                    | Default                         |
| --------------------- | ------------------------------ | ------------------------------- |
| `APP_NAME`            | Application name               | LLM Evaluation Platform        |
| `APP_VERSION`         | Application version            | 1.0.0                          |
| `DEBUG`               | Debug mode                     | true                            |
| `MONGODB_URL`         | MongoDB connection string      | mongodb://localhost:27017       |
| `MONGODB_DB_NAME`     | Database name                  | llm_evaluation                  |
| `CHROMA_HOST`         | ChromaDB host                  | localhost                       |
| `CHROMA_PORT`         | ChromaDB port                  | 8001                            |
| `CORS_ORIGINS`        | Allowed CORS origins           | http://localhost:5173           |

### Frontend (`frontend/.env`)

| Variable           | Description        | Default                  |
| ------------------ | ------------------ | ------------------------ |
| `VITE_API_BASE_URL`| Backend API URL    | http://localhost:8000    |
| `VITE_APP_TITLE`   | Application title  | LLM Evaluation Platform |

---

## Milestones

| Milestone | Description                          | Status         |
| --------- | ------------------------------------ | -------------- |
| **M1**    | Project Foundation & Infrastructure  | ✅ Complete     |
| **M2**    | Evaluation Input Module              | 🔲 Planned     |
| **M3**    | Reference Knowledge Base             | 🔲 Planned     |
| **M4**    | RAG Pipeline                         | 🔲 Planned     |
| **M5**    | Multi-Agent Judge Pipeline           | 🔲 Planned     |
| **M6**    | Dashboard & Analytics                | 🔲 Planned     |
| **M7**    | Batch Evaluation                     | 🔲 Planned     |

---

## License

This project is developed as part of an internship program. All rights reserved.
