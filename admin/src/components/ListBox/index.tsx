import React from 'react'
import { Button } from '../Button'
import axios from 'axios'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export const ListBox = ({ title, updateBtn }: { title: string, updateBtn: string }) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        axios.post('/api/delete/target', {
            displayname: title
          })
          .then(function (response) {
            if (response.status === 200) {
                handleClose
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    return (
        <>
        <div style={{ border: '1px solid #1a1a1a', padding: 20 }}>
            <h3>{title}</h3>
            <div style={{ display: 'flex' }}>
                <Button type={'secondary'} onClick={handleClickOpen}>Delete</Button>
                <Button type={'primary'} href={updateBtn}>Update</Button>
            </div>
            
        </div>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{`Delete ${title}?`}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    This action is irreversible!
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} type={"primary"}>
                    Don't Delete
                </Button>
                <Button onClick={handleDelete} type={"secondary"}>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
        </>
    )
}