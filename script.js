let modo = 'relogio'
let intervaloCrono
let tempoCorrido = 0

function relogioUpdate() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const day = now.getDate();
    const month = now.toLocaleString('pt-BR', { month: 'long' });
    const year = now.getFullYear();

    // Formatar a hora corretamente
    const formatTempo = 
        String(hours).padStart(2, '0') + ':' +
        String(minutes).padStart(2, '0') + ':' +
        String(seconds).padStart(2, '0');

    // Atualizar os elementos HTML
    document.getElementById('clock').textContent = formatTempo;
    document.getElementById('dia-mes-ano').textContent = `${day} de ${month} de ${year}`;

    // Trocar o fundo conforme as horas
    trocarBG(hours);
}

function trocarBG(hours) {
    let backColor, boxColor, textColor

    if (hours >= 6 && hours < 13) {
        backColor = "linear-gradient(to bottom, #A0C7F4 0%, #B2D5FD 44%, #BCDBFF 87%)";
        boxColor = "linear-gradient(to bottom, #A0C7F4 40%, #BCDBFF 80%)"; 
        textColor = "#000000"
        // Manhã
    } else if (hours >= 13 && hours < 18) {
        backColor = "linear-gradient(to bottom, #E5D272 0%, #FF9A76 44%, #8669EE 87%)";
        boxColor = "linear-gradient(to bottom, #E5D272 0%, #C884AD 46%,  #8669EE 100%)";
        textColor = "#000000"
         // Tarde
    } else {
        backColor = "linear-gradient(to bottom, #0B063A 0%, #2D2197 44%, #5A4DC8 87%)"; 
        boxColor = "linear-gradient(to bottom, #5A4DC8 0%, #2D2197 100%)";
        textColor = "#ffffff"
        // Noite

    }

    // Aplicar o gradiente ao body
    document.body.style.background = backColor;
    document.querySelector('.box').style.background = boxColor;

    document.body.style.color = textColor

    document.querySelectorAll('.topics').forEach(element =>{
        element.style.color = textColor
    })

    document.getElementById('clock').style.color = textColor
}

function cronometroUpdate() {
    const centesimos = tempoCorrido % 100;
    const totalSegundos = Math.floor(tempoCorrido / 100);

    const horas = Math.floor(totalSegundos / 3600);
    const minutos = Math.floor((totalSegundos % 3600) / 60);
    const segundos = totalSegundos % 60;

    let tempoFormatado = "";

    if (horas > 0) {
        tempoFormatado = `${horas}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}.${String(centesimos).padStart(2, '0')}`;
    } else if (minutos > 0) {
        tempoFormatado = `${minutos}:${String(segundos).padStart(2, '0')}.${String(centesimos).padStart(2, '0')}`;
    } else {
        tempoFormatado = `${segundos}.${String(centesimos).padStart(2, '0')}`;
    }

    document.getElementById('cronometro').textContent = tempoFormatado;
}

document.getElementById('cronometroToggle').addEventListener('click', ()=>{
    modo ='cronometro'
    document.getElementById('clock').style.display = 'none'
    document.getElementById('dia-mes-ano').style.display = 'none'
    document.getElementById('cronometro').style.display = 'block'
    document.getElementById('btns').style.display = 'flex'
    document.getElementById('rodape').style.display = 'none'
})

document.getElementById('relogioToggle').addEventListener('click', ()=>{
    modo ='relogio'
    document.getElementById('clock').style.display = 'block'
    document.getElementById('dia-mes-ano').style.display = 'block'
    document.getElementById('cronometro').style.display = 'none'
    document.getElementById('btns').style.display = 'none'
    document.getElementById('rodape').style.display = 'block'
    clearInterval(intervaloCrono)
    intervaloCrono = null
    tempoCorrido = 0
    cronometroUpdate()
})

document.getElementById('startBtn').addEventListener('click', () => {
    if(!intervaloCrono){
        intervaloCrono = setInterval(() =>{
            tempoCorrido++
            cronometroUpdate()
        }, 10)
    }
})

document.getElementById('pauseBtn').addEventListener('click', () => {
    clearInterval(intervaloCrono)
    intervaloCrono = null
})

document.getElementById('resetBtn').addEventListener('click', () =>{
    clearInterval(intervaloCrono)
    intervaloCrono = null
    tempoCorrido = 0
    cronometroUpdate()
})



setInterval(() =>{
    if(modo === 'relogio'){
        relogioUpdate();
    }
}, 1000)




// Atualizar imediatamente ao carregar a página :)
relogioUpdate()