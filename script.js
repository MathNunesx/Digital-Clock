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
    document.querySelector('.topics').textContent = `${day} de ${month} de ${year}`;

    // Trocar o fundo conforme as horas
    trocarBG(hours);
}

function trocarBG(hours) {
    let backColor;

    if (hours >= 6 && hours < 13) {
        backColor = "linear-gradient(to bottom, #A0C7F4 0%, #B2D5FD 44%, #BCDBFF 87%)"; // Manhã
    } else if (hours >= 13 && hours < 18) {
        backColor = "linear-gradient(to bottom, #E5D272 0%, #FF9A76 44%, #8669EE 87%)"; // Tarde
    } else {
        backColor = "linear-gradient(to bottom, #0B063A 0%, #2D2197 44%, #5A4DC8 87%)"; // Noite
    }

    // Aplicar o gradiente ao body
    document.body.style.background = backColor;
}

// Atualizar o relógio a cada segundo
setInterval(relogioUpdate, 1000);

// Atualizar imediatamente ao carregar a página
relogioUpdate();