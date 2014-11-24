entitysystem
============

An experimental entity system for JavaScript based games

#Notes
Each entity needs a list of child entities. This makes any entity work like a container for other entities.
An entity can have multiple visual representations. E.g.: an icon, a 3D model, spritesheet.
Entity gets their behaviours from an internal FSM. They default to DEFAULT state, and behaviours can be added by writing js-code in a file read by the entity. Behaviours can be put in common modules.

Each entity can have a list of verbs that define how other entities can interact with it. A verb is an object which can be customized by adding validators and methods that set the entity in a specific state. The GUI system can access the verbs to render a list over possible interactions.

An entity can contain a state object which tells verbs and behaviour states what state the entity is in. E.g.: a door can be lock or not by setting state.locked to either true or false. A FSM state can access state properties via this.getState(prop) and this.setState(prop).

All entities can be tagged with multiple labels.

Make an API into the data, so that one can query for entities of a certain type, with certain tags, etc.

Phaser update need to call entity update. Entity update keeps the fsm state update. fsm states are js code put in modules. makes it easier to share states between entities.
