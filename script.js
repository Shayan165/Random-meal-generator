let video = document.getElementById("video");
let image = document.getElementById("dish-img");

async function fetch_data() {
  let raw = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
  let data = await raw.json();
  
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    let ingredientKey = `strIngredient${i}`;
    let measureKey = `strMeasure${i}`;
    if (data?.meals[0]?.[ingredientKey] && data?.meals[0]?.[measureKey]) {
      let ingredient = data?.meals[0]?.[ingredientKey];
      let quantity = data.meals[0][measureKey];
      ingredients.push(`${ingredient} - ${quantity}`);
    }
  }

  const ingredientsHTML = ingredients
    .map((ingredient) => `<li>${ingredient}</li>`)
    .join("");


  let html = `<div class="dish-name">
  <div id="dish-img" ><img class="dish-img"  src=${
    data?.meals[0]?.strMealThumb
  } /></div>
  <div class="title">
    <h2>${data?.meals[0]?.strMeal}</h2>
    <p>
    ${data?.meals[0]?.strInstructions}
    </p>
  </div>
</div>
<div class="ingredients">
  <p class="area">
    <strong style="padding: 28px 5px 0px 0px">Category:</strong> ${
      data?.meals[0]?.strCategory
    }
  </p>
  <p class="area">
    <strong style="padding-right: 5px">Area:</strong>${data?.meals[0]?.strArea}
  </p>

  <h3>Ingredients:</h3>
  <ul>
  ${ingredientsHTML} 
  </ul>
</div>
<div class="recipe-video" id="video">
  <h2>Video Recipe</h2>
  <iframe 
    width="100%"
    height="560px"
    src="https://www.youtube.com/embed/${data?.meals[0]?.strYoutube.slice(-11)}"
  ></iframe> 
</div>`;


  let main = document.getElementById("main");

  while (main.firstChild) {
    main.removeChild(main.firstChild);
  }
  
  main.insertAdjacentHTML("beforeend", html);
}
