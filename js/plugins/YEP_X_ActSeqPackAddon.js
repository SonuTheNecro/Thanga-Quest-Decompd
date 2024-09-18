 /*:
  * @plugindesc No Action Sequances for certain weapons
  * @author 
  *
  * 
  * */


var Imported = Imported || {};



(function(){
    
    if (Imported.YEP_BattleEngineCore) {


    //@[ALIAS]
    var _alias_BattleManager_processActionSequence = BattleManager.processActionSequence;
    BattleManager.processActionSequence = function (actionName, actionArgs) {

        if (actionName.match(/MOVE[ ](.*)/i)) {
        
        
            if (BattleManager.isNoMovingAction()) {
                return true;
            }

        }

        return _alias_BattleManager_processActionSequence.call(this, actionName, actionArgs);
        
    };

    

    BattleManager.isNoMovingAction = function() {
        if (this._action.isAttack() && this._subject.isActor()) {
            var weapon = this._subject.weapons()[0];
            if (weapon && weapon.meta.NoAction) {
                return true;
            }
        }
        return false;
    };

    }

})();