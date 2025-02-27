
const Modal = ({ isOpen, onClose, onSave, title, description, setTitle, setDescription }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">Edit Task</h2>
        
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full border border-blue-500 dark:bg-gray-900 rounded-md p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full border border-blue-500 dark:bg-gray-900 rounded-md p-2 mb-4 h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <div className="flex justify-end gap-3">
          <button 
            onClick={onSave} 
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Save
          </button>
          <button 
            onClick={onClose} 
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
