$(document).ready(() => {
    const display = $("#display");
    const form = $("#form");
    const todoUserInput = $("#todoUserInput");

    const resetTodosInput = () => {
        todoUserInput.val('');
    }

    const buildIDS = (todo) => {
        return {
            editID: "edit_" + todo._id,
            deleteID: "delete_" + todo.id,
            listItemID: "listItem_" + todo._id,
            todoID: "todo_" + todo._id
        }
    }

    const buildTemplate = (todo, ids) => {
        return `<li class="list-group-item" id"${ids.listItemID}">
            <div class="row">
                <div class="col-md-4" id="${ids.todoID}">${todo.todo}</div>
                <div class="col-md-4"></div>
                <div class="col-md-4 text-right">
                    <button type="button" class="btn btn-secondary" id="${ids.editID}">Edit</button>
                    <button type="button" class="btn btn-danger" id="${ids.deleteID}">Delete</button>
                </div>
            </div>
        </li>`;
    }

});