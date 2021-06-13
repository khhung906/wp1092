import {Tag} from "antd"; 

const ChatLog = ({ log, me }) => {  
    // console.log(log)
    return ( 
        <div>
            {log.map(({sender, body}, i) => {
                //one for system call and 
                let name = '';
                if(sender.name) name = sender.name
                else name = sender
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

