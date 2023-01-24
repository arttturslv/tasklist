let inputUsername = document.querySelector('#inputUsername');
let inputPassword = document.querySelector('#inputPassword');
let inputKey = document.querySelector('#inputKey')
let validinputUsername = false;
let validinputPassword = false;
let validinputKey = false;
VerificaLogin();

/*
    cadastro
*/

function validaSenha(senha) {
    let auxNumero=0;
    let auxEspecial=0; 
    let numeros = /[0-9]/;
    let caracteresEspeciais = /[!|@|#|$|%|^|&|*|(|)|-|_]/;
    
    for(var i=0; i<senha.length; i++){
        if(numeros.test(senha[i])) {
            auxNumero++;
        } else if(caracteresEspeciais.test(senha[i])) {
            auxEspecial++;
        }
    }
        if ((auxNumero > 0) && (auxEspecial > 0)) {
            console.log("Senha. Permitido");
            return true;
        } else {
            console.log("Falta numero ou caracter especial na senha. Negado.");
            return false;
        }
}

if(document.getElementById("signUpBody") !== null) { //apenas na pagina de cadastro
    //verifica o username
    inputUsername.addEventListener('keyup', ()=> {
        if(inputUsername.value.length <= 3) {
            inputUsername.setAttribute('style', 'color:red')
            inputUsername.setAttribute('style', 'border-color:red')
            document.querySelector('#usernameHelpBlock').setAttribute('style', 'display:block')
            validinputUsername = false;
        } else if (validaUser(inputUsername) == true) {
            console.log("entrou")
            inputUsername.setAttribute('style', 'color:red')
            inputUsername.setAttribute('style', 'border-color:red')
            document.querySelector('#usernameHelpBlock2').setAttribute('style', 'display:block')
            validinputUsername = false;
        } else {
            inputUsername.setAttribute('style', 'border-color:inherent')
            inputUsername.setAttribute('style', 'color:inherent')
            document.querySelector('#usernameHelpBlock').setAttribute('style', 'display:none')
            validinputUsername = true;
        }
    })
            function validaUser(inputUsername) {
                var exist = false;
                let listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]');
                listaUser.forEach(item => {
                    console.log(item.userCad)
                    console.log(inputUsername.value)

                    if(item.userCad == inputUsername.value) {
                        console.log("Caso encontre")
                        exist = true;                    
                    }
                });
                return exist
            }

    //verifica a senha
    inputPassword.addEventListener('keyup', ()=> {
        if((inputPassword.value.length <= 5) || (validaSenha(inputPassword.value)==false)) {
            console.log((validaSenha(inputPassword.value)==false));
            inputPassword.setAttribute('style', 'color:red')
            inputPassword.setAttribute('style', 'border-color:red')
            document.querySelector('#passwordHelpBlock').setAttribute('style', 'display:block')
            validinputPassword = false;
        } else {
            inputPassword.setAttribute('style', 'border-color:inherent')
            inputPassword.setAttribute('style', 'color:inherent')
            document.querySelector('#passwordHelpBlock').setAttribute('style', 'display:none')
            validinputPassword = true;
        }
    })


    //verifica a chave de recuperação
    inputKey.addEventListener('keyup', ()=> {
        if((inputKey.value.length <= 3) || (validaKey(inputKey.value)==false)) {
            inputKey.setAttribute('style', 'color:red')
            inputKey.setAttribute('style', 'border-color:red')
            document.querySelector('#keyHelpBlock').setAttribute('style', 'display:block')
            validinputKey = false;
        } else {
            inputKey.setAttribute('style', 'border-color:inherent')
            inputKey.setAttribute('style', 'color:inherent')
            document.querySelector('#keyHelpBlock').setAttribute('style', 'display:none')
            validinputKey = true;
        }
    })
            function validaKey(key) {
                let auxNumero=0;
                let auxEspecial=0; 
                let numeros = /[0-9]/;
                let caracteresEspeciais = /[!|@|#|$|%|^|&|*|(|)|-|_]/;
                
                for(var i=0; i<key.length; i++){
                    if(numeros.test(key[i])) {
                        auxNumero++;
                    } else if(caracteresEspeciais.test(key[i])) {
                        auxEspecial++;
                    }
                }
                    if ((auxNumero > 0) || (auxEspecial > 0)) {
                        console.log("Tem numeros ou caracteres na chave de recuperação. Negado.");
                        return false;
                    } else {
                        console.log("Chave de recuperação. Permitido");
                        return true;
                    }
            }

//verifica se os campos estão corretos e armazena no local storage
function Cadastrar() {
    if (validinputUsername && validinputPassword && validinputUsername ) {
        console.log("Os campos foram preenchidos corretamente.")
        let listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]');

            listaUser.push( {
                userCad: inputUsername.value,
                passwordCad: inputPassword.value,
                keyWordCad: inputKey.value,
                nightmode: false,
                profilePic: "base64String",
                tasks:  []
            })
            localStorage.setItem('listaUser', JSON.stringify(listaUser));
            window.location.href = "signIn.html";
    } else {
        let acaoInvalida = document.getElementById("toggle");
            console.log("Os campos não foram preenchidos .")
        acaoInvalida.setAttribute('style', 'background:red')
        acaoInvalida.style.animation = "shake 0.2s";

        if(inputUsername.value=="") {inputUsername.setAttribute('style', 'border-color:red')}        
        if(inputPassword.value=="") {inputPassword.setAttribute('style', 'border-color:red')}
        if(inputKey.value=="") {inputKey.setAttribute('style', 'border-color:red')}

            setTimeout(()=> {
                acaoInvalida.setAttribute('style', 'background:inherent')
                inputUsername.setAttribute('style', 'border-color:inherent')
                inputPassword.setAttribute('style', 'border-color:inherent')
                inputKey.setAttribute('style', 'border-color:inherent')
            },150)
    }
}
};

