let inputUsername = document.querySelector('#inputUsername');
let inputPassword = document.querySelector('#inputPassword');
let inputKey = document.querySelector('#inputKey')
let validinputUsername = false;
let validinputPassword = false;
let validinputKey = false;

/*
    cadastro
*/
if(document.getElementById("signUpBody") !== null) {
  
//verifica o username
inputUsername.addEventListener('keyup', ()=> {
    if(inputUsername.value.length <= 3) {
        inputUsername.setAttribute('style', 'color:red')
        inputUsername.setAttribute('style', 'border-color:red')
        document.querySelector('#usernameHelpBlock').setAttribute('style', 'display:block')
        validinputUsername = false;
    } else {
        inputUsername.setAttribute('style', 'border-color:inherent')
        inputUsername.setAttribute('style', 'color:inherent')
        document.querySelector('#usernameHelpBlock').setAttribute('style', 'display:none')
        validinputUsername = true;
    }
})
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
                tasks: {
                    taskItem: [ { title: "", description: "", active: true },
                                { title: "", description: "", active: true }, 
                                { title: "", description: "", active: false },
                              ] 
                       }
            })
            localStorage.setItem('listaUser', JSON.stringify(listaUser));
            window.location.href = "signIn.html";
    } else { // mostra aviso de erro.
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
        localStorage.setItem('token', token); //apenas pra ver se o usuario está logado.
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
    if(localStorage.getItem('token') == null) {
        alert("voce precisa estar logado para acessar");
        window.location.href = "start.html";
    }
}














/*
let username = document.getElementById('inputUsername');
let password = document.getElementById('inputPassword');
let key = document.getElementById('inputKey')


function Cadastrar() {
    let listaUser = JSON.parse(localStorage.getItem('UsuariosCadastrados') || '[]')
    listaUser.push(
        {
            username: document.getElementById('inputUsername').value,
            password: document.getElementById('inputPassword').value,
            keyWord: document.getElementById('inputKey').value,
            nightmode: true,
            profilePic: "base64String",
            tasks: {
                taskItem: [ { title: "Less playtime", description: "Lorem ipslum...", active: true },
                            { title: "Play some chess", description: "Lorem ipslum...", active: true }, 
                            { title: "Do all tasks", description: "Lorem ipslum...", active: false },
                          ] 
                    }

        }
    ) 
    localStorage.setItem('listaUser', JSON.stringify(listaUser))
}

cadastrar.addEventListener('click', Cadastrar);

cadastrar.addEventListener('click', (event) => {
    event.preventDefault();
    if (senha.value && email.value && cpf.value) {
        alert("Cadastro Concluído!")
        setTimeout(() => {
            window.location.href = 'login.html'

        }, 1000)

    } else {
        alert('Preencha todos os campos!')
    }

})



// verificacoes

function passwordValidate() {
    if (campos[2].value.length < 8) {
        setError(2);
    }
    else {
        removeError(2);
    }
}

function setError(index) {
    campos[index].style.border = '2px solid #e63636';
    cadastrar.disabled = true;

}

function removeError(index) {
    campos[index].style.border = '';
    cadastrar.disabled = false;


}



*/