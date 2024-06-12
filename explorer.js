function toggleMenu() {
    var menu = document.getElementById("start-menu");
    if (menu.style.display === "block") {
      menu.style.display = "none";
    } else {
      menu.style.display = "block";
    }
  }
  let draggedIcon = null;
  let offsetX = 0;
  let offsetY = 0;
  
  function dragStart(event) {
      draggedIcon = event.currentTarget;
      const rect = draggedIcon.getBoundingClientRect();
      offsetX = event.clientX - (rect.left + rect.width / 2);
      offsetY = event.clientY - (rect.top + rect.height / 2);
      event.dataTransfer.setData("text/plain", "");
  }
  
  function dragOver(event) {
      event.preventDefault();
  }
  
  function drop(event) {
      event.preventDefault();
      if (draggedIcon) {
          const x = event.clientX - offsetX - (draggedIcon.offsetWidth / 2);
          const y = event.clientY - offsetY - (draggedIcon.offsetHeight / 2);
          draggedIcon.style.position = "absolute";
          draggedIcon.style.left = `${x}px`;
          draggedIcon.style.top = `${y}px`;
      }
      draggedIcon = null;
  }
  
  document.addEventListener("dragover", dragOver);
  document.addEventListener("drop", drop);
  
  document.getElementById('stopResetBtn').addEventListener('click', function() {
    var video = document.getElementById('myVideo');
    video.pause();
    video.currentTime = 0;
});

function updateTime() {
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; 
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var currentTime = hours + ':' + minutes + ' ' + ampm;
  document.getElementById('time').innerHTML = currentTime;
}

updateTime();

setInterval(updateTime, 1000);

function updateDate() {
  var now = new Date();
  var day = now.getDate();
  var month = now.getMonth() + 1; 
  var year = 2012; 

  day = day < 10 ? '0' + day : day;
  month = month < 10 ? '0' + month : month;

  var currentDate = month + '/' + day + '/' + year;
  document.getElementById('date').innerHTML = currentDate;
}

updateDate();
