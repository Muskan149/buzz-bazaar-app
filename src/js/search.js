console.log("hi")
document.addEventListener('DOMContentLoaded', function () {
  console.log("DOM is loaded bruh")
  
  const checkboxes = document.querySelectorAll('.form-check-input');
  const inputField = document.getElementById('search-input')

  if (inputField && checkboxes) {
    console.log("the components exist")
    inputField.addEventListener('input', filterProducts);
    checkboxes.forEach(function (checkbox) {
          checkbox.addEventListener('change', filterProducts);
    });
  } else {
    console.log("dont exist")
  }


  function filterProducts() {
    console.log("started detecting")
    const selectedCategories = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);
    let input = inputField.value.toLowerCase();

    const cardBodies = document.getElementsByClassName('row justify-content-center mb-3');
    const productTypes = document.getElementsByClassName('product-type');
    const productNames = document.getElementsByClassName('product-name');

    if (input.length > 0 && selectedCategories.length > 0) {
      for (i = 0; i < cardBodies.length; i++) {  
          if (selectedCategories.includes(productTypes[i].textContent) && productNames[i].innerHTML.toLowerCase().includes(input)) { 
            cardBodies[i].style.display="flex";
          } else {
            cardBodies[i].style.display="none"; 
          }
        }
    } else if (input.length == 0 && selectedCategories.length == 0) {
      for (i = 0; i < cardBodies.length; i++) {  
        cardBodies[i].style.display="flex";
      }
    } else {
      if (input.length > 0) {
        for (i = 0; i < cardBodies.length; i++) {  
          if (productNames[i].innerHTML.toLowerCase().includes(input)) { 
            cardBodies[i].style.display="flex";
          } else {
            cardBodies[i].style.display="none";
          }
        }
      } else {
        for (i = 0; i < cardBodies.length; i++) {  
          if (selectedCategories.includes(productTypes[i].textContent)) { 
            cardBodies[i].style.display="flex";
          } else {
            cardBodies[i].style.display="none";
          }
        }
      }
    }
  } 
}
);