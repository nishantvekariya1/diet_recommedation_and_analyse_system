const User = require("../models/user");
const Food = require("../models/food");
const axios = require("axios");
const express = require("express");
const mongoose=require("mongoose");

const user = async (req, res) => {
  try {
    const userData = req.user;

    return res.status(200).json({ userData });
  } catch (error) {
    console.log(`Error from user Route : ${error}`);
  }
};

const home = async (req, res) => {
  try {
    res.status(200).send("Hello From the Home Page");
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res) => {
  // try {
  //   const {
  //     username,
  //     email,
  //     gender,
  //     weight,
  //     height,
  //     dietaryPreferences,
  //     allergies,
  //     healthGoals,
  //     password,
  //     age,
  //     activityLevel,
  //   } = req.body;
  //   const userExist = await User.findOne({ email });
  //   if (userExist) {
  //     return res.status(200).json({ message: "Email is already exist" });
  //   }
  //   const userCreated = await User.create({
  //     username,
  //     email,
  //     gender,
  //     weight,
  //     height,
  //     dietaryPreferences,
  //     allergies,
  //     healthGoals,
  //     password,
  //     age,
  //     activityLevel,
  //   });
  //   res.status(200).json({
  //     message: "Registration Successfull",
  //     token: await userCreated.generateToken(),
  //     userId: userCreated._id.toString(),
  //   });
  // } catch (error) {
  //   console.log(error);
  // }
  // try {
  //   const {
  //     username,
  //     email,
  //     gender,
  //     weight,
  //     height,
  //     dietaryPreferences,
  //     allergies,
  //     healthGoals,
  //     password,
  //     age,
  //     activityLevel,
  //   } = req.body;
  //   const userExist = await User.findOne({ email });
  //   if (userExist) {
  //     return res.status(400).json({ message: "Email already exists" });
  //   }
  //   // Fetch diet recommendation
  //   const userInfo = {
  //     age,
  //     gender,
  //     weight,
  //     height,
  //     activity_level: activityLevel,
  //     health_goal: healthGoals,
  //     diet_type: dietaryPreferences,
  //     allergies,
  //   };
  //   console.log("User Info :: ", userInfo);
  //   try {
  //     const response = await axios.post(
  //       "http://127.0.0.1:5000/recommend",
  //       userInfo,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     console.log("reponse :: ", response.data);
  //     // const { meal_plan, nutrition_summary, target_calories } = response.data;
  //     // // Update user with diet recommendation
  //     // user.mealPlan = meal_plan;
  //     // user.nutritionSummary = nutrition_summary;
  //     // user.targetCalories = target_calories;
  //     // await user.save();
  //   } catch (error) {
  //     console.error("Error fetching diet recommendation:", error.message);
  //   }
  //   // res.status(201).json({
  //   //   message: "Registration Successful",
  //   //   token: await user.generateToken(),
  //   //   userId: user._id.toString(),
  //   // });
  //   res.status(201).json({
  //     message: "Registration Successful",
  //   });
  // } catch (error) {
  //   console.error("Registration error:", error);
  //   res.status(500).json({ message: "Server error" });
  // }

  try {
    const {
      username,
      email,
      gender,
      weight,
      height,
      dietaryPreferences,
      allergies,
      healthGoals,
      password,
      age,
      activityLevel,
    } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const user = new User({
      username,
      email,
      gender,
      weight,
      height,
      dietaryPreferences,
      allergies,
      healthGoals,
      password,
      age,
      activityLevel,
    });

    const userInfo = {
      age,
      gender,
      weight,
      height,
      activity_level: activityLevel,
      health_goal: healthGoals,
      diet_type: dietaryPreferences,
      allergies,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/recommend",
        userInfo,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { meal_plan, nutrition_summary, target_calories } = response.data;

      user.mealPlan = meal_plan;
      user.nutritionSummary = nutrition_summary;
      user.targetCalories = target_calories;

      await user.save();

      res.status(201).json({
        message: "Registration Successful",
        token: await user.generateToken(),
        userId: user._id.toString(),
      });
    } catch (error) {
      console.error("Error fetching diet recommendation:", error.message);
      return res
        .status(500)
        .json({ message: "Failed to fetch diet recommendation" });
    }
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
};



// nihal
const updateProfile = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    const {
      email,
      age,
      gender,
      weight,
      height,
      activityLevel,
      healthGoals,
      dietaryPreferences,
      allergies,
    } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Verify MongoDB connection
    const connectionState = mongoose.connection.readyState;
    console.log('MongoDB connection state:', connectionState);
    if (connectionState !== 1) {
      return res.status(500).json({ message: "Database not connected" });
    }

    // Find user
    const user = await User.findOne({ email });
    console.log('Found user:', user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prepare data for Python API
    const userInfo = {
      age,
      gender,
      weight,
      height,
      activity_level: activityLevel,
      health_goal: healthGoals,
      diet_type: dietaryPreferences,
      allergies: allergies || [], // Ensure allergies is an array
    };

    // Fetch diet recommendation
    const response = await axios.post(
      "http://127.0.0.1:5000/recommend",
      userInfo,
      { headers: { "Content-Type": "application/json" } }
    );
    console.log('Python API response:', response.data);

    const { meal_plan, nutrition_summary, target_calories } = response.data;

    // Update user fields according to schema
    user.mealPlan = {
      Breakfast: meal_plan.Breakfast || [],
      Lunch: meal_plan.Lunch || [],
      Dinner: meal_plan.Dinner || [],
    };
    user.nutritionSummary = {
      calories: nutrition_summary.calories || 0,
      carbs: nutrition_summary.carbs || 0,
      fat: nutrition_summary.fat || 0,
      protein: nutrition_summary.protein || 0,
    };
    user.targetCalories = target_calories || 0;

    // Mark nested objects as modified
    user.markModified('mealPlan');
    user.markModified('nutritionSummary');

    // Optionally update other fields if provided
    if (age) user.age = age;
    if (gender) user.gender = gender;
    if (weight) user.weight = weight;
    if (height) user.height = height;
    if (activityLevel) user.activityLevel = activityLevel;
    if (healthGoals) user.healthGoals = healthGoals;
    if (dietaryPreferences) user.dietaryPreferences = dietaryPreferences;
    if (allergies) user.allergies = allergies;

    console.log('User before save:', user);

    // Save changes
    const updatedUser = await user.save();
    if (!updatedUser) {
      throw new Error("Failed to save user updates");
    }
    console.log('User after save:', updatedUser);

    // Verify update in DB
    const verifiedUser = await User.findOne({ email });
    console.log('Verified user from DB:', verifiedUser);

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Profile update error:", error.stack);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const getUserByEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const data = await User.findOne({ email }, { password: 0 });

    if (!data) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(data);
  } catch (error) {
    if (!res.headersSent) {
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
    next(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const user = await userExist.comparePassword(password);

    if (user) {
      res.status(200).json({
        message: "Login Successfull",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    res.status(500).json("Internal server error");
  }
};

const updateUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const updateUserData = req.body;

    const updatedData = await User.updateOne(
      { _id: id },
      { $set: updateUserData }
    );

    return res.status(200).json(updatedData);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await User.find({ _id: id }, { password: 0 });

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find({});
    if (!foods || foods.length === 0) {
      return res.status(400).json({ message: "No food found" });
    }

    return res.status(200).json(foods);
  } catch (error) {
    // next(error);
  }
};

const searchFood = async (req, res, next) => {
  try {
    let { name } = req.body;
    name = name.toLowerCase();

    const foods = await Food.find({
      foodname: { $regex: new RegExp(name, "i") },
    }).lean();

    const foodsLowercase = foods.map((food) => ({
      ...food,
      foodname: food.foodname.toLowerCase(),
    }));

    res.json(foodsLowercase);
  } catch (error) {
    next(error);
  }
};

const filterFood = async (req, res, next) => {
  try {
    let { categories } = req.body;

    if (!Array.isArray(categories)) {
      categories = [categories];
    }

    const lowerCaseCategories = categories.map((cat) => cat.toLowerCase());

    const regexPattern = lowerCaseCategories.join("|");

    const foods = await Food.find({
      category: { $regex: new RegExp(regexPattern, "i") },
    }).lean();

    const foodsLowercase = foods.map((food) => ({
      ...food,
      category: food.category.toLowerCase(),
    }));

    res.json(foodsLowercase);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  user,
  home,
  register,
  login,
  updateUserById,
  updateProfile,
  getUserByEmail,
  getUserById,
  getAllFoods,
  searchFood,
  filterFood,
};
