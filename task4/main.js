import 'normalize.css';
import './index.less';

class Card { // класс карточки
    constructor(id, name, url, desc, code, provider) {
        this.id = id;
        this.name = name;
        this.url = url;
        this.description = desc;
        this.code = code;
        this.provider = provider;
    }
}
function generateId () {
    return Math.random().toString(16).slice(2);
}

function fetchAll() { // получаем все данные
    fetchProfile();
    fetchCards();
}

async function fetchProfile(){ // получаем и выводим имя автора
    try {
        let user = await fetch('http://localhost:3000/profile').then( (response) =>  response.json());
        document.getElementById('header__text').textContent = user.name + " " + user.group;
    } catch (err) {
        alert("Ошибка в запросе имени автора: " + err);
    }
    
}

let i = 0;
function drawCard(card) { // функцию отрисовки карточки
    const divCard = document.createElement("div");
    divCard.id = `card${i}`;
    divCard.setAttribute('class', "list-block__card");
    document.getElementsByClassName("list-block__list")[0].appendChild(divCard);

    const divCardHead = document.createElement("div");
    divCardHead.id = `cardHead${i}`;
    divCardHead.setAttribute('class', "list-block__card-head");
    document.getElementById(`card${i}`).appendChild(divCardHead);

    const divCardCode = document.createElement("div");
    divCardCode.id = `cardId${i}`;
    divCardCode.setAttribute('class', "list-block__card-head__id");
    divCardCode.textContent = `id: ${card.code}`;
    document.getElementById(`cardHead${i}`).appendChild(divCardCode);

    const divCardEdit = document.createElement("div");
    divCardEdit.setAttribute('class', "list-block__card-head__edit");
    divCardEdit.addEventListener('click', pullForm);
    divCardEdit.editId = card.id;
    divCardEdit.textContent = 'Редачить';
    document.getElementById(`cardHead${i}`).appendChild(divCardEdit);

    const divCardDestroy = document.createElement("div");
    divCardDestroy.setAttribute('class', "list-block__card-head__dest");
    divCardDestroy.textContent = `X`;
    divCardDestroy.addEventListener('click', destroyCard);
    divCardDestroy.delId = card.id;
    document.getElementById(`cardHead${i}`).appendChild(divCardDestroy);
    
    const divCardMain = document.createElement("div");
    divCardMain.id = `cardMain${i}`;
    divCardMain.setAttribute('class', "list-block__card-main");
    document.getElementById(`card${i}`).appendChild(divCardMain);

    const divCardImg = document.createElement("img");
    divCardImg.setAttribute('class', "list-block__card-main__img");
    divCardImg.src = `${card.url}`;
    document.getElementById(`cardMain${i}`).appendChild(divCardImg);

    const divCardText = document.createElement("div");
    divCardText.id = `cardText${i}`;
    divCardText.setAttribute('class', "list-block__card-main__text");
    document.getElementById(`cardMain${i}`).appendChild(divCardText);

    const divCardName = document.createElement("div");
    divCardName.setAttribute('class', "list-block__card-main__text__name");
    divCardName.textContent = `${card.name}`;
    document.getElementById(`cardText${i}`).appendChild(divCardName);

    const divCardProvider = document.createElement("div");
    divCardProvider.setAttribute('class', "list-block__card-main__text__provider");
    divCardProvider.textContent = `${card.provider}`;
    document.getElementById(`cardText${i}`).appendChild(divCardProvider);

    const divCardDescription = document.createElement("div");
    divCardDescription.setAttribute('class', "list-block__card-description");
    divCardDescription.textContent = `${card.description}`;
    document.getElementById(`card${i}`).appendChild(divCardDescription);

    ++i;
}
async function fetchCards () { // функция получения и отрисовки карточек с сервера
    try {
        let cards = await fetch('http://localhost:3000/posts').then( (response) =>  response.json());
        let basis = document.getElementsByClassName('basis');
        for (let skeleton of basis){
            skeleton.classList.add('invisible');
        }
        for (let card of (cards ? cards : [])){
            drawCard(card);
        }
    } catch (err) {
        alert("Карточки не приходят c сервера:" + err);
    }
}

