const frm = document.querySelector("form")
const btAdd = document.querySelector("#btAdicionar")

frm.addEventListener("submit", (e) => e.preventDefault())

btAdd.addEventListener("click", () => {
    if (validarAtividade() > 0) {
        alert("Está atividade já está na lista!")
        return
    }

    adicionarAtividade()

    frm.reset()
    frm.inAtividade.focus()
})

function validarAtividade() {
    const atividade = frm.inAtividade.value
    const itemsDaLista = document.querySelectorAll("li")
    let atividadesRepetidas = 0

    for (let i = 0; i < itemsDaLista.length; i++) {
        if (itemsDaLista[i].innerText == atividade) {
            atividadesRepetidas++
        }
    }

    return atividadesRepetidas
}

function adicionarAtividade() {
    const atividade = frm.inAtividade.value
    const listaAtv = document.querySelector("#listaDeAtividades")
    const atvElemento = document.createElement("li")
    const txtAtv = document.createTextNode(atividade)
    
    atvElemento.appendChild(txtAtv)
    listaAtv.appendChild(atvElemento)

    frm.reset()
    frm.inAtividade.focus()
}

//Começando a programção do botão de selecionar

const selecionar = document.querySelector("#btSelecionar")

selecionar.addEventListener("click", () => {
    const lista = document.querySelectorAll("li")

    if (lista.length == 0) {
        alert("Não há elementos para serem selecinados")
        return
    }

    let aux = -1

    lista.forEach((li, i) => {
        if (li.className == "selecionado") {
            li.className = "nao-selecionado"
            aux = i
            return
        }
    })

    if (lista.length - 1 == aux) {
        aux = -1
    }

    lista[aux + 1].className = "selecionado"
})

// Agora a programação do botão de excluir as tarefas

const excluir = document.querySelector("#btRetirar")

excluir.addEventListener("click", () => {
    const listaAtv = document.querySelector("#listaDeAtividades")
    const lista = document.querySelectorAll("li")

    if (lista.length == 0) {
        alert("Não há elementos para serem excluídos")
        return
    }

    lista.forEach((li) => {
        if (li.className == "selecionado") {
            listaAtv.removeChild(li)
            return
        }
    })
})

//iniciando programação do botão de gravação de dados

const gravar = document.querySelector("#btGravar")

gravar.addEventListener("click", () => {
    const lista = document.querySelectorAll("li")

    if (lista.length == 0) {
        alert("Não há atividaes para serem guardadas")
        return
    }

    let dados = ""

    lista.forEach(item => {
        dados += item.innerText + ";"
    })

    localStorage.setItem("tarefasDoDia", dados)

    if (localStorage.getItem("tarefasDoDia")) {
        alert("Ok!Atividades Salvas")
    }
})

window.addEventListener("load", () => {
    if (localStorage.getItem("tarefasDoDia")) {

        const listaAtv = document.querySelector("#listaDeAtividades")
        const itens = localStorage.getItem("tarefasDoDia").split(";")

        itens.forEach(item => {
            const li = document.createElement("li")
            const texto = document.createTextNode(item)
            
            li.appendChild(texto)
            listaAtv.appendChild(li)
        })
    }
})