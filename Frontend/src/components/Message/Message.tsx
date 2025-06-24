import React from "react";
import Card from "../Card/Card.tsx";

interface MessageProps {
    children: React.ReactNode;
}

const Message: React.FC<MessageProps> = function({children}) {
    return (
        <div className="site-width">
            <div className="container">
                <Card className="p-10">
                    {children}
                </Card>
            </div>
        </div>
    )
}

export default Message;