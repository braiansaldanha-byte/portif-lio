        document.addEventListener('keydown', function() {
            window.location.href = 'index.html';
        });

        document.addEventListener('keydown', function(event) {
            if (event.ctrlKey && event.altKey && event.key === 'Delete') {
                location.reload(); 
            } else {
                window.location.href = 'index.html'; 
            }
        });
        

     