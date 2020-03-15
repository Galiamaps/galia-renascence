class Entity {
    constructor(scene, x, y, animation, health, gunType){
        this.scene = scene;
        this.sprite = scene.physics.add.sprite(x, y, animation);
        this.health = health;
        this.sprite.body.immovable = true;
        this.scene.physics.add.collider(this.sprite, playerBullets.sprites, this.hit);
        this.initial = {x:x,y:y};
        this.weapon = new (stringToWeapon(gunType))(enemyBullets, -1, this);
    }
    hit(entitySprite, bulletSprite){
        if (bulletSprite.name == 'bullet'){
            entities.getClass(entitySprite).health -= allBullets.getClass(bulletSprite).damage;
            bulletSprite.destroy();
        } else {
            entities.getClass(entitySprite).health -= entities.getClass(bulletSprite).weapon.damage;
            entities.getClass(bulletSprite).health = 0;
            if (entitySprite.name === 'player'){
                updateScore('player');
            }
        }
    }
    move(){}
    update(){
        if (this.health <= 0){
            try {
                this.healthBar.destroy();
            } catch(err){};
            updateScore(this.sprite.name);
            this.sprite.destroy();
            entities.removeElement(this);
        } else {
            this.move();
            this.weapon.waitTime--;
            try{
                this.weapon1.waitTime--;
                this.weapon2.waitTime--;
            } catch(err){};
        }
    }
}