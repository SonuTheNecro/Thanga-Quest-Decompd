//=========================================================
// Cae_DisableEventStart.js
//=========================================================

/*:
 * @plugindesc v1.5 - Can stop events from starting and/or apply visual freeze while a switch is on.
 * @author Caethyril
 *
 * @help Plugin Commands:
 *   None.
 *
 * Compatibility:
 *   Aliases:
 *     Game_Event:
 *       start, update, lock, forceMoveRoute, isMoveRouteForcing
 *
 * Terms of use:
 *   Free to use and modify.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Update log:
 *   1.5: Interpreter failsafe: ignore active move routes on frozen events.
 *        Plugin can now be used exclusively for freeze effect if desired.
 *   1.4: Added separate exception string parameter for freeze effect.
 *        Events immune to disable are not automatically immune to freeze.
 *   1.3: Freeze Effect parameter is now case-insensitive.
 *        Added check for empty exception string.
 *   1.2: Added "wait for move" option for freeze effect!
 *   1.1: Added optional visual freeze effect for all affected map events.
 *   1.0: Initial release.
 *
 * @param Switch ID
 * @text Switch ID
 * @type switch
 * @desc When this switch is on, the plugin is active.
 * @default 0
 *
 * @param --- Disable Options ---
 * @text --- Disable Options ---
 * @type select
 * @desc Options for the disable effect.
 *
 * @param Trigger Disable
 * @text Trigger Disable
 * @parent --- Disable Options ---
 * @type boolean
 * @desc If true, normal event interactions are disabled while the switch is on.
 * @default true
 *
 * @param Disable Exception
 * @text Disable Exception
 * @parent --- Disable Options ---
 * @type text
 * @desc Events with this text in their name will not be disabled.
 * @default &&
 *
 * @param --- Freeze Options ---
 * @text --- Freeze Options ---
 * @type select
 * @desc Options for the freeze effect.
 *
 * @param Freeze Effect
 * @text Freeze Effect
 * @parent --- Freeze Options ---
 * @type select
 * @option None
 * @option Wait for Move
 * @option Instant
 * @desc If "Instant", events will freeze where they are.
 * If "Wait for Move", freeze applies when event stops moving.
 * @default None
 *
 * @param Freeze Exception
 * @text Freeze Exception
 * @parent --- Freeze Options ---
 * @type text
 * @desc Events with this text in their name will not be frozen.
 * This text can be the same as Disable Exception.
 * @default ##
 *
 * @param Ignore Frozen Moves
 * @text Ignore Frozen Moves
 * @parent --- Freeze Options ---
 * @type boolean
 * @desc If true, move routes for frozen events are ignored.
 * If false, moves process when the event unfreezes.
 * @default true
 */

var Imported = Imported || {};				// Import namespace, var can redefine
Imported.Cae_DisableEventStart = 1.5;			// Import declaration

var CAE = CAE || {};					// Author namespace, var can redefine
CAE.DisableEventStart = CAE.DisableEventStart || {};	// Plugin namespace

(function(_) {

'use strict';

	_.params = PluginManager.parameters('Cae_DisableEventStart');		// Process user parameters

	_.swID		= Number(_.params['Switch ID']);
	_.disable	= _.params['Trigger Disable'] === 'true';
	_.exDisable	= String(_.params['Disable Exception']);
	_.freeze	= String(_.params['Freeze Effect']);
	_.exFreeze	= String(_.params['Freeze Exception']);
	_.noFreezeMove	= _.params['Ignore Frozen Moves'] === 'true';

	_.exTextCheck = function(name, exText) { return exText !== '' && name.contains(exText); };

	_.isSwitchOn = function() { return _.swID > 0 && $gameSwitches.value(_.swID); };

	_.isDisabled = function(event) {
		return _.disable && _.isSwitchOn() && !_.exTextCheck(event.event().name, _.exDisable);
	};

	_.isFrozen = function(event) {
		if (_.exTextCheck(event.event().name, _.exFreeze)) return false;
		let test = true;
		switch (_.freeze.toUpperCase()) {
			case 'WAIT FOR MOVE':
				test = !event.isMoving();
			case 'INSTANT':
				test = test && _.isSwitchOn();
				return test;
			default:
				return false;
		}
	};

	// Start if not disabled.
	_.Game_Event_start = Game_Event.prototype.start;
	Game_Event.prototype.start = function() {
		if (!_.isDisabled(this)) _.Game_Event_start.call(this);
	};

	// Update if not frozen.
	_.Game_Event_update = Game_Event.prototype.update;
	Game_Event.prototype.update = function() {
		if (!_.isFrozen(this)) _.Game_Event_update.call(this);
	};

	// Turn to player when activated only if not frozen.
	_.Game_Event_lock = Game_Event.prototype.lock;
	Game_Event.prototype.lock = function() {
		if (!_.isFrozen(this)) _.Game_Event_lock.call(this);
	};

	// Skip assigning move routes to frozen events if appropriate.
	_.Game_Event_forceMoveRoute = Game_Event.prototype.forceMoveRoute;
	Game_Event.prototype.forceMoveRoute = function(moveRoute) {
		if (_.noFreezeMove && _.isFrozen(this)) return;
		_.Game_Event_forceMoveRoute.call(this, moveRoute);
	};

	// Frozen events cannot move.
	_.Game_Event_isMoveRouteForcing = Game_Event.prototype.isMoveRouteForcing;
	Game_Event.prototype.isMoveRouteForcing = function() {
		if (_.isFrozen(this)) return false;
		return _.Game_Event_isMoveRouteForcing.call(this);
	};

})(CAE.DisableEventStart);