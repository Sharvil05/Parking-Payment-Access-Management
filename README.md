\# Parking Payment \& Access Management System



\## Project Overview



Parking Payment \& Access Management System is a full-stack web application developed to manage parking operations efficiently.



The system allows an administrator to manage users, vehicles, parking slots, vehicle entry and exit, payments, and parking reports through a centralized dashboard.



The application consists of:



\- React.js frontend

\- Spring Boot backend

\- MySQL database

\- Spring Security with JWT authentication



\---



\# Admin Login



The application automatically creates a default administrator account.



Email: admin@parking.com

Password: Admin@123







\## Technologies Used



\### Frontend



\- React.js

\- JavaScript

\- HTML

\- CSS

\- React Router

\- Axios

\- Vite



\### Backend



\- Java

\- Spring Boot

\- Spring Security

\- JWT Authentication

\- Spring Data JPA

\- Hibernate

\- Maven

\- Lombok



\### Database



\- MySQL



\### Tools



\- VS Code

\- IntelliJ IDEA / Eclipse

\- Git

\- GitHub



\---



\## Key Features



\### Authentication



\- Admin login

\- JWT-based authentication

\- Secure password encryption using BCrypt

\- Logout functionality



\### Dashboard



\- Total users

\- Total vehicles

\- Total parking slots

\- Available slots

\- Occupied slots

\- Active sessions

\- Completed sessions

\- Total payments

\- Total revenue



\### User Management



\- Add user

\- View users

\- Update users

\- Delete users



\### Vehicle Management



\- Add vehicle

\- View vehicles

\- Update vehicles

\- Delete vehicles

\- Vehicle types: BIKE, CAR, SUV, TRUCK



\### Parking Slot Management



\- Add parking slots

\- View parking slots

\- Update parking slots

\- Delete parking slots

\- Slot status management



\### Entry / Exit



\- Record vehicle entry

\- Assign parking slot

\- Record vehicle exit

\- Calculate parking duration

\- Calculate parking fee

\- Automatically update slot availability



\### Payments



\- Record parking payments

\- Payment methods:

&#x20; - CASH

&#x20; - CARD

&#x20; - UPI

\- Payment status management

\- Transaction reference



\### Reports



\- Parking statistics

\- Payment statistics

\- Total revenue

\- Active and completed sessions



\### Additional Features



\- Light/Dark theme

\- Responsive interface

\- Error handling

\- Protected APIs



\---



\## Project Structure



Parking-Payment-Access-Management/

│

├── backend/

│   ├── src/

│   ├── .env.example

│   ├── pom.xml

│   ├── mvnw

│   └── mvnw.cmd

│

├── frontend/

│   ├── src/

│   ├── public/

│   ├── package.json

│   └── vite.config.js

│

├── database/

│   ├── schema.sql

│   └── sample-data.sql

│

├── docs/

├── screenshots/

├── test-cases/

├── .gitignore

└── README.md

```



\---



\# Installation and Setup



\## Prerequisites



Install the following before running the project:



\- Java JDK

\- Node.js

\- npm

\- MySQL

\- Git



Check the installations:



```bash

java -version

node -v

npm -v

mysql --version

git --version

```



\---



\## Database Setup



Create the database in MySQL:



```sql

CREATE DATABASE parking\_management\_db;

```



Then execute the database schema:



```text

database/schema.sql

```



For sample/demo data, execute:



```text

database/sample-data.sql

```



The database contains the following main entities:



\- Users

\- Vehicles

\- Parking Slots

\- Parking Sessions

\- Payments



\---



\## Backend Setup



Go to the backend directory:



```bash

cd backend

```



Create a `.env` file:



```text

backend/.env

```



Add your local database credentials:



```env

DB\_USERNAME=root

DB\_PASSWORD=your\_mysql\_password

JWT\_SECRET=your\_jwt\_secret

```



Do not upload the `.env` file to GitHub.



An example file is provided:



```text

backend/.env.example

```



\### Start Backend



For Windows:



```bash

.\\mvnw.cmd spring-boot:run

```



For Linux/macOS:



```bash

./mvnw spring-boot:run

```



Backend URL:



```text

http://localhost:8080

```



\---



\## Frontend Setup



Open another terminal:



```bash

cd frontend

```



Install dependencies:



```bash

npm install

```



Start the frontend:



```bash

npm run dev

```



Frontend URL:



```text

http://localhost:5173

```



\---



\## Running the Complete Application



Use two terminals.



\### Terminal 1 — Backend



```bash

cd backend

.\\mvnw.cmd spring-boot:run

```



\### Terminal 2 — Frontend



```bash

cd frontend

npm install

npm run dev

