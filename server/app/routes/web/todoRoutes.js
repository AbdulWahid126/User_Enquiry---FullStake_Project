let express = require('express');
const { createTodo, getTodos, updateTodo, deleteTodo } = require('../../controllers/web/todoController');
const auth = require('../../middleware/auth');
let todoRouter = express.Router();

// Apply auth middleware to protect all Todo operations
todoRouter.use(auth);

todoRouter.post('/insert', createTodo);
todoRouter.get('/view', getTodos);
todoRouter.put('/update/:id', updateTodo);
todoRouter.delete('/delete/:id', deleteTodo);

module.exports = todoRouter;
