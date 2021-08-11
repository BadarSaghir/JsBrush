const canvas: HTMLCanvasElement = document.getElementById('c1') as HTMLCanvasElement
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.style.margin = '0';
canvas.style.position = 'fixed';
const color = document.getElementById("color") as HTMLInputElement;
let isDown= false
// // document.body.style.backgroundColor ="red"
class Root {

    x: number;
    y: number;
    size: number;
    speedX: number;
    speedy: number;
    maxSize: number;
    angleX: number;
    angleY: number;
    vs: number;
    va: number;
    lightness: number;
    hue: number;
    saturation: number;
    vax:number;
    vay:number;
    saturationRange:number
    rgb:string;


    constructor(x: number, y: number) {
        this.x = x;
        this.y = y
        this.size = Math.random() * 1 + 2;
        this.speedX = Math.random() * 4 - 2;
        this.speedy = Math.random() * 4 - 2;
        this.maxSize = Math.random() * 7 + 5;
        this.angleX = Math.random() * 6.2;
        this.angleY = Math.random() * 6.2;
        this.vs = Math.random() * 0.2 + 0.05;

        this.vax = Math.random() *0.6-0.3;
        this.vay = Math.random() *0.6-0.3;
        // this.test = '#' + (0"x100000000 + Math.random() * 0xffffffff).toString(16).substr(1, 6)
        this.lightness = 5;
        this.hue = Math.random()*360;
        this.saturation = 50;
        this.saturationRange=100;
        this.rgb = color.value;

    }
    getHue(){
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(this.rgb) as RegExpExecArray;
        let r = parseInt(result[1],16)/255;
        let g = parseInt(result[2],16)/255;
        let b = parseInt(result[3],16)/255;
        let max = Math.max(r,g,b);
        let min =Math.min(r,g,b)
        let h=(max+min)/2;
        let s=(max + min)/2;
        let l=(max + min)/2;
        s=s;
       
        if(max==min)h = s = 0;
        else{
            
            var d = max-min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch(max){
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h/=6;
        }
        // h=h*360;
        s = s*100;
        s = Math.round(s);
        l = l*100;
        l = Math.round(l);
        h = Math.round(360*h);

        return h;
    }
    update() {
        this.hue= this.getHue()
        this.x += this.speedX + Math.sin(this.angleX);
        this.y += this.speedy + Math.sin(this.angleY);
        this.size += this.vs;
        this.angleX += this.vax;
        this.angleY += this.vay;
        if(this.lightness<70)this.lightness+=0.25;
        if(this.saturation<this.saturationRange)this.saturation+=0.5;
        if (this.size < this.maxSize) {
            ctx.beginPath()
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath()
            // ctx.fillStyle ='hsl('+this.hue+','+this.saturation+'%,'+ this.lightness+'%)';
            // ctx.fillStyle='#01051e'232+
            console.log(this.getHue())
            ctx.fillStyle= 'hsl('+this.hue+','+ this.saturation+'%,'+ this.lightness+'%)'
            ctx.fill();
            ctx.stroke()
            requestAnimationFrame(this.update.bind(this))

        }
    }
   
}

// canvas.addEventListener("mousedown",(e)=>{
// const root = new Root(e.x, e.y);
// root.update();
// isDown = true}



document.addEventListener('mousedown',()=> isDown=true);
document.addEventListener('mouseup', ()=> isDown=false);


document.addEventListener('mousemove',(e)=>{
    if(isDown){
    //    console.log(color.value)
    for(let i=0;i<2;i++){  
    const root = new Root(e.x, e.y);
    root.update();
    
}
    }
    
});




