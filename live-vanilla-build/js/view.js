export default class View {

    $ = {}
    $$ = {}

    constructor() {
        this.$.menu = this.#qs('[data-id="menu"]');
        this.$.menuBtn = this.#qs('[data-id="menu-btn"]');
        this.$.menuItems = this.#qs('[data-id="menu-items"]');
        this.$.resetBtn = this.#qs('[data-id="reset-btn"]');
        this.$.newRoundBtn = this.#qs('[data-id="new-round-btn"]');
        this.$.modal = this.#qs('[data-id="modal"]');
        this.$.modalText = this.#qs('[data-id="modal-text"]');
        this.$.modalBtn = this.#qs('[data-id="modal-btn"]');
        this.$.turn = this.#qs('[data-id="turn"]');

        this.$$.squares = this.#qsAll('[data-id="square"]');

        this.$.menuBtn.addEventListener("click", (event) => {
            this.#toggleMenu();
        });
    }

    /**
     * Register all the event listeners     
     */

    bindGameResetEvent(handler){
        this.$.resetBtn.addEventListener("click", handler);
        this.$.modalBtn.addEventListener("click", handler);
    }

    bindNewRoundEven(handler){
        this.$.newRoundBtn.addEventListener("clic", handler);
    }

    //si se le pasa el handler completo, se equivoca si se le da clic al icono y no 
    //lo diferencia del cuadro
    //hay que pasarle especificamente el square () => handler(square) 
    bindPlayerMoveEvent(handler) {
        this.$$.squares.forEach(square => {
            square.addEventListener("click", () => handler(square));
        });
    }

    /**
     * DOM helper methods
     */

    openModal(message){
        this.$.modal.classList.remove("hidden");
        this.$.modalText.innerText = message;
    }

    closeModal() {
        this.$.modal.classList.add("hidden");
    }

    clearMoves(){
        this.$$.squares.forEach((square) => {
            square.replaceChildren();
        })
    }

    #toggleMenu (){
        this.$.menuItems.classList.toggle("hidden");
        this.$.menuBtn.classList.toggle("border");

        const icon = this.$.menuBtn.querySelector('i');

        icon.classList.toggle("fa-chevron-down")
        icon.classList.toggle("fa-chevron-up")

    }

    handlerPlayerMove(squareEl, player){
        const icon = document.createElement('i');
        icon.classList.add("fa-solid", player.iconClass, player.colorClass)
        squareEl.replaceChildren(icon)
    }

    setTurnIndicator(player){
        const icon = document.createElement('i');
        const label = document.createElement('p');

        icon.classList.add("fa-solid", player.colorClass, player.iconClass)        
        
        label.classList.add(player.colorClass);
               
        label.innerText = `${player.name}, te toca!`

        this.$.turn.replaceChildren(icon, label);
    }

    //# lo hace privado
    #qs(selector, parent){
        const el = parent 
            ? parent.querySelector(selector)
            : document.querySelector(selector)

        if (!el) throw new Error('No se encontraron elementos');

        return el
    }

    #qsAll(selector){
        const elList = document.querySelectorAll(selector)

        if (!elList) throw new Error('No se encontraron elementos');

        return elList
    }



}
