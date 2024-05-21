document.addEventListener('DOMContentLoaded', function () {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js').then(function (registration) {
            console.log('Service Worker registered with scope:', registration.scope);
        }).catch(function (error) {
            console.log('Service Worker registration failed:', error);
        });
    }

    function loadHome() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(data => {
                let content = '<h2>Users</h2><ul class="list-group">';
                data.forEach(user => {
                    content += `<li class="list-group-item">${user.name} - ${user.email}</li>`;
                });
                content += '</ul>';
                document.getElementById('content').innerHTML = content;
            });
    }

    function loadGallery() {
        fetch('https://jsonplaceholder.typicode.com/photos')
            .then(response => response.json())
            .then(data => {
                let content = '<h2>Gallery</h2><div class="row">';
                data.forEach(photo => {
                    content += `
                        <div class="col-md-4">
                            <div class="card mb-4 shadow-sm">
                                <img class="card-img-top" src="${photo.url}" alt="${photo.title}">
                                <div class="card-body">
                                    <p class="card-text">${photo.title}</p>
                                </div>
                            </div>
                        </div>`;
                });
                content += '</div>';
                document.getElementById('content').innerHTML = content;
            });
    }

    function loadAbout() {
        document.getElementById('content').innerHTML = `
            <h2>About</h2>
            <p>Name: Kim Wencel E. Jaraplasan</p>
            <p>Email: 0321-2981@lspu.edu.ph</p>
            <p>Address: San Nicolas, Bay, Laguna</p>
            <p>Phone Number: 0994 000 0000</p>
        `;
    }

    function router() {
        const hash = window.location.hash.substring(1);
        if (hash === 'gallery') {
            loadGallery();
        } else if (hash === 'about') {
            loadAbout();
        } else {
            loadHome();
        }
    }

    window.addEventListener('hashchange', router);
    router();
});
