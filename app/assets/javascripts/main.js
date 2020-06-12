





const DEBUG = true;

// game_speed(ms)
const GAME_SPEED = 1000/150;

// 画面サイズ
const SCREEN_W = 1420;
const SCREEN_H = 780;

// キャンバスサイズ
const CANVAS_W = SCREEN_W ;
const CANVAS_H = SCREEN_H ;

// フィールドサイズ
const FIELD_W = SCREEN_W ;
const FIELD_H = SCREEN_H ;

// 星の数
const STAR_MAX = 300;




// キャンバス
let can = document.getElementById("can");
let con = can.getContext("2d");
can.width = CANVAS_W;
can.height = CANVAS_H;

// フィールド
let vcan = document.createElement("canvas");
let vcon = vcan.getContext("2d");
vcan.width = FIELD_W;
vcan.height = FIELD_H;

// カメラの座標
let camera_x = 0;
let camera_y = 0;

// 星の実体
let star = [];

let tama=[];








// 自機のクラス
  class Jiki{
	constructor(){
		this.x = (FIELD_W/2)<<8;
		this.y = (FIELD_H/2)<<8;
    this.speed = 812;
    this.anime = 0;
    this.reload = 0;
	 }
  update(){
    if(key[32] && this.reload == 0){
      tama.push( new Tama(this.x,this.y,  0,-2000 ) );
      this.reload = 30;
    }
    if(this.reload>0) this.reload--;
		if( key[37] && this.x>this.speed )
		{
			this.x-=this.speed;
			if(this.anime>-8 )this.anime--;
		}
		else if( key[39] && this.x<= (FIELD_W<<8)-this.speed )
		{
			this.x+=this.speed;
			if(this.anime<8  )this.anime++;
		}
		else
		{
			if(this.anime>0) this.anime--;
			if(this.anime<0) this.anime++;
		}

		if( key[38] && this.y>this.speed )
			this.y-=this.speed;

		if( key[40] && this.y<= (FIELD_H<<8)-this.speed)
			this.y+=this.speed;
	}








//描画
  draw()
  {
    drawSprite(2 + (this.anime>>2), this.x, this.y );
  }
}
  let jiki = new Jiki();

// 読み込み
  let spriteImage = new Image();
  spriteImage.src = "sprite.png";

  class Sprite{

    constructor(x,y , w,h){
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
    }
  }







let sprite = [
  new Sprite (1,1,100,100),//0
  new Sprite (1,1,100,100),//1
  new Sprite (1,1,100,100),//2
  new Sprite (1,1,100,100),//3
  new Sprite (1,1,100,100),//4

  new Sprite (3,3,20,20),//4
  new Sprite (10,10,200,200),//6
];








// 飛行機をを描写
function drawSprite( snum, x, y ){
	let sx = sprite[snum].x;
	let sy = sprite[snum].y;
	let sw = sprite[snum].w;
	let sh = sprite[snum].h;

	let px = (x>>8) - sw/2;
	let py = (y>>8) - sh/2;

  if( px+sw/2 < camera_x || px-sw/2>=camera_x + SCREEN_W ||
      py+sh/2 < camera_y || py-sh/2>=camera_y + SCREEN_H)return;

	vcon.drawImage( spriteImage,sx,sy,sw,sh,px,py,sw,sh);
}








// 整数のランダムを生成
function rand(min,max){
  return Math.floor( Math.random() * ( max-min+1) )+min;
}

  // 星クラス
  class Star{
    constructor(){
      this.x = rand(0,FIELD_W) << 8;
      this.y = rand(0,FIELD_H) <<8;
      this.vx = 0;
      this.vy = rand(400,700);
      this.sz = rand(3,3);
    }
    draw(){
      let x = this.x >> 8;
      let y = this.y >> 8;

      if( x < camera_x || x>=camera_x + SCREEN_W ||
          y < camera_y || y>=camera_y + SCREEN_H)return;
      vcon.fillStyle = rand(0,0)!=0? "99":"blue";
      vcon.fillRect(x,y,this.sz,this.sz);
    }
    update(){
      this.x += this.vx;
      this.y += this.vy;
      if( this.y > FIELD_H<<8){
        this.y = 0;
        this.x = rand(0,FIELD_W)<<8;
      }
    }
  }




  let key=[];

  //キーボードが押されたとき
  document.onkeydown = function(e){
	   key[ e.keyCode ] = true;
  }
  //キーボードが離されたとき
  document.onkeyup = function(e){
	   key[ e.keyCode ] = false;
  }





  // 弾クラス
  class Tama{
  	constructor( x,y, vx,vy ){
  		this.sn   = 5;
  		this.x    = x;
  		this.y    = y;
  		this.vx   = vx;
  		this.vy   = vy;
      this.kill = false;
  	}

  	update(){
  		this.x += this.vx;
  		this.y += this.vy;
      if(this.x<0 || this.x>FIELD_W<<8
      || this.y<0 || this.y>FIELD_H<<8)this.kill = true;
  	}

  	draw(){
  		drawSprite( this.sn, this.x , this.y );
  	}
  }






// game初期化
function gameInit(){
  for(let i=0;i<STAR_MAX;i++)star[i] = new Star();
  setInterval( gameLoop , GAME_SPEED);
}



// ゲームループ
function gameLoop(){

  //移動の処理
  for(let i=0;i<STAR_MAX;i++)star[i].update();
  for(let i=tama.length-1;i>=0;i--){

  tama[i].update();
  if(tama[i].kill)tama.splice( i,1);
  }
  jiki.update();


  //描画の処理
  vcon.fillStyle="black";
  vcon.fillRect(camera_x,camera_y,SCREEN_W,SCREEN_H);

  for(let i=0;i<STAR_MAX;i++)star[i].draw();
  for(let i=0;i<tama.length;i++)tama[i].draw();

  jiki.draw();


  // 自機の範囲 0 ～ FIELD_W
  // カメラの範囲 0 ～ (FIELD_W-SCREEN_W)
  camera_x = (jiki.x>>8)/FIELD_W * (FIELD_W-SCREEN_W);
  camera_y = (jiki.y>>8)/FIELD_H * (FIELD_H-SCREEN_H);


  //仮想画面から実際のキャンバスにコピー
  con.drawImage( vcan ,camera_x,camera_y,SCREEN_W,SCREEN_H,
  	0,0,CANVAS_W,CANVAS_H);
    if(DEBUG){
      con.font = "40px 'Impact'";
      con.fillStyle = "#008BBB	";
      con.fillText("point :   " +tama.length,20,750);
    }

}

  // オンロードでgame開始
  window.onload = function(){
    gameInit();
  }
