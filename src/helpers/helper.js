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

export const assignQRCodeIntoPhoto = (image, qrcode) => {
    return new Promise((resolve, reject) => {
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext('2d');

        const photo = new Image();
        photo.onload = function() {
            ctx.drawImage(photo, 0, 0, photo.width, photo.height);
        };
        photo.src = image

        const code = new Image();
        code.onload = () => {
            console.log(code.width)
            console.log(code.height)
            ctx.drawImage(code, 0, 0, code.width, code.height)
            resolve(canvas)
        }
        code.src = qrcode
    })
}
