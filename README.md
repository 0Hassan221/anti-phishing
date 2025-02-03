# Anti-Phishing Platform


## Prerequisites
Make sure you have the following installed on your system:
- PHP 8.3+
- Composer
- MySQL (for development) / PostgreSQL (for production)
- Redis (for caching)
- Node.js & npm (for frontend dependencies if needed)
- Laravel 11

## Installation Guide

### 1. Clone the Repository
```sh
git clone https://github.com/weaver010/Anti_phishing_platform.git
cd Anti_phishing_platform
```

### 2. Install Dependencies
```sh
composer install
```
If you encounter any errors, try updating Composer:
```sh
composer self-update
composer update
```

### 3. Set Up Environment Variables
Copy the example environment file and modify it accordingly:
```sh
cp .env.example .env
```
Edit `.env` and set up your database, mail, and API keys.

### 4. Generate Application Key
```sh
php artisan key:generate
```

### 5. Set Up Database
Make sure your database is running, then run:
```sh
php artisan migrate --seed
```
If migration fails, try:
```sh
php artisan migrate:fresh --seed
```

### 6. Configure Cache & Queue (Optional)
```sh
php artisan cache:clear
php artisan config:cache
php artisan queue:work
```
If you face queue issues, ensure the worker is running:
```sh
php artisan queue:restart
```

### 7. Start the Application
```sh
php artisan serve
```
Your backend should now be running at `http://127.0.0.1:8000`

## API Endpoints
The platform provides various API endpoints for phishing detection. You can test them using Postman or an API client. Documentation is available in the repository.

## Contributing
Feel free to submit issues and pull requests to improve this project.

## License
This project is open-source and available under the MIT License.
