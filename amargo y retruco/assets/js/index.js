const canvas = document.querySelector('canvas');
const a =canvas.getContext('2d');

canvas.width= 1024
canvas.height=576
a.fillRect(0,0,canvas.width,canvas.height)
const gravedad=0.4


class sprite{ 
    constructor({position,foto,escala=1, maximo=1, cuadrado={x:0,y:0}})
    {
        this.position=position
        this.width=50
        this.height=150
        this.imagen= new Image ()
        this.imagen.src= foto 
        this.escala=escala
        this.maximo=maximo
        this.actual=0
        this.pasado=0
        this.mantener=5
        this.cuadrado=cuadrado
      }
    draw(){
        a.drawImage(this.imagen, this.actual*(this.imagen.width/this.maximo),0,
        this.imagen.width/this.maximo,this.imagen.height, this.position.x-this.cuadrado.x,this.position.y-this.cuadrado.x,(this.imagen.width/this.maximo)*this.escala,this.imagen.height*this.escala)

    }
    update(){
        this.draw()
      }
    }  
            //peleadores 
    const fondito=new sprite({
        position:{
            x:0,
            y:0
        },
        foto: '../img/fondo.png'
    })        
    


    class tramontina extends sprite { 
        constructor({position, velosity, color='blue', place, foto, escala=1, maximo=1,cuadrado,sprites})
        { 
            
            super({
                position,foto,escala,maximo,cuadrado
    
                })
            this.velosity = velosity
            this.width=50
            this.height=150
            this.ataque={
                position:{
                    x:this.position.x,
                    y:this.position.y
                },
                place,
                    width:100,
                    height:50  
            }
            this.color=color
            this.facaso
            this.vida=100
            this.actual=0
            this.pasado=0
            this.mantener=5
            this.sprites=sprites

            for (const sprite in this.sprites){
                sprites[sprite].imagen=new Image()
                sprites[sprite].imagen.src= sprites[sprite].foto
            } 
        
         

        }
        animaciones(){
            this.pasado++

            if (this.pasado % this.mantener===0){
                if(this.actual<this.maximo-1){
                this.actual++
            }else{
             this.actual =0
            }
        }
        }
       
        update(){
            this.draw()
            this.animaciones()
            
            this.ataque.position.x=this.position.x +this.ataque.place.x
            this.ataque.position.y=this.position.y 
            this.position.x += this.velosity.x
            this.position.y += this.velosity.y
    
            if (this.position.y + this.height + this.velosity.y >= canvas.height -50){
                this.velosity.y=0
            }else
            { (this.velosity.y +=gravedad)}
          }
    
            golpe(){
                this.facaso=true
                setTimeout(() => {
                    this.facaso=false
                },100);
            }
        }
    

const jugador=new tramontina({
    position:{
        x:0,
        y:0  
},
velosity:{
    x:0,
    y:0
},
place:{
    x:0,
    y:0
    },
    foto: '../img/Sprites/Idle.png',
    maximo:8,
    escala:3, 

    cuadrado:{
        x:215 ,y:180
    },
    sprites: {
        idle:{
            foto: '../img/Sprites/Idle.png',
             maximo: 8
        },
        run:{
            foto: '../img/Sprites/Run.png',
              maximo:8
        },
    jump:{
        foto:'../img/Sprites/Jump.png',
        maximo:2

    }
    }

}) 

