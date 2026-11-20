
const test = require("node:test");
const assert = require("node:assert/strict");

const {
    validateTask,
    addTask,
    toggleTask,
    deleteTask,
    filterTasks,
    getStatistics
} = require("./taskLogic");

// Test 1: Check valid task
test("Should accept a valid task", () => {
    assert.equal(validateTask("Study HTML"), true);
});

// Test 2: Check empty task
test("Should reject an empty task", () => {
    assert.equal(validateTask(""), false);
});

// Test 3: Check spaces only
test("Should reject spaces only", () => {
    assert.equal(validateTask("   "), false);
});

// Test 4: Add a new task
test("Should add a new task", () => {
    const tasks = [];

    const result = addTask(
        tasks,
        "Study CSS",
        "High"
    );

    assert.equal(result.length, 1);
    assert.equal(result[0].text, "Study CSS");
    assert.equal(result[0].priority, "High");
    assert.equal(result[0].completed, false);
});

// Test 5: Complete a task
test("Should complete a pending task", () => {
    const tasks = [
        {
            id: "1",
            text: "Study HTML",
            priority: "Medium",
            completed: false
        }
    ];

    const result = toggleTask(tasks, "1");

    assert.equal(result[0].completed, true);
});

// Test 6: Undo a completed task
test("Should undo a completed task", () => {
    const tasks = [
        {
            id: "1",
            text: "Study HTML",
            priority: "Medium",
            completed: true
        }
    ];

    const result = toggleTask(tasks, "1");

    assert.equal(result[0].completed, false);
});

// Test 7: Delete a task
test("Should delete a task", () => {
    const tasks = [
        {
            id: "1",
            text: "Study HTML",
            priority: "Low",
            completed: false
        }
    ];

    const result = deleteTask(tasks, "1");

    assert.equal(result.length, 0);
});

// Test 8: Show pending tasks
test("Should filter pending tasks", () => {
    const tasks = [
        { id: "1", text: "HTML", completed: false },
        { id: "2", text: "CSS", completed: true }
    ];

    const result = filterTasks(tasks, "pending");

    assert.equal(result.length, 1);
    assert.equal(result[0].text, "HTML");
});

// Test 9: Show completed tasks
test("Should filter completed tasks", () => {
    const tasks = [
        { id: "1", text: "HTML", completed: false },
        { id: "2", text: "CSS", completed: true }
    ];

    const result = filterTasks(tasks, "completed");

    assert.equal(result.length, 1);
    assert.equal(result[0].text, "CSS");
});

// Test 10: Check statistics
test("Should calculate correct task statistics", () => {
    const tasks = [
        { id: "1", completed: false },
        { id: "2", completed: true },
        { id: "3", completed: false }
    ];

    const result = getStatistics(tasks);

    assert.deepEqual(result, {
        total: 3,
        pending: 2,
        completed: 1
    });
});
