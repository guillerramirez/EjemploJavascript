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

         const currentPlayer = this.players[state.moves.length % 2];

         const winningPattern = [
            [1, 2, 3],
            [1, 5, 9],
            [1, 4, 7],
            [2, 5, 8],
            [3, 5, 7],
            [3, 6, 9],
            [4, 5, 6],
            [7, 8, 9],
        ];

        let winner = null;

        for (const player of this.players) {
            const selectedSquareIds = state.moves.filter(
                (move) => move.player.id == player.id
            ).map(move => move.squareId)

            for (const pattern of winningPattern ){
                if (pattern.every(v => selectedSquareIds.includes(v))){
                    winner = player
                }
            }
        }


         return {
            moves: state.moves,
            currentPlayer,
            status: {
                isComplete: winner != null || state.moves.length == 9, 
                winner
            }
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

    reset(){
        this.#savestate(initialValue);
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