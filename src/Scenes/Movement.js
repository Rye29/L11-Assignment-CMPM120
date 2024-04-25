class Movement extends Phaser.Scene {
    constructor() {
        super("movementScene");
        this.my = {sprite: {}};  // Create an object to hold sprite bindings
        this.Akey = null;
        this.Dkey = null;
        this.SpaceKey = null;
        this.fire = true;
    }

    preload() {
        this.load.setPath("./assets/kenney_scribble-platformer/Spritesheet/");

        // Load sprite atlas
        this.load.atlasXML("1D_characters", "spritesheet_default.png", "spritesheet_default.xml");
        this.load.atlasXML("1D_bullets", "spritesheet_retina.png", "spritesheet_retina.xml");
        this.Akey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.Dkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.SpaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    }

    create() {
       let my = this.my;
       my.sprite.Character = this.add.sprite(400, 300, "1D_characters", "character_roundYellow.png")
       my.sprite.bullet = this.add.sprite(my.sprite.Character.x, my.sprite.Character.y, "1D_bullets", "item_sword.png")
       my.sprite.bullet.visible = false;
       my.sprite.bullet.scale = 0.5
       my.sprite.bullet.mode = false;
    }

    update() {
        let my = this.my;    // create an alias to this.my for readability
        if(this.Akey.isDown && my.sprite.Character.x>15){
            
            my.sprite.Character.x -= 12;
            
        }

        if(this.Dkey.isDown && my.sprite.Character.x<790){
            my.sprite.Character.x += 12;
        }

        if(this.SpaceKey.isDown && this.fire && my.sprite.bullet.mode == false){
            //console.log("spaceKey Down")
            this.fire = false;
            my.sprite.bullet.mode = true;
            my.sprite.bullet.x = my.sprite.Character.x
            my.sprite.bullet.y = my.sprite.Character.y-50
            my.sprite.bullet.visible = true;
        }else if(this.SpaceKey.isUp && !this.fire){
            //console.log("spaceKey up")
            this.fire = true;
        }

        if(my.sprite.bullet.mode == true){
            my.sprite.bullet.y -= 20
        }

        if(my.sprite.bullet.y<-10){
            my.sprite.bullet.visible = false;
            my.sprite.bullet.mode = false;
        }
    }

}