class Scene4 extends Phaser.Scene {
    constructor() {
        super("lvl3");
    }
    create() {
        this.background = this.add.tileSprite(0,0, config.width, 200, "lvl3_bg");
        this.background.setOrigin(0,0).setScale(3);  

        this.meteor1 = this.physics.add.sprite(config.width, config.heigth, "meteor1");
        this.meteor1.setOrigin().setScale(2);
        this.meteor2 = this.physics.add.sprite(config.width, config.heigth, "meteor1");
        this.meteor2.setOrigin().setScale(2);
        this.meteor3 = this.physics.add.sprite(config.width, config.heigth, "meteor1");
        this.meteor3.setOrigin().setScale(2);
        this.meteor4 = this.physics.add.sprite(config.width, config.heigth, "meteor1");
        this.meteor4.setOrigin().setScale(2);
        this.meteor5 = this.physics.add.sprite(config.width, config.heigth, "meteor1");
        this.meteor5.setOrigin().setScale(2);

        this.dog = this.physics.add.sprite(config.width/2, config.height/2, "dog");
        this.dog.play("dog_anim");
        this.dog.setOrigin().setScale(2);

        const music = this.sound.add("lvl3_sound", {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0,
          })

        music.on('complete', ()=> this.finishFunc());
        music.play();  

        this.physics.add.overlap(this.dog, this.meteor1, this.collideMeteor, null, this);
        this.physics.add.overlap(this.dog, this.meteor2, this.collideMeteor, null, this);
        this.physics.add.overlap(this.dog, this.meteor3, this.collideMeteor, null, this);
        this.physics.add.overlap(this.dog, this.meteor4, this.collideMeteor, null, this);
        this.physics.add.overlap(this.dog, this.meteor5, this.collideMeteor, null, this);
        
    }

    moveMeteor(meteor, speed){
        meteor.x -= speed;
        meteor.angle -= 1;
        if(meteor.x<0)
        {
            this.resetMeteorPos(meteor);
        }
    }

    finishFunc()
    {
        this.scene.start("bridge_one");
        this.sound.removeByKey('lvl3_sound');
    }

    resetMeteorPos(meteor){
        meteor.x = config.width;
        meteor.y = Phaser.Math.Between(20, config.height -20);
    }
    
    collideMeteor(dog, meteor) {
    
        dog.play("bang_anim");
        this.dog.setOrigin().setScale(1.3);
        setTimeout(()=>dog.disableBody(true, true), 700);
    }

    update(){
        this.background.tilePositionX += 1.5;
        this.moveMeteor(this.meteor1,1);
        setTimeout(()=> this.moveMeteor(this.meteor2,2), 1000);
        setTimeout(()=> this.moveMeteor(this.meteor3,3), 2000);
        setTimeout(()=> this.moveMeteor(this.meteor4,4), 3000);
        setTimeout(()=> this.moveMeteor(this.meteor5,5), 4000);

        var pointer = this.input.activePointer;
        if (pointer.isDown) {
            this.dog.x = pointer.x;
            this.dog.y = pointer.y;            
        } 
        
        
    }

    
}