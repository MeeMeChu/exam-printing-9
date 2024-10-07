import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

type PropsType = {
    path: string,
    title: string
    variable?: object
}

const NavigateBack = (props : PropsType) => {

    const navigate = useNavigate();

    return (
        <Button 
            onClick={() => {
                navigate(`${props.path}`, { state : props.variable })
            }}
            sx={{ display: 'flex', alignItems: 'center',justifyContent: 'start'}}
        >
            <ArrowBackIosIcon color='primary'/>
            <Typography variant='h6' color='primary' fontWeight="bold">{props.title}</Typography>
        </Button>
    );
}

export default NavigateBack;