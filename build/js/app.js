document.addEventListener('DOMContentLoaded', function(){
    
    iniciarApp();

})

function iniciarApp(){
    crearGaleria();
}
function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes');
    for(let i = 1; i<= 12 ;i++){
        
        const imagen = document.createElement('picture');
        imagen.innerHTML=`
            
            <source srcset="build/img/${i}.avif" type="imagen/avif">
            <source srcset="build/img/${i}.webp" type="imagen/webp">
            <img loading="lazy" src="build/img/${i}.jpg" alt="imagen galeria" width="300" height="300">
            `
            galeria.appendChild(imagen);

            imagen.onclick=function(){
                mostraImagen(i);
            }
            
           
    }   
}
function mostraImagen(id){
    const imagen = document.createElement('picture');
        imagen.innerHTML=`
            
            <source srcset="build/img/${id}.avif" type="imagen/avif">
            <source srcset="build/img/${id}.webp" type="imagen/webp">
            <img loading="lazy" src="build/img/${id}.jpg" alt="imagen galeria" >
            `
    // crear overlay
    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');
    overlay.onclick=function(){
        const body= document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }

    // crear boton de cierre modal
    const cerrarModal= document.createElement('P');
    cerrarModal.textContent='X';
    cerrarModal.classList.add('btn-cierre');

    cerrarModal.onclick=function(){
        const body= document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }
    overlay.appendChild(cerrarModal);
    
    // agregar overlay al html
    const body= document.querySelector('body');
    body.classList.add('fijar-body');
    body.appendChild(overlay);
    
    
}
