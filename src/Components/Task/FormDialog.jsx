import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import axios from 'axios'; // Import axios for making HTTP requests
import { v4 as uuidv4 } from 'uuid'; // Import uuid for generating unique IDs
import Swal from 'sweetalert2';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState('Pending'); // Default status

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    formJson.status = status; // Add the status from the Select component
    formJson.taskId = uuidv4(); // Generate a unique taskId

    try {
      // Post the task data to the server
      const response = await axios.post('http://localhost:4000/tasks', formJson);
      console.log('Task created:', response.data);
      handleClose();
      window.location.reload()
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Product added to cart",
        showConfirmButton: false,
        timer: 1500,
      });

    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create New Task
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit, // Update onSubmit to handle form submission
        }}
      >
        <DialogTitle>Create New Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="deadline"
            name="deadline"
            label="Deadline"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            variant="standard"
          />
          <FormControl fullWidth variant="standard" margin="dense">
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              id="status"
              value={status}
              onChange={handleStatusChange}
              label="Status"
              name="status"
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Done">Done</MenuItem>
            </Select>
          </FormControl>
          <TextField
            required
            margin="dense"
            id="position"
            name="position"
            label="Position"
            type="number"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Create</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