/*
    login
*/

function Entrar() {
    let usernameLogin = document.querySelector('#loginUsername');
    let passwordLogin = document.querySelector('#loginPassword');

    let listaUser = [];
    let userValid = {
        user: 'none',
        senha: 'none'
    }
    listaUser = JSON.parse(localStorage.getItem('listaUser'));
    listaUser.forEach(item => {
        if((usernameLogin.value == item.userCad) && (passwordLogin.value == item.passwordCad)) {
            userValid = {
                user: item.userCad,
                senha: item.passwordCad
            }
        }
    });

    if((usernameLogin.value == userValid.user) && (passwordLogin.value == userValid.senha)) {
        let token = Math.random().toString(16).substr(2) + Math.random().toString(16).substr(2)
        let dado = {"token": token, 
                    "user": userValid.user}
        localStorage.setItem('token', JSON.stringify(dado)); //apenas pra ver se o usuario está logado.
        window.location.href = "todo.html";
    } 
    else {
        usernameLogin.setAttribute('style', 'border-color:red')      
        passwordLogin.setAttribute('style', 'border-color:red')
        document.querySelector('#WrongHelpBlock').setAttribute('style', 'display:block')
    }
}

function Sair() {
    localStorage.removeItem('token');
    window.location.href = "start.html";
}

function VerificaLogin() { //botar no body onload das paginas que precisam estar logadas, todo, todone, setting
    let url_atual = window.location.href;
    if(localStorage.getItem('token') == null) { //nao tem token, logo não está logado entao nao entra nas listas.
        if(url_atual.indexOf("todo") > -1 || url_atual.indexOf("todone") > -1  || url_atual.indexOf("setting") > -1 ) {
            alert("Você precisa estar logado para acessar.");
            window.location.href = "start.html";        
        }
    }
    if(localStorage.getItem('token') != null) { //tem token, logo está logado entao nao entra nos logins.
        if(url_atual.indexOf("start") > -1 || url_atual.indexOf("signUp") > -1  || url_atual.indexOf("signIn") > -1 ) {
            window.location.href = "todo.html";
        }
    }
    mostrarTarefa()
}

/*
    configurações 
*/

