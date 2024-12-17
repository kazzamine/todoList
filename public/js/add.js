document.getElementById('addTaskForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const task = document.getElementById('taskInput').value.trim();
    const start_date = document.getElementById('startDate').value;
    const end_date = document.getElementById('endDate').value;

    if (new Date(start_date) > new Date(end_date)) {
        Swal.fire({
            icon: 'error',
            title: 'Invalid Dates',
            text: 'Start date cannot be after end date!',
        });
        return;
    }

    fetch('/add-task', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task, start_date, end_date })
    })
    .then((res) => res.json())
    .then(() => {
        Swal.fire({
            icon: 'success',
            title: 'Task Added',
            text: 'Your task has been successfully added!',
        });
        document.getElementById('addTaskForm').reset();
    })
    .catch((err) => {
        console.error('Error adding task:', err);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Something went wrong while adding the task.',
        });
    });
});
