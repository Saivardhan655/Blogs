# Blog Backend

This is the backend for a blogging application built with Node.js and MongoDB. It provides APIs for blog posts, comments, tagging, and user authentication, and it includes a recommendation system for posts. The project is deployed on AWS EC2 using Docker and GitHub Actions for CI/CD.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Directory Structure](#directory-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Docker Setup](#docker-setup)
- [CI/CD with GitHub Actions](#cicd-with-github-actions)
- [Deployment to EC2](#deployment-to-ec2)
- [API Documentation](#api-documentation)

## Project Overview

This backend is designed to support a blog platform with features such as user authentication, CRUD operations for posts, and a tagging system that enhances post recommendations. A CI/CD pipeline is implemented to deploy updates automatically to an EC2 instance upon each push to the main branch.

## Features

- **User Authentication**: Registration and login with JWT-based authentication.
- **Blog Management**: CRUD operations for blog posts.
- **Commenting**: Allows users to comment on blog posts.
- **Tagging System**: Users can add tags to posts, which helps improve recommendations.
- **Recommender System**: Provides post recommendations based on tags.

## Directory Structure

```plaintext
Backend/
├── config/                # Configuration files
├── controllers/           # Controller logic
├── middleware/            # Authentication and error handling middleware
├── models/                # MongoDB models
├── routes/                # Express routes
├── utils/                 # Utility functions
└── server.js              # Main server file
```

## Getting Started

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or later)
- [Docker](https://www.docker.com/)
- [MongoDB](https://www.mongodb.com/)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/backend-blog.git
   cd backend-blog/Backend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables** (see below).

4. **Start the server**:

   ```bash
   npm start
   ```

The server should now be running on `http://localhost:3000`.

## Environment Variables

Create a `.env` file in the `Backend` directory and add the following variables:

```plaintext
MONGO_URI=your_mongo_db_connection_string
PORT=your_port
JWT_SECRET=your_jwt_secret
JWT_LIFETIME=jwt_token_lifetime
```

## Docker Setup

1. **Build the Docker image**:

   ```bash
   docker build -t your_dockerhub_username/backend-blog .
   ```

2. **Run the Docker container**:

   ```bash
   docker run -d --name blog-back -p 3000:3000 \
     -e MONGO_URI=your_mongo_db_connection_string \
     -e PORT=3000 \
     -e JWT_SECRET=your_jwt_secret \
     -e JWT_LIFETIME=jwt_token_lifetime \
     your_dockerhub_username/backend-blog
   ```

## CI/CD with GitHub Actions

The GitHub Actions workflow is configured to automate the CI/CD pipeline, building the Docker image and deploying it to an EC2 instance upon a push to the main branch.

### Workflow File

The workflow file `ci-cd.yml` is located in the `.github/workflows` folder.

```yaml
name: CI/CD for Backend Docker

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2

      - name: Log in to Docker Hub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      - name: Build and push Docker image
        uses: docker/build-push-action@v2
        with:
          context: ./Backend
          file: ./Backend/Dockerfile
          push: true
          tags: saivardhan24/backend-blog:latest
          
      - name: Deploy to EC2
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SSH_HOST }}
          username: ${{ secrets.SSH_USERNAME }}
          key: ${{ secrets.SSH_KEY }}
          script: |
            sudo docker pull saivardhan24/backend-blog:latest
            sudo docker stop blog-back || true
            sudo docker rm blog-back || true
            sudo docker run -d --name blog-back -p 3000:3000 \
              -e MONGO_URI="${{ secrets.MONGO_URI }}" \
              -e PORT="${{ secrets.PORT }}" \
              -e JWT_SECRET="${{ secrets.JWT_SECRET }}" \
              -e JWT_LIFETIME="${{ secrets.JWT_LIFETIME }}" \
              saivardhan24/backend-blog:latest
```

### Secrets Configuration

Configure the following secrets in your GitHub repository settings:

- **DOCKER_USERNAME**: Your Docker Hub username
- **DOCKER_PASSWORD**: Your Docker Hub password
- **SSH_HOST**: The public IP address of your EC2 instance
- **SSH_USERNAME**: The SSH username for your EC2 instance
- **SSH_KEY**: The private SSH key for accessing EC2
- **MONGO_URI**: MongoDB connection URI
- **PORT**: Port on which the backend server should run (e.g., `3000`)
- **JWT_SECRET**: Secret key for JWT
- **JWT_LIFETIME**: JWT token lifetime (e.g., `1d`)

## Deployment to EC2

The backend is deployed to an AWS EC2 instance. Upon each push to the main branch, GitHub Actions builds and pushes the Docker image to Docker Hub and then deploys the container to EC2, ensuring the application is always up-to-date.


### feel free to contribute.
