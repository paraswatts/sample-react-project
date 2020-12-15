import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { CustomizedSnackbars } from '../../atoms/custom-snackbar';

export const SnackbarWrapper = ({
    visible = false,
    variant,
    message,
    onClose = () => { }
}) => {

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'center',
                horizontal: 'center',
            }}
            open={visible}
            autoHideDuration={2500}
            onClose={() => { onClose() }}
        >
            <CustomizedSnackbars
                onClose={() => { onClose() }}
                variant={variant}
                message={message}
            />
        </Snackbar>
    )
}