const jugador2=new tramontina({
    position:{
        x:500,
        y:0
},
velosity:{
    x:0,
    y:0
},

color:"purple",
place:{
    x:-50,
    y:0
    }
}) 
//movimiento 
 const keys={
    a:{
        pressed: false 
    },
    d:{
        pressed: false 
    },
    w:{pressed:false 
    },
    ArrowRight:{pressed:false
    },
    ArrowLeft:{pressed:false
    },
    ArrowUp:{pressed:false
    }}

 let lastkey;

 function colicion({rect1, rect2}){
    return(
        rect1.ataque.position.x + rect1.ataque.width >= rect2.position.x &&
        rect1.ataque.position.x<=rect2.position.x+rect2.width &&
        rect1.ataque.position.y +rect1.ataque.height>=rect2.position.y &&
        rect1.ataque.position.y<=rect2.position.y +rect2.height
        )
}
function ganador({jugador, jugador2})
{
    document.querySelector('#ganadores').style.display='flex'
    if (jugador.vida===jugador2.vida){
        document.querySelector('#ganadores').innerHTML='Empate'}
     else if(jugador.vida>jugador2.vida){
        document.querySelector('#ganadores').innerHTML='jugador 1  gana'
        }
        else if(jugador.vida<jugador2.vida){
            document.querySelector('#ganadores').innerHTML='jugador 2 gana'
    }
   
    }


function correr(){
    jugador.imagen=jugador.sprites.run.imagen
}

 function animar(){
    window.requestAnimationFrame(animar);
    a.fillStyle="black"
    a.fillRect(0,0, canvas.width,canvas.height)
    fondito.update()
    jugador.update()
    //jugador2.update()
    jugador.velosity.x=0
    jugador2.velosity.x=0
    jugador.imagen=jugador.sprites.idle.imagen
    if (keys.d.pressed  &&jugador.lastkey==="d"){ 
        jugador.velosity.x=5
        correr()
    }
    else if (keys.a.pressed &&jugador.lastkey==="a"){
    jugador.velosity.x=-5
    correr()
   }
   if(jugador.velosity.y<0){
    jugador.imagen=jugador.sprites.jump.imagen
    jugador.maximo=jugador.sprites.jump.maximo
   }
    

if (keys.ArrowRight.pressed  &&jugador2.lastkey==="ArrowRight"){ 
    jugador2.velosity.x=5}

else if (keys.ArrowLeft.pressed &&jugador2.lastkey==="ArrowLeft"){
jugador2.velosity.x=-5
}

if (colicion({rect1: jugador,rect2: jugador2})&&jugador.facaso)
    {
        jugador.facaso=false
        jugador2.vida-=10
        document.querySelector('#vida2').style.width=jugador2.vida+'%'
   console.log("jugador 1 HIT")
   if (jugador.vida<=0||jugador2.vida<=0){
    ganador({jugador,jugador2})

    
   }

}
if (colicion({rect1: jugador2, rect2: jugador})&&jugador2.facaso)
    {
        jugador2.facaso=false
        jugador.vida-=10
        document.querySelector('#vida1').style.width=jugador.vida+'%'
        if (jugador.vida<=0||jugador2.vida<=0){
            ganador({jugador,jugador2})
        }
        
   console.log("jugador 2 HIT")
   
}
}
animar() 
 window.addEventListener("keydown", (envento)=>{
    switch (envento.key){
        case "d":
            keys.d.pressed=true
            jugador.lastkey="d"
            break
            case "a": 
            keys.a.pressed=true
            jugador.lastkey="a"
            break
            case"w":
            jugador.velosity.y=-10
            break
            case "g":
            jugador.golpe()
            break


            case "ArrowRight":
            keys.ArrowRight.pressed=true
            jugador2.lastkey="ArrowRight"
            break
            case "ArrowLeft": 
            keys.ArrowLeft.pressed=true
            jugador2.lastkey="ArrowLeft"
            break
            case"ArrowUp":
            jugador2.velosity.y=-10
            break
            case "End":
                jugador2.golpe()
                break
            
    }

 })
 window.addEventListener("keyup", (envento)=>{
    switch (envento.key){
        case "d":
            keys.d.pressed=false
            break
            case "a":
                keys.a.pressed=false
            break
            case "w":
                keys.w.pressed=false
            break
              

            case "ArrowRight":
            keys.ArrowRight.pressed=false
            lastkey2="ArrowRight"
            break
            case "ArrowLeft": 
            keys.ArrowLeft.pressed=false
            lastkey2="ArrowLeft"
            break
            case"ArrowUp":
            keys.ArrowUp.pressed=false
            break
            
    
    }

 })
