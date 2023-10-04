const moment = require('moment')
const fs = require('fs');
const dateFormat = "YYYY__MM_DD_hh_mm_ss_A"

module.exports = logs => {
    const date = moment().format(dateFormat)
    fs.writeFile(`C:/logs/${date}.txt`, logs, function(err) {
        if(err) {
            return console.log(err);
        }
    }); 
}
