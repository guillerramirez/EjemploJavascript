export default class View {

    $ = {}
    $$ = {}

    constructor() {
        this.$.menu = this.#qs('[data-id="menu"]')
        this.$.menuBtn = this.#qs('[data-id="menu-btn"]')
        this.$.menuItems = this.#qs('[data-id="menu-items"]')
        this.$.resetBtn = this.#qs('[data-id="reset-btn"]')
        this.$.newRoundBtn = this.#qs('[data-id="new-round-btn"]')        
        this.$.modal = this.#qs('[data-id="modal"]')
        this.$.modalText = this.#qs('[data-id="modal-text"]')
        this.$.modalBtn = this.#qs('[data-id="modal-btn"]')
        this.$.turn = this.#qs('[data-id="turn"]')

        this.$$.squares = this.#qsAll('[data-id="square"]')

        this.$.menuBtn.addEventListener("click", (event) => {
            this.toggleMenu();
        });
    }


    bindGameResetEvent(handler){
        this.$.resetBtn.addEventListener("click", handler);
    }

    bindNewRoundEven(handler){
        this.$.newRoundBtn.addEventListener("clic", handler);
    }

    bindPlayerMoveEvent(handler) {
        this.$$.squares.foreach(square => {
            square.addEventListener("click", handler);
        })
    }

    #toggleMenu (){
        this.$.menuItems.classList.toggle("hidden");
        this.$.menuBtn.classList.toggle("border");

        const icon = this.$.menuBtn.querySelector('i');

        icon.classList.toggle("fa-chevron-down")
        icon.classList.toggle("fa-chevron-up")

    }

    #setTurnIndicator(Player){
        const icon = document.createElement('i');
        const label = document.createElement('p');

        this.$.turn.classList.add(player == 1 ? 'yellow' : 'turquoise');
        label.classList.add(player == 1 ? 'yellow' : 'turquoise');

        icon.classList.add(player == 1 ? 'fa-x': 'fa-o')

        label.innerText = player == 1 ? "Player 1, te toca" : "Player 2: te toca"

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
