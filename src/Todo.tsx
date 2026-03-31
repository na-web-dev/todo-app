type Props = {
  todo: {
    id: string;
    name: string;
    completed: boolean;
  };
  toggleTodo: (id: string) => void;
};

const Todo = ({ todo, toggleTodo }: Props) => {
  const handleTodoClick = () => {
    toggleTodo(todo.id);
  };

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleTodoClick}
        />
      </label>
      {todo.name}
    </div>
  );
};

export default Todo;