async function setupCards () { // функция которая создаёт начальные данные и отправляет на сервер
    let cards = document.getElementsByClassName('list-block__card');
    for (let card of cards){
        card.classList.add('invisible');
    }
    let basis = document.getElementsByClassName('basis');
    for (let skeleton of basis){
        skeleton.classList.remove('invisible');
    }
    try {
        for (let j = 0; j < setupData.length; ){
            await fetch('http://localhost:3000/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                  },
                body: JSON.stringify(setupData[j])
            }).then( ++j);
        }
        
    } catch {
        alert("карточки не сетапятся");
    }
    fetchCards();
}
function validateData(data){
    return (data.name && data.code && data.provider)
}
function serializeForm(formNode, obj) { // собираем данные из формы в объект класса
    const data = Array.from((new FormData(formNode)).entries());
    let card = obj;
    for (let i = 0; i < data.length; ++i) {
        let [key, value] = data[i];
        switch (true) {
            case key == 'name':
                card.name = value;
                break;
            case key == 'url':
                card.url = value;
                break;
            case key == 'description':
                card.description = value;
                break;
            case key == 'code':
                card.code = value;
                break;
            case key == 'provider':
                card.provider = value;
                break;
            default: break;
        }
    }
    return card;
}
  
async function createCard(event) { // функция добавления карточки
    try {
        let card = serializeForm(applicantForm, new Card());
        if (validateData(card)){
            document.getElementById('loader').classList.remove('invisible');
            setupButton.setAttribute('disabled', '');
            submitButton.setAttribute('disabled', '');
            card.id = generateId();
            await fetch('http://localhost:3000/posts', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(card)
            }).then(() => {
                document.getElementById('loader').classList.add('invisible');
                setupButton.removeAttribute('disabled', '');
                submitButton.removeAttribute('disabled', '');
                drawCard(card);
            });
        } else {
            alert("Введите необходимые поля");
        };
        
    } catch (err) {
        alert(err);
    }
}

async function destroyCard(event) { // функция удаления карточки
    try {
        await fetch(`http://localhost:3000/posts/${event.target.delId}`, {
            method: 'DELETE'
        }).then(() => location.reload())
    } catch (err) {
        alert(err);
    }
    
}

async function pullForm(event) { // функция заполнения формы
    try {
        let card = await fetch(`http://localhost:3000/posts/${event.target.editId}`).then((res) => res.json());
        document.getElementsByName('name')[0].value = await card.name;
        document.getElementsByName('url')[0].value = await card.url;
        document.getElementsByName('description')[0].value = await card.description;
        document.getElementsByName('code')[0].value = await card.code;
        document.getElementsByName('provider')[0].value = await card.provider;
        document.getElementById('submit-button').classList.add('invisible');
        document.getElementById('edit-button').classList.remove('invisible');
        document.getElementById('edit-button').editId = card.id;
    } catch(err) {
        alert(err);
    }
    
}

async function editCard(event) { //редактируем данные
    let card = serializeForm(applicantForm, new Card());
    try {
        await fetch(`http://localhost:3000/posts/${event.target.editId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
              },
            body: JSON.stringify(card)
        }).then(() => {
            document.getElementById('submit-button').classList.remove('invisible');
            document.getElementById('edit-button').classList.add('invisible');
            location.reload();
        })
    } catch (err) {
        alert(err);
    }
    
}

const applicantForm = document.getElementById('card-form')
const setupButton = document.getElementById('setup-button');
const editButton = document.getElementById('edit-button');
const submitButton = document.getElementById('submit-button');

setupButton.addEventListener('click', setupCards);
submitButton.addEventListener('click', createCard); 
editButton.addEventListener('click', editCard);

// window.onload = fetchAll;
fetchAll();

