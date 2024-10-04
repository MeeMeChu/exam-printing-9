import { Box } from '@mui/material';
import { FC } from 'react'
import { useParams } from 'react-router-dom'

const EditExamPage : FC = () => {

    const { id } = useParams<{ id : string}>();

    return (
        <Box>
            EditExamPage {id}
        </Box>
    )
}

export default EditExamPage