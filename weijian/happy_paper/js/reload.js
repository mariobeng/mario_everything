window.addEventListener('DOMContentLoaded', function() {
    new QueryLoader2(document.querySelector("body"), {
        barColor: "#000",
        backgroundColor: "#00561F",
        percentage: true,
        barHeight: 0,
        completeAnimation: "fade"
        /*onComplete: function(){
            my_animate();
        }*/
    });
});
