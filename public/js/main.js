var tempoInicial = $('#tempo-digitacao').text();
var campo = $('.campo-digitacao');

$(function(){
    atualizaTamanhoFrase();
    inicializaContador();
    inicializaCronometro();
    $('#botao-reiniciar').click(reiniciaJogo);
});

function atualizaTamanhoFrase(){
    let frase = $('.frase').text();
    let numPalavras = frase.split(/\S+/).length-1;
    let tamanhoFrase = $('#tamanho-frase');
    tamanhoFrase.text(numPalavras);
}

function inicializaContador(){
    campo.on('input', function(){
        let conteudo = campo.val();
        let qtdPalavras = conteudo.split(/\S+/).length-1;
        let qtdCaracteres = conteudo.length;
        $('#contador-caracteres').text(qtdCaracteres);
        $('#contador-palavras').text(qtdPalavras);
    });
}

function inicializaCronometro(){
    let tempoRestante = $('#tempo-digitacao').text();
    campo.one('focus', function(){
        $('#botao-reiniciar').attr('disabled', true);
        let cronometroID = setInterval(function(){
            tempoRestante --;
            $('#tempo-digitacao').text(tempoRestante);
            if(tempoRestante < 1){
                campo.attr('disabled', true);
                clearInterval(cronometroID);
                $('#botao-reiniciar').attr('disabled', false);
                campo.addClass('campo-desativado');
            }  
        }, 1000);
        console.log(tempoRestante);
    });
}

function reiniciaJogo(){
        campo.removeClass('campo-desativado');
        campo.attr('disabled', false);
        campo.val('');
        $('#contador-caracteres').text(0);
        $('#contador-palavras').text(0);
        $('#tempo-digitacao').text(tempoInicial);
        inicializaCronometro();
}


