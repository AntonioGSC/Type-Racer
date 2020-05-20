var tempoInicial = $('#tempo-digitacao').text();
var campo = $('.campo-digitacao');

$(function () {
    atualizaTamanhoFrase();
    inicializaContador();
    inicializaCronometro();
    compararDigitacao();
    $('#botao-reiniciar').click(reiniciaJogo);
    atualizaPlacar();
    $('#usuarios').selectize({
        create: true,
        sortField: 'text'
    });
    $('.tooltip').tooltipster({
        trigger: 'custom'
    });
});

function atualizaTamanhoFrase() {
    let frase = $('.frase').text();
    let numPalavras = frase.split(/\S+/).length - 1;
    let tamanhoFrase = $('#tamanho-frase');
    tamanhoFrase.text(numPalavras);
}

function inicializaContador() {
    campo.on('input', function () {
        let conteudo = campo.val();
        let qtdPalavras = conteudo.split(/\S+/).length - 1;
        let qtdCaracteres = conteudo.length;
        $('#contador-caracteres').text(qtdCaracteres);
        $('#contador-palavras').text(qtdPalavras);
    });
}

function inicializaCronometro() {   
    campo.one('focus', function () {
        let tempoRestante = $('#tempo-digitacao').text();
        $('#botao-reiniciar').attr('disabled', true);
        let cronometroID = setInterval(function () {
            tempoRestante--;
            $('#tempo-digitacao').text(tempoRestante);
            if (tempoRestante < 1) {
                clearInterval(cronometroID);
                finalizaJogo();
            }
        }, 1000);
    });
}

function finalizaJogo() {
        campo.attr('disabled', true);
        $('#botao-reiniciar').attr('disabled', false);
        campo.toggleClass('campo-desativado');
        inserePlacar();
}

function compararDigitacao() {
    campo.on('input', function () {
        let frase = $('.frase').text();
        let digitado = campo.val();
        let comparavel = frase.substr(0, digitado.length);
        //console.log(digitado);
        //console.log(comparavel);
        if (digitado == comparavel) {
            campo.addClass('campo-correto');
            campo.removeClass('campo-errado');
        }
        else {
            campo.addClass('campo-errado');
            campo.removeClass('campo-correto');
        }
    });
}

function reiniciaJogo() {
    campo.attr("disabled", false);
    campo.val("");
    $("#contador-palavras").text(0);
    $("#contador-caracteres").text(0);
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
    campo.toggleClass("campo-desativado");
    campo.removeClass("borda-vermelha");
    campo.removeClass("borda-verde");
}
