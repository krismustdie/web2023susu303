let isEditMode = false; // Переменная для отслеживания режима (Создать/Редактировать)
let postIdToEdit = null; //Id поста для редактирования
const usersData = []; //Данные пользователей
let maxPostId = 0;

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme); // Применяем сохраненную тему при загрузке страницы
    }
});

// Получение списка постов и их отображение с лоадером
const loader = document.getElementById('loader');
loader.style.display = 'block'; // Показать лоадер

const postsPromise = fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => response.json())
    .catch(error => {
        loader.style.display = 'none'; // Скрыть лоадер в случае ошибки
        console.error('Ошибка при получении данных о постах:', error);
    });

const usersPromise = fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .catch(error => {
        loader.style.display = 'none'; // Скрыть лоадер в случае ошибки
        console.error('Ошибка при получении данных о пользователях:', error);
    });

Promise.all([postsPromise, usersPromise])
    .then(([posts, users]) => {

        // Обработка данных о пользователях
        const userSelect = document.getElementById("userNameSelect");
        users.forEach(user => {
            usersData[user.id] = user;
            let option = document.createElement("option");
            option.text = user.name;
            userSelect.add(option);
        });
        // Обработка данных о постах
        posts.forEach(jsonPost => displayPost(jsonPost));

        loader.style.display = 'none'; // Скрыть лоадер после получения данных
    });

//Изменение темы
const toggleThemeButton = document.getElementById('toggleThemeButton');
const body = document.body;

// Обработчик клика на кнопку "Сменить тему"
toggleThemeButton.addEventListener('click', function() {
    if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        saveTheme('light'); // Сохраняем выбранную тему в localStorage
    } else {
        body.classList.add('dark-theme');
        saveTheme('dark'); // Сохраняем выбранную тему в localStorage
    }
});

// Обработчик клика на кнопку "Создать пост"
const newPostButton = document.getElementById('newPostButton');
newPostButton.addEventListener('click', openPostModal);

// Обработчик клика на кнопку закрытия модального окна
const closePostModalBtn = document.getElementById('closePostModal');
closePostModalBtn.addEventListener('click', closePostModal);

const closeConfirmModalBtn = document.getElementById('closeConfirmModal');
closeConfirmModalBtn.addEventListener('click', closeConfirmModal);

const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
cancelDeleteBtn.addEventListener('click', closeConfirmModal);

const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
confirmDeleteBtn.addEventListener('click', () => {
    deleteImportantPost(postIdToEdit);
    closeConfirmModal();
});

// Функция для сохранения выбранной темы в localStorage
function saveTheme(theme) {
    localStorage.setItem('theme', theme);
}

// Функция для применения выбранной темы
function applyTheme(theme) {
    body.classList.toggle('dark-theme', theme === 'dark'); // Применяем класс в зависимости от выбранной темы
}

