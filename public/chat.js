
//replace é usado para retirar a / do nome que está vindo.
// usando assim replace('/', '') ele retira apenas um barra e traz mais outra
// para retirar as duas foi feito conforme abaixo ele fala que a palavra está entre barras
// o g é para fazer em todas as recorencias 
const room = window.location.pathname.replace(/\//g, '');
console.log(room);
const socket = io(`http://localhost:3000/${room}`)

let user = null;

socket.on('update_messages', (messages) =>{
    updateMessagesOnScreen(messages)
})

function updateMessagesOnScreen(messages){
    const div_messages = document.querySelector('#messages');
    
    let list_messages = ''
    messages.forEach(message => {
        const messageClass = message.user === user ? 'sent' : 'received';
        list_messages += `<div class="message ${messageClass}">${message.user}: ${message.msg}</div>`
    })
    list_messages += ' ';

    div_messages.innerHTML = list_messages
}


// function updateMessagesOnScreen(messages){
//     const div_messages = document.querySelector('#messages');
    
//     let list_messages = '<ul>'
//     messages.forEach(message => {
//         const messageClass = message.user === user ? 'sent' : 'received';
//         list_messages += `<li class="${messageClass}">${message.user}: ${message.msg}</li>`
//     })
//     list_messages += '</ul>';

//     div_messages.innerHTML = list_messages
// }


document.addEventListener('DOMContentLoaded', () =>{
    const form = document.querySelector('#message_form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if(!user){
            alert('Defina um usuário');
            return;
        }

        const message = document.forms['message_form_name']['msg'].value;
        document.forms['message_form_name']['msg'].value = ''
        socket.emit('New_message', {user: user, msg: message})
        console.log(message);
    })

    const userForm = document.querySelector('#user_form');
    userForm.addEventListener('submit', (e) => {
        e.preventDefault();

        user = document.forms['user_form_name']['user'].value;
        userForm.parentNode.removeChild(userForm)
    })

})