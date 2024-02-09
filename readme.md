# Solar Calculator App

## Overview
The Solar Calculator App is a web application that enables users to estimate the solar energy potential for their location. It uses geolocation to retrieve solar irradiance data and calculate potential solar power output.

## Structure
The app is divided into two main parts:
- **Frontend**: A React-based user interface located in the `solar-calculator-app` directory.
- **Backend**: A Node.js server in the root directory which communicates with the NREL API to fetch solar data.

## Getting Started

1. Clone the repository.
2. Navigate to the `solar-calculator-app` directory and run `npm install` to install the required React dependencies.
3. Run `npm start` to start the React development server.
4. In a separate terminal, navigate to the root directory where `server.js` is located and run `npm install` to install the backend dependencies.
5. Create a `.env` file in the root directory with your NREL API key as `NREL_API_KEY=your_api_key_here`.
6. Run `node server.js` to start the backend server.
7. Access the app through `http://localhost:3000` (or your specified port) in your web browser.

## Usage

- Enter your location manually or use the "Find My Location" button to autofill it using geolocation.
- Adjust your average monthly energy consumption using the provided slider.
- The app will display the solar energy potential based on your location and energy consumption data.

## Note

Make sure to keep your API keys and sensitive data secure by not pushing the `.env` file to version control.
