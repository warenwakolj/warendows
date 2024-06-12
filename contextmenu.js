document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    const contextMenu = document.getElementById('customContextMenu');
    contextMenu.style.top = `${e.pageY}px`;
    contextMenu.style.left = `${e.pageX}px`;
    contextMenu.classList.add('open');
});

document.addEventListener('click', function(e) {
    const contextMenu = document.getElementById('customContextMenu');
    if (e.target !== contextMenu && !contextMenu.contains(e.target)) {
        contextMenu.classList.remove('open');
    }
});

document.getElementById('changeBackground').addEventListener('click', function() {
    const customizationPanel = document.getElementById('customizationPanel');
    customizationPanel.classList.add('open');
    document.getElementById('customContextMenu').classList.remove('open');
});

document.getElementById('applyBackground').addEventListener('click', function() {
    const fileInput = document.getElementById('backgroundInput');
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.body.style.backgroundImage = `url(${e.target.result})`;
            document.body.style.backgroundSize = 'cover';
        };
        reader.readAsDataURL(file);
    }
    document.getElementById('customizationPanel').classList.remove('open');
});

document.getElementById('closePanel').addEventListener('click', function() {
    document.getElementById('customizationPanel').classList.remove('open');
});

document.addEventListener('click', function(e) {
    const customizationPanel = document.getElementById('customizationPanel');
    if (e.target !== customizationPanel && !customizationPanel.contains(e.target) &&
        e.target.id !== 'changeBackground') {
        customizationPanel.classList.remove('open');
    }
});

function makeDraggable(element) {
    const header = element.querySelector('.header');
    let isDragging = false;
    let startX, startY, initialX, initialY;

    header.addEventListener('mousedown', function(e) {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        initialX = element.offsetLeft;
        initialY = element.offsetTop;
        document.addEventListener('mousemove', moveElement);
        document.addEventListener('mouseup', stopDragging);
    });

    function moveElement(e) {
        if (isDragging) {
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            element.style.left = `${initialX + dx}px`;
            element.style.top = `${initialY + dy}px`;
        }
    }

    function stopDragging() {
        isDragging = false;
        document.removeEventListener('mousemove', moveElement);
        document.removeEventListener('mouseup', stopDragging);
    }
}

makeDraggable(document.getElementById('customizationPanel'));
