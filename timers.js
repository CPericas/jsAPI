/*
Task 1: Countdown Timer
Create a countdown timer that starts from a user-defined duration (in seconds) and updates every second until it reaches zero. Use setInterval to 
update the timer display.
Task 2: Delayed Notification
Implement a function that displays a notification after a specified delay (in milliseconds) using setTimeout.
Task 3: Repeat Notification
Develop a function that repeatedly displays a notification at fixed intervals until the user dismisses it. Use setInterval to schedule the 
notifications
*/

//countdown// 
function startCountdown(durationInSeconds) {
    let timeLeft = durationInSeconds;

    const countdownDisplay = document.getElementById("countdownDisplay");
    const intervalId = setInterval(function() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        const timeString = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

        countdownDisplay.textContent = "Time Left: " + timeString;
        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(intervalId);
            countdownDisplay.textContent = "Time's up!";
            console.log("Time's up!");
        }
    }, 1000);
}
const userDefinedDuration = 20;
startCountdown(userDefinedDuration)


//delayed notification//
function showNotification(message, delay) {
    setTimeout(function(){
        console.log(message);
        const notification = document.createElement("div");
        notification.textContent = message;

        document.body.appendChild(notification);
        setTimeout(function() {
            document.body.removeChild(notification);
            console.log("Notification complete")
        }, 5000);
    }, delay);     
}
showNotification("URGENT Notification...?", 3000)


//repeat notification stopped by pushing a button//
document.addEventListener("DOMContentLoaded", () => {
    console.log("Script is loaded and running!");

    function startRepeatingNotifications(message, interval) {
        let notificationInterval;

        function showNotification() {
            if (document.getElementById("active-notification")) return;

            const notification = document.createElement("div");
            notification.id = "active-notification";
            notification.textContent = message;
            notification.style.position = "fixed";
            notification.style.bottom = "20px";
            notification.style.right = "20px";
            notification.style.backgroundColor = "#444";
            notification.style.color = "#fff";
            notification.style.padding = "10px 20px";
            notification.style.borderRadius = "5px";
            notification.style.zIndex = "1000";
            notification.style.border = "1px solid red";

            const dismissButton = document.createElement("button");
            dismissButton.textContent = "Dismiss";
            dismissButton.style.marginLeft = "10px";
            dismissButton.style.backgroundColor = "#ff5f5f";
            dismissButton.style.color = "#fff";
            dismissButton.style.border = "none";
            dismissButton.style.padding = "5px 10px";
            dismissButton.style.borderRadius = "5px";
            dismissButton.style.cursor = "pointer";

            dismissButton.addEventListener("click", function () {
                document.body.removeChild(notification);
                console.log("Notification dismissed by user.");
                clearInterval(notificationInterval);
            });

            notification.appendChild(dismissButton);
            document.body.appendChild(notification);

            setTimeout(function () {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                    console.log("Notification removed automatically.");
                }
            }, 5000);
        }
        notificationInterval = setInterval(showNotification, interval);
    }
    startRepeatingNotifications("DANGER!", 3000);
});
