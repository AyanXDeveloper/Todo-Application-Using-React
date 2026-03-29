import { useState } from "react"
import Input from "../ui/Input"
import Swal from "sweetalert2"

const Todo = () => {

  const [input, setInput] = useState("")
  const [todos, setTodos] = useState([])
  const [editId, setEditId] = useState(null)
  const [editText, setEditText] = useState('')

  // Add Todo Function
  const addTodo = () => {
    if (input.trim()) {

      if (todos.some(todo => todo.text === input.trim())) {
        Swal.fire({
          title: "Task Already Exists",
          text: "This task is already in your list.",
          icon: "warning"
        })
        setInput('')
        return
      }

      const newTodo = {
        id: Date.now(),
        text: input,
        completed: false
      }

      setTodos([...todos, newTodo])
      setInput('')
      console.log(todos)
    }
  }

  // Delete todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  // Start editing
  const startEdit = (id, text) => {
    setEditId(id)
    setEditText(text)
  }

  // Update todo
  const updateTodo = (id) => {
    if (editText.trim()) {
      setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, text: editText } : todo
      ))
      setEditId(null)
      setEditText('')
    }
  }

  // Toggle completed status
  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  // Enter Key Press Handler
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo()
    }
  }

  return (
    <>
      <div className="w-full min-h-screen flex justify-center items-center align-middle bg-gradient-to-tl from-[#431264] to-[#202D73] p-4 sm:p-0">
        <div className="bg-white w-full sm:w-4/5 md:w-3/5 lg:w-2/5 max-h-screen md:max-h-5/6 rounded-2xl px-6 sm:px-10 py-8 sm:py-12 shadow-lg overflow-y-auto">
          <div className="flex flex-col gap-6">

            <h1 className="text-[#01216D] text-2xl sm:text-3xl font-bold">To-Do List 📝</h1>

            {/* Input Section */}
            <Input onClick={() => { addTodo() }} value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={handleKeyPress} />

            {/* Todo List */}
            <div className="flex flex-col gap-3 max-h-64 sm:max-h-96 overflow-y-auto">
              {todos.length === 0
                ? <p className="text-center text-gray-400 py-8">No tasks yet. Add one to get started!</p>
                : todos.map((todo) => (
                  <div key={todo.id} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition group flex-wrap sm:flex-nowrap">

                    {/* Checkbox */}
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer accent-[#FF6B5B]"
                      onChange={() => toggleComplete(todo.id)}
                    />

                    {/* Todo Text */}
                    {editId === todo.id ? (
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="flex-1 px-2 py-1 border border-[#FF6B5B] rounded focus:outline-none"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            updateTodo(todo.id)
                          }
                        }}
                      />
                    ) : (
                      <span
                        className={`flex-1 text-lg ${todo.completed
                            ? 'line-through text-gray-400'
                            : 'text-gray-700'
                          }`}
                      >
                        {todo.text}
                      </span>
                    )}

                    {/* Todo List Buttons */}
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                      {editId === todo.id ? (
                        <button
                          onClick={() => updateTodo(todo.id)}
                          className="px-3 py-1 cursor-pointer bg-green-500 text-white rounded text-sm hover:bg-green-600"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => startEdit(todo.id, todo.text)}
                          className="px-3 py-1 cursor-pointer bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                        >
                          Edit
                        </button>
                      )}
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="px-3 py-1 cursor-pointer bg-red-500 text-white rounded text-sm hover:bg-red-600"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Todo