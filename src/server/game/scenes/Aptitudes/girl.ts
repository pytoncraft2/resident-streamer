import TJoueur from "../types/Joueur";
import ManetteClass from "../class/elements/ManetteClass";

export function __StatsSupplementaire(fakhear: TJoueur, _Aptitudes: any) {
  fakhear.degat = 10
  var json = fakhear.scene.anims.toJSON();
  console.log(json);
  fakhear.scene.anims.fromJSON(json);
}

export function cross__A(girl: Phaser.Physics.Arcade.Sprite|any, input: any) {
  if (input.a)
  {
    console.log("GRIAL A");
    girl.play("run")
    input.a = false
  }
}

export function kick__Z(manette: Phaser.Physics.Arcade.Sprite|any, input: any) {
    console.log("GIRL Z");
    
    if (input.z) {
      input.z = false;
  if (!manette.obj_manette) {
    // manette.son = 'manette'
    // manette.play('manette_lance')
      manette.body.setVelocityY(1000)
    const obj_manette = manette.scene.add.existing(new ManetteClass(manette.scene, manette.flipX ? manette.x - 80 : manette.x + 80, manette.y - 60, "manette",  `${(Math.random() + 1).toString(36).substring(7)}`)
    .setData({ ClientId: manette.ClientID, degat: manette.degat}))
    .setFlipX(manette.flipX)
    manette.scene.physics.add.existing(obj_manette);
    manette.scene.physics.add.overlap(obj_manette, (manette.scene as any)[`${manette.cible_courante}`], function(_obj_manette, _ennemie: any) {
      if (_ennemie.sprite !== manette.sprite) {
        _ennemie.dommage(_obj_manette.getData('degat'))
        _obj_manette.setData('degat', 0)
      }
    }, undefined, manette);

    (obj_manette.body as any).setAllowGravity(false);
    // manette.scene.groupeManettes.add(obj_manette);
    manette.obj_manette = obj_manette;

    manette.scene.time.delayedCall(200, () => {

        var timeline = manette.scene.tweens.createTimeline();

        timeline.add({
          targets: manette.obj_manette,
          x: manette.flipX ? manette.x -800 : manette.x + 800,
          ease: 'Power2',
          duration: 500,
          onComplete: function(_tw, tg: any) {
            tg[0].setData('degat', 1)
          }
        });

        timeline.add({
          targets: manette.obj_manette,
          props: {
            x: { value: function () { return manette.x; }, ease: 'Power1' },
            y: { value: function () { return manette.y; }, ease: 'Power3' }
          },
          ease: 'Power2',
          duration: 800
        });

        //@ts-ignore
        manette.obj_manette.tweenManette = timeline;
        timeline.play()
      manette.obj_manette = undefined;
    }, null, manette);
  }
}
}

export function dash__E(huipat: Phaser.Physics.Arcade.Sprite | any) {
  console.log("GIRL E");
}

export function fusion__TAB(huipat: TJoueur, input: any) {
  console.log("FUSION TAB GIRL");
}