# Cloud-Based-IP-Checker-Microservices-System
A distributed cloud-based IP analysis checker, built using multiple programming languages and deployed through Docker and Kubernetes.

## Features
- Validate IPV4 and IPV6 addresses
- Classify addresses as IPV4 or IPV6
- Country look-up based on predefined IP ranges
- Detect known bad IP addresses
- Reverse Proxy routing for service access
- Saving and restoring IP lists
- Kubernetes orchestration and ingress routing

## Technologies

## Backend Services
- Java
- Python(Flask)
- C# (.NET)
- Node.js (Express)

## Cloud & DevOps
- Docker
- Kubernetes
- Rancher
- GitLab CI/CD Pipelines

## Architecture

The platform contains multiple microservices, each responsible for a singular function:

- Total Valid IP Service (Java)
- IP Classification Service (Python)
- Country Information Service (C#)
- Bad IP Detection Service (Node.js)
- Save and Restore Service (Python)
- Reverse Proxy Service (Node.js)

All services are containerised with Docker and deployed to a Kubernetes cluster.
Automated CI/CD pipelines were used to build, test and validate the services before deployment.

## Skills Demonstrated

- Microservice architecture
- Multi-language backend development
- REST API development
- Containerisation with Docker
- Kubernetes deployments
- Reverse Proxy configuration
- CI/CD pipeline creation
- Cloud-native application design

## Author Luke Milnes
