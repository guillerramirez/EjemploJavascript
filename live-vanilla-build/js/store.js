const initialValue = {
    moves: []
}
export default class Store {

    #state = initialValue;    
    
    constructor(players) {
        this.players = players
    }

    //getter para poder leer los datos desde el app
    get game() {
         const state = this.#getstate()

         const currentPlayer = this.players[state.moves.length % 2]

         return {
            moves: state.moves,
            currentPlayer
         }
    }

    playerMove(squareId) {
        const state = this.#getstate()

        //funcion de Js para clonar objetos
        const stateClone = structuredClone(state)

        stateClone.moves.push({
            squareId,
            player: this.game.currentPlayer
        })

        this.#savestate(stateClone)

    }

    #getstate () {
        return this.#state

    }

    #savestate (stateOrFn) {

        const prevState = this.#getstate()

        let newState

        switch (typeof stateOrFn) {
            case 'function':
                newState = stateOrFn(prevState)
                break;
            case 'object':
                newState = stateOrFn
                break;
            default:
                throw new Error('Invalido argumento a saveState')
        }

        this.#state = newState
    }

}