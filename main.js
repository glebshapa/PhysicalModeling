let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');
canvas.width = 1800;
canvas.height = 280;

let ourTimer;

const _w0 = 15;
const _x0 = 1000;
const _y0 = canvas.height - _w0;

const _w1 = 30;
const _x1 = 1300;
const _y1 = canvas.height - _w1;

ctx.strokeRect(_x0, _y0, _w0, _w0);
ctx.fillStyle = "green";
ctx.fillRect(_x0, _y0, _w0, _w0);
ctx.strokeRect(_x1, _y1, _w1, _w1);
ctx.fillStyle = "red";
ctx.fillRect(_x1, _y1, _w1, _w1);

function sendForm(e){
    if (ourTimer) {
        clearInterval(ourTimer);
    }
    e.preventDefault();
    let keyBox = document.run.key;

    let w0 = _w0;
    let x0 = _x0;
    let y0 = _y0;
    let v0 = 0;
    let m0 = 1;

    let w1 = _w1;
    let x1 = _x1;
    let y1 = _y1;
    let v1 = -100;
    let m1 = Number(keyBox.value);

    let pTimestamp = 0;
    let cnt = 0;
    let tick = 0.01

    ourTimer = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        if (x0 <= 0) {
            cnt++;
            v0 = -v0;
        }


        if (x0 + w0 >= x1) {
            cnt++;
            let new_v0 = (((m0 - m1) * v0) + 2 * m1 * v1) / (m0 + m1);
            let new_v1 = (((m1 - m0) * v1) + 2 * m0 * v0) / (m0 + m1);
            v0 = new_v0;
            v1 = new_v1;
        }

        x0 = x0 + v0 * tick;
        x1 = x1 + v1 * tick;

        if (x1 <= w0) {
            ctx.strokeRect(0, y0, w0, w0);
            ctx.fillStyle = "green";
            ctx.fillRect(0, y0, w0, w0);
            ctx.strokeRect(w0, y1, w1, w1);
            ctx.fillStyle = "red";
            ctx.fillRect(w0, y1, w1, w1);
        } else {
            ctx.strokeRect(x0, y0, w0, w0);
            ctx.fillStyle = "green";
            ctx.fillRect(x0, y0, w0, w0);
            ctx.strokeRect(x1, y1, w1, w1);
            ctx.fillStyle = "red";
            ctx.fillRect(x1, y1, w1, w1);
        }

        document.getElementById('number').textContent = cnt.toString();
    }, 0.0016);
}

let sendButton = document.run.send;
sendButton.addEventListener("click", sendForm);
