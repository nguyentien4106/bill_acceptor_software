export function setIntervalX(callback, delay, repetitions) {
    var x = 0;
    var intervalID = window.setInterval(function () {

       callback();

       if (++x === repetitions) {
           window.clearInterval(intervalID);
       }
    }, delay);
}

export function getFilters(){
    return [
        {name: 'origin', text: "Origin"}, 
        {name: 'filter-amaro', text: "Amaro"}, 
        {name: 'filter-rise', text: "Rise"}, 
        {name: 'filter-willow', text: "Willow"}, 
        {name: 'filter-slumber', text: "Slumber"}, 
        {name: 'filter-Lo-Fi', text: "Lo-Fi"}, 
        {name: 'filter-lark', text: "Lark"}, 
        {name: 'filter-moon', text: "Moon"}
    ]
}