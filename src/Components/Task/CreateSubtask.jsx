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

export default function CreateSubtask({ taskId, onSubtaskCreated }) {
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState('Pending');
  const [title, setTitle] = React.useState('');
  const [deadline, setDeadline] = React.useState('');
  const [position, setPosition] = React.useState('');

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
  
    const subtaskData = {
      title,
      deadline,
      status,
      position,
    };
  
    try {
      if (!taskId) {
        console.error('Task ID is missing');
        return;
      }
  
      const response = await fetch(`http://localhost:4000/tasks/${taskId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subtaskData),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create subtask: ${response.status} ${response.statusText} - ${errorText}`);
      }
  
      const newSubtask = await response.json();
      console.log('Subtask created:', newSubtask);
  
      if (onSubtaskCreated) onSubtaskCreated(newSubtask);
  
      handleClose();
    } catch (error) {
      console.error('Error creating subtask:', error.message);
    }
  };
  

  return (
    <React.Fragment>
      <Button variant="outlined" className='w-full bg-green-300' onClick={handleClickOpen}>
        Create New Subtask
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Create New Subtask</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            required
            margin="dense"
            id="deadline"
            label="Deadline"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            variant="standard"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
          <FormControl fullWidth variant="standard" margin="dense">
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              id="status"
              value={status}
              onChange={handleStatusChange}
              label="Status"
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
            label="Position"
            type="number"
            fullWidth
            variant="standard"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
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
