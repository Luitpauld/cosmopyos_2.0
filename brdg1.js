class Brdg1 extends Phaser.Scene {
    constructor() {
        super("bridge_one");
    }


    create() {
        this.background = this.add.tileSprite(0,0, config.width, 200, "main_background");
        this.background.setOrigin(0,0).setScale(3);
        
        this.anims.create({
            key: "menu_anim",
            frames: this.anims.generateFrameNumbers("menu_table"),
            frameRate: 15,
            repeat: -1
        });

        this.menu_table = this.physics.add.sprite(config.width/2, config.height/2, "menu_table");
        this.menu_table.setOrigin().setScale(3);
        this.menu_table.play("menu_anim");


        const Butt1 = this.add.text(config.width/2, config.height/2, "to the mars");
        Butt1.setInteractive();
        Butt1.on("pointerdown", ()=>this.toTheMars()); 

        const Butt2 = this.add.text(config.width/2, config.height/2 + 100, "to the moon");
        Butt2.setInteractive();
        Butt2.on("pointerdown", ()=>this.toTheMoon()); 

        var musicOn = this.add.image(640,180, "musOn");
        musicOn.setOrigin().setScale(2);
        musicOn.setInteractive();
        musicOn.on("pointerdown", ()=>this.music_controller(musicOn))
             

        const music = this.sound.add("main", {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0,
          })

        music.play(config); 

        
        this.anims.create({
            key: "dog_anim",
            frames: this.anims.generateFrameNumbers("dog"),
            frameRate: 10,
            repeat: -1
        });

        
        
    }

    update(){
        this.background.tilePositionX += 1;
        
    }

    toTheMars()
    {
        this.scene.start("lvl2");
        this.sound.removeByKey('main');
    }
    
    toTheMoon()
    {
        this.scene.start("lvl3");
        this.sound.removeByKey('main');
    }

    backToMenu()
    {
        this.scene.start("bootGame");
        this.sound.sounds[2].mute = true;
    }

    music_controller(musicOn)
    {
        if(this.sound.mute == true){
            this.sound.mute = false;
            musicOn =this.add.image(640,180, "musOn");
            musicOn.setOrigin().setScale(2);
        }
        else{
            this.sound.mute = true;
            musicOn = this.add.image(640,180, "musOff");
            musicOn.setOrigin().setScale(2);
        }
        
    }
    
}