import {ReactComponent as CrmBackIcon} from "../../res/icons/crm_back_icon_2.svg"
export const AddOrganization = ({setAddOrganization}) => {

    return (
        <>
            <p>Add org From</p>
            <button className="floatingButton" onClick={() => setAddOrganization(false)}><CrmBackIcon /></button>
        </>
    )
}