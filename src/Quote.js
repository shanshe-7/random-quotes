import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';

import classes from './Quote.module.css';


function Quotes() {
    const [quote, setQuote] = useState('');
    const [count, setCount] = useState(0);
    const [author, setAuthor] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getData(){
            let response = await axios.get('https://quote-garden.herokuapp.com/api/v2/quotes/random');
            let resQuoteText = response.data.quote.quoteText;
            let resAuthor = response.data.quote.quoteAuthor;
            setQuote(resQuoteText);
            setAuthor(resAuthor);
            setLoading(false)
        }
        getData();
    }, [count])

    function newQuote(){
        setCount(count+1);
        setLoading(!loading)
    }
    
    
    return(
        
        <div id="quote-box" className={classes.body}>
            {loading ? <Loader type="Puff" color="#ff3d00" height={200} width={200} /> :
                <>
                    <p  className={classes.par1} id="text">{`" ${quote} "`}</p>
                    <p className={classes.par2}  id="author">{`- ${author}`}</p>
                    <div className={classes.buttons}>
                        <a  target="_blank" rel="noopener noreferrer" href="https://twitter.com/intent/tweet"><img className={classes.tweetter} src="data:image/png;base64,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" alt="tweetter" /></a>
                        <button className={classes.button} id="new-quote" onClick={newQuote}>New Quote</button>
                    </div>
                </>
            }
        
        </div>
        
    )
}
export default Quotes;
