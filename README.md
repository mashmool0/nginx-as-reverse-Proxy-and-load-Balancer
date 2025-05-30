# Nginx Reverse Proxy and Load Balancer 

A minimal example project for using **Nginx** as a reverse proxy and load balancer between a Django backend and a React frontend.

---

## Contents

- Django backend (`backend/`)
- React frontend (`frontend/`)
- Nginx configuration (`nginx.conf`)
- SSL certificates (`cert.pem`, `key.pem`)

---

## How It Works

- **Nginx** listens for all web requests.
- It forwards API requests to the Django backend and static file requests to the React frontend.
- Nginx balances load if you run multiple backend servers (can be expanded).

---

## Project Structure

```
.
├── backend/        # Django (calculator app)
├── frontend/       # React app
├── nginx.conf      # Nginx configuration file
├── cert.pem        # SSL certificate
├── key.pem         # SSL private key
└── README.md
```

---

## Prerequisites

- Python & Django (`backend/`)
- Node.js & npm (`frontend/`)
- **Nginx** installed on your system

---

## Running the Project

### 1. Start Backend

```bash
cd backend
python manage.py runserver 8000
```

### 2. Start Frontend

```bash
cd frontend
npm install
npm start
```

### 3. Run Nginx with Your Config

Make sure your `nginx.conf` points to the correct ports for backend (Django) and frontend (React).

Typical way to reload nginx:

```bash
sudo nginx -c /path/to/nginx.conf
sudo nginx -s reload
```

**If using SSL:**  
Make sure `cert.pem` and `key.pem` match your config file paths.

---

## Example Nginx Config

Your `nginx.conf` should look something like:

```nginx
events {}

http {
	server {
		listen 443 ssl;

		
		server_name localhost; 
	
		ssl_certificate /home/mashmool/Programming/nginx_learning/cert.pem;
		ssl_certificate_key /home/mashmool/Programming/nginx_learning/key.pem;	
		location / {
			proxy_pass http://localhost:3000;
			proxy_set_header Host $host;
			proxy_set_header X-Real-IP $remote_addr;
		}
		location /api {
			proxy_pass http://127.0.0.1:8000;
			proxy_set_header Host $host;
			proxy_set_header X-Real-IP $remote_addr;
		}
	}
	server {
		listen 80 ; 
		
		server_name localhost; 
		return 301 https://$host$request_uri;
	}
}

```

---

## Notes

- Direct access to `localhost:8000` (backend) and `localhost:3000` (frontend) is NORMAL in development.
- Internal Nginx proxying is for unified access (`https://localhost`) and easy future scaling.
- For **production**, always use real domain names and HTTPS everywhere.

---

## Future Improvements

- Add Docker for easier deployment
- Add environment-specific configs
- Implement advanced Nginx features (rate limit, caching, etc.)



