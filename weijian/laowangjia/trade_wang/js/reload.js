window.addEventListener('DOMContentLoaded', function() {
    new QueryLoader2(document.querySelector("body"), {
        barColor: "#fff",
        backgroundColor: "#202020",
        percentage: true,
        barHeight: 30,
        completeAnimation: "fade"
        /*minimumTime: 200,
        fadeOutTime: 1000*/
    });
});
