import Todo from "./Todo";

type TodoItem = {
  id: string;
  name: string;
  completed: boolean;
};

type TodoList = {
  todos: TodoItem[];
  toggleTodo: (id: string) => void;
};

// TypeSctiptでは型指定が必要(今回はTodoList)
const TodoList = ({ todos, toggleTodo }: TodoList) => {
  return todos.map((todo) => (
    <Todo key={todo.id} todo={todo} toggleTodo={toggleTodo} />
  ));
};

export default TodoList;
