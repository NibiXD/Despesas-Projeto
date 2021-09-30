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
    } else {
        document.getElementById('modal-titulo').innerHTML = "Erro";
        document.getElementById('modal-titulo-texto').className = "modal-header text-danger";

        document.getElementById('modal-corpo').innerHTML = 'Erro na inclusão de despesas, Preencha os campos obrigatórios!';

        document.getElementById('modal-botao').innerHTML = 'Ok';
        document.getElementById('modal-botao').className = 'btn btn-danger';
        $('#modalRegistraDespesa').modal('show');
        
    }
}