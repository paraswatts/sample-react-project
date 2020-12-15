const { defaultConfig: { PLATFORM, LOCATION, VERSION } } = require(`../../../../config/default`);
const { store } = require(`../../../../redux/${PLATFORM}/store`);
const { saveCaptcha } = require(`../../../../redux/${PLATFORM}/actions/auth`)
var code;
export function createCaptcha() {
    //clear the contents of captcha div first 
    document.getElementById('captcha').innerHTML = "";
    var charsArray =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*";
    var lengthOtp = 5;
    var captcha = [];
    for (var i = 0; i < lengthOtp; i++) {
        //below code will not allow Repetition of Characters
        var index = Math.floor(Math.random() * charsArray.length + 1); //get the next character from the array
        if (captcha.indexOf(charsArray[index]) == -1)
            captcha.push(charsArray[index]);
        else i--;
    }
    var canv = document.createElement("canvas");
    canv.id = "captcha";
    canv.width = 120;
    canv.height = 50;
    var ctx = canv.getContext("2d");
    ctx.font = "25px Times";
    ctx.fillStyle = '#0091FF';
    ctx.fillText(captcha.join(""), 10, 30);
    //storing captcha so that can validate you can save it somewhere else according to your specific requirements
    code = captcha.join("");
    store.dispatch(
        saveCaptcha(code)
    )
    document.getElementById("captcha").appendChild(canv)
    // document.getElementsByClassName("captcha_field").appendChild(canv); // adds the canvas to the body element
}

