import Profiles from './profiles';
import { supabase } from "../database/supabaseClient.js"
import React, { useEffect, useState } from 'react'
import Contactus from './contactus';

export default function Board() {

    const [period, setPeriod] = useState(0);
    const [fetchError, setFetchError] = useState(null)
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase
                .from('leaderboard')
                .select('*')
            if (error) {
                setFetchError('Could not fetch data')
                console.log(error)
                setData(null)
            }
            if (data) {
                setFetchError(null)
                setData(data)
            }
        }

        fetchData()
        console.log(data)
    }, [])


  return (
    <>
    <div className="board">
        <br/><br/>
        <h1 className='leaderboard'>Leaderboard</h1>

            <Profiles Leaderboard={between(data, period)}></Profiles>

    </div>
    <Contactus/>
    </>
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
