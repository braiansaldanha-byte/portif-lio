function createBinaryRain() {
    const binaryContainer = document.getElementById('binaryRain');
    const numberOfColumns = Math.floor(window.innerWidth / 40);

    for (let i = 0; i < numberOfColumns; i++) {
        const column = document.createElement('div');
        column.className = 'binary-column';
        column.style.left = (i * 40) + 'px';
        column.style.animationDelay = Math.random() * 5 + 's';
        column.style.animationDuration = (Math.random() * 10 + 15) + 's';
        
        const numberOfDigits = Math.floor(Math.random() * 15) + 8;
        for (let j = 0; j < numberOfDigits; j++) {
            const digit = document.createElement('span');
            digit.textContent = Math.random() > 0.5 ? '1' : '0';
            digit.style.opacity = Math.random() * 0.7 + 0.3;
            column.appendChild(digit);
        }
        
        binaryContainer.appendChild(column);
    }
}

window.addEventListener('load', createBinaryRain);
window.addEventListener('resize', function() {
    const binaryContainer = document.getElementById('binaryRain');
    binaryContainer.innerHTML = '';
    createBinaryRain();
});

document.addEventListener('keydown', function(e) {
    if (e.code === 'Space' || e.code === 'Enter') {
        window.location.href = 'index.html';
    }
});