```



Then open the frontend URL displayed by Vite.



\---



\# Admin Login



The application automatically creates a default administrator account.



```text

Email: admin@parking.com

Password: Admin@123

```



Use these credentials to log in to the application.



\---



\# Environment Variables



The backend requires the following environment variables:



| Variable | Description |

|---|---|

| `DB\_USERNAME` | MySQL username |

| `DB\_PASSWORD` | MySQL password |

| `JWT\_SECRET` | Secret key used for JWT authentication |



Example:



```env

DB\_USERNAME=root

DB\_PASSWORD=your\_mysql\_password

JWT\_SECRET=your\_jwt\_secret

```



The actual `.env` file is not committed to GitHub.



\---



\# API Documentation



The backend provides REST APIs for the following modules:



| Module | Endpoint |

|---|---|

| Authentication | `/auth/login` |

| Dashboard | `/dashboard/summary` |

| Users | `/users` |

| Vehicles | `/vehicles` |

| Parking Slots | `/parking-slots` |

| Parking Entry | `/parking/entry` |

| Parking Exit | `/parking/exit` |

| Payments | `/payments` |

| Reports | `/reports/summary` |



JWT authentication is used for protected APIs.



\### Authentication



```http

POST /auth/login

```



Example request:



```json

{

&#x20; "email": "admin@parking.com",

&#x20; "password": "Admin@123"

}

```



\### Dashboard



```http

GET /dashboard/summary

```



\### Reports



```http

GET /reports/summary

```



For complete API implementation, refer to the controller classes inside:



```text

backend/src/main/java/com/nexoraa/parking/controller/

```



\---



\# Database Schema / ER Diagram



The main database entities are:



\- Users

\- Vehicles

\- Parking Slots

\- Parking Sessions

\- Payments



The complete SQL schema is available in:



```text

database/schema.sql

```



Sample data is available in:



```text

database/sample-data.sql

```



\### Main Relationships



```text

Users

&#x20; |

&#x20; └── Vehicles

&#x20;       |

&#x20;       └── Parking Sessions

&#x20;             |

&#x20;             ├── Parking Slots

&#x20;             |

&#x20;             └── Payments

```



The detailed database schema is provided in `database/schema.sql`.



If an ER diagram image is included, it will be available at:



```text

docs/ER-Diagram.png

```



\---



\# Testing



Test cases and test results are available in:



```text

test-cases/

```



Testing covers:



\- Login

\- User management

\- Vehicle management

\- Parking slot management

\- Parking entry

\- Parking exit

\- Payments

\- Reports

\- Authentication

\- Error handling



Sample test data is available in:



```text

database/sample-data.sql

```



\---



\# Screenshots



Application screenshots are available in:



```text

screenshots/

```



The screenshots include:



\- Login

\- Dashboard

\- Users

\- Vehicles

\- Parking Slots

\- Entry / Exit

\- Payments

\- Reports

\- Dark Theme



\---



\# Assumptions



\- The system is designed primarily for a single parking facility.

\- MySQL is used as the database.

\- Each vehicle belongs to a registered user.

\- Each parking session is associated with one vehicle and one parking slot.

\- Each parking session can have one payment.

\- Payment methods supported are CASH, CARD, and UPI.

\- The default administrator account is created automatically.

\- Database credentials are provided through environment variables.



\---



\# Deployment



\## Backend



Build the Spring Boot application:



```bash

cd backend

.\\mvnw.cmd clean package

```



The generated JAR file will be available in:



```text

backend/target/

```



Run the application using:



```bash

java -jar <generated-jar-file>.jar

```



Configure the required environment variables before deployment.



\## Frontend



Build the React application:



```bash

cd frontend

npm install

npm run build

```



The production files will be generated in:



```text

frontend/dist/

```



The frontend can then be deployed to a suitable static hosting service.



\### Production Notes



\- Use a production MySQL database.

\- Use secure database credentials.

\- Use a strong JWT secret.

\- Enable HTTPS.

\- Do not commit `.env` files.



\---



\# Known Limitations



\- No real payment gateway integration.

\- No IoT parking sensor integration.

\- No SMS/email notification system.

\- Primarily designed for a single parking facility.

\- No online parking reservation functionality.

\- Advanced analytics are not currently implemented.



\---



\# Future Enhancements



\- Online payment gateway

\- QR-code-based parking entry

\- QR-code-based payment

\- Parking reservation

\- Real-time IoT parking sensors

\- Email/SMS notifications

\- Multiple parking locations

\- Advanced analytics

\- Automated invoice generation

\- Mobile application

\- Cloud deployment



\---



\# GitHub Repository



\[Parking Payment \& Access Management System](https://github.com/Sharvil05/Parking-Payment-Access-Management.git)







