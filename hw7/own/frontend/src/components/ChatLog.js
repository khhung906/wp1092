import {Tag} from "antd"; 

const ChatLog = ({ log, me }) => {  
    return ( 
        <div>
            {log.map(({name, body}, i) => {
                const [text, time] = body.split('---split---');
                return(
                    name===me?
                    (<div key={i} style={{textAlign:"right"}}>             
                    <Tag color="blue" style={{float: 'right'}}>             
                    {name}</Tag> {text}&emsp;
                    <p style={{color:"grey", fontSize:"10px"}}>{time}</p><br/>
                    </div>)
                    :(<div key={i}>             
                        <Tag color="red">             
                        {name}</Tag> {text} <br/>
                    <p style={{color:"grey", fontSize:"10px"}}>{time}</p></div>)
                )
            })
            } 
        </div>
    )
}    
export default ChatLog;

