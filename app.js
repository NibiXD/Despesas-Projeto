class Despesa {
    constructor (ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano;
        this.mes = mes;
        this.dia = dia;
        this.tipo = tipo;
        this.descricao = descricao;
        this.valor = valor;
    }
    
    validarDados() {
        for(let i in this) {
            if (this[i] == undefined || this[i] == '' || this[i] == null) {
                return false
            }
        }
        return true
    }
}

class Db {
    constructor() {
        let id = localStorage.getItem('id');

        if (id === null) {
            localStorage.setItem('id', 0);
        }
    }

    getProximoId() {
        let proximoId = localStorage.getItem('id');
        return parseInt(proximoId) + 1
    }

    gravar(d) {
        let id = this.getProximoId();

        localStorage.setItem(id, JSON.stringify(d));

        localStorage.setItem('id', id)
    }

    recuperarTodosRegistros() {

        let despesas = new Array();

        let id = localStorage.getItem('id');

        for (let i = 1; i <= id; i++) {
            let despesa = JSON.parse(localStorage.getItem(i));
            
            if (despesa === null) {
                continue
            }

            despesas.push(despesa);
        }

        return despesas 
    }
}

let db = new Db();

function cadastrarDespesa() {

    let ano = document.getElementById('ano');
    let mes = document.getElementById('mes');
    let dia = document.getElementById('dia');
    let tipo = document.getElementById('tipo');
    let descricao = document.getElementById('descricao');
    let valor = document.getElementById('valor');


    let despesa = new Despesa(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value);
    
    if (despesa.validarDados()) {

        document.getElementById('modal-titulo').innerHTML = "Sucesso";
        document.getElementById('modal-titulo-texto').className = "modal-header text-success";
        document.getElementById('modal-corpo').innerHTML = 'Despesas incluídas com sucesso!';
        document.getElementById('modal-botao').innerHTML = 'Ok';
        document.getElementById('modal-botao').className = 'btn btn-success';
        $('#modalRegistraDespesa').modal('show');
        
        db.gravar(despesa);

        ano.value = '';
        mes.value = '';
        dia.value = '';
        tipo.value = '';
        descricao.value = '';
        valor.value = '';
    } else {
        document.getElementById('modal-titulo').innerHTML = "Erro";
        document.getElementById('modal-titulo-texto').className = "modal-header text-danger";

        document.getElementById('modal-corpo').innerHTML = 'Erro na inclusão de despesas, Preencha os campos obrigatórios!';

        document.getElementById('modal-botao').innerHTML = 'Ok';
        document.getElementById('modal-botao').className = 'btn btn-danger';
        $('#modalRegistraDespesa').modal('show');
        
    }
}

function carregaListaDespesas() {

    let despesas = Array();
    despesas = db.recuperarTodosRegistros();

    let listaDespesas = document.getElementById('listaDespesas');
    despesas.forEach(function(d) {
        let lista = listaDespesas.insertRow();

        lista.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`;

        //ajustar o tipo
        switch(d.tipo){
            case '1': d.tipo = 'Alimentação';
                break
            case '2': d.tipo = 'Educação';
                break
            case '3': d.tipo = 'Lazer';
                break
            case '4': d.tipo = 'Saúde';
                break
            case '5': d.tipo = 'Transporte';
                break
        }

        lista.insertCell(1).innerHTML = `${d.tipo}`;
        lista.insertCell(2).innerHTML = `${d.descricao}`;
        lista.insertCell(3).innerHTML = `R$${d.valor}`;
    })
}