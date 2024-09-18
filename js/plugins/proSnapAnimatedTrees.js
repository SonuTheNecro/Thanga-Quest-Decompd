/** /*:
 * @author William Ramsey
 * @plugindesc Beautiful animated trees!
 * 
 * @help
 * To use, make a blank event where you want your tree
 * to appear and use the note tag <spawnTree>
 * 
 * There are 3 types of trees. The default,
 * tall (<spawnTree><tall>) and large (<spawnTree><large>)
 * 
 * You can control the wind speed using one of the following
 * plugin commands
 * snapWind low
 * snapWind midlow
 * snapWind medium
 * snapWind high
 * snapWind ultra
 */

var snapGlobalWindSpeed = 2;
(() => {
    const params = PluginManager.parameters('snapResCut');

    const base = ImageManager.loadPicture('snapTreeBase');
    const baset = ImageManager.loadPicture('snapTreeBaseTall');
    const basew = ImageManager.loadPicture('snapTreeBaseWide');
    const leaf = ImageManager.loadPicture('snapTreeLeaf');

    const pCommands = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        pCommands.call(this, command, args);

        if (command === 'snapWind') {
            switch (args[0].toLowerCase()) {
                case 'low':
                    snapGlobalWindSpeed = -20;
                    break;

                case 'midlow':
                    snapGlobalWindSpeed = -10;
                    break;
                case 'medium':
                    snapGlobalWindSpeed = 2;
                    break;
                case 'high':
                    snapGlobalWindSpeed = 4;
                    break;
                case 'ultra':
                    snapGlobalWindSpeed = 6;
                    break;
            }

        }
    }

    const sbo = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function() {
        sbo.apply(this, arguments);

        this.snapTrees = {};
        for (let i = 1; i < $dataMap.events.length; i++) {
            if ($dataMap.events[i]) {
                if ($dataMap.events[i].meta.spawnTree) {
                    this.snapTrees[i] = {
                        e: $gameMap._events[i],
                        meta: $dataMap.events[i].meta
                    }
                }
            }
        }

        let temp;
        let tmpl;

        let eid = 0;
        let bitmap;
        for (let i in this.snapTrees) {
            if (this.snapTrees[i].meta.tall) {
                bitmap = baset;
            } else if (this.snapTrees[i].meta.large) {
                bitmap = basew;
            } else {
                bitmap = base;
            }
            this.snapTrees[i].bitmap = bitmap;
            temp = new Sprite(bitmap);
            temp.x = -bitmap.width / 2;
            temp.y = -bitmap.height;
            //this._spriteset._tilemap.addChildAt(temp, this.snapTrees[i].e._eventId - 1);

            //eid = this.snapTrees[i].e._eventId - 1;

            SceneManager._scene._spriteset._characterSprites[this.snapTrees[i].e._eventId - 1].addChild(temp);



            bitmap = this.snapTrees[i].bitmap;
            for (let i = 0; i < bitmap.width; i++) {
                tmpl = new Sprite(leaf);
                tmpl.x = Math.random() * bitmap.width - Math.random() * bitmap.width;
                if (bitmap === basew) {
                    tmpl.x = Math.random() * bitmap.width / 1.5 - Math.random() * bitmap.width / 1.5;
                    tmpl.x += bitmap.width / 4;
                }
                tmpl.y = -12 + Math.random() * bitmap.height / 3;
                if (bitmap === baset || bitmap === basew) tmpl.y = -12 + Math.random() * bitmap.height / 2;
                tmpl.tint -= 1;
                tmpl.stiff = Math.random();
                if (tmpl.x < 0) {
                    tmpl.scale.x = -1;
                    tmpl.x += 48;
                }
                tmpl.float = 0;
                temp.addChild(tmpl);
            }

            this.snapTrees[i].tree = temp;

            this.windSpd = 0;
            this.windSpdTicker = 0;
        }

    };

    const smu = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        smu.apply(this, arguments);
        this.windSpd += (snapGlobalWindSpeed > this.windSpd) ? 0.05 : -0.05;
        this.windSpd = Math.min(Math.max(this.windSpd, -10), 6);
        let t
        for (let i in this.snapTrees) {

            for (let j in this.snapTrees[i].tree.children) {
                t = this.snapTrees[i].tree.children[j];

                t.rotation = Math.cos(t.float + Number(j) / Math.PI) / ((8 - this.windSpd) + (t.stiff * 4));
                t.float += 0.025;
            }
        }
    }
})();