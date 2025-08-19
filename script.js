const searchBox = document.querySelector(".searchBox");
const searchBtn = document.querySelector(".searchBtn");
const recipeContainer = document.querySelector(".recipe-container");
const recipeDetailsContent = document.querySelector(".recipe-details-content");
const recipeCloseBtn = document.querySelector(".recipe-close-btn");

const fetchRecipes = async (input) => {
  recipeContainer.innerHTML = "<h2>Fetching Recipe...</h2>";
  try {
    const data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`
    );
    const response = await data.json();

    recipeContainer.innerHTML = "";

    response.meals.forEach((meal) => {
      const recipeDiv = document.createElement("div");
      recipeDiv.classList.add("recipe");
      recipeDiv.innerHTML = `
    <img src="${meal.strMealThumb}"/>
    <h3>${meal.strMeal} </h3>
    <p>${meal.strArea} <span>Dish</span></p>
    <p>Belongs to <span>${meal.strCategory} </span>category</p>
    `;
      const button = document.createElement("button");
      button.textContent = "View Recipe";
      recipeDiv.appendChild(button);

      // Adding Event listener to recipe button

      button.addEventListener("click", () => {
        openRecipePopUp(meal);
      });
      recipeContainer.appendChild(recipeDiv);
    });
  } catch (error) {
    recipeContainer.innerHTML = "<h2>Error in fetching Recipe...</h2>";
    recipeContainer.style.color = "yellow";
    recipeContainer.style.backgroundImage =
      "url('https://lh6.googleusercontent.com/proxy/CUnnMyGJNmY4rxavhjoTz_D8VqnxwBS7vxvSwsad7R_NXKnx3vikwoHJFsauytNe48mlls8Zf21E3XAwmBCiG_UqhZ_pBQPaaaggBnDC6IAcEafxhU2JWt6flHDZ')";
    recipeContainer.style.width = "50%";
    recipeContainer.style.height = "70vh";
    recipeContainer.style.backgroundRepeat = "no-repeat";
    recipeContainer.style.backgroundSize = "cover";
    recipeContainer.style.backgroundPosition = "center";
  }
};

// Function to fetch Ingdredients and measurements
const fetchIngredients = (meal) => {
  let ingredientsList = "";
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    if (ingredient) {
      const measure = meal[`strMeasure${i}`];
      ingredientsList += `<li>${measure} ${ingredient}</li>`;
    } else {
      break;
    }
  }
  return ingredientsList;
};
const openRecipePopUp = (meal) => {
  recipeDetailsContent.innerHTML = `
  <h2 class="recipeName">${meal.strMeal}</h2>
  <h3>Ingredients: </h3>
  <ul class="ingredientList">${fetchIngredients(meal)}</ul>
  <div class="recipeInstructions">
    <h3>Instructions:</h3>
    <p >${meal.strInstructions}</p>
  </div>
  `;

  recipeDetailsContent.parentElement.style.display = "block";
};

recipeCloseBtn.addEventListener("click", () => {
  recipeDetailsContent.parentElement.style.display = "none";
});

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const searchInput = searchBox.value.trim();
  if (!searchInput) {
    recipeContainer.innerHTML = `<h2>Type the meal in the search box...</h2>`;
    return;
  }
  fetchRecipes(searchInput);
});
