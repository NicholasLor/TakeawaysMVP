function generateColorCode() {
  // Generate random color code
  var colorCode = '#' + Math.floor(Math.random() * 16777215).toString(16);



  return colorCode;
}

// Usage example
var color = generateColorCode();
console.log(color);
const init = function(){
let items = document.querySelectorAll('.gallery li');
for (let i = 0; i < items.length; i++){

  items[i].style.background = generateColorCode();
}
}
init();

