const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;
const usersFile = "users.json";

app.use(bodyParser.json());
app.use(express.static("public"));

// Charger les utilisateurs depuis users.json
const loadUsers = () => {
    if (!fs.existsSync(usersFile)) return [];
    const data = fs.readFileSync(usersFile);
    return JSON.parse(data);
};

// Sauvegarder les utilisateurs
const saveUsers = (users) => {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
};

// 🔹 Route pour l'enregistrement
app.post("/register", (req, res) => {
    const { username, email, password } = req.body;
    let users = loadUsers();

    if (users.find((user) => user.email === email)) {
        return res.status(400).json({ message: "Cet email est déjà utilisé." });
    }

    users.push({ username, email, password });
    saveUsers(users);

    res.json({ message: "Compte créé avec succès !" });
});

// 🔹 Route pour la connexion
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    let users = loadUsers();

    const user = users.find((user) => user.email === email && user.password === password);

    if (!user) {
        return res.status(401).json({ message: "Email ou mot de passe incorrect." });
    }

    res.json({ message: "Connexion réussie !" });
});

// 🔹 Route pour la récupération de mot de passe
app.post("/forgot-password", (req, res) => {
    const { email, newPassword } = req.body;
    let users = loadUsers();

    let user = users.find((user) => user.email === email);
    if (!user) {
        return res.status(404).json({ message: "Utilisateur introuvable." });
    }

    user.password = newPassword;
    saveUsers(users);
    res.json({ message: "Mot de passe mis à jour avec succès !" });
});

app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});