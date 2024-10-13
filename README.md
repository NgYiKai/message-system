<a id="readme-top"></a>


<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```
* Docker(Optional)
  
If you prefer using Docker, ensure Docker is installed and running on your machine. You can download it from Docker's official website.

### Getting Started with Docker

1. Clone the repo
   ```sh
   git clone https://github.com/NgYiKai/message-system.git
   ```

2. Run docker compose
   ```
   docker compose up
   ```

3. Access the app at localhost:3001
   
   Access with admin account
   ```
   email: admin@admin.com
   password: 123456
   ```

   Access with user account
   ```
   email: user@user.com
   password: 123456
   ```
    
### Getting Started without Docker

1. Clone the repo
   ```sh
   git clone https://github.com/NgYiKai/message-system.git
   ```
2. Install dependencies for backend

   Navigate to the backend directory and install the required dependencies 
   ```sh
   cd backend
   npm install
   ```
3. Set up your environment variables

   Copy the ```.env.example``` file to create your .env file
   
   ```js
    cp .env.example .env
   ```
   Update the ```.env``` file with your specific settings, especially your database credentials
   
4. Run migration and generate prisma client
   ```sh
   npx prisma migrate deploy
   npx prisma generate
   ```

5. Seed the database
    ```
    npx prisma db seed
    ```
    
6. Start the development server
    ```
    npm run start:dev  
    ```

7. Install dependencies for frontend

   Navigate to the ```/frontend``` directory and install the required dependencies via npm

   ```
   npm install
   ```

8. Set up your environment variables

   Copy the ```.env.example``` file to create your .env file
   
   ```js
    cp .env.example .env
   ```
   Update the ```.env``` file,  the ```NEXT_PUBLIC_API_URL=``` should point to your server

9. Start the development server
    ```
    npm run dev
    ```

10. Access the app at localhost:3001
   
   Access with admin account
   ```
   email: admin@admin.com
   password: 123456
   ```

   Access with user account
   ```
   email: user@user.com
   password: 123456
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



