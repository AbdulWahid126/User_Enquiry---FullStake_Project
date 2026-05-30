import React, { useEffect, useState } from 'react';
import { Check, Trash2, Edit2, X, Plus, Filter, LogOut, CheckSquare, Square, Save } from 'lucide-react';
import api from '../utils/api';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

export default function TodoPage({ user, onLogout }) {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'
    
    // Inline editing states
    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');

    const fetchTodos = async () => {
        try {
            const res = await api.get('/todos/view');
            if (res.data.status) {
                setTodos(res.data.todoList);
            }
        } catch (err) {
            toast.error('Could not load your tasks');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    const handleAddTodo = async (e) => {
        e.preventDefault();
        if (!title.trim()) {
            return toast.warn('Please enter a task title');
        }

        try {
            const res = await api.post('/todos/insert', { title, description });
            if (res.data.status) {
                toast.success('Task added');
                setTitle('');
                setDescription('');
                fetchTodos();
            } else {
                toast.error(res.data.message || 'Failed to add task');
            }
        } catch (err) {
            toast.error('Error occurred while adding task');
        }
    };

    const handleToggleComplete = async (todo) => {
        try {
            const res = await api.put(`/todos/update/${todo._id}`, {
                completed: !todo.completed
            });
            if (res.data.status) {
                fetchTodos();
            }
        } catch (err) {
            toast.error('Failed to update task');
        }
    };

    const handleDeleteTodo = (id) => {
        Swal.fire({
            title: "Delete task?",
            text: "This will remove this task permanently.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#1e293b", // slate-800
            cancelButtonColor: "#ef4444",
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
            background: "#ffffff",
            color: "#0f172a"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await api.delete(`/todos/delete/${id}`);
                    if (res.data.status) {
                        toast.success('Task removed');
                        fetchTodos();
                    } else {
                        toast.error(res.data.message || 'Failed to delete');
                    }
                } catch (err) {
                    toast.error('Error deleting task');
                }
            }
        });
    };

    const startEditing = (todo) => {
        setEditingId(todo._id);
        setEditTitle(todo.title);
        setEditDescription(todo.description || '');
    };

    const cancelEditing = () => {
        setEditingId(null);
        setEditTitle('');
        setEditDescription('');
    };

    const handleSaveEdit = async (id) => {
        if (!editTitle.trim()) {
            return toast.warn('Task title cannot be empty');
        }

        try {
            const res = await api.put(`/todos/update/${id}`, {
                title: editTitle,
                description: editDescription
            });
            if (res.data.status) {
                toast.success('Task updated');
                setEditingId(null);
                fetchTodos();
            } else {
                toast.error(res.data.message || 'Failed to save changes');
            }
        } catch (err) {
            toast.error('Error saving changes');
        }
    };

    // Filters logic
    const filteredTodos = todos.filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
    });

    const pendingCount = todos.filter(todo => !todo.completed).length;

    return (
        <div className="max-w-2xl mx-auto py-12 px-4">
            
            {/* Header Navigation */}
            <div className="flex items-center justify-between mb-10 border-b border-slate-200 pb-6">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Tasks</h1>
                    <p className="text-slate-500 text-sm mt-1">
                        Welcome, <span className="font-semibold text-slate-800">{user?.name}</span>. You have <span className="font-semibold text-slate-800">{pendingCount}</span> pending tasks.
                    </p>
                </div>
                <button
                    onClick={onLogout}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                    <LogOut className="h-3.5 w-3.5" />
                    <span>Sign Out</span>
                </button>
            </div>

            {/* Task Form Container */}
            <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm mb-8">
                <h2 className="text-sm font-semibold text-slate-800 uppercase tracking-wider mb-4">Add a new task</h2>
                <form onSubmit={handleAddTodo} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder="What needs to be done?"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition-all font-medium"
                            required
                        />
                    </div>
                    <div>
                        <textarea
                            placeholder="Description or notes (optional)"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="2"
                            className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition-all resize-none"
                        ></textarea>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="flex items-center gap-1 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-lg transition-colors cursor-pointer"
                        >
                            <Plus className="h-4 w-4" />
                            <span>Add Task</span>
                        </button>
                    </div>
                </form>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center justify-between mb-6 bg-slate-100/60 border border-slate-200 p-1.5 rounded-xl">
                <div className="flex items-center gap-1.5 w-full">
                    {['all', 'active', 'completed'].map((type) => (
                        <button
                            key={type}
                            onClick={() => setFilter(type)}
                            className={`flex-1 text-center py-1.5 text-xs font-semibold capitalize rounded-lg transition-all cursor-pointer ${filter === type ? 'bg-white text-slate-900 shadow-sm border border-slate-200/50' : 'text-slate-500 hover:text-slate-800'}`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            {/* Task List */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden divide-y divide-slate-100">
                {loading ? (
                    <div className="p-8 text-center text-slate-400 text-sm flex items-center justify-center gap-2">
                        <div className="h-4 w-4 border-2 border-slate-800 border-t-transparent rounded-full animate-spin"></div>
                        <span>Loading tasks...</span>
                    </div>
                ) : filteredTodos.length === 0 ? (
                    <div className="p-12 text-center text-slate-400 text-sm">
                        No tasks here. Add some to get started!
                    </div>
                ) : (
                    filteredTodos.map((todo) => (
                        <div 
                            key={todo._id} 
                            className={`p-4 flex gap-3 transition-colors ${todo.completed ? 'bg-slate-50/50' : 'hover:bg-slate-50/30'}`}
                        >
                            {/* Complete Checkbox Toggle */}
                            <button
                                onClick={() => handleToggleComplete(todo)}
                                className={`mt-0.5 text-slate-400 hover:text-slate-800 transition-colors flex-shrink-0 cursor-pointer ${todo.completed ? 'text-indigo-600 hover:text-indigo-800' : ''}`}
                            >
                                {todo.completed ? (
                                    <CheckSquare className="h-5 w-5 text-slate-800" />
                                ) : (
                                    <Square className="h-5 w-5 text-slate-400" />
                                )}
                            </button>

                            {/* Task Content / Edit Interface */}
                            {editingId === todo._id ? (
                                <div className="flex-1 space-y-3">
                                    <input
                                        type="text"
                                        value={editTitle}
                                        onChange={(e) => setEditTitle(e.target.value)}
                                        className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-900 text-sm focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
                                        required
                                    />
                                    <textarea
                                        value={editDescription}
                                        onChange={(e) => setEditDescription(e.target.value)}
                                        rows="2"
                                        className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-900 text-sm focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800 resize-none"
                                    ></textarea>
                                    <div className="flex justify-end gap-2 text-xs font-semibold">
                                        <button
                                            type="button"
                                            onClick={cancelEditing}
                                            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                                        >
                                            <X className="h-3 w-3" />
                                            <span>Cancel</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleSaveEdit(todo._id)}
                                            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                                        >
                                            <Save className="h-3 w-3" />
                                            <span>Save</span>
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex-grow min-w-0">
                                    <h3 
                                        onClick={() => handleToggleComplete(todo)}
                                        className={`text-sm font-semibold text-slate-800 break-words cursor-pointer ${todo.completed ? 'line-through text-slate-400' : ''}`}
                                    >
                                        {todo.title}
                                    </h3>
                                    {todo.description && (
                                        <p className={`text-xs text-slate-500 mt-1 break-words leading-relaxed ${todo.completed ? 'line-through text-slate-400/80' : ''}`}>
                                            {todo.description}
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Action Buttons */}
                            {editingId !== todo._id && (
                                <div className="flex items-start gap-1 flex-shrink-0">
                                    <button
                                        onClick={() => startEditing(todo)}
                                        className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-all cursor-pointer"
                                        title="Edit Task"
                                    >
                                        <Edit2 className="h-3.5 w-3.5" />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteTodo(todo._id)}
                                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-all cursor-pointer"
                                        title="Delete Task"
                                    >
                                        <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>

        </div>
    );
}
