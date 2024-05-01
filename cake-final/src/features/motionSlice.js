import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { createAsyncThunk } from "@reduxjs/toolkit";
import "./container.css";
// Initial state of the sprite
const initialState = {
  position: { x: 150, y: 100 }, // Assuming default position
  angle: 0,
  glideClicked: false,
  glideStartPosn: { x: -1, y: -1 },
  glideEndPosn: { x: -1, y: -1, sec: 0 },
  ingredients: [], // Array to store ingredients
  mixedIngredient: "",
  baked: false,
  temp: 0,
  mix: []
};
const getImageUrl = (ingredient) => {
  switch (ingredient) {
    case "flour":
      return "/flour.svg";
    case "sugar":
      return "/sugar.svg";
    case "egg":
      return "/egg.svg";
    case "butter":
      return "/butter.svg";
    // Add more cases for other ingredients...
    default:
      return ""; // Default image URL
  }
};

const displayIngredientsWithDelay = (ingredients) => {
  const canvasElement = document.getElementById("cakeDiv");
  if (!canvasElement) {
    console.error("Canvas element not found.");
    return;
  }

  const ingredientsHTML = ingredients
    .map((ingredient) => `<li>${ingredient}</li>`)
    .join("");

  // Clear the canvas before displaying ingredients
  canvasElement.innerHTML = "";

  // Display ingredients with delay
  ingredients.forEach((ingredient, index) => {
    setTimeout(() => {
      canvasElement.innerHTML += `
        <div class="canvas-container">
          <h1>Ingredients:</h1><ul>${ingredientsHTML}</ul>
        </div>
      `;
    }, index * 1000); // Adjust the delay (in milliseconds) as needed
  });
};