let url_atual = window.location.href;
if(url_atual.indexOf("setting") > -1) {
    let usuarioAtivo = JSON.parse(localStorage.getItem('token'));
    document.getElementById("name").innerHTML = usuarioAtivo.user;
    // feitas, ainda nao implementadas para evitar excluir antes de poder adicionar
    function apagaTodasTarefas() {
        let listaUser =  JSON.parse(localStorage.getItem('listaUser'));
        
        listaUser.forEach(item => {

            if(usuarioAtivo.user == item.userCad) {
                let tk = item.tasks;
                tk = tk.filter(tk => tk.active == true && tk.active == false);
                    item.tasks = tk;
            }
        })
        localStorage.setItem('listaUser', JSON.stringify(listaUser)); //apenas pra ver se o usuario está logado.
        alert("Tarefas apagadas")
    }
    function apagasTarefasConcluidas() {
        let listaUser =  JSON.parse(localStorage.getItem('listaUser'));
        
        listaUser.forEach(item => {

            if(usuarioAtivo.user == item.userCad) {
                let tk = item.tasks;
                tk = tk.filter(tk => tk.active == true);
                    item.tasks = tk;
            }
        })
        localStorage.setItem('listaUser', JSON.stringify(listaUser)); //apenas pra ver se o usuario está logado.
    }
}

function apagaConta () {
    alert("Sua conta será apagada.")
    let listaUser = JSON.parse(localStorage.getItem('listaUser'))
    console.log(listaUser)

    let usuarioAtivo = JSON.parse(localStorage.getItem('token'))
    let i=0;

    listaUser.forEach(item => {
        if(item.userCad == usuarioAtivo.user) {
            listaUser.splice(i, 1)
            console.log(listaUser)
        }
        i++;
    });

    localStorage.setItem('listaUser', JSON.stringify(listaUser))
}


/*  
    todo 
*/

function incluirTarefa () {
    let titulo = document.getElementById("titleTask");
    let descricao = document.getElementById("descriptionTask");
    let listaUser = JSON.parse(localStorage.getItem('listaUser'));

    if (titulo.value =="") {
        console.log("Foiu")
        document.querySelector("#titleTask").style.border = "solid thin red";
        setTimeout(function () {
            document.querySelector("#titleTask").style.border = "solid thin #dee2e6";
        }, 300)
    } else {
        listaUser[0].tasks.push({
            title: titulo.value,
            description: descricao.value,
            active: true
        })
        localStorage.setItem('listaUser', JSON.stringify(listaUser))
        location.reload()
    }
}

    let fecharIcon = document.querySelector(".headerClose")
    let abrirIcon = document.querySelector(".addTask")
    let lixeiraIcon = document.querySelector(".fa-trash-can")
    let aba = document.querySelector(".newTask")
    
    if(aba != null) {
        aba.style.display = "none"
        fecharIcon.addEventListener('click', function () {
            aba.style.display = "none"
        })
        lixeiraIcon.addEventListener('click', function () {
            aba.style.display = "none"
        })
        abrirIcon.addEventListener('click', function () {
            aba.style.display = "flex"
        })
    }

function mostrarTarefa() {
    let listaUser = JSON.parse(localStorage.getItem('listaUser'))
    let usuarioAtivo = JSON.parse(localStorage.getItem('token'));
    let url_atual = window.location.href;
    let tarefasAtivas;
    if(url_atual.indexOf("done") > -1) { //mostra apenas as false
        listaUser.forEach(item => {

        if(usuarioAtivo.user == item.userCad) {
            let tk = item.tasks;
            tk = tk.filter(tk => tk.active == false);
            tarefasAtivas = tk;
            imprimeTarefas(tarefasAtivas) 
        }})
    } else  if(url_atual.indexOf("todo") > -1) { //mostra apenas as true
        listaUser.forEach(item => {

            if(usuarioAtivo.user == item.userCad) { //dando
                let tk = item.tasks;
                console.log(item.tasks)

                tk = tk.filter(tk => tk.active == true);
                tarefasAtivas = tk;
                console.log(tk.length)

                imprimeTarefas(tarefasAtivas) 
            }
        })
    }
}

