const fetchTasks = () => {
    fetch('/tasks')
        .then((res) => res.json())
        .then((tasks) => {
            const taskTableBody = document.getElementById('taskTableBody');
            taskTableBody.innerHTML = '';

            tasks.forEach((task, index) => {
                const row = `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${task.task}</td>
                        <td>${task.start_date}</td>
                        <td>${task.end_date}</td>
                        <td>
                            <button class="btn btn-danger btn-sm" onclick="deleteTask(${task.id})">Delete</button>
                        </td>
                    </tr>
                `;
                taskTableBody.innerHTML += row;
            });
        })
        .catch((err) => console.error('Error fetching tasks:', err));
};

const deleteTask = (id) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "click yes if you are sure",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`/delete-task/${id}`, { method: 'DELETE' })
                .then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Deleted!',
                        text: 'Your task has been deleted succesfully!!!!.',
                    });
                    fetchTasks(); 
                })
                .catch((err) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Failed to delete task. Retry!!!',
                    });
                });
        }
    });
};

document.addEventListener('DOMContentLoaded', fetchTasks);
