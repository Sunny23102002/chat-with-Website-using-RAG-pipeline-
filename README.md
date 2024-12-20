# Chat with Website Using RAG Pipeline

## Overview
The "Chat with Website Using RAG Pipeline" project implements a Retrieval-Augmented Generation (RAG) pipeline. It allows users to interact with structured and unstructured data extracted from websites, offering accurate, context-rich responses using a language model (LLM).

This documentation guides you through the setup, installation, and usage of the project hosted on your GitHub repository: [Chat with Website Using RAG Pipeline](https://github.com/Sunny23102002/chat-with-Website-using-RAG-pipeline-/tree/main).

---



# Deployed at :
https://zesty-peony-8614dd.netlify.app

## Features
1. **Data Ingestion**:
   - Crawl and scrape website content.
   - Extract text, metadata, and key fields.
   - Segment text into smaller chunks for embedding generation.
   - Convert chunks into vector embeddings.
   - Store embeddings in a vector database.

2. **Query Handling**:
   - Convert user queries into vector embeddings.
   - Perform similarity search in the vector database to retrieve relevant chunks.
   - Use retrieved chunks to prompt the LLM for context-rich responses.

3. **Response Generation**:
   - Generate detailed responses using the LLM.
   - Ensure factuality by grounding responses in the retrieved data.

---

## Setup Instructions

### Prerequisites
1. **Software Requirements**:
   - Python (>= 3.8)
   - Node.js and npm (for the frontend)
   - Docker (optional, for containerized deployment)

2. **Libraries**:
   - FastAPI for the backend.
   - LangChain for RAG implementation.
   - FAISS or other vector database.
   - OpenAI or other LLM API access.

3. **Environment Variables**:
   - Set up the following in a `.env` file:
     ```env
     OPENAI_API_KEY=<your_openai_api_key>
     VECTOR_DB_PATH=<path_to_vector_db>
     ```

---

### Cloning the Repository
Clone the repository to your local machine:
```bash
git clone https://github.com/Sunny23102002/chat-with-Website-using-RAG-pipeline-.git
cd chat-with-Website-using-RAG-pipeline-
```

---

## Backend Setup

### 1. Install Python Dependencies
Install the required Python libraries using pip:
```bash
pip install -r requirements.txt
```

### 2. Launch the Backend Server
Start the FastAPI backend:
```bash
uvicorn app:app --host 0.0.0.0 --port 8000
```
Access the API documentation at `http://127.0.0.1:8000/docs`.

---

## Frontend Setup

### 1. Navigate to the Frontend Directory
```bash
cd frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Frontend Server
```bash
npm start
```
Access the frontend at `http://localhost:3000/`.

---

## Key Functionalities

### 1. Data Ingestion
Run the script to scrape website data and store embeddings:
```bash
python ingest_data.py --urls <website_url_1> <website_url_2>
```
This script will:
- Crawl the provided URLs.
- Extract and preprocess text.
- Generate vector embeddings.
- Save the embeddings in the specified vector database.

### 2. Query Handling
Send a query via the frontend or use a curl command to test the backend:
```bash
curl -X POST "http://127.0.0.1:8000/query" -H "Content-Type: application/json" -d '{"query": "What is the contact information for the website?"}'
```
Expected Response:
```json
{
  "answer": "The contact information is..."
}
```

### 3. Response Generation
The retrieved data is passed to the LLM to generate a context-rich response.

---

## Deployment

### Using Docker
1. **Build Docker Image**:
   ```bash
   docker build -t rag-pipeline .
   ```

2. **Run Docker Container**:
   ```bash
   docker run -p 8000:8000 -d rag-pipeline
   ```

### Deploy to Cloud (Optional)
Deploy the Docker image to a cloud service like AWS, GCP, or Azure for scalability.

---

## Testing

### Unit Tests
Run tests to verify the pipeline functionality:
```bash
pytest
```

### Integration Tests
Test the full pipeline by simulating user queries:
```bash
python test_pipeline.py
```

---

## Contributing
Contributions are welcome! Please follow the steps below:
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-branch-name
   ```
3. Commit your changes and push the branch:
   ```bash
   git commit -m "Description of changes"
   git push origin feature-branch-name
   ```
4. Open a pull request.

---

## Contact
For issues or feature requests, open an issue on GitHub or contact the repository maintainer.
