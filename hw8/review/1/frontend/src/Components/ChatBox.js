import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import {
    CHATBOX_QUERY,
    MESSAGE_SUBSCRIPTION,
} from '../graphql';
const ChatBox = ({ activeKey, me }) => {
    const { loading, error, data, subscribeToMore } = useQuery(CHATBOX_QUERY, { variables: { name: activeKey } });

    useEffect(() => {
        if (activeKey) {
            try {
                subscribeToMore({
                    document: MESSAGE_SUBSCRIPTION,
                    variables: { chatbox_name: activeKey },
                    updateQuery: (prev, { subscriptionData }) => {
                        if (!subscriptionData.data) return prev;
                        const newMessage = subscriptionData.data.message

                        return {
                            ...prev,
                            chatbox: {
                                messages: { ...prev.chatbox.messages, newMessage }
                            }
                        }
                    },
                });
            } catch (e) {
                console.log(e)
            }
        }
    }, [subscribeToMore, activeKey]);
    return (
        <div style={{ overflow: 'auto', height: "85%" }}>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>...</p>
            ) : (
                data.chatbox.messages.map(({ name, sender, body }, i) => {
                    if (sender.name == me) {
                        return (
                            <p key={i} style={{ textAlign: 'right', marginRight: "3px" }}>
                                <div style={{ backgroundColor: "#e6ecff", display: "inline", marginRight: "3px", paddingLeft: "5px", paddingRight: "5px" }}>{body}</div>
                                <div style={{ display: "inline" }}>{sender.name}</div>
                            </p>
                        )
                    }
                    else {
                        return (
                            <p key={i} style={{ textAlign: 'left', marginLeft: "3px" }}>
                                <div style={{ display: "inline", marginRight: "3px" }}>{sender.name}</div>
                                <div style={{ backgroundColor: "#e6ecff", display: "inline", paddingLeft: "5px", paddingRight: "5px" }}>{body}</div>
                            </p>
                        )
                    }
                })
            )}
        </div>
    );
};
export default ChatBox;
