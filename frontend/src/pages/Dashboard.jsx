import { useState, useEffect } from 'react';
import axios from 'axios';
import { PlusIcon, TrashIcon, LinkIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

/**
 * Dashboard component for managing bookmarks with drag-and-drop reordering
 * @returns {JSX.Element} The dashboard interface
 */
const Dashboard = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBookmarks, setTotalBookmarks] = useState(0);

  useEffect(() => {
    fetchBookmarks(currentPage);
  }, [currentPage]);

  const fetchBookmarks = async (page) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/bookmarks?page=${page}&limit=10`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setBookmarks(response.data.bookmarks);
      setTotalPages(response.data.totalPages);
      setTotalBookmarks(response.data.totalBookmarks);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch bookmarks');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await axios.post(
        'http://localhost:5000/api/bookmarks',
        { url },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      fetchBookmarks(currentPage);
      setUrl('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save bookmark');
      if (err.response?.data?.message === 'This URL is already bookmarked') {
        setUrl('');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/bookmarks/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      fetchBookmarks(currentPage);
    } catch (error) {
      setError('Failed to delete bookmark');
    }
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const items = Array.from(bookmarks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setBookmarks(items);

    try {
      await axios.put(
        'http://localhost:5000/api/bookmarks/reorder',
        { bookmarks: items },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );
    } catch (error) {
      setError('Failed to update bookmark order');
      fetchBookmarks(currentPage);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-lg text-gray-600 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Add New Bookmark</h2>
        
        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-4 text-red-700 dark:bg-red-900/50 dark:text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex items-center gap-4">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL to bookmark"
            className="input flex-1"
            required
          />
          <button 
            type="submit" 
            className="btn btn-primary whitespace-nowrap flex items-center gap-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <PlusIcon className="h-5 w-5" />
                <span>Add</span>
              </>
            )}
          </button>
        </form>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Saved Bookmarks</h2>
        
        <div className="space-y-4">
          {bookmarks.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">No Bookmarks Saved</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Start saving your favorite websites to see them here. 
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="bookmarks">
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="space-y-4"
                      >
                        {bookmarks.map((bookmark, index) => (
                          <Draggable
                            key={bookmark._id}
                            draggableId={bookmark._id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className={`flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-700 ${
                                  snapshot.isDragging ? 'shadow-lg bg-gray-50 dark:bg-gray-700' : ''
                                }`}
                              >
                                <div className="flex items-center space-x-4">
                                  <div
                                    {...provided.dragHandleProps}
                                    className="cursor-grab active:cursor-grabbing p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                                  >
                                    <LinkIcon className="h-6 w-6 text-gray-400" />
                                  </div>
                                  {bookmark.favicon && (
                                    <img src={bookmark.favicon} alt="" className="h-6 w-6" />
                                  )}
                                  <div>
                                    <a
                                      href={bookmark.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-lg font-medium text-gray-900 hover:text-primary-600 dark:text-white dark:hover:text-primary-400"
                                    >
                                      {bookmark.title}
                                    </a>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{bookmark.url}</p>
                                    {bookmark.summary && (
                                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{bookmark.summary}</p>
                                    )}
                                    {bookmark.tags && bookmark.tags.length > 0 && (
                                      <div className="mt-2 flex flex-wrap gap-2">
                                        {bookmark.tags.map((tag, index) => (
                                          <span
                                            key={index}
                                            className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                                          >
                                            {tag}
                                          </span>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <button
                                    onClick={() => handleDelete(bookmark._id)}
                                    className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                                  >
                                    <TrashIcon className="h-5 w-5" />
                                  </button>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>

              <div className="mt-6 flex flex-col items-center border-t border-gray-200 px-4 py-3 dark:border-gray-700 sm:px-6">
                <div className="flex flex-1 justify-between sm:hidden">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="btn btn-secondary"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="btn btn-secondary"
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex sm:flex-col sm:items-center sm:space-y-4">
                  <div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Showing <span className="font-medium">{(currentPage - 1) * 10 + 1}</span> to{' '}
                      <span className="font-medium">
                        {Math.min(currentPage * 10, totalBookmarks)}
                      </span>{' '}
                      of <span className="font-medium">{totalBookmarks}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 dark:ring-gray-700 dark:hover:bg-gray-700"
                      >
                        Previous
                      </button>
                      {[...Array(Math.max(totalPages, 1))].map((_, index) => (
                        <button
                          key={index + 1}
                          onClick={() => setCurrentPage(index + 1)}
                          className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                            currentPage === index + 1
                              ? 'z-10 bg-primary-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600'
                              : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 dark:text-gray-300 dark:ring-gray-700 dark:hover:bg-gray-700'
                          }`}
                        >
                          {index + 1}
                        </button>
                      ))}
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 dark:ring-gray-700 dark:hover:bg-gray-700"
                      >
                        Next
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 