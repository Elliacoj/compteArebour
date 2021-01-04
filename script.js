let start = document.getElementById("start");
let stop = document.getElementById("stop");
let reset = document.getElementById("reset");
let hours = document.getElementById("hours");
let minutes = document.getElementById("minutes");
let seconds = document.getElementById("seconds");
let compte = document.getElementById("compte");

// Object countdown
let Count = function (hours, minutes, seconds, compte) {
    /**
     * function for countdown
     */
    this.getStart = function() {
        let div = document.createElement("div");
        let stop = document.createElement("button");
        let restart = document.createElement("button");
        let reinit = document.createElement("button");
        compte.append(div,stop, restart,reinit);
        stop.innerHTML = "Stop";
        restart.innerHTML = "Restart";
        reinit.innerHTML = "Reinit";

        div.className = "compte";
        stop.className = "stop";
        restart.className = "stop";
        reinit.className = "stop";

        restart.style.display = "none";
        stop.style.display = "inline";

        let saveHours = hours;
        let saveMinutes = minutes;
        let saveSeconds = seconds;

        time();

        function time() {
            let min = minutes;
            let sec = seconds;

            if(min < 10) {
                min = "0" + min.toString();
            }

            if(sec < 10) {
                sec = "0" + sec.toString();
            }

            div.innerHTML = hours + ":" + min + ":" + sec;

            let stops = setTimeout(function () {
                if(seconds > 0) {
                    seconds--;
                }

                else if((seconds === 0) && (minutes > 0)) {
                    minutes--
                    seconds = 59;
                }

                else if (seconds === 0 && minutes === 0 && hours !== 0) {
                    hours--
                    seconds = 59;
                    minutes = 59;
                }
                time();
            }, 1000);

            if(seconds === 0 && minutes === 0 && hours === 0) {
                clearTimeout(stops);
            }

            if(stop.style.display === "inline") {
                stop.addEventListener("click", function () {
                    clearTimeout(stops);
                    stop.style.display = "none";
                    restart.style.display = "inline";

                    restart.addEventListener("click", function () {
                        stop.style.display = "inline";
                        restart.style.display = "none";
                    });
                });
            }

            reinit.addEventListener("click", function () {
                hours = saveHours;
                minutes = saveMinutes;
                seconds = saveSeconds;
                stop.style.display = "inline";
                restart.style.display = "none";
                clearTimeout(stops);
            })
        }

        reinit.addEventListener("click", function () {
            time()
        })

        restart.addEventListener("click", function () {
            time();
        });
    }
}

/**
 * function for creat and start object countdown
 */
function countDown() {
    let hour = hours.value;
    let minute = minutes.value;
    let second = seconds.value;
    let count = new Count(hour, minute, second, compte);
    count.getStart();
}

/**
 * Function for delete last countdown
 */
function del() {
    for(let x = 0; x < 4; x++) {
        compte.removeChild(compte.lastElementChild);
    }
}


// Button for start function countDown
start.addEventListener("click", function () {
    if(((isNaN(hours.value) && isNaN(minutes.value) && isNaN(minutes.value)) === false) && ((minutes.value.length && seconds.value.length) === 2) && (hours.value.length >= 1) &&(minutes.value <= 59) && (seconds.value <= 60)) {
        countDown();
    }
});

// Button for start function del
reset.addEventListener("click", del);

