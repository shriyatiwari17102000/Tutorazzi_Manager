import React from 'react'
import classes from './ChatMessage.module.css'
// import TimeComp from "../../TimeComp/TimeComp"
import { Link } from 'react-router-dom';
// import GetDate from '../../GetDate';

const ChatMessage = ({ data }) => {

    console.log(data);

    const mycls = {
        true: classes.reply,
        false: classes.reply,
        counselor: ''
    }
    console.log("bhdbfhdbfhdbhfhg")
    console.log(data.response)
    return (
        <div className={`${classes.message} ${mycls[data.is_sender]}`}>
            {data.response && data.response_document_url ? (
                <div className={classes.para}>
                    <p >
                        {data.response}
                    </p>
                    <a
                        target="_blank"
                        style={{ fontSize: "12px" }}
                        href={data.response_document_url}

                    >
                        {data.response_document}
                    </a>
                </div>
            ) : data.response ? (
                <p className={classes.para}>
                    {data.response}
                </p>
            ) : data.response_document_url ? (
                <p className={classes.para}>  <a
                    target="_blank"
                    style={{ fontSize: "12px" }}
                    href={data.response_document_url}
                    // className={classes.para}
                >
                    {data.response_document}
                </a></p>
            ) : ""}

            {data.isQuote && <Link to={`/service-checkout/${data._id}`} className={classes.quotation}>
                <h6>{data.service_name}</h6>
                <span>Date :
                    {/* <GetDate date={data.start_time} /> */}
                </span>
                <span>Time :
                    {/* <TimeComp timeData={data.start_time} /> */}
                </span>
                <span>Duration : {data.duration}</span>
                <b>₹{data.amount}</b>
            </Link>}
            <div className={classes.message_detail}>
                <span className={classes.message_span}>
                    {/* <GetDate date={data.createdAt} /> */}
                </span>
                <span className={classes.message_span}>
                    {/* <TimeComp timeData={data.createdAt} /> */}
                </span>
            </div>
        </div>
    )
}

export default ChatMessage
