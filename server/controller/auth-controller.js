const User = require("../models/user");
const Food = require("../models/food");
const axios = require("axios");
const express = require("express");

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

const updateProfile = async (req, res) => {
  try {
    const {
      email,
      age,
      gender,
      weight,
      height,
      activity_level,
      health_goal,
      diet_type,
      allergies,
    } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Find user in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userInfo = {
      age,
      gender,
      weight,
      height,
      activity_level,
      health_goal,
      diet_type,
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

      // Update user with new data
      user.mealPlan = meal_plan;
      user.nutritionSummary = nutrition_summary;
      user.targetCalories = target_calories;

      await user.save();

      res.status(200).json({
        message: "Profile updated successfully",
        user,
      });
    } catch (error) {
      console.error("Error fetching diet recommendation:", error.message);
      return res
        .status(500)
        .json({ message: "Failed to update diet recommendation" });
    }
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  user,
  home,
  register,
  login,
  updateUserById,
  getUserByEmail,
  getUserById,
  getAllFoods,
  searchFood,
  filterFood,
  updateProfile,
};
