var box = document.getElementsByTagName('a-box');


for (var i = 0; i < box.length; i++) {
    box[i].addEventListener('mouseenter', myFunction(box[i]), false);
}

var myFunction = function(box) {
    box.setAttribute('color', 'green');
};