// Create the slice
export const motionSlice = createSlice({
  name: "Motion",
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action) => {
        const selectedIngredient = action.payload.ingredient;
        if (!state.baked) {
        if (!state.ingredients.includes(selectedIngredient)) {
        state.ingredients.push(selectedIngredient);
        state.mixedIngredient = selectedIngredient;

        console.log("Ingredient added:", selectedIngredient);

        // Update the ingredients list
        const ingredientsHTML = state.ingredients
          .map((ingredient) => `<li>${ingredient}</li>`)
          .join("");

        document.getElementById(
          "cakeDiv"
        ).innerHTML = `<h1>Ingredients:</h1><ul>${ingredientsHTML}</ul>`;

        // Display the image of the mixed ingredient in the canvas
        const canvasElement = document.getElementById("cakeDiv");
        canvasElement.innerHTML = `
          <div class="canvas-container">
            <h2>${selectedIngredient}</h2>
            <img src="${getImageUrl(
              selectedIngredient
            )}" alt="${selectedIngredient}">
          </div>
        `;
        }else {
          
            document.getElementById("cakeDiv").innerHTML =
              `<h2 style='margin-left:50px;margin-top:150px;margin-right:50px'>The ingredient '${selectedIngredient}' is already in the mix.</h2>`;
         
          
        }
      } else {
        document.getElementById("cakeDiv").innerHTML =
              "<h2 style='margin-left:50px;margin-top:150px;margin-right:50px'>The cake has already been baked</h2><h2 style='margin-left:50px;margin-top:150px;margin-right:50px'>You cannot add ingredients now.</h2>";
       
      }
      },
      prepare: (ingredient) => ({ payload: { ingredient } }),
    },

    mixIngredient: {
      reducer: (state, action) => {
        if (state.ingredients.length > 0 && !state.baked) {
          
        const canvasElement = document.getElementById("cakeDiv");
        if (!canvasElement) {
          console.error("Canvas element not found.");
          return;
        }

        // Clear previous content
        canvasElement.innerHTML = "";

        // Display GIF
        const gifHTML = `<img src="/mix.gif" style="width: 100%; height: auto; position: relative; z-index: 1;">`;
        canvasElement.innerHTML = gifHTML;
        state.mixing = true;
        console.log("Mixing ingredient...");
        
        // Additional logic related to mixing ingredients can be added here if needed
      }else if (state.baked) {
        document.getElementById("cakeDiv").innerHTML =
              "<h2 style='margin-left:50px;margin-top:150px;margin-right:50px'>The cake has already been baked.</h2>"
        
      } else {
        document.getElementById("cakeDiv").innerHTML =
              "<h2 style='margin-left:100px;margin-top:150px;margin-right:50px'>Add ingredients to mix.</h2>";
      }
    },
      prepare: () => ({}), // No need to pass any parameters for mixing ingredients
    },

    getIngredient: {
      reducer: (state, action) => {
        // Retrieve all stored ingredients from the state
        const storedIngredients = state.ingredients;
        // Print all stored ingredients
        console.log("All ingredients:", storedIngredients);

        // Update the cakeDiv to display all stored ingredients
        const ingredientsHTML = storedIngredients
          .map((ingredient) => `<li>${ingredient}</li>`)
          .join("");
        document.getElementById(
          "cakeDiv"
        ).innerHTML = `<h1>All Ingredients:</h1><ul>${ingredientsHTML}</ul>`;
      },
      prepare: () => ({}), // No need to pass any parameters for setting X
    },

    turnLeft: {
      reducer: (state, action) => {
        // Mixing logic
          const temp = action.payload;
          state.temp = temp; // Store temperature value
          const canvasElement = document.getElementById("cakeDiv");
          if (!canvasElement) {
            console.error("Canvas element not found.");
            return;
          }
  
          if (state.ingredients.length > 0 && !state.baked) {
            console.log("Baking the cake...");
            document.getElementById("cakeDiv").innerHTML =
              "<h2>Baking the cake...</h2>";
  
            console.log("Temperature:", temp.degrees);
            // Simulate baking process
            if (temp.degrees > 180) {
              console.log("oops!! cake is overbaked"); // Log message if the cake is burnt
              document.getElementById("cakeDiv").innerHTML =
                "<h2 style='margin-left:100px;margin-top:150px;margin-right:50px'>oops!! cake is overbaked</h2><h3 style='margin-left:100px;margin-right:50px'>set temperature less than 180°C</h3>"; // Display message in div
            } else {
              state.baked = true;
              canvasElement.innerHTML = "<h1>Cake Baking...</h1>";
  
              // Accumulate HTML content for all ingredients
              let ingredientsHTML = "";
              state.ingredients.forEach((ingredient) => {
                ingredientsHTML += `<li>${ingredient}</li>`;
              });
      
              // Display all ingredients with delay
              state.ingredients.forEach((ingredient, index) => {
                setTimeout(() => {
                  canvasElement.innerHTML = `
                    <div class="canvas-container">
                      <h1>Ingredients:</h1>
                      <ul>${ingredientsHTML}</ul>
                      <img src="${getImageUrl(ingredient)}" alt="${ingredient}">
                    </div>
                  `;
                }, (index + 1) * 1000); // Adjust the delay (in milliseconds) as needed
              });
      
              console.log("Mixing ingredient...");
              // Additional logic related to mixing ingredients can be added here if needed
      
              // Function to display fireworks
              const displayFireworks = () => {
                const fireworksSVG = `
                  <span class="svg">
                    <svg xmlns="http://www.w3.org/2000/svg" id="firework-slide2" class="firework-icon injected-svg img-firework inject-svg" data-name="Calque 1" viewBox="0 0 157 156">
                      <defs>
                        <style>
                          .cls-1,.cls-2,.cls-3{
                            fill:#e41656;
                            opacity:0;
                          }
                        </style>
                      </defs>
                      <title>icon_firework_1</title>
                      <path class="cls-3" d="M80.52,106.92a0.65,0.65,0,0,1-.65-0.65v-10a0.65,0.65,0,0,1,1.3,0v10A0.65,0.65,0,0,1,80.52,106.92Z"></path>
        <path class="cls-3" d="M97.72,100.91a0.65,0.65,0,0,1-.52-0.26l-6-8a0.65,0.65,0,0,1,1-.78l6,8A0.65,0.65,0,0,1,97.72,100.91Z"></path>
        <path class="cls-3" d="M108.32,85.95a0.61,0.61,0,0,1-.19,0l-9.55-3A0.65,0.65,0,1,1,99,81.69l9.55,3A0.65,0.65,0,0,1,108.32,85.95Z"></path>
        <path class="cls-3" d="M98.77,71a0.65,0.65,0,0,1-.2-1.27l9.55-3a0.65,0.65,0,1,1,.39,1.24L99,71A0.66,0.66,0,0,1,98.77,71Z"></path>
        <path class="cls-3" d="M91.7,61a0.65,0.65,0,0,1-.52-1l6-8a0.65,0.65,0,0,1,1,.78l-6,8A0.65,0.65,0,0,1,91.7,61Z"></path>
        <path class="cls-3" d="M80.52,57a0.65,0.65,0,0,1-.65-0.65v-10a0.65,0.65,0,0,1,1.3,0v10A0.65,0.65,0,0,1,80.52,57Z"></path>
        <path class="cls-3" d="M67.64,61a0.65,0.65,0,0,1-.52-0.26l-6-8a0.65,0.65,0,0,1,1-.78l6,8A0.65,0.65,0,0,1,67.64,61Z"></path>
        <path class="cls-3" d="M60.57,71a0.66,0.66,0,0,1-.2,0l-9.55-3a0.65,0.65,0,1,1,.39-1.24l9.55,3A0.65,0.65,0,0,1,60.57,71Z"></path>
        <path class="cls-3" d="M51,85.95a0.65,0.65,0,0,1-.19-1.27l9.55-3a0.65,0.65,0,1,1,.39,1.24l-9.55,3A0.61,0.61,0,0,1,51,85.95Z"></path>
        <path class="cls-3" d="M61.62,100.91a0.65,0.65,0,0,1-.52-1l6-8a0.65,0.65,0,0,1,1,.78l-6,8A0.65,0.65,0,0,1,61.62,100.91Z"></path>
      
        <path class="cls-2" d="M80.52,126.88a0.65,0.65,0,0,1-.65-0.65v-10a0.65,0.65,0,0,1,1.3,0v10A0.65,0.65,0,0,1,80.52,126.88Z"></path>
        <path class="cls-2" d="M109.74,116.86a0.65,0.65,0,0,1-.52-0.26l-6-8a0.65,0.65,0,0,1,1-.78l6,8A0.65,0.65,0,0,1,109.74,116.86Z"></path>
        <path class="cls-2" d="M127.42,91.92a0.61,0.61,0,0,1-.19,0l-9.55-3a0.65,0.65,0,1,1,.39-1.24l9.55,3A0.65,0.65,0,0,1,127.42,91.92Z"></path>
        <path class="cls-2" d="M117.86,65a0.65,0.65,0,0,1-.2-1.27l9.55-3a0.65,0.65,0,1,1,.39,1.24l-9.55,3A0.66,0.66,0,0,1,117.86,65Z"></path>
        <path class="cls-2" d="M103.73,45.08a0.65,0.65,0,0,1-.52-1l6-8a0.65,0.65,0,0,1,1,.78l-6,8A0.65,0.65,0,0,1,103.73,45.08Z"></path>
        <path class="cls-2" d="M80.52,37.07a0.65,0.65,0,0,1-.65-0.65v-10a0.65,0.65,0,0,1,1.3,0v10A0.65,0.65,0,0,1,80.52,37.07Z"></path>
        <path class="cls-2" d="M55.61,45.08a0.65,0.65,0,0,1-.52-0.26l-6-8a0.65,0.65,0,0,1,1-.78l6,8A0.65,0.65,0,0,1,55.61,45.08Z"></path>
        <path class="cls-2" d="M41.47,65a0.62,0.62,0,0,1-.2,0l-9.55-3a0.65,0.65,0,1,1,.39-1.24l9.55,3A0.65,0.65,0,0,1,41.47,65Z"></path>
        <path class="cls-2" d="M31.92,91.93a0.65,0.65,0,0,1-.19-1.27l9.55-3a0.65,0.65,0,1,1,.39,1.24l-9.55,3A0.61,0.61,0,0,1,31.92,91.93Z"></path>
        <path class="cls-2" d="M49.59,116.86a0.65,0.65,0,0,1-.52-1l6-8a0.65,0.65,0,0,1,1,.78l-6,8A0.65,0.65,0,0,1,49.59,116.86Z"></path>
      
        <path class="cls-1" d="M80.52,146.83a0.65,0.65,0,0,1-.65-0.65v-10a0.65,0.65,0,0,1,1.3,0v10A0.65,0.65,0,0,1,80.52,146.83Z"></path>
        <path class="cls-1" d="M121.77,132.82a0.65,0.65,0,0,1-.52-0.26l-6-8a0.65,0.65,0,0,1,1-.78l6,8A0.65,0.65,0,0,1,121.77,132.82Z"></path>
        <path class="cls-1" d="M146.52,97.9a0.61,0.61,0,0,1-.19,0l-9.55-3a0.65,0.65,0,1,1,.39-1.24l9.55,3A0.65,0.65,0,0,1,146.52,97.9Z"></path>
        <path class="cls-1" d="M137,59a0.65,0.65,0,0,1-.2-1.27l9.55-3A0.65,0.65,0,1,1,146.7,56l-9.55,3A0.66,0.66,0,0,1,137,59Z"></path>
        <path class="cls-1" d="M115.76,29.12a0.65,0.65,0,0,1-.52-1l6-8a0.65,0.65,0,0,1,1,.78l-6,8A0.65,0.65,0,0,1,115.76,29.12Z"></path>
        <path class="cls-1" d="M80.52,17.11a0.65,0.65,0,0,1-.65-0.65v-10a0.65,0.65,0,0,1,1.3,0v10A0.65,0.65,0,0,1,80.52,17.11Z"></path>
        <path class="cls-1" d="M22.37,59a0.62,0.62,0,0,1-.2,0l-9.55-3A0.65,0.65,0,1,1,13,54.77l9.55,3A0.65,0.65,0,0,1,22.37,59Z"></path>
        <path class="cls-1" d="M12.82,97.9a0.65,0.65,0,0,1-.19-1.27l9.55-3a0.65,0.65,0,1,1,.39,1.24l-9.55,3A0.61,0.61,0,0,1,12.82,97.9Z"></path>
        <path class="cls-1" d="M43.58,29.12a0.65,0.65,0,0,1-.52-0.26l-6-8a0.65,0.65,0,0,1,1-.78l6,8A0.65,0.65,0,0,1,43.58,29.12Z"></path>
        <path class="cls-1" d="M37.56,132.82a0.65,0.65,0,0,1-.52-1l6-8a0.65,0.65,0,0,1,.91-0.13,0.65,0.65,0,0,1,.13.91l-6,8A0.65,0.65,0,0,1,37.56,132.82Z"></path>
                    </svg>
                  </span>
                `;
      
                // Append SVG to cakeDiv
                //canvasElement.innerHTML += fireworksSVG;

                // mixing gif
               
                setTimeout(() => {
                 
                 
                  const gifHTML = `<img src="/mix.gif" style="width: 100%; height: auto; position: relative; z-index: 1;">`;
        canvasElement.innerHTML = gifHTML;
                }, (state.ingredients.length + 1) * 1000); // Add 1 second extra for the "Cake Baked" message
              
          
                // celebration gif
                setTimeout(() => {
                  const imageHTML = `<img src="/birthday-bday.gif" style="width: 100%; height: auto; position: relative; z-index: 1;">`;
                  canvasElement.innerHTML = imageHTML;
                }, (state.ingredients.length + 1) * 2000); // Add 1 second extra for the "Cake Baked" message
              };
      
              displayFireworks();
              // clearning canvas
              setTimeout(() => {
                
                canvasElement.innerHTML = "";
              }, (state.ingredients.length + 1) * 5000);
            }
          } else if (state.baked) {
            console.log("The cake has already been baked.");
          } else {
            console.log("There are no ingredients to bake.");
            document.getElementById("cakeDiv").innerHTML =
              "<h2 style='margin-left:100px;margin-top:150px;margin-right:50px'>Add ingredients to bake the cake</h2>";
          }
        },
        prepare: (degrees, temp) => ({ payload: { degrees, temp } }),
    },

    setY: {
      reducer: (state, action) => {
        //state.position.x = action.payload.rightSteps;
        document.getElementById("cakeDiv").innerHTML = "<h1>Mix Ingredent</h1>";
        state.position.y = action.payload.upSteps;
      },
      prepare: (upSteps) => ({ payload: { upSteps } }),
    },
    goTo: {
      reducer: (state, action) => {
        document.getElementById("cakeDiv").innerHTML =
          "<h1>Ingredent Added</h1>";
        if (action.payload.destination === "random_position") {
          state.position.x = Math.floor(Math.random() * 401) - 200;
          state.position.y = Math.floor(Math.random() * 401) - 200;
        }
      },
      prepare: (destination) => ({ payload: { destination } }),
    },
    goToXY: {
      reducer: (state, action) => {
        document.getElementById("cakeDiv").innerHTML =
          "<h1>Ingredent Added</h1>";
        state.position.x = action.payload.rightSteps;
        state.position.y = action.payload.upSteps;
      },
      prepare: (rightSteps, upSteps) => ({ payload: { rightSteps, upSteps } }),
    },

    changeX: {
      reducer: (state, action) => {
        console.log(action.payload);
        state.position.x += action.payload.dashUnits;
      },
      prepare: (dashUnits) => ({ payload: { dashUnits } }),
    },
    changeY: {
      reducer: (state, action) => {
        state.position.y += action.payload.dashUnits;
      },
      prepare: (dashUnits) => ({ payload: { dashUnits } }),
    },
    setSpritePosition: {
      reducer: (state, action) => {
        state.position.x = action.payload.x;
        state.position.y = action.payload.y;
      },
      prepare: (x, y) => ({ payload: { x, y } }),
    },

    pointInDirection: {
      reducer: (state, action) => {
        if (action.payload.angle == -1) {
          let clientX, clientY;

          const move = (event) => {
            clientX = event.clientX;
            clientY = event.clientY;
            console.log(clientX, clientY);
            state.angle = Math.atan2((clientY - state.y) / (clientX - state.x));
          };

          // Initialize clientX and clientY to the current cursor position

          const getCursorPosition = (event) => {
            clientX = event.clientX;
            clientY = event.clientY;
            move({ clientX, clientY });
          };
          window.addEventListener("onmousemove", getCursorPosition);
        } else {
          state.angle = action.payload.angle % 360; // Ensure the angle stays within 0 to 359 degrees
          state.angle %= 360;
        }
      },
      prepare: (angle) => ({ payload: { angle } }),
    },
    rotateSprite: {
      reducer: (state, action) => {
        state.angle = action.payload.rotationAngle;
        state.angle %= 360; // Ensure the angle stays within 0 to 359 degrees
      },
      prepare: (rotationAngle) => ({ payload: { rotationAngle } }),
    },
    ifOnEdgeBounce: {
      reducer: (state, action) => {
        if (
          state.position.x <= -100 ||
          state.position.x >= 300 ||
          state.position.y <= -100 ||
          state.position.y >= 300
        ) {
          state.angle += 270;
          state.angle %= 360;
          console.log("bounce");
        }
      },
    },
    glideSecsXY: {
      reducer: (state, action) => {
        state.glideStartPosn = state.position;
        state.glideEndPosn = action.payload;
        if (state.glideClicked == false) {
          state.glideClicked = true;
          return;
        }
        state.position = action.payload;
      },
      prepare: (x, y, sec) => ({ payload: { x, y, sec } }),
    },
    done: {
      reducer: (state, action) => {
        state.glideClicked = false;
      },
    },
  },
});