// Функция для отображения поста
function displayPost(jsonPost) {
    if(jsonPost.id > maxPostId) maxPostId = jsonPost.id;
    const postsList = document.querySelector('.posts-list#all-posts');
    const importantPostList = document.querySelector('.posts-list#important-posts');

    const postElement = document.createElement('div');
    postElement.className = 'post-card'
    postElement.dataset.id = jsonPost.id;
    postElement.dataset.userId = jsonPost.userId;

    const btnsBox = document.createElement('div');
    btnsBox.className = 'postFooter';

    const importantBtn = document.createElement('button');
    importantBtn.className = 'importanceButton'
    importantBtn.innerHTML = `<svg width="40px" height="40px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3L14.0357 8.16153C14.2236 8.63799 14.3175 8.87622 14.4614 9.0771C14.5889 9.25516 14.7448 9.41106 14.9229 9.53859C15.1238 9.68245 15.362 9.77641 15.8385 9.96432L21 12L15.8385 14.0357C15.362 14.2236 15.1238 14.3175 14.9229 14.4614C14.7448 14.5889 14.5889 14.7448 14.4614 14.9229C14.3175 15.1238 14.2236 15.362 14.0357 15.8385L12 21L9.96432 15.8385C9.77641 15.362 9.68245 15.1238 9.53859 14.9229C9.41106 14.7448 9.25516 14.5889 9.0771 14.4614C8.87622 14.3175 8.63799 14.2236 8.16153 14.0357L3 12L8.16153 9.96432C8.63799 9.77641 8.87622 9.68245 9.0771 9.53859C9.25516 9.41106 9.41106 9.25516 9.53859 9.0771C9.68245 8.87622 9.77641 8.63799 9.96432 8.16153L12 3Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'deleteButton';
    deleteBtn.innerHTML = `
    <svg width="40px" height="40px" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.8489 22.6922C11.5862 22.7201 11.3509 22.5283 11.3232 22.2638L10.4668 14.0733C10.4392 13.8089 10.6297 13.5719 10.8924 13.5441L11.368 13.4937C11.6307 13.4659 11.8661 13.6577 11.8937 13.9221L12.7501 22.1126C12.7778 22.3771 12.5873 22.614 12.3246 22.6418L11.8489 22.6922Z" fill="#000000"/><path d="M16.1533 22.6418C15.8906 22.614 15.7001 22.3771 15.7277 22.1126L16.5841 13.9221C16.6118 13.6577 16.8471 13.4659 17.1098 13.4937L17.5854 13.5441C17.8481 13.5719 18.0387 13.8089 18.011 14.0733L17.1546 22.2638C17.127 22.5283 16.8916 22.7201 16.6289 22.6922L16.1533 22.6418Z" fill="#000000"/><path clip-rule="evenodd" d="M11.9233 1C11.3494 1 10.8306 1.34435 10.6045 1.87545L9.54244 4.37037H4.91304C3.8565 4.37037 3 5.23264 3 6.2963V8.7037C3 9.68523 3.72934 10.4953 4.67218 10.6145L7.62934 26.2259C7.71876 26.676 8.11133 27 8.56729 27H20.3507C20.8242 27 21.2264 26.6513 21.2966 26.1799L23.4467 10.5956C24.3313 10.4262 25 9.64356 25 8.7037V6.2963C25 5.23264 24.1435 4.37037 23.087 4.37037H18.4561L17.394 1.87545C17.1679 1.34435 16.6492 1 16.0752 1H11.9233ZM16.3747 4.37037L16.0083 3.50956C15.8576 3.15549 15.5117 2.92593 15.1291 2.92593H12.8694C12.4868 2.92593 12.141 3.15549 11.9902 3.50956L11.6238 4.37037H16.3747ZM21.4694 11.0516C21.5028 10.8108 21.3154 10.5961 21.0723 10.5967L7.1143 10.6285C6.86411 10.6291 6.67585 10.8566 6.72212 11.1025L9.19806 24.259C9.28701 24.7317 9.69985 25.0741 10.1808 25.0741H18.6559C19.1552 25.0741 19.578 24.7058 19.6465 24.2113L21.4694 11.0516ZM22.1304 8.7037C22.6587 8.7037 23.087 8.27257 23.087 7.74074V7.25926C23.087 6.72743 22.6587 6.2963 22.1304 6.2963H5.86957C5.34129 6.2963 4.91304 6.72743 4.91304 7.25926V7.74074C4.91304 8.27257 5.34129 8.7037 5.86956 8.7037H22.1304Z" fill-rule="evenodd"/></svg>`

    const userInfo = usersData[jsonPost.userId]

    postElement.innerHTML = `
    <div class="postHeader">
        <h2 class="post-title">${jsonPost.title}</h3>
        <h3 class="post-user-name">${userInfo.name}</h1>
    </div>
    <p class="post-text">${jsonPost.body}</p>`;

    const editBtn = document.createElement('button');
    editBtn.className = 'editButton'
    editBtn.innerHTML = 
    `<svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 4H7.2C6.0799 4 5.51984 4 5.09202 4.21799C4.71569 4.40974 4.40973 4.7157 4.21799 5.09202C4 5.51985 4 6.0799 4 7.2V16.8C4 17.9201 4 18.4802 4.21799 18.908C4.40973 19.2843 4.71569 19.5903 5.09202 19.782C5.51984 20 6.0799 20 7.2 20H16.8C17.9201 20 18.4802 20 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V12.5M15.5 5.5L18.3284 8.32843M10.7627 10.2373L17.411 3.58902C18.192 2.80797 19.4584 2.80797 20.2394 3.58902C21.0205 4.37007 21.0205 5.6364 20.2394 6.41745L13.3774 13.2794C12.6158 14.0411 12.235 14.4219 11.8012 14.7247C11.4162 14.9936 11.0009 15.2162 10.564 15.3882C10.0717 15.582 9.54378 15.6885 8.48793 15.9016L8 16L8.04745 15.6678C8.21536 14.4925 8.29932 13.9048 8.49029 13.3561C8.65975 12.8692 8.89125 12.4063 9.17906 11.9786C9.50341 11.4966 9.92319 11.0768 10.7627 10.2373Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
    editBtn.addEventListener('click', ()=> {
        document.getElementById('userNameSelect').selectedIndex = postElement.dataset.userId - 1;
        document.getElementById('postTitle').value = postElement.querySelector('.post-title').textContent;
        document.getElementById('postContent').value = postElement.querySelector('.post-text').textContent;
        postIdToEdit = jsonPost.id;
        openPostModal(true);
    });

    deleteBtn.addEventListener('click', () => {
        deletePost(jsonPost.id);
    })

    //Проверка, находится ли пост в важном
    if(postInImportants(jsonPost.id)){
        setRemoveImportantBtn(importantBtn, jsonPost.id);
        importantPostList.appendChild(postElement);
    }
    else {
        setAddImportantBtn(importantBtn, jsonPost.id);
        postsList.appendChild(postElement);
    }
    btnsBox.appendChild(deleteBtn);
    btnsBox.appendChild(editBtn);
    btnsBox.appendChild(importantBtn);
    postElement.appendChild(btnsBox);
}

function setAddImportantBtn(btn, postId){
    btn.setAttribute('id', 'notImportant');
    btn.addEventListener('click', () => {
        addToImportant(postId)
    });
}

function setRemoveImportantBtn(btn, postId) {
    btn.setAttribute('id', 'important');
    btn.addEventListener('click', () => {
        removeFromImportant(postId)
    });
}

function addToImportant(postId){
    let arr = JSON.parse(localStorage.getItem('importants')) || [];
    arr.push(postId);
    localStorage.setItem('importants', JSON.stringify(arr));
    const post = getPostById('.posts-list#all-posts', postId);
    if (post !== null){
        displayNewPost('.posts-list#all-posts', postId);
    }
}

function removeFromImportant(postId){
    if(localStorage.getItem('importants') == null) return;
    let arr = JSON.parse(localStorage.getItem('importants'));
    let newArr = arr.filter(value => value !== postId);
    localStorage.setItem('importants', JSON.stringify(newArr));

    displayNewPost('.posts-list#important-posts', postId);
}

function displayNewPost(selector, postId){
    const post = getPostById(selector, postId);
    if (post !== null){
        const jsonPost = {
            title: post.querySelector('.post-title').textContent,
            body: post.querySelector('.post-text').textContent,
            id: Number(post.dataset.id),
            userId: Number(post.dataset.userId),
        }

        document.querySelector(selector).removeChild(post);
        displayPost(jsonPost);
    }
}

function postInImportants(postId){
    if(localStorage.getItem('importants') == null) return;
    let arr = JSON.parse(localStorage.getItem('importants'));
    return arr.includes(postId);
}

function getPostById(selector, postId){
    const list = document.querySelector(selector);
    const  elements = list.children;
    let foundElement = null;
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        if (element.dataset.id == postId) {
            foundElement = element;
            break;
        }
    }
    return foundElement;
}

// Функция открытия модального окна
function openPostModal(isEdit) {
    const modal = document.getElementById('postModal');
    
    modal.style.display = 'block';
    isEditMode = isEdit;
}

// Функция закрытия модального окна
function closePostModal() {
    const modal = document.getElementById('postModal');
    modal.style.display = 'none';
    isEditMode = false;

    document.getElementById('userNameSelect').selectedIndex = 0;
    document.getElementById('postTitle').value = "";
    document.getElementById('postContent').value = "";
}

function openConfirmModal(postId){
    postIdToEdit = postId;
    const modal = document.getElementById('confirmModal');
    modal.style.display = 'block';
}

function closeConfirmModal(){
    const modal = document.getElementById('confirmModal');
    modal.style.display = 'none';
}

function getPostInfoFromModal(){
    const user = document.getElementById('userNameSelect');
    const postTitle = document.getElementById('postTitle');
    const postContent = document.getElementById('postContent');

    return {
        title: postTitle.value,
        body: postContent.value,
        userId: user.selectedIndex + 1,
    };
}

//Обработка на нажатие кнопки сохранения
const saveBtn = document.getElementById('savePostBtn');
saveBtn.addEventListener('click',  ()  => {
    event.preventDefault();
    savePost();
    closePostModal();
})

function savePost(){
    let postInfo = getPostInfoFromModal();
    if(postInfo === null) return;

    if(isEditMode === true) editPost(postInfo);
    else createPost(postInfo);

}

function createPost(postInfo){
    const jsonPost = {
        title: postInfo.title,
        body: postInfo.body,
        userId: postInfo.userId,
        id: ++maxPostId,
    }
    displayPost(jsonPost);
}

function editPost(postInfo){
    if(postIdToEdit === null) return;

    let post;
    if(postInImportants(postIdToEdit))
        post = getPostById('.posts-list#important-posts', postIdToEdit);
    else
        post = getPostById('.posts-list#all-posts', postIdToEdit);
    editPostData(post, postInfo);
}

function editPostData(post, data){
    post.querySelector('.post-title').textContent = data.title;
    post.querySelector('.post-text').textContent = data.body;
    post.querySelector('.post-user-name').textContent = usersData[data.userId].name;
    post.dataset.userId = data.userId;
}

function deletePost(postId){
    if(postInImportants(postId))
        openConfirmModal(postId);
    else{
        document.querySelector('.posts-list#all-posts').removeChild(getPostById('.posts-list#all-posts', postId));
    }
}

function deleteImportantPost(postId){
    document.querySelector('.posts-list#important-posts').removeChild(getPostById('.posts-list#important-posts', postId));
}