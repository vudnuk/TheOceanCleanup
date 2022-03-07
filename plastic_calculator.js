let userInputs = document.getElementsByTagName('input'); 
let totalPlastic = [];
let tip = document.getElementsByClassName('tip');
let tmp = 0;

// Calculates total value of all elements in totalPlastic array.
function arrayTotal() {
    let total = 0;
    for (var i in totalPlastic) {
        total += totalPlastic[i];
        }
    document.getElementById("total_per_year").textContent = total/document.getElementById('in_household').value;
}

function wasteCalculation() {
    // Event listener for inputs. Array is wiped after change eventListener to keep array from duplicating.
    // This function runs through each input via a loop, then adds to an array and calculates total of array using arrayTotal(). 
    // During this it also works out the largest element in the array and puts this value in the biggest_category.textContent.
    for (var i = 0; i < userInputs.length; i++) {
        userInputs[i].addEventListener('change', function() {
            totalPlastic = [];
            for (let j = 0; j < userInputs.length; j++) {
                if ((userInputs[j].value * userInputs[j].dataset.weight) > tmp) {
                    tmp = userInputs[j].value * userInputs[j].dataset.weight;
                    document.getElementById('biggest-category').textContent = userInputs[j].name;
                }
                totalPlastic.push(Number.parseFloat(userInputs[j].value * userInputs[j].dataset.weight)); 
            }
            arrayTotal();
            showTips();
        }); 
     }
     //Listener for 'in_household' with same function so correct textContent is still given when in_household is changed.
     document.getElementById('in_household').addEventListener('change', function() {
        totalPlastic = [];
        for (let j = 0; j < userInputs.length; j++) {
            totalPlastic.push(Number.parseFloat(userInputs[j].value * userInputs[j].dataset.weight)); 
        } 
        arrayTotal();
    }); 
}

// Adds functionality onclick to reset button. Returns default values by directly changing them for in_household, total_per_year,
// and biggest-category, while using a loop to replace the inputs. Then rehides tips using hideTips().
function reset() {
    document.getElementById("reset").onclick = function() {
        document.getElementById("in_household").value = 1; 
        document.getElementById("total_per_year").textContent = "0";
        document.getElementById("biggest-category").textContent = "unknown sources";
        for (let i = 0; i < userInputs.length; i++) {
                    userInputs[i].value = userInputs[i].defaultValue;
        }
        showTips();
}
}

// Loop to hide each tip.
function hideTips() {
    for (let i = 0; i < tip.length; i++) {
        tip[i].style.display = 'none'; }
}

//Hides tips, then checks the index of the highest value in the array. Then displays a tip based on this index value.
function showTips() {
    hideTips();

    for (var i = 0; i < userInputs.length; i++) {
        userInputs[i].addEventListener('change', function() {
        
        let i = totalPlastic.indexOf(Math.max(...totalPlastic));

        if (i == 0){
           document.getElementById('tip_bottles').style.display = ''; 
       } else if (i == 1){
           document.getElementById('tip_bags').style.display = ''; 
       } else if (i == 2){
           document.getElementById('tip_wrapping').style.display = ''; 
       } else if (i == 3){
           document.getElementById('tip_yogurt').style.display = ''; 
       } else if (i == 4){
           document.getElementById('tip_takeout').style.display = ''; 
       } else if (i == 5){
           document.getElementById('tip_cups').style.display = ''; 
       } else if (i == 6){
           document.getElementById('tip_packaging').style.display = ''; 
       } else if (i == 7){
           document.getElementById('tip_detergent').style.display = ''; 
       } else if (i == 8){
           document.getElementById('tip_shampoo').style.display = ''; 
       } else if (i == 9){
           document.getElementById('tip_toothbrushes').style.display = ''; 
       } else if (i == 10){
           document.getElementById('tip_toothpaste').style.display = ''; 
       } 
    }); 
    }
}

//Loading in functions only when DOM content properly loaded.
document.addEventListener("DOMContentLoaded", function() {
    reset();
    showTips();
    wasteCalculation();
});

