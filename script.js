let tasks = []; // Array to store tasks
const addTask = () => {
    const taskinput = document.getElementById("taskinput");
    const text = taskinput.value.trim(); // Get input text and remove extra spaces

    if (text) {
        tasks.push({ text: text, completed: false }); // Add new task to array
        taskinput.value = ""; // Clear input field
        updateTaskList(); // Update task list
    }
};

const updateTaskList = () => {
    const tasklist = document.getElementById("tasklist"); 
    tasklist.innerHTML = ""; // Clear previous tasks
    tasks.forEach((task, index) => {
        const listitem = document.createElement("li");
        listitem.classList.add("taskitem"); // Add class for styling
        listitem.innerHTML = `
            <div class="task ${task.completed ? 'completed' : ''}">
                <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} onclick="toggleTaskComplete(${index})"/>
                <p>${task.text}</p>
            </div>
            <div class="icons">
                <img src="photos/edit.png" onclick="editTask(${index})" alt="Edit" class="icon"/>
                <img src="photos/delete.png" onclick="deleteTask(${index})" alt="Delete" class="icon"/>
            </div>
        `;
        tasklist.appendChild(listitem);
    });

    updateProgress();
};

// Function to toggle task completion
const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
};

// Function to edit a task
const editTask = (index) => {
    const newText = prompt("Edit your task:", tasks[index].text);
    if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText.trim();
        updateTaskList();
    }
};

// Function to delete a task
const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTaskList();
};

// Function to update progress bar
const updateProgress = () => {
    const progress = document.getElementById("progress");
    const numbers = document.getElementById("numbers");

    let completedTasks = tasks.filter(task => task.completed).length;
    let totalTasks = tasks.length;

    let percentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
    progress.style.width = percentage + "%"; // Adjust progress bar width
    numbers.innerText = `${completedTasks}/${totalTasks}`; // Update task count
};

// Event listener for adding a task
document.getElementById("newtask").addEventListener("click", function (e) {
    e.preventDefault();
    addTask();
});