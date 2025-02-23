# Diet Recommendation Website

The Diet Recommendation Website is a health-focused platform that provides personalized diet plans based on user preferences, health goals, and dietary restrictions. Built using the MERN stack (MongoDB, Express.js, React.js, Node.js), the platform offers features like user profile management, health tracking, and AI-based meal recommendations.

## Problem Statement
Maintaining a healthy diet is challenging due to a lack of personalized guidance, awareness of nutritional needs, and accessibility to well-structured meal plans. Many individuals struggle with meal planning, tracking their nutrition, and adhering to diets that align with their health goals and dietary restrictions.

## Solution
Our Diet Recommendation Website leverages AI-powered personalized meal planning to help users achieve their health goals, whether it’s weight loss, muscle gain, or balanced nutrition. By analyzing user preferences, dietary restrictions, and activity levels, our platform generates customized diet plans, tracks nutritional intake, and offers AI-driven meal suggestions.

How Our Solution Solves the Problem:
- Personalized Diet Plans: AI-driven meal recommendations tailored to individual health profiles.
- Dietary Restrictions Management: Users can set allergies and preferences to receive customized suggestions.
- Health Tracking: Monitors calorie intake, macronutrients, and daily nutrition balance.
- Admin Dashboard: Provides insights into user health trends, most followed diet plans, and engagement analytics.

This solution simplifies healthy eating by offering smart, data-driven, and user-friendly meal planning, making it easier for users to maintain a balanced diet while staying aligned with their health goals.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)

## Features

### **User Side**:
- **Personalized Diet Plans**: 
  - AI-generated meal recommendations based on user profile
  - Custom diet plans for different health goals (weight loss, muscle gain, etc.)
- **Profile Management**: 
  - Set and update health preferences (age, gender, activity level, etc.)
  - Track dietary restrictions and allergies
- **Meal Planner**:
  - View daily/weekly meal recommendations
  - Add meals to favorites
- **Health Tracking**:
  - Track calorie intake
  - Monitor macro and micronutrient consumption

### **Admin Side**:
- **User Management**:
  - View all registered users
  - Manage user preferences and restrictions
- **Diet Plan Management**:
  - Add, update, or delete meal recommendations
- **Analytics Dashboard**:
  - User statistics (age group, health goals distribution, etc.)
  - Graphs for most common dietary preferences
  - Trends in user engagement and diet adherence

## Technologies Used

- **MongoDB**: NoSQL database for storing user and meal data
- **Express.js**: Web application framework for Node.js
- **React.js**: Frontend library for building user interfaces
- **Node.js**: JavaScript runtime for server-side development
- **Mongoose**: ODM for MongoDB
- **JWT**: JSON Web Tokens for authentication
- **Chart.js**: JavaScript library for creating charts
- **AI Models**: for generating diet plans

## Getting Started

### **Prerequisites**

- Node.js
- npm
- MongoDB

### **Installation**

1. Clone the repository:
    ```bash
    git clone https://github.com/nishantvekariya1/diet-recommendation
    ```

2. Install dependencies for both the client and server:
    ```bash
    # In the server directory
    cd server
    npm install

    # In the client directory
    cd client
    npm install
    ```

3. Create a `.env` file in the root directory and add the following environment variables:
    ```env
    # In the server directory
    PORT=write_your_port_here
    MONGO_URI=your_mongodb_url
    JWT_SECRET=your_jwt_secret
    ```

4. Start the development servers:
    ```bash
    # In the server directory
    cd server
    npm run dev

    # In the client directory
    cd client
    npm run dev
    ```

5. Open your browser and navigate to `http://localhost:5173` to access the Diet Recommendation Website.

## Future Enhancements

- **Integration with Fitness Trackers** (Fitbit, Google Fit, etc.)
- **Real-time Chat with Dietitians**
- **AI-Based Recipe Suggestions**
- **Mobile App Version**
