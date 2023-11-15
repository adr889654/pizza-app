

const OrderRow = (props) =>{

    const getFomrattedDateTime = (data) =>{
        const mainSplit = data.split('T');
        const dateParts = mainSplit[0].split('-');
        const timeParts = mainSplit[1].split(':');
        const result = dateParts[1] + "/" + dateParts[2] + "/" + dateParts[0] +" "+timeParts[0] + ":" + timeParts[1];
        return result;
    }

    let uiTimestamp = getFomrattedDateTime(props.order.Timestamp);

    return (
        <tr
            onClick={ () => props.clickHandler(props.order)}
        >
            <td><input type="checkbox" checked={props.isSelected} readOnly/></td>
            <td>{props.order.Order_ID}</td>
            <td>{props.order.Crust}</td>
            <td>{props.order.Flavor}</td>
            <td>{props.order.Size}</td>
            <td>{props.order.Table_No}</td>
            <td>{uiTimestamp}</td>
        </tr>
    )
}

export default OrderRow;