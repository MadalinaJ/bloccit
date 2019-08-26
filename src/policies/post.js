// const ApplicationPolicy = require("./application");

// module.exports = class PostPolicy extends ApplicationPolicy {

//   create() {
//     return this.new();
//   }

//   edit() {
//     return this.new() &&
//       this.record && (this._isOwner() || this._isAdmin());
//   }

//   update() {
//     return this.edit();
//   }

//   destroy() {
//     return this.update();
//   }
// }


const ApplicationPolicy = require("./application");

module.exports = class PostPolicy extends ApplicationPolicy {
    new() {
        return this._isAdmin();
    }

    create() { 
        return this.new();
    }

    edit() {
        return this._isAdmin();
    }

    update(){
        return this.edit();
    }

    destroy() {
        return this.update();
    }
}