function imprimeTarefas(tarefasAtivas) {
    let strTarefa ='';

    for(let i=0; i<tarefasAtivas.length; i++)   {
        let tarefa = tarefasAtivas[i];
        strTarefa += `<div id="task" class="row">
                        <div id="${i}" class="botaoConcluido col-2" onclick="tarefaConcluida(this.id, ${i})">
                            <i class="fa-solid fa-check btnConcluido"></i>
                        </div>
                        <div class="tarefa col" >
                            <h3 id="tituloTarefa">${tarefa.title}</h3>
                            <p id="descricaoTarefa">${tarefa.description}</p>
                        </div>
                    </div>`
    }
    document.querySelector("#allTasks").innerHTML = strTarefa;
}

function tarefaConcluida (idDiv, indice) {
    var filho = document.getElementById(`${idDiv}`);
    var pai = filho.parentNode;
    
    let listaUser = JSON.parse(localStorage.getItem('listaUser'))
    let usuarioAtivo = JSON.parse(localStorage.getItem('token'));

    listaUser.forEach(item => {
        console.log("entrei")
        if(usuarioAtivo.user == item.userCad) { //dando
            console.log("entrei 2x")
            item.tasks[indice].active = false;
        }
    })
    localStorage.setItem('listaUser', JSON.stringify(listaUser));
    location.reload();
}

/*
    reset 
*/

if(url_atual.indexOf("Pass") > -1) {
    let checkbox = document.getElementById('defaultCheck1');
    checkbox.addEventListener('click', function (){
        if(checkbox.checked) {
            console.log("O cliente marcou o checkbox");
            document.querySelector("#inputNewPassConfirm").type = 'text'
            document.querySelector("#inputNewPass").type = 'text'

        } else {
            console.log("O cliente não marcou o checkbox");
        }
    })

        let inputNewPassword = document.querySelector('#inputNewPass');
        inputNewPassword.addEventListener('keyup', ()=> {
            if((inputNewPassword.value.length <= 5) || (validaSenha(inputNewPassword.value)==false)) {
                console.log((validaSenha(inputNewPassword.value)==false));
                inputNewPassword.setAttribute('style', 'color:red')
                inputNewPassword.setAttribute('style', 'border-color:red')
                document.querySelector('#passwordHelpBlock').setAttribute('style', 'display:block')
                validinputPassword = false;
            } else {
                inputNewPassword.setAttribute('style', 'border-color:inherent')
                inputNewPassword.setAttribute('style', 'color:inherent')
                document.querySelector('#passwordHelpBlock').setAttribute('style', 'display:none')
                validinputPassword = true;
            }
        })
}
    function validaConfirmaSenha() {
        let confirma = document.getElementById("inputNewPassConfirm")
        if((confirma.value == document.querySelector('#inputNewPass').value) & (validinputPassword == true)) {
            console.log("novas senha validas")
            let listaUser = JSON.parse(localStorage.getItem('listaUser'))
            let usuarioAtivo = JSON.parse(localStorage.getItem('token'));

            listaUser.forEach(item => {
                
                if(item.userCad == usuarioAtivo.user) {
                    console.log("encontrado")

                    item.passwordCad = confirma.value
                }
            });
            
            localStorage.setItem('listaUser', JSON.stringify(listaUser))
            alert("senha modificada com sucesso.")
                window.location.href = "todo.html";
        } else {
            console.log("novas senha invalidas")
        }
    }

    if(url_atual.indexOf("Key") > -1) {
        let usuarioinput = document.getElementById("inputUsername")
        let keyinput = document.getElementById("inputKey")
        let listaUser = JSON.parse(localStorage.getItem('listaUser'))

        function verificaRecuperacao() {
            listaUser.forEach(item => {
                if(item.userCad == usuarioinput.value && item.keyWordCad == keyinput.value) {
                    console.log("certinho")
                    let token = Math.random().toString(16).substr(2) + Math.random().toString(16).substr(2)
                    let dado = {"token": token, 
                                "user": usuarioinput.value}
                    localStorage.setItem('token', JSON.stringify(dado)); //apenas pra ver se o usuario está logado.
                    window.location.href = "resetPass.html";

                } else {
                    document.getElementById("recuperacaoHelpBlock").style.display = "block"
                }
            });
        }
    }