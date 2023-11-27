const canvas = document.querySelector('canvas');
const a =canvas.getContext('2d');
let puntos=0


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
         
    const fondito=new sprite({
        position:{
            x:0,
            y:0
        },
        foto: '../img/fondo.png'
    })        
    


    class tramontina extends sprite { 
        constructor({position, velosity, color='blue', place, foto, escala=1, maximo=1,cuadrado,sprites,ataque={place:{},width:undefined,height: undefined } })
        { 
             
            super({
                position,foto,escala,maximo,cuadrado,place
    
                })
            this.velosity = velosity
            this.width=50
            this.height=150
            this.ataque={
                position:{
                    x:this.position.x,
                    y:this.position.y
                },
                place: ataque.place,
                    width:ataque.width,
                    height:ataque.height 
            }
            this.color=color
            this.facaso
            this.vida=100
            this.actual=0
            this.pasado=0
            this.mantener=5
            this.sprites=sprites
            this.muerte=false
            

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
            if(!this.muerte) this.cambiazo()
            
            this.ataque.position.x=this.position.x +this.ataque.place.x
            this.ataque.position.y=this.position.y +this.ataque.place.y

           
            this.position.x += this.velosity.x
            this.position.y += this.velosity.y
    
            if (this.position.y + this.height + this.velosity.y >= canvas.height -50){
                this.velosity.y=0
                this.position.y= 376
            }else
            { (this.velosity.y +=gravedad)}
            
        }
    
            golpe(){
                this.cambiazo('attack')
                this.facaso=true
                setTimeout(() => {
                    this.facaso=false
                },100)
            }
            golpeado(){
                
                this.vida-=10
                if(this.vida<=0){
                this.cambiazo('muerte')
                }
                else (this.cambiazo('golpeado'))
            }


            cambiazo(sprite){
                if(this.imagen===this.sprites.muerte.imagen){ 
                    if(this.actual=this.sprites.muerte.maximo-1)this.muerte=true
                    return}

                if(this.imagen===this.sprites.attack.imagen&&this.actual<this.sprites.attack.maximo-1)
                return
            if(this.imagen===this.sprites.golpeado.imagen&&this.actual<this.sprites.golpeado.maximo -1)
            return
                switch(sprite){
                    case 'idle':
                        if(this.imagen !== this.sprites.idle.imagen){
                        this.imagen=this.sprites.idle.imagen
                        this.maximo= this.sprites.idle.maximo
                        this.actual=0}
                        break
                     case'run':
                        if (this.imagen!==this.sprites.run.imagen){
                            this.imagen= this.sprites.run.imagen
                            this.maximo= this.sprites.run.maximo
                            this.actual=0
                        }
                        break
                     case 'jump':
                        if (this.imagen!==this.sprites.jump.imagen){
                        this.imagen= this.sprites.jump.imagen
                        this.maximo= this.sprites.jump.maximo
                        this.actual=0
                        } break

                     case 'fall':
                            if (this.imagen!==this.sprites.fall.imagen){
                            this.imagen= this.sprites.fall.imagen
                            this.maximo= this.sprites.fall.maximo
                            this.actual=0
                            }break
                     case 'attack':
                                if (this.imagen!==this.sprites.attack.imagen){
                                this.imagen= this.sprites.attack.imagen
                                this.maximo= this.sprites.attack.maximo
                                this.actual=0
                                }
                                break

                    case 'golpeado':
                                    if (this.imagen!==this.sprites.golpeado.imagen){
                                    this.imagen= this.sprites.golpeado.imagen
                                    this.maximo= this.sprites.golpeado.maximo
                                    this.actual=0
                                    }
                                    break
                     
                    case 'muerte':
                                        if (this.imagen!==this.sprites.muerte.imagen){
                                        this.imagen= this.sprites.muerte.imagen
                                        this.maximo= this.sprites.muerte.maximo
                                        this.actual=0
                                        }
                                        break
    
                        
    

                      
                                
                }
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
 
       },
       fall:{
        foto:'../img/Sprites/Fall.png',
        maximo:2
       },
        attack:{
        foto:'../img/Sprites/Ataque.png',
        maximo: 6 
    },
        golpeado: {
            foto:'../img/Sprites/Take Hit - white silhouette.png',
            maximo:4},
            muerte: {
                foto:'../img/Sprites/Death.png',
                maximo:6
            }
    },
    ataque: {
        place:{
            x:135,
            y:30
        },
        width:170,
        height:50
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
    },
    foto: '../img/Sprites2/Idle.png',
    maximo:8,
    escala:3, 

    cuadrado:{
        x:215 ,y:180
    },
    sprites: {
        idle:{
            foto: '../img/Sprites2/Idle.png',
             maximo: 8
        },
        run:{
            foto: '../img/Sprites2/Run.png',
              maximo:8
        },
       jump:{
        foto:'../img/Sprites2/Jump.png',
        maximo:2
 
       },
       fall:{
        foto:'../img/Sprites2/Fall.png',
        maximo:2
       },
        attack:{
        foto:'../img/Sprites2/Ataque2.png',
        maximo: 6 },
        golpeado: {
            foto:'../img/Sprites2/Take Hit - white silhouette.png',
            maximo:4
    
        },
        muerte: {
            foto:'../img/Sprites2/Death.png',
            maximo:6
        }
    
    },
    

    ataque: {
        place:{
            x:-235,
            y:30
        },
        width:170,
        height:50
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
        document.querySelector('#ganadores').innerHTML='jugador 1  gana precione f5 para jugar otra vez'
        }
        else if(jugador.vida<jugador2.vida){
            document.querySelector('#ganadores').innerHTML='jugador 2 gana - precione f5 para jugar otra vez'
    }
   
    }




 function animar(){
    window.requestAnimationFrame(animar);
    a.fillStyle="black"
    a.fillRect(0,0, canvas.width,canvas.height)
    fondito.update()
    jugador.update()
    jugador2.update()
    jugador.velosity.x=0
    jugador2.velosity.x=0


    
    if (keys.d.pressed  &&jugador.lastkey==="d"){ 
        jugador.velosity.x=5
        jugador.cambiazo('run')
    }
    else if (keys.a.pressed &&jugador.lastkey==="a"){
    jugador.velosity.x=-5
    jugador.cambiazo('run')
}else{jugador.cambiazo('idle')}
   

   if(jugador.velosity.y<0){
    jugador.cambiazo('jump')
   }else  if(jugador.velosity.y > 0){
    jugador.cambiazo('fall')}

    

if (keys.ArrowRight.pressed  &&jugador2.lastkey==="ArrowRight"){ 
    jugador2.velosity.x=5
    jugador2.cambiazo('run')}
    

else if (keys.ArrowLeft.pressed &&jugador2.lastkey==="ArrowLeft"){
jugador2.velosity.x=-5
jugador2.cambiazo('run')}
else{jugador2.cambiazo('idle')}

if(jugador2.velosity.y<0){
    jugador2.cambiazo('jump')
   }else  if(jugador2.velosity.y > 0){
    jugador2.cambiazo('fall')}



if (colicion({rect1: jugador,rect2: jugador2})&&jugador.facaso)
    {
        jugador2.golpeado()
        jugador.facaso=false
        jugador2.vida-=0
        
        document.querySelector('#vida2').style.width=jugador2.vida+'%'
        
   console.log("jugador 1 HIT")

   if (jugador.vida<=0||jugador2.vida<=0){
    ganador({jugador,jugador2
    })
   }

}

if (colicion({rect1: jugador2, rect2: jugador})&&jugador2.facaso)
    {
        jugador.golpeado()
        jugador2.facaso=false
        
        document.querySelector('#vida1').style.width=jugador.vida+'%'
        if (jugador.vida<=0||jugador2.vida<=0){
            ganador({jugador,jugador2})
        }
        
   console.log("jugador 2 HIT")
   
}

}
animar() 
 window.addEventListener("keydown", (envento)=>{
    if (!jugador.muerte){

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
            

    }}
    if (!jugador2.muerte ){
        switch(envento.key){
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
