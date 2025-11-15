---
title: "Building the LightGBM Model for Early Diabetes Detection"
slug: "building-lightgbm-diabetes-model"

summary: "A deep dive into the modeling phase of the Diabetes Detection App, explaining data preparation, feature engineering, and LightGBM optimization."

description: "This post documents the entire modeling phase for the Diabetes Detection App, covering everything from dataset preparation to selecting the final LightGBM model. It also includes reasoning behind feature choices, performance metrics, and how the model integrates with the FastAPI backend."

date: 2024-03-12
updated: 2024-06-01

project: "diabetes-detection-app"

categories: ["Machine Learning", "Modeling", "Healthtech"]
tags: ["lightgbm", "ml-modeling", "feature-engineering", "data-prep"]

authors: ["Luisangel Parra"]

image:
  url: "https://docs.astro.build/assets/rays.webp"
  alt: "Visualization of LightGBM model structure."

gallery:
  - url: "https://docs.astro.build/assets/comet.webp"
    alt: "EDA scatter plot used during preprocessing."
  - url: "https://docs.astro.build/assets/hero.webp"
    alt: "Feature importance chart generated from the final model."
---

In this post, we cover the full modeling workflow for the Diabetes Detection App. We begin by cleaning and preparing the dataset, handling missing values, encoding categorical variables, and exploring feature correlations. The LightGBM algorithm was selected for its speed, handling of categorical variables, and strong performance in imbalanced classification tasks. We walk through hyperparameter tuning, cross-validation, scoring methods, and evaluation metrics. The final optimized model was deployed as part of the FastAPI backend and now powers the mobile app's risk prediction engine.
