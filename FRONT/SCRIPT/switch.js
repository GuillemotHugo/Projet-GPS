function changeContenu(contenu) {
    document.querySelector('.Page').innerHTML = contenu;
}

window.onload = function() {
    changeContenu(`
        <div class="loginForm" class="RLForm">
                <p class="formTitle"><strong>Se connecter</strong></p>
                <label for="Username">Nom d'utilisateur</label>
                <input type="text" name="Username" id="LogUsername_input">
                <label for="Password">Mot de passe</label>
                <input type="password" name="Password" id="LogPassword_input">
                <div class="LogcontainerSelector">
                    <div id="SubmitLogin" onclick="submitLogin()">Se connecter</div>
                </div>
                <div id="resultLogin" style="color: red; margin: 2%;"></div>
        </div>
    `)};

document.getElementById('Login').addEventListener('click', function() {
    changeContenu(`
        <div class="loginForm" class="RLForm">
                <p class="formTitle"><strong>Se connecter</strong></p>
                <label for="Username">Nom d'utilisateur</label>
                <input type="text" name="Username" id="LogUsername_input">
                <label for="Password">Mot de passe</label>
                <input type="password" name="Password" id="LogPassword_input">
                <div class="LogcontainerSelector">
                    <div id="SubmitLogin" onclick="submitLogin()">Se connecter</div>
                </div>
                <div id="resultLogin" style="color: red; margin: 2%;"></div>
        </div>
    `);
});

document.getElementById('Register').addEventListener('click', function() {
    changeContenu(`
        <div class="RegForm">
                <p class="formTitle"><strong>Créer un compte</strong></p>
                <label for="Username">Nom d'utilisateur</label>
                <input type="text" name="Username" id="RegUsername_input">
                <label for="Password">Mot de passe</label>
                <input type="password" name="Password" id="RegPassword_input">
                <div class="LogcontainerSelector">
                    <div id="submitRegister" onclick="submitRegister()">Créer un compte</div>
                </div>
                <div id="resultRegister" style="color: red; margin: 2%;"></div>
        </div>
    `);
});

document.getElementById('MainPage').addEventListener('click', function() {
    changeContenu(`
        <div class="MainDiv">
            <p class="MainTitle"><strong>Position GPSsss</strong></p>
            <div id="map" style="height: 400px; width: 100%;"></div>
        </div>
    `);

    // Initialiser la carte après que le DOM ait été mis à jour
    const map = L.map('map').setView([48.8566, 2.3522], 13); // Coordonnées GPS (Paris)

    // Ajouter les tuiles OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Ajouter un marqueur sur la carte
    const marker = L.marker([48.8566, 2.3522]).addTo(map);
    marker.bindPopup("<b>Position GPS</b><br>Latitude: 48.8566<br>Longitude: 2.3522").openPopup();

});

