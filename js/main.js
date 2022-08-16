//Example fetch using pokemonapi.co
document.getElementById('decker').addEventListener('click', getDeck)
document.querySelector('#carded').addEventListener('click', getCards)
function getDeck(){
    const url = `https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
          console.log(data)
          //let deck = data.deck_id
          //console.log(deck)
          localStorage.setItem('deck', data.deck_id) 
          localStorage.getItem('deck')
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
    
}



function scoreBoard (data) {
    console.log(typeof data.cards[0].value)

    let p1 = valConverter(data.cards[0].value)
    console.log(p1)
    let p2 = valConverter(data.cards[1].value)
    console.log(p2)
    document.getElementById("player1Score").innerHTML = p1
    document.getElementById("player2Score").innerHTML = p2

    if (p1 > p2) {
        document.getElementById('winner').innerHTML = `Player 1 Wins`
    } else if (p2 > p1) {
        document.getElementById('winner').innerHTML = `Player 2 Wins`
    } else {
        document.getElementById('winner').innerHTML = `Its a tie folks!`

    }
    return data
}
function valConverter(cardVal) {

    console.log(cardVal)
    if (cardVal == 'JACK') {
        cardVal = 11
        return cardVal

    } else if (cardVal == 'QUEEN') {
        cardVal = 12
        return cardVal

    } else if (cardVal == 'KING') {
        cardVal = 13
        return cardVal

    } else if (cardVal == 'ACE') {
        cardVal = 14
        return cardVal

    } else {
        return parseInt(cardVal)
    }


}
function getCards() {
    let deck = localStorage.getItem('deck')
    console.log(deck)

    const url = `https://www.deckofcardsapi.com/api/deck/${deck}/draw/?count=2`

    fetch(url)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
            document.getElementById('player1Card').src = data.cards[0].image
            document.getElementById('player2Card').src = data.cards[1].image
            scoreBoard(data)
            return data
        })
        .catch(err => {
            console.log(`error ${err}`)
        });
}