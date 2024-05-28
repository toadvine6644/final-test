const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const btnStart = $(".startBet");
const btnReset = $(".resetBet")
const dicesItem = $$(".figure:not(.figureBet) .figureItem");
const dices = $$(".figureBet .figureItem");
var figures = [
    {
        index: 0,
        image: './assets/img/huou.png',
        percent: 16.6666,
        coin: 0,
    },
    {
        index: 1,
        image: './assets/img/bau.png',
        percent: 16.6666,
        coin: 0,
    },
    {
        index: 2,
        image: './assets/img/ga.png',
        percent: 16.6666,
        coin: 0,
    },
    {
        index: 3,
        image: './assets/img/ca.png',
        percent: 16.6666,
        coin: 0,
    },
    {
        index: 4,
        image: './assets/img/cua.png',
        percent: 16.6666,
        coin: 0,
    },
    {
        index: 5,
        image: './assets/img/tom.png',
        percent: 16.6666,
        coin: 0,
    },
];
var user = {
    betTable: 1
}
function updateData() {
    dicesItem.forEach((e, index) => {
        var img = e.querySelector('.figureItemGroup img');
        var labelCoin = e.querySelector('.figureItemGroup label');
        img.src = figures[index].image;
        labelCoin.innerHTML = figures[index].coin;
    });
}
updateData();
var randomFigure = () => {
    var value = Math.random() * 100;
    var sum = 0;
    var element;
    for (var i = 0; i < figures.length; i++) {
        sum += figures[i].percent;
        if (sum > value) {
            element = figures[i];
            break;
        }
    }
    return element;
}
var randomFigure = () => {
    var value = Math.random() * 100;
    var sum = 0;
    var element;
    for (var i = 0; i < figures.length; i++) {
        sum += figures[i].percent;
        if (sum > value) {
            element = figures[i];
            break;
        }
    }
    return element;
}
btnStart.onclick = () => {
    var flag = false;
    for (var i = 0; i < figures.length; i++)
        if (figures[i].coin > 0) {
            flag = true;
            break;
        }
    if (!flag)
        return;
    var wins = [];
    var t = 0;
    var timer = setInterval(() => {
        t += 100;
        if (t >= 500) {
            clearInterval(timer);
            winOfLose(wins);
        } else {
            wins = [randomFigure(), randomFigure(), randomFigure()];
            dices[0].querySelector('img').src = wins[0].image;
            dices[1].querySelector('img').src = wins[1].image;
            dices[2].querySelector('img').src = wins[2].image;
        }
    }, 100);
}
dicesItem.forEach((e) => {
    e.onclick = (e) => {
            var item = e.target.parentElement.parentElement;
            user.coin -= user.betTable;
            figures[item.dataset.id].coin += user.betTable;
            updateData();
    }
})
function winOfLose(wins) {
    var winCoin = 0;
    for (var i = 0; i < wins.length; i++) {
        for (var j = 0; j < figures.length; j++) {
            if (wins[i].index == figures[j].index) {
                winCoin += wins[i].coin ;
            }
        }
    }
    for (var j = 0; j < figures.length; j++) {
        figures[j].coin = 0;
    }
    user.coin += winCoin;
    updateData();
    if (winCoin > 0)
        console.log("Bạn đoán đúng " + winCoin + " hình");
}