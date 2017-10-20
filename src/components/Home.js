import React, { Component } from 'react';



class Home extends Component {

  render(){
    return(
      <div>
        <a href='/sheets'><div className='create-character-button home-nav-button three columns offset-by-one'><p className='white-text'>Create a Character</p></div></a>
        <a href='/game'><div className='create-game-button home-nav-button three columns offset-by-one'><p className='white-text'>Create a Game</p></div></a>
        <a href='#'><div className='home-nav-button three columns offset-by-one'><p className='black-text'>Join a Game</p></div></a>
        <div className='home-text ten columns offset-by-one'>
        <p className=''>This website uses trademarks and/or copyrights owned by Paizo Inc., which are used under Paizo's Community Use Policy. We are expressly prohibited from charging you to use or access this content. This website is not published, endorsed, or specifically approved by Paizo Inc. For more information about Paizo's Community Use Policy, please visit <a href='http://paizo.com/communityuse'>paizo.com/communityuse</a>. For more information about Paizo Inc. and Paizo products, please visit <a href='http://paizo.com'>paizo.com</a>.</p>
        </div>
      </div>
    )
  }
}

export default Home;
