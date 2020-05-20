$("#botao-placar").click(monstraPlacar);
$("#botao-sync").click(sincronizaPlacar);

function inserePlacar(){
    let tabela = $('.placar').find('tbody');
    var usuario = $("#usuarios").val();
    let numPalavras = $('#contador-palavras').text();
    let linha = novaLinha(usuario, numPalavras);
    linha.find('.botao-remover').click(removeLinha);
    tabela.prepend(linha);
    $(".placar").slideDown();
    scrollPlacar();
}

function scrollPlacar(){
    let posicaoPlacar = $('.placar').offset().top;
    console.log(posicaoPlacar);
    $('body, html').animate({
        scrollTop: posicaoPlacar+"px"
    },1000);
}

function novaLinha(usuario, numPalavras){
    let linha = $('<tr>');
    let colunaUsuario = $('<td>').text(usuario);
    let colunaNumPalavras = $('<td>').text(numPalavras);
    let colunaRemover = $('<td>');
    let link = $('<a>').addClass('botao-remover').attr('href', '#');
    let icone = $('<i>').addClass('small material-icons').text('delete');
    link.append(icone);
    colunaRemover.append(link);
    linha.append(colunaUsuario);
    linha.append(colunaNumPalavras);
    linha.append(colunaRemover);
    return linha;
}

function removeLinha(){
    event.preventDefault();
    let linha = $(this).parent().parent();
    linha.fadeOut(1000);
    setTimeout(function(){
        linha.remove();
    },1000);
}

function monstraPlacar(){
    $(".placar").stop().slideToggle();
}

function sincronizaPlacar(){
    let placar = [];
    let linhas = $("tbody > tr");
    linhas.each(function(){
        let usuario = $(this).find("td:nth-child(1)").text();
        let palavras = $(this).find("td:nth-child(2)").text();
        let score = {
            usuario: usuario,
            pontos: palavras
        };

        placar.push(score);
    });
    let dados = {
        placar: placar
    };
    $.post("http://localhost:3000/placar", dados, function(){
        console.log("Placar salvo no servidor");
        $('.tooltip').tooltipster('open');
    })
    .fail(function(){
        $('.tooltip').tooltipster('open').tooltipster('content', 'Falha ao sincronizar');
    })
    .always(function(){
        setTimeout(function(){
            $('.tooltip').tooltipster('close');
        },1200)   
    });
}

function atualizaPlacar(){
    $.get("http://localhost:3000/placar", function(data){
        $(data).each(function(){
            let linha = novaLinha(this.usuario, this.pontos);
            linha.find('.botao-remover').click(removeLinha);
            $("tbody").append(linha);
        });
    });
}