import Store from "./store.js";
import View from "./view.js";

/* const App = {
    $: {       
    },

    state: {
        moves: [],
    },

    getGameStatus(moves) {

        const p1Moves = moves.filter(move => move.playerId == 1)
            .map(move => +move.squareId)
        const p2Moves = moves.filter(move => move.playerId == 2)
            .map(move => +move.squareId)

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

        winningPattern.forEach(pattern => {
            const p1Wins = pattern.every(v => p1Moves.includes(v));
            const p2Wins = pattern.every(v => p2Moves.includes(v));

            if (p1Wins) winner = 1
            if (p2Wins) winner = 2
        })


        return {
            status: moves.length == 9 || winner != null
                ? 'complete'
                : 'in-progress',
            winner: 1
        }
    },

    init() {
        App.$.menu.addEventListener("click", (event) => {
            App.$.menuItems.classList.toggle("hidden");
        })

        App.$.resetBtn.addEventListener('click', event => {
            console.log('Reset the game')
        })

        App.$.newRoundBtn.addEventListener('click', event => {
            console.log('Nuevo round del juego')
        })

        App.$.modalBtn.addEventListener('click', event => {
            App.state.moves = [];
            App.$.squares.forEach(square => square.replaceChildren())
            App.$.modal.classList.add("hidden");
        });

        App.$.squares.forEach((square) => {
            square.addEventListener("click", (event) => {
                // console.log(`Cuadro ${event.target.id}`)           

                const hasMove = (squareId) => {
                    const existingMove = App.state.moves.find(move => move.squareId == squareId)
                    return existingMove !== undefined
                }

                if (hasMove(+square.id)) {
                    return;
                }

                //-at(-1) se coloca en la ultima posicion del arreglo
                const lastMove = App.state.moves.at(-1);
                const getOppositePlayer = (playerId) => (playerId == 1 ? 2 : 1);


                const currentPlayer = App.state.moves.length == 0
                    ? 1
                    : getOppositePlayer(lastMove.playerId);

                const nextPlayer = getOppositePlayer(currentPlayer);

                const icon = document.createElement("i");
                const turnIcon = document.createElement("i");
                const turnLabel = document.createElement("p");
                turnLabel.innerText = `Player ${nextPlayer}, tu turno!`



                if (currentPlayer == 1) {
                    icon.classList.add("fa-solid", "fa-x", "yellow");
                    turnIcon.classList.add("fa-solid", "fa-o", "turquoise");
                    turnLabel.classList = "turquoise";
                    App.state.currentPlayer = 2;
                }
                else {
                    icon.classList.add("fa-solid", "fa-o", "turquoise");
                    turnIcon.classList.add("fa-solid", "fa-x", "yellow");
                    turnLabel.classList = "yellow";
                    App.state.currentPlayer = 1;
                }

                App.$.turn.replaceChildren(turnIcon, turnLabel);

                App.state.moves.push({
                    squareId: +square.id,
                    playerId: currentPlayer
                })

                square.replaceChildren(icon);

                const game = App.getGameStatus(App.state.moves);

                if (game.status == 'complete') {
                    App.$.modal.classList.remove("hidden");

                    let message = "";
                    if (game.winner) {
                        message = `Player ${game.winner} wins!`;
                    } else {
                        message = "Tie!";
                    }

                    App.$.modalText.textContent = message;
                }
            })
        })

    },
};


window.addEventListener("load", App.init); */


const players = [
    {
        id: 1,
        name: "Player 1",
        iconClass: "fa-x",
        colorClass: "turquoise",
    },
    {
        id: 2,
        name: "Player 2",
        iconClass: "fa-0",
        colorClass: "yellow",
    },
];
function init () {
    const view = new View()
    const store = new Store(players)

    view.bindGameResetEvent((event) => {
        view.closeAll();

        store.reset();

        view.clearMoves();

        view.setTurnIndicator(store.game.currentPlayer);
        
    });

    view.bindNewRoundEven((event) => {

    });

    view.bindPlayerMoveEvent((square) => {
        
        const existingMove = store.game.moves.find(move => move.squareId == +square.id)

        if (existingMove){            
            return
        }

        //pone el icono del jugador actual
        view.handlerPlayerMove(square, store.game.currentPlayer);

        // con el + se convierte a entero
        //y se le cambia el valor al cuurentplayer
        //avanza al siguiente estado haciendole push de una jugada al arreglo
        store.playerMove(+square.id)

        if (store.game.status.isComplete) {
            view.openModal(
                store.game.status.winner
                ? `${store.game.status.winner.name} wins!`
                : "Tie!"
            )
        }

        //pone el indicador del proximo turno
        view.setTurnIndicator(store.game.currentPlayer);
        
    });
}

window.addEventListener("load", init);