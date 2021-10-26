require("dotenv").config();
const twit = require('./twitter');


console.log('bot is starting'); 

function retweet()
{
    let params={
        q:'#COVID19 min_retweets:20 lang:en', 
        result_type:'recent',
        count:5 // how many posts to retweet 
    }
    twit.twitterAPI.get('search/tweets', params,(err,data,response)=>
        {
            let tweets=data.statuses
            if(!err)
                {
                    for(let dat of tweets)
                    {
                        let likeId = dat.id_str;
                        twit.twitterAPI.post('favorites/create', {id: likeId}, (err, response)=>
                        {
                            if (response)
                                console.log('Post liked!!! with likeId - ' + likeId)
                            if (err)
                                console.log('Already LIKED...')
                        })
                    }
                }
            })


}
retweet(); 
setInterval(retweet,60000)