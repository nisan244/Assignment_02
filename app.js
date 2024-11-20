const loadData = () => {
  fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=ch")
    .then((res) => res.json())
    .then((data) => {
      displayProduct(data.meals);
    })
    .catch((error) => console.log("DATA ERROR"));
};

const submit_btn = document.getElementById("submit-btn");
submit_btn.addEventListener("click", (event) => {
  const searchName = document.getElementById("searchInput").value;
  const container = document.getElementById("container-2");
  container.innerHTML = "";
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchName}`)
    .then((res) => res.json())
    .then((data) => {
      const product = data.meals;
      const container = document.getElementById("container-2");
      // console.log(product);
      if (!product) {
        container.innerHTML = "<h1 class='text-center'>Product not found!</h1>";
        return;
      }
      displayProduct(product);
    })
    .catch((error) => console.log("DATA ERROR"));
});

const displayProduct = (data) => {
  const productContainer = document.getElementById("container-2");
  productContainer.innerHTML = "";

  data.forEach((element) => {
    const div = document.createElement("div");
    div.classList.add(
        "col-12",
        "col-md-3",
        "d-flex",
        "mt-2",
        "fw-bold",
        "text-center",
        "p-2",
        "justify-content-center"
    );

    div.innerHTML = `
            <div class="card-item">
                <img src="${element.strMealThumb}" class="card-img" alt="..."/>
                <div class="card-body">
                    <p class="card-title">Recipe Name : ${element.strMeal}</p>
                    <p>Category : ${element.strCategory}</p>
                    <p>Origin : ${element.strArea}</p>
                    <p>About : ${element.strInstructions.slice(0, 35)}</p>
                    <div class = "icon fs-3 gap-3">
                        <a target="_blank" href="https://github.com/nisan244/"
                            class="text-decoration-none"><i class="fa-brands fa-github"></i></a>
                        <a target="_blank" href="https://www.facebook.com/nisanalrafi"
                            class="text-decoration-none"><i class="fa-brands fa-facebook"></i></a>
                        <a target="_blank" href="${
                          element.strYoutube
                        }"><i class="fa-brands fa-youtube"></i></a>
                    </div>

                    <button type="button" class="btn-2 btn btn-success" onclick="addCartBtn('${
                      element.strMeal
                    }', '${element.strMealThumb}')">Add To Cart</button>
                    <button type="button" class="btn-2 btn btn-success" onclick = "details('${
                      element.idMeal
                    }')">Details</button>

                </div>
            </div>
        `;
    productContainer.appendChild(div);
  });
};

const addCartBtn = (name, picture) => {
  const cartCount = document.getElementById("count").innerText;
  let convertedCount = parseInt(cartCount);
  const container = document.getElementById("cart-item");
  const div = document.createElement("div");

  convertedCount += 1;
  if (convertedCount <= 11) {
    document.getElementById("count").innerText = convertedCount;
    div.innerHTML = `
            <img src="${picture}" class="addcart-img"/>
            <h5>${name}</h5>
            <hr>
        
        `;
    container.appendChild(div);
  } else {
    alert("Cart full!");
  }
};

const details = (id) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then((data) => {
      const prd = data.meals[0];
      // console.log(prd);
      const title = (document.getElementById("modal-title").innerHTML =
        prd.strMeal);
      // console.log(title);

      const container = document.getElementById("modal-body");
      container.innerHTML = "";

      const div = document.createElement("div");
      div.innerHTML = `
                <div class="modal-img">
                    <img src="${prd.strMealThumb}" class="card-img-2"/>
                </div>

                <div class="card-body">
                    <ul class="modal-items">
                        <li>${prd.strIngredient2}</li>
                        <li>${prd.strIngredient3}</li>
                        <li>${prd.strIngredient4}</li>
                        <li>${prd.strIngredient5}</li>
                        <li>${prd.strIngredient6}</li>
                        <li>${prd.strIngredient7}</li>
                        <li>${prd.strIngredient8}</li>
                        <li>${prd.strIngredient9}</li>
                        <li>${prd.strIngredient10}</li>
                    </ul>
                </div>
            `;
      container.appendChild(div);
      const modal = new bootstrap.Modal(
        document.getElementById("detailsModal")
      );
      modal.show();
    })
    .catch((error) => console.log("DATA ERROR"));
};

loadData();
