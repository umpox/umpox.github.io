$(document).ready(function(){
    var changeColor = function() {
        console.log('change');
        this.setAttribute('color', 'green');
    };

    $('a-box').hover(changeColor);
});