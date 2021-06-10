

window.onload = (event) => {
   
    const registraEntradaButton = document.querySelector('#registraEntradaButton');
    const registraSaidaButton = document.querySelector('#registraSaidaButton');



    registraEntradaButton.addEventListener('click', function(e){
        $('#ModalMarcacao').modal('show');
        document.querySelector('#TituloModal').innerHTML = "Registrar Entrada";
        document.querySelector('#tipoMarcacao').value = 1;
    });

    
    registraSaidaButton.addEventListener('click', function(e){
        $('#ModalMarcacao').modal('show');
        document.querySelector('#TituloModal').innerHTML = "Registrar Saída";
        document.querySelector('#tipoMarcacao').value = 2;
    });


}

function BaterPonto(){
    var input = document.querySelector('#dateTimePonto');
    var request = {
        dt_marcacao: input.value.replace('T',' '),
        tipo_marcacao: document.querySelector('#tipoMarcacao').value
    };

    console.log(request);


    const url_api = "http://localhost/controleponto-api/api/v1";

    $.ajax({
        url : `${url_api}/ponto/marcacaoManual/index.php`,
        type: "POST",
        data: JSON.stringify( request ),
        contentType: "application/json; charset=utf-8",
        dataType   : "json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Bearer " + localStorage.getItem('token'));
        },
        success    : function(obj){
			try{
                if(obj == true){
                    alert("Ponto registrado com sucesso!");
                } else {
                    console.log(obj);
                    try{

                        alert(obj[0].info);
                    } catch(ex){
                        alert(obj[Object.keys(obj)[0]]); //returns 'someVal'
                    }
                }
		}catch(ex){
			alert("Erro ao Logar");
		}
    }
    });







}
