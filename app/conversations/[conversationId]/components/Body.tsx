'use client';
import getCurrentUser from "@/app/actions/getCurrentUser";
import useConversation from "@/app/hooks/useConversation";
import { FullMessageType } from "@/app/types";
import clsx from "clsx";
import { useState, useRef } from 'react';
import MessageBox from "./MessageBox";
interface BodyProps {
    initialMessages: FullMessageType[];
}

const Body: React.FC<BodyProps> = async ({ initialMessages }) => {

    const [messages, setMessages] = useState(initialMessages);
    const bottomRef = useRef<HTMLDivElement>(null);

    const { conversationId } = useConversation();

    let currentUser = await getCurrentUser();

    return (
        <div className="
        flex-1 flex-col overflow-y-auto
        ">

            {/* {messages.map((message, index) => (
                <MessageBox
                    isLast={index === messages.length - 1}
                    key={message.id}
                    data={message}
                />
            ))} */}
            <div ref={bottomRef} className="pt-24" />

            {initialMessages.map((message) => (
                <div className={clsx(`
                py-2
                border
                flex
                w-full
                 `,
                    message.sender.email === currentUser?.email ? 'justify-end' : 'justify-start'
                )}>
                    <div className="px-2">{message.sender.name} </div>
                    <div className="px-2">{message.body || message.image}</div>
                </div>
            ))}
        </div>
    );
}

export default Body;