// Export the action and reducer

export const {
  addIngredient,
  getIngredient,
  setY,
  goTo,
  goToXY,
  setSpritePosition,
  mixIngredient,
  turnLeft,
  pointInDirection,
  rotateSprite,
  changeX,
  changeY,
  ifOnEdgeBounce,
  glideSecsXY,
  done,
} = motionSlice.actions;

// export default motionSlice.reducer;

export const moveSpriteToMousePointer = () => (dispatch) => {
  const handleMouseMove = (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Dispatch action to update sprite position
    dispatch(setSpritePosition(mouseX, mouseY));
  };

  const handleEscPress = (e) => {
    if (e.key === "Escape") {
      // Cleanup: remove event listener when 'Esc' is pressed
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("keydown", handleEscPress);
    }
  };

  // Add event listeners
  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("keydown", handleEscPress);

  // Cleanup: remove event listeners on component unmount or as needed
  return () => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("keydown", handleEscPress);
  };
};

// export const glideSecsXY = (x, y, time) => (dispatch) => {
//   const spritePosition = useSelector((state) => state.motionSlice.position);
//   console.log("Sprite Position:", spritePosition);
//   const startX = spritePosition.x;
//   const startY = spritePosition.y;
//   const distanceX = x - startX;
//   const distanceY = y - startY;
//   const steps = time / 10;
//   let currentStep = 0;

//   const intervalId = setInterval(() => {
//     currentStep++;
//     const newX = startX + (distanceX * currentStep) / steps;
//     const newY = startY + (distanceY * currentStep) / steps;
//     dispatch(glideSecsXY(newX, newY));

//     if (currentStep >= steps) {
//       clearInterval(intervalId);
//       dispatch(goToXY(x, y));
//     }
//   }, 10);
// };
//     name: "Motion",
//     initialState,
//     reducers: {
//         moveSprite: {
//             reducer: (state, action) => {
//                 state.position.x += action.payload.rightSteps;
//                 state.position.y += action.payload.upSteps;
//             },
//             prepare: (rightSteps, upSteps) => ({ payload: { rightSteps, upSteps } })
//         },
//     },
// });

// Export the action and reducer
export const { moveSprite } = motionSlice.actions;
export default motionSlice.reducer;
