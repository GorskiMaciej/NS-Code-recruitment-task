const getUserBtn = document.querySelector('.start-window__button-get-users');
const resetBtn = document.querySelector('.button--reset');
const listContainer = document.querySelector('.list-window__list-container');
const startWindow = document.querySelector('.start-window');
const listWindow = document.querySelector('.list-window');
const usersList = [];

const getUsers = () => {
    const url = 'https://jsonplaceholder.typicode.com/users';

    fetch(url)
        .then(response => response.json())
        .then(json => {
            const list = saveUserList(json);
            renderUserList(list);
        })
        .catch(err => alert(err))
}

const saveUserList = (gotList) => {
    const list = [];
    gotList.forEach(item => {
        const listElement = new User(item)
        list.push(listElement);
    })
    return list;
}

const renderUserList = (users) => {
    users.forEach((user, index) => {
        const liElement = document.createElement('li');
        liElement.classList.add('list-window__lits-item');
        liElement.innerHTML = `
    <div class="user">
        <div class="user__main-info">
            <div class="user__avatar-container">
                <img class="user__avatar-img" src="IMG/avatar_512.png" alt="avatar">
            </div>
            <div class="user__main-info-text">
                <p class="user__text user__text--main">${user.name}</p>
                <p class="user__text">e-mail: ${user.email}</p>
            </div>
            <div class="user__toggle-btn"></div>

        </div>
        <div class="user__additional-info">
            <p class="user__text">Adres:</p>
            <p class="user__text">${user.street} ${user.suite}</p>
            <p class="user__text">${user.zipcode} ${user.city} </p>
            <p class="user__text">telefon: ${user.phone}</p>
            <p class="user__text">www:<a href="${user.website}"><p class="user__text">${user.website}</p></a></p>
        </div>
    </div>`;
        listContainer.appendChild(liElement);
    });
}

const clearUserList = () => {
    usersList.length = 0;
    listContainer.textContent = '';
}

const switchWindows = () => {
    startWindow.classList.toggle('start-window--off');
    listWindow.classList.toggle('list-window--off');
}

class User {
    constructor(user) {
        this.name = user.name;
        this.email = user.email;
        this.phone = user.phone;
        this.street = user.address.street;
        this.suite = user.address.suite;
        this.city = user.address.city;
        this.zipcode = user.address.zipcode;
        this.website = user.website;
    }
}


getUserBtn.addEventListener('click', () => {
    getUsers();
    switchWindows()
});
resetBtn.addEventListener('click', () => {
    clearUserList();
    switchWindows();
});