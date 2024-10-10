class Scene1 extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }

    preload(){
        //Прогружаем все картинки, музыку
        this.load.image("main_background", "img/space.png");
        this.load.image("lvl1_bg", "img/space.png");
        this.load.image("lvl2_bg", "img/space_red.png");
        this.load.image("lvl3_bg", "img/space_moon.png");

        this.load.audio("lvl1_sound", "sound/Pixel_Rain.mp3");
        this.load.audio("lvl2_sound", "sound/Fairy.mp3");
        this.load.audio("lvl3_sound", "sound/Frog.mp3");
        this.load.audio("main", "sound/Moonlight_and_Sunrise.mp3");

        this.load.image("meteor1", "img/meteor_yellow.png");
        this.load.image("musOn", "img/musicOn.png");
        this.load.image("musOff", "img/musicOff.png");

        this.load.spritesheet("menu_table", "img/menu.png", {
            frameWidth: 192,
            frameHeight: 108
        });

        this.load.spritesheet("dog", "img/dog_sheet.png", {
            frameWidth: 81,
            frameHeight: 52
        });
        this.load.spritesheet("bang", "img/bang.png", {
            frameWidth: 192,
            frameHeight: 225
        });

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


        const Butt = this.add.text(config.width/2, config.height/2, "Press to play");
        Butt.setInteractive();
        Butt.on("pointerdown", ()=>this.ololo()); 

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
        this.anims.create({
            key: "bang_anim",
            frames: this.anims.generateFrameNumbers("bang"),
            frameRate: 10,
            
        });

        
        
    }

    update(){
        this.background.tilePositionX += 1;
        
    }

    ololo()
    {
        this.scene.start("lvl1");
        this.sound.removeByKey('main');
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