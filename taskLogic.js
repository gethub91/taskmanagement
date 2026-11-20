
// Validate task input
function validateTask(text) {
    return text.trim().length > 0;
}

// Add new task
function addTask(tasks, text, priority) {
    if (!validateTask(text)) {
        return tasks;
    }

    const newTask = {
        id: Date.now().toString(),
        text: text.trim(),
        priority: priority,
        completed: false
    };

    return [...tasks, newTask];
}

// Complete or undo task
function toggleTask(tasks, id) {
    return tasks.map(task => {
        if (task.id === id) {
            return {
                ...task,
                completed: !task.completed
            };
        }

        return task;
    });
}

// Delete task
function deleteTask(tasks, id) {
    return tasks.filter(task => task.id !== id);
}

// Filter tasks
function filterTasks(tasks, filter) {
    if (filter === "pending") {
        return tasks.filter(task => !task.completed);
    }

    if (filter === "completed") {
        return tasks.filter(task => task.completed);
    }

    return tasks;
}

// Calculate statistics
function getStatistics(tasks) {
    const total = tasks.length;

    const completed = tasks.filter(
        task => task.completed
    ).length;

    const pending = total - completed;

    return {
        total,
        pending,
        completed
    };
}

// Make functions available for testing
if (typeof module !== "undefined") {
    module.exports = {
        validateTask,
        addTask,
        toggleTask,
        deleteTask,
        filterTasks,
        getStatistics
    };
}
