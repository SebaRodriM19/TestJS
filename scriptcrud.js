let users = [];

const addUser = (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;
    const email = document.getElementById("email").value;

    if (name === "" || surname === "" || email === "") {
        alert("Please fill in all fields.");
        return;
    }

    if (!checkEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    //Check if users already exists
    let userIndex = searchIndexUser(email);
    if (userIndex !== -1) {
        alert("User already exists.");
        return;
    }

    let newUser = {
        name: name,
        surname: surname,
        email: email
    };

    users.push(newUser);

    updateTableUser();

    document.getElementById("name").value = "";
    document.getElementById("surname").value = "";
    document.getElementById("email").value = "";
}

const removeUser = () => {
    let email = document.getElementById("removeEmail").value;
    let name = document.getElementById("removeName").value;
    let surname = document.getElementById("removeSurname").value;

    let userIndex = searchIndexUser(email, name, surname);
    if (userIndex === -1) {
        alert("User not found.");
        return;
    }

    users.splice(userIndex, 1);
    updateTableUser();

    document.getElementById("removeEmail").value = "";
    document.getElementById("removeName").value = "";
    document.getElementById("removeSurname").value = "";
}

const editUser = () => {
    const email = document.getElementById("editEmail").value;
    const newName = document.getElementById("newName").value;
    const newSurname = document.getElementById("newSurname").value;
    const newEmail = document.getElementById("newEmail").value;

    let userIndex = searchIndexUser(email);

    if (userIndex === -1) {
        alert("User not found.");
        return;
    }

    if (!checkEmail(newEmail)) {
        alert("Please enter a valid email address.");
        return;
    }

    users[userIndex].name = newName;
    users[userIndex].surname = newSurname;
    users[userIndex].email = newEmail;

    updateTableUser();

    document.getElementById("editEmail").value = "";
    document.getElementById("newName").value = "";
    document.getElementById("newSurname").value = "";
    document.getElementById("newEmail").value = "";
}

const searchUser = () => {
    let email = document.getElementById("searchEmail").value;

    let userIndex = searchIndexUser(email);

    if (userIndex === -1) {
        alert("Utente non trovato.");
        return;
    }

    let user = users[userIndex];

    let message = `Utente trovato! \nNome: ${user.name} Cognome: ${user.surname} Email: ${user.email}`;
    alert(message);

    document.getElementById("searchEmail").value = "";
}

const searchIndexUser = (email) => {
    for (let i = 0; i < users.length; i++) {
        if (users[i].email === email) {
            return i;
        }
    }
    //User not found
    return -1;
};

const checkEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

const updateTableUser = () => {
    let tableUser = document.getElementById("userTable");

    while (tableUser.rows.length > 1) {
        tableUser.deleteRow(1);
    }

    for (let i = 0; i < users.length; i++) {
        let user = users[i];

        let row = tableUser.insertRow();
        let cellName = row.insertCell();
        cellName.textContent = user.name;
        let cellSurname = row.insertCell();
        cellSurname.textContent = user.surname;
        let cellEmail = row.insertCell();
        cellEmail.textContent = user.email;
    }
}

const displayMessage = (message) => {
    let messageParagraph = document.createElement("p");
    messageParagraph.textContent = message;
    document.body.appendChild(messageParagraph);
};