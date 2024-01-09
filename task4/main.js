import 'normalize.css';
import './index.less';

class Card { // класс карточка
    constructor(name, url, desc, id, provider) {
        this.name = name;
        this.url = url;
        this.description = desc;
        this.id = id;
        this.provider = provider;
    }
}

function renderCards () { // функция отрисовки карточек из локалСторейдж
    let cards = JSON.parse(window.localStorage.getItem("cards"));
    let i = 0;
    for (let card of (cards ? cards : []) ){
        
        const divCard = document.createElement("div");
        divCard.id = `card${i}`;
        divCard.setAttribute('class', "list-block__card");
        document.getElementsByClassName("list-block__list")[0].appendChild(divCard);

        const divCardHead = document.createElement("div");
        divCardHead.id = `cardHead${i}`;
        divCardHead.setAttribute('class', "list-block__card-head");
        document.getElementById(`card${i}`).appendChild(divCardHead);

        const divCardId = document.createElement("div");
        divCardId.setAttribute('class', "list-block__card-head__id");
        divCardId.textContent = `Id: ${card.id}`;
        document.getElementById(`cardHead${i}`).appendChild(divCardId);

        const divCardEdit = document.createElement("div");
        divCardEdit.setAttribute('class', "list-block__card-head__edit");
        divCardEdit.addEventListener('click', pullForma);
        divCardEdit.pos = i;
        divCardEdit.textContent = 'Редачить';
        document.getElementById(`cardHead${i}`).appendChild(divCardEdit);

        const divCardDestroy = document.createElement("div");
        divCardDestroy.setAttribute('class', "list-block__card-head__dest");
        divCardDestroy.textContent = `X`;
        divCardDestroy.addEventListener('click', destroyCard);
        divCardDestroy.pos = i;
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
}

function setupCards () { // функция которая создаёт начальные данные и список карточек
    let pencil = new Card("Карандаш", "https://der-artikel.de/images/Bleistift.jpg", "простой", 1, "Пилю сосну");
    let apple = new Card("Яблоко", "https://catherineasquithgallery.com/uploads/posts/2021-02/1612902251_107-p-yabloki-krasnie-fon-162.jpg", "без червяков", 2, "Кошелевка");
    let pencilBox = new Card("Пенал", "https://i.pinimg.com/736x/21/3f/89/213f89e391c3fcfabf132678190277f9.jpg", "крутой, для карандашей", 3, "Концтовары");
    let sneakers = new Card("Кроссовки", "http://klublady.ru/uploads/posts/2022-03/1646996122_119-klublady-ru-p-obraz-zhenskie-krossovki-naik-foto-140.jpg", "43 размер", 4, "Nike");
    let loofah = new Card("Мочалка", "https://static.insales-cdn.com/images/products/1/5369/173585657/b9da487b-651f-11e6-bf7c-003048de1b8b_super_01.jpg", "можно помыться", 5, "Саранск");
    let array = [pencil, apple, pencilBox, sneakers,loofah];
    try {
        window.localStorage.clear();
        window.localStorage.setItem('cards', JSON.stringify(array));
        location.reload();
    } catch {
        alert("ошибка карточек");
    }
}

function serializeForm(formNode, obj) { // собираем данные из формы
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
                card.id = value;
                break;
            case key == 'provider':
                card.provider = value;
                break;
            default: break;
        }
    }
    return card;
}
  
function createCard(event) { // функция создания карточки
    let card = serializeForm(applicantForm, new Card());
    let cards = JSON.parse(window.localStorage.getItem("cards"));
    cards.push(card);
    window.localStorage.clear();
    window.localStorage.setItem('cards', JSON.stringify(cards));
}
  
function destroyCard(event) { // функция удаления карточки
    let cards = JSON.parse(window.localStorage.getItem("cards"));
    cards.splice(event.target.pos, 1);
    window.localStorage.setItem('cards', JSON.stringify(cards));
    location.reload();
}

function pullForma(event) { // функция заполнения формы
    let cards = JSON.parse(window.localStorage.getItem("cards"));
    let card = cards.at(event.target.pos);
    document.getElementsByName('name')[0].value = card.name;
    document.getElementsByName('url')[0].value = card.url;
    document.getElementsByName('description')[0].value = card.description;
    document.getElementsByName('code')[0].value = card.id;
    document.getElementsByName('provider')[0].value = card.provider;
    document.getElementById('submit-button').classList.add('invisible');
    document.getElementById('edit-button').classList.remove('invisible');
    document.getElementById('edit-button').pos = event.target.pos;
}

function editCard(event) { //функция редактирования данных
    let cards = JSON.parse(window.localStorage.getItem("cards"));
    let card = serializeForm(applicantForm, cards.at(event.target.pos));
    window.localStorage.clear();
    window.localStorage.setItem('cards', JSON.stringify(cards));
    document.getElementById('submit-button').classList.remove('invisible');
    document.getElementById('edit-button').classList.add('invisible');

}

const applicantForm = document.getElementById('card-form')
const setupButton = document.getElementById('setup-button');
const editButton = document.getElementById('edit-button');
const submitButton = document.getElementById('submit-button');

setupButton.addEventListener('click', setupCards);
submitButton.addEventListener('click', createCard);
editButton.addEventListener('click', editCard);
window.onload = renderCards; // при перезагрузке страницы рендерим карточки