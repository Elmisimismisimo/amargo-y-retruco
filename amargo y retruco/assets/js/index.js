const canvas = document.querySelector('canvas');
const a =canvas.getContext('2d');

canvas.width= 1024
canvas.height=576
a.fillRect(0,0,canvas.width,canvas.height)
const gravedad=0.4
class sprite{ 
    constructor({position, velosity}){
        this.position=position
        this.velosity = velosity
        this.height=150
    }
    draw(){
        a.fillStyle='blue'
        a.fillRect(this.position.x,this.position.y, 50,this.height)
    }
    update(){
        this.draw()
        this.position.x += this.velosity.x
        this.position.y += this.velosity.y

        if (this.position.y + this.height + this.velosity.y >= canvas.height){
            this.velosity.y=0
        }else this.velosity.y +=gravedad


    }
}
const jugador=new sprite({
    position:{
        x:0,
        y:0
   
},
velosity:{
    x:0,
    y:0
}
}) 

const jugador2=new sprite({
    position:{
        x:500,
        y:0
   
},
velosity:{
    x:0,
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

 

 let lastkey

 function animar(){
    window.requestAnimationFrame(animar);
    a.fillStyle="black"
    a.fillRect(0,0, canvas.width,canvas.height)
    jugador.update()
    jugador2.update()
    jugador.velosity.x=0
    jugador2.velosity.x=0
    
    if (keys.d.pressed  &&jugador.lastkey==="d"){ 
        jugador.velosity.x=2
    }
    else if (keys.a.pressed &&jugador.lastkey==="a"){
    jugador.velosity.x=-2}

if (keys.ArrowRight.pressed  &&jugador2.lastkey==="ArrowRight"){ 
    jugador2.velosity.x=2}

else if (keys.ArrowLeft.pressed &&jugador2.lastkey==="ArrowLeft"){
jugador2.velosity.x=-2
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
            
    }
 console.log(envento.key )
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
