import { Toaster } from "react-hot-toast"
import { IncomingRequestList } from "./IncomingRequestList"
import "./css/incomingRequest.css"
export const IncomingRequestPage = () => {
    return <div className="contentWrapper">
        <IncomingRequestList />
        <Toaster position="bottom-center" reverseOrder={false}/>
    </div>
}