import { Button, Card, CardActions, CardContent, TextField } from "@mui/material"
import "./EditSuscription.css"
import { useState } from "react"
import PropTypes from "prop-types"

function EditSuscription({value, onConfirm, onCreate}) {
    const [suscriptionType, setSuscriptionType] = useState(value.suscription_Type)
    const [cost, setCost] = useState(value.cost)
    const [suscriptionDescription, setSuscriptionDescription] = useState(value.suscription_Description)
    const [suscriptionImg, setSuscriptionImg] = useState(value.suscription_Img)
    const [suscriptionPay, setSuscriptionPay] = useState(value.suscription_pay)

    return (
        <Card sx={{ minWidth: 275, zIndex: 2 }}>
            <CardContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <TextField
                    sx={{ marginBottom: "8px" }}
                    size="small"
                    label="Name"
                    required
                    onChange={(e) => setSuscriptionType(e.target.value)}
                    defaultValue={value.suscription_Type}
                />
                <TextField
                    sx={{ marginBottom: "8px" }}
                    size="small"
                    label="cost"
                    required
                    onChange={(e) => setCost(e.target.value)}
                    defaultValue={value.cost}
                />
                <TextField
                    sx={{ marginBottom: "8px" }}
                    size="small"
                    label="Description"
                    required
                    onChange={(e) => setSuscriptionDescription(e.target.value)}
                    defaultValue={value.suscription_Description}
                />
                <TextField
                    sx={{ marginBottom: "8px" }}
                    size="small"
                    label="Image Url"
                    required
                    onChange={(e) => setSuscriptionImg(e.target.value)}
                    defaultValue={value.suscription_Img}
                />
                <TextField
                    sx={{ marginBottom: "8px" }}
                    size="small"
                    label="Payment Method Url"
                    required
                    onChange={(e) => setSuscriptionPay(e.target.value)}
                    defaultValue={value.suscription_pay}
                />
            </CardContent>
            <CardActions>
                <Button
                    onClick={() =>
                        value.id
                            ? onConfirm(value.id,{
                                    suscription_Type: suscriptionType,
                                    cost: cost,
                                    suscription_Description: suscriptionDescription,
                                    suscription_Img: suscriptionImg,
                                    suscription_pay: suscriptionPay
                                })
                            : onCreate({
                                    suscription_Type: suscriptionType,
                                    cost: cost,
                                    suscription_Description: suscriptionDescription,
                                    suscription_Img: suscriptionImg,
                                    suscription_pay: suscriptionPay,
                                })
                    }
                    variant="contained"
                    size="small"
                >
                    Confirm
                </Button>
            </CardActions>
        </Card>
    )
}

export default EditSuscription

EditSuscription.propTypes = {
    value: PropTypes.object,
    onConfirm: PropTypes.func,
    onCreate: PropTypes.func
}