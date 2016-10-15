var box = document.getElementsByTagName('a-box');


for (var i = 0; i < box.length; i++) {
    box[i].addEventListener('mouseenter', myFunction, false);
}

var myFunction = function() {
  box.setAttribute('color', 'green');
};