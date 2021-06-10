    window.onload = async (event) => {

    const tbody = document.querySelector('#Marcacoes');
    const url_api = "http://localhost/controleponto-api/api/v1";
    var res = await $.ajax({
        url : `${url_api}/ponto/getAll/index.php`,
        type: "GET",
        contentType: "application/json; charset=utf-8",
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Bearer " + localStorage.getItem('token'));
        }
    });

    res = res[0];
    for(i = 0; i < res.length; i++){
        var tipoMarcacao = res.tipoMarcacao == 1 ? "Entrada" : "Saída";
        
        var tr = document.createElement('tr');

        var tdId = document.createElement('td')
        tdId.appendChild(document.createTextNode(res[i].id_ponto.toString()));
        var tdMarcacao = document.createElement('td')
        tdMarcacao.appendChild(document.createTextNode(res[i].dt_marcacao));
        var tdTipoMarcacao = document.createElement('td')
        tdTipoMarcacao.appendChild(document.createTextNode(tipoMarcacao));
        var tdAcao = document.createElement('td')
        tdAcao.appendChild(document.createTextNode('Editar'));

        tr.appendChild(tdId);
        tr.appendChild(tdMarcacao);
        tr.appendChild(tdTipoMarcacao);
        tr.appendChild(tdAcao);
     
        tbody.append(tr);
    }


    };
