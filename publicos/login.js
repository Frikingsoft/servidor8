let enviar = ()=>{
    let Usuario = document.querySelector("#Usuario").value
    let Contraseña = document.querySelector("#Contraseña").value
    
    fetch("/login",{
        method: 'POST',
        headers: {
           'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            Usuario:Usuario,
            Contraseña:Contraseña
        }) 
    })
} 