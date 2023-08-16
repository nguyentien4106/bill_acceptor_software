export function setIntervalX(callback, delay, repetitions) {
    let x = 0;
    let intervalID = window.setInterval(function () {
        if (++x === repetitions) {
            window.clearInterval(intervalID);
        }

        callback();

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