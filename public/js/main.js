var tempoInicial = $('#tempo-digitacao').text();
var campo = $('.campo-digitacao');

$(function(){
    atualizaTamanhoFrase();
    inicializaContador();
    inicializaCronometro();
    compararDigiitacao();
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
                clearInterval(cronometroID);
                finalizaJogo();
            }  
        }, 1000);
        console.log(tempoRestante);
    });
}

function finalizaJogo(){
    campo.attr('disabled', true);
    $('#botao-reiniciar').attr('disabled', false);
    campo.toggleClass('campo-desativado');
    inserePlacar();
}

function compararDigiitacao(){
    let frase = $('.frase').text();
    campo.on('input', function(){
        let digitado = campo.val();
        let comparavel = frase.substr(0, digitado.length);
        console.log(digitado);
        console.log(comparavel);
        if(digitado == comparavel){
            campo.addClass('campo-correto');
            campo.removeClass('campo-errado');
        }
        else{
            campo.addClass('campo-errado');
            campo.removeClass('campo-correto');
        }
    });
}

function reiniciaJogo(){
        campo.removeClass('campo-desativado');
        campo.removeClass('campo-errado');
        campo.removeClass('campo.errado');
        campo.attr('disabled', false);
        campo.val('');
        $('#contador-caracteres').text(0);
        $('#contador-palavras').text(0);
        $('#tempo-digitacao').text(tempoInicial);
        inicializaCronometro(); 
}

function inserePlacar(){
    let tabela = $('.placar').find('tbody');
    var usuario = 'Antonio';
    let numPalavras = $('#contador-palavras').text();

    let linha = '<tr>'+ 
                        '<td>'+ usuario +'</td>'+
                        '<td>'+ numPalavras +'</td>'+
                '</tr>'
    tabela.prepend(linha);
}



