import React, { useState } from 'react'
import Profiles from './profiles';
import { Leaderboard } from './database';

export default function Board() {

    const [period, setPeriod] = useState(0);



  return (
    <div className="board">
        <br/><br/>
        <h1 className='leaderboard'>Leaderboard</h1>

        <Profiles Leaderboard={between(Leaderboard, period)}></Profiles>

    </div>
  )
}



function between(data, between){
    const today = new Date();
    const previous = new Date(today);
    previous.setDate(previous.getDate() - (between + 1));

    let filter = data.filter(val => {
        let userDate = new Date(val.dt);
        if (between == 0) return val;
        return previous <= userDate && today >= userDate;
    })

    // sort with asending order
    return filter.sort((a, b) => {
        if ( a.score === b.score){
            return b.score - a.score;
        } else{
            return b.score - a.score;
        }
    })

}
