# Development Environment Setup

This README provides common commands and instructions for setting up and managing the development environment using Docker Compose. It includes commands for starting, stopping, and managing services, as well as tools for package management, cleanup, and live reloading.


## 🚀 Start All Services

```
docker-compose up --build           # Builds and starts all containers fresh
```

## 🛑 Stop All Services (Cleanly)

```
Ctrl + C                # Stop gracefully
docker-compose down     # Remove containers, but not volumes
```

## 🔁 Rebuild Frontend Only

```
docker-compose up --build frontend
```

## 🔍 View Logs (Frontend)

```
docker-compose logs -f frontend
```

## 📦 Package Management

### ✅ Install a package (from host machine — recommended)

```
cd frontend
npm install <package-name>
```

Your running container sees the change because of the mounted volume.

### 📦 Install a package inside container (optional)

```
docker-compose exec frontend sh
npm install <package-name>
```

But make sure to reflect changes in package.json locally.


## 🧹 Cleanup Tools

### 🔥 Remove all containers, networks, and volumes (data loss!)

```
docker-compose down -v
```

### 🧼 Remove dangling images/volumes (optional cleanup)

```
docker system prune -f
docker volume prune -f
```

📂 File Watch / Live Reload

Since your frontend service is running with the following volume configuration:

```
volumes:
  - ./frontend:/app
  - /app/node_modules
```

Changes to your local files are mirrored into the container, so you can code normally with hot reload!


