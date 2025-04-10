
export const AccountInfoCard = ({accountData}) => {

    return (
        <>
           <div className="cardWrapper">
                <h4 className="cardTitle">Данные сотрудника</h4>
                {!accountData ? <p>Загрузка ...</p> :
                <div className="cardContentWrapper">
                    <p>ФИО: {`${accountData.employeeSecondName} ${accountData.employeeName} ${accountData.employeePatronymic}`}</p>
                    <p>Номер: {accountData.phone}</p>
                    <p>Почта: {accountData.email}</p>
                    <p>Должность: {accountData.role}</p>
                    <p>Организация: {accountData.organizationName}</p>
                </div>
                }
           </div>
        </>
    )
}