import { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid";

function App() {
  type TodoItem = {
    id: string;
    name: string;
    completed: boolean;
  };

  const [todos, setTodos] = useState<TodoItem[]>([]);

  const todoNameRef = useRef<HTMLInputElement>(null);

  // 初期フォーカス
  useEffect(() => {
    todoNameRef.current?.focus();
  }, []);

  // タスクの追加
  const handleAddTodo = () => {
    // nullチェック
    if (!todoNameRef.current) return;

    const name = todoNameRef.current.value.trim();

    // Todo追加
    setTodos((prevTodos) =>
      name !== ""
        ? [...prevTodos, { id: uuidv4(), name: name, completed: false }]
        : prevTodos,
    ); // 三項演算子はreturn書かず、必ず「値」を返す

    // input欄を空にして再フォーカス
    todoNameRef.current.value = "";
    todoNameRef.current.focus();
  };

  // チェックしたタスクの削除
  const handleTodoClear = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
  };

  // チェックボックス切り替え
  const toggleTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  // タスク全選択
  const handleSelectAllCheck = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => ({ ...todo, completed: true })),
    );
  };

  // タスク全解除
  const handleClearAllCheck = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => ({ ...todo, completed: false })),
    );
  };

  // 選択中項目数
  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <div>
      <input type="text" ref={todoNameRef} placeholder="タスクを入力" />
      <button onClick={handleAddTodo}>追加</button>
      <button onClick={handleTodoClear} disabled={completedCount === 0}>
        選択したタスクを削除
      </button>
      <button onClick={handleSelectAllCheck} disabled={todos.length === 0}>
        全選択
      </button>
      <button onClick={handleClearAllCheck} disabled={completedCount === 0}>
        全解除
      </button>
      <div>
        全タスク：{todos.length}件
        {completedCount > 0 && `（選択中：${completedCount}件）`}
        {/* 条件 && 表示したい内容 */}
      </div>
      <hr />
      {todos.length === 0 ? (
        <div>タスクがありません</div>
      ) : (
        <TodoList todos={todos} toggleTodo={toggleTodo} />
      )}
    </div>
  );
}

export default App;
