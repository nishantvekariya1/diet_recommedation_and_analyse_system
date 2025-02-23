"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import {
  Restaurant,
  FitnessCenter,
  Height,
  Scale,
  TrendingUp,
  LocalFireDepartment,
  BreakfastDining,
  LunchDining,
  DinnerDining
} from "@mui/icons-material"

export default function Recommendation() {
  const [userData, setUserData] = useState(null)
  const email = localStorage.getItem("email")

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.post("http://localhost:3000/api/auth/get-user-info", { email })
        setUserData(response.data)
      } catch (error) {
        console.error("Error fetching user info:", error)
      }
    }

    fetchUserInfo()
  }, [email])

  if (!userData) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div>
      <h1 className="recommendation-title">Recommendation for You</h1>
      <div className="recommendation-container">
        <div className="user-info-grid">
          <InfoCard icon={<Restaurant />} title="Dietary Preference" value={userData.dietaryPreferences} />
          <InfoCard icon={<FitnessCenter />} title="Activity Level" value={userData.activityLevel} />
          <InfoCard icon={<Scale />} title="Weight" value={`${userData.weight} kg`} />
          <InfoCard icon={<TrendingUp />} title="Health Goal" value={userData.healthGoals} />
          <InfoCard icon={<Height />} title="Height" value={`${userData.height} ft`} />
          <InfoCard
            icon={<LocalFireDepartment />}
            title="Target Calories"
            value={`${Math.round(userData.targetCalories)} kcal`}
          />
        </div>

        <div className="meal-plan-container">
          <h2 className="section-title">Meal Plan</h2>
          <div className="meal-plan-grid">
            <MealCard icon={<BreakfastDining />} title="Breakfast" meals={userData.mealPlan.Breakfast} />
            <MealCard icon={<LunchDining />} title="Lunch" meals={userData.mealPlan.Lunch} />
            <MealCard icon={<DinnerDining />} title="Dinner" meals={userData.mealPlan.Dinner} />
          </div>
        </div>

        <div className="nutrition-summary">
          <h2 className="section-title">Nutrition Summary</h2>
          <div className="nutrition-grid">
            <NutritionCard title="Calories" value={`${Math.round(userData.nutritionSummary.calories)} kcal`} />
            <NutritionCard title="Carbs" value={`${Math.round(userData.nutritionSummary.carbs)} g`} />
            <NutritionCard title="Fat" value={`${Math.round(userData.nutritionSummary.fat)} g`} />
            <NutritionCard title="Protein" value={`${Math.round(userData.nutritionSummary.protein)} g`} />
          </div>
        </div>
      </div>
    </div>
  )
}

function InfoCard({ icon, title, value }) {
  return (
    <div className="info-card">
      <div className="info-icon">{icon}</div>
      <div className="info-content">
        <h3>{title}</h3>
        <p>{value}</p>
      </div>
    </div>
  )
}

function MealCard({ icon, title, meals }) {
  return (
    <div className="meal-card">
      <div className="meal-header">
        {icon}
        <h3>{title}</h3>
      </div>
      <ul className="meal-list">
        {meals.map((meal, index) => (
          <li key={index}>{meal}</li>
        ))}
      </ul>
    </div>
  )
}

function NutritionCard({ title, value }) {
  return (
    <div className="nutrition-card">
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  )
}