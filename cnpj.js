function consultarCNPJ() {
    var cnpj = document.getElementById('cnpjInput').value;
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    if (cnpj.length != 14) {
        alert("Por favor, insira um CNPJ válido.");
        return;
    }

    var url = 'https://www.receitaws.com.br/v1/cnpj/' + cnpj;

    fetch(proxyUrl + url)
        .then(response => response.json())
        .then(data => {
            exibirResultado(data);
        })
        .catch(error => {
            console.error('Erro ao consultar CNPJ:', error);
        });
}

function exibirResultado(data) {
    var resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = '';

    if (data.status === 'ERROR') {
        resultadoDiv.innerHTML = 'Erro ao consultar CNPJ: ' + data.message;
    } else {
        var empresa = data.nome;
        var atividadePrincipal = data.atividade_principal[0].text;

        resultadoDiv.innerHTML = '<p><strong>Empresa:</strong> ' + empresa + '</p>' +
                                 '<p><strong>Atividade Principal:</strong> ' + atividadePrincipal + '</p>';
    }
}
