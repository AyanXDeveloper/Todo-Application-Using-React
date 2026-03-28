
import { useState } from 'react'

const Todo = () => {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')
  const [editId, setEditId] = useState(null)
  const [editText, setEditText] = useState('')

  // Add new todo
  const addTodo = () => {
    if (input.trim()) {
      const newTodo = {
        id: Date.now(),
        text: input,
        completed: false
      }
      setTodos([...todos, newTodo])
      setInput('')
    }
  }

  // Delete todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  // Toggle completed status
  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
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

  // Handle Enter key for adding todo
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo()
    }
  }

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center align-middle bg-gradient-to-tl from-[#431264] to-[#202D73]">
        <div className="bg-white w-2/5 h-5/6 rounded-2xl px-10 py-12 shadow-lg overflow-y-auto">
          <div className="flex flex-col gap-6">
            <h1 className="text-[#01216D] text-3xl font-bold">To-Do List 📝</h1>

            {/* Input Section */}
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="add your task here"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 px-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-[#FF6B5B] placeholder-gray-400"
              />
              <button
                onClick={addTodo}
                className="px-8 py-3 bg-[#FF6B5B] text-white rounded-full font-semibold hover:bg-[#FF5A47] transition"
              >
                Add
              </button>
            </div>

            {/* Todo List */}
            <div className="flex flex-col gap-3 max-h-96 overflow-y-auto">
              {todos.length === 0 ? (
                <p className="text-center text-gray-400 py-8">No tasks yet. Add one to get started!</p>
              ) : (
                todos.map((todo) => (
                  <div
                    key={todo.id}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition group"
                  >
                    {/* Checkbox */}
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleComplete(todo.id)}
                      className="w-5 h-5 cursor-pointer accent-[#FF6B5B]"
                    />

                    {/* Todo Text or Edit Input */}
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
                        className={`flex-1 ${
                          todo.completed
                            ? 'line-through text-gray-400'
                            : 'text-gray-700'
                        }`}
                      >
                        {todo.text}
                      </span>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                      {editId === todo.id ? (
                        <button
                          onClick={() => updateTodo(todo.id)}
                          className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => startEdit(todo.id, todo.text)}
                          className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                        >
                          Edit
                        </button>
                      )}
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Todo