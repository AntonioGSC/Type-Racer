function inserePlacar(){
    let tabela = $('.placar').find('tbody');
    var usuario = 'Antonio';
    let numPalavras = $('#contador-palavras').text();
    let linha = novaLinha(usuario, numPalavras);
    linha.find('.botao-remover').click(removeLinha);
    tabela.prepend(linha);
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
    $(this).parent().parent().remove();
}