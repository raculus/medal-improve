function mapValue(value, fromMin, fromMax, toMin, toMax) {
  // 원래 범위에서의 비율을 계산
  var ratio = (value - fromMin) / (fromMax - fromMin);

  // 새로운 범위에서의 값을 계산
  var mappedValue = ratio * (toMax - toMin) + toMin;

  // 값이 새로운 범위를 초과하지 않도록 보장
  mappedValue = Math.min(Math.max(mappedValue, toMin), toMax);

  return Math.round(mappedValue);
}

function totalTimeColor() {
  const totalTime = document.getElementById("total-time");
  const { minutes, seconds } = parseTimeString(totalTime.textContent);
  if (minutes * 60 + seconds > 120) {
    totalTime.style.color = "rgb(255, 0, 255)";
    return;
  }
  const g = mapValue(120 - (minutes * 60 + seconds), 0, 120, 0, 255);
  const b = mapValue(120 - (minutes * 60 + seconds), 0, 120, 0, 255);
  var color = `rgb(255, ${g}, ${b})`;
  totalTime.style.color = color;
}

/** str -> minutes, seconds */
function parseTimeString(timeString) {
  var [minutes, seconds] = timeString.split(":").map(Number);
  return { minutes, seconds };
}

/** minutes, seconds -> str */
function formatTimeString({ minutes, seconds }) {
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function increaseTime(timeString, secondsToAdd) {
  var { minutes, seconds } = parseTimeString(timeString);
  seconds += secondsToAdd;
  while (seconds >= 60) {
    minutes++;
    seconds -= 60;
  }
  return formatTimeString({ minutes, seconds });
}

function decreaseTime(timeString, secondsToSubtract) {
  var { minutes, seconds } = parseTimeString(timeString);
  seconds -= secondsToSubtract;
  while (seconds < 0) {
    minutes--;
    seconds += 60;
  }
  return formatTimeString({ minutes, seconds });
}

selected_clip_list = [];

document.addEventListener("click", function (event) {
  if (!createTotalTime()) {
    console.log("Total time element not found");
    selected_clip_list = [];
    totalTime.textContent = "0:00";
    return;
  }
  var clickedElement = event.target;
  for (var i = 0; i < 3; i++) {
    clickedElement = clickedElement.parentNode;
  }
  var totalTime = document.getElementById("total-time");
  var strTime = clickedElement.children[1].children[0].textContent;
  var strTotalTime = totalTime.textContent;
  var { minutes, seconds } = parseTimeString(strTime);

  if (selected_clip_list.includes(clickedElement)) {
    selected_clip_list.pop(clickedElement);
    totalTime.textContent = decreaseTime(strTotalTime, minutes * 60 + seconds);
  } else {
    selected_clip_list.push(clickedElement);
    totalTime.textContent = increaseTime(strTotalTime, minutes * 60 + seconds);
  }
  totalTimeColor();
});

function createTotalTime() {
  var toolbar = document.querySelector("#action-toolbar > div:nth-child(1) > div:nth-child(1)");
  if (toolbar == null) {
    return false;
  }

  if (document.getElementById("total-time")) {
    return true;
  }
  var totalTime = document.createElement("p");
  totalTime.id = "total-time";
  totalTime.textContent = "0:00";
  toolbar.appendChild(totalTime);
  return true;
}
