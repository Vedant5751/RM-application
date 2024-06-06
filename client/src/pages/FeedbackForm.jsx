import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

function FeedbackForm() {
  const [feedbackTitle, setFeedbackTitle] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [feedbackCategory, setFeedbackCategory] = useState('');
  const [feedbackRecipient, setFeedbackRecipient] = useState('');
  const [comments, setComments] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [feedbackDate, setFeedbackDate] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Form validation
    if (feedbackRecipient.trim() === '' || comments.trim() === '') {
      alert('Please fill out all required fields.');
      return;
    }

    // Collecting form data
    const feedbackData = {
      feedbackTitle,
      feedbackType,
      feedbackCategory,
      feedbackRecipient,
      comments,
      anonymous,
      feedbackDate,
    };

    // Example: sending data to the server
    // fetch('/submit-feedback', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(feedbackData),
    // });

    console.log(feedbackData);
    alert('Feedback submitted successfully!');

    // Reset form
    setFeedbackTitle('');
    setFeedbackType('');
    setFeedbackCategory('');
    setFeedbackRecipient('');
    setComments('');
    setAnonymous(false);
    setFeedbackDate('');
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-screen p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 m-5">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-3">
            <h1 className="text-xl font-bold mb-4">Submit Feedback</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="feedback-title" className="block text-sm font-medium text-gray-700">Feedback Title</label>
                <input
                  type="text"
                  id="feedback-title"
                  name="feedback-title"
                  value={feedbackTitle}
                  onChange={(e) => setFeedbackTitle(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label htmlFor="feedback-type" className="block text-sm font-medium text-gray-700">Feedback Type</label>
                <select
                  id="feedback-type"
                  name="feedback-type"
                  value={feedbackType}
                  onChange={(e) => setFeedbackType(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                >
                  <option value="">Select Type</option>
                  <option value="positive">Positive</option>
                  <option value="negative">Negative</option>
                  <option value="constructive">Constructive</option>
                </select>
              </div>
              <div>
                <label htmlFor="feedback-category" className="block text-sm font-medium text-gray-700">Feedback Category</label>
                <select
                  id="feedback-category"
                  name="feedback-category"
                  value={feedbackCategory}
                  onChange={(e) => setFeedbackCategory(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                >
                  <option value="">Select Category</option>
                  <option value="performance">Performance</option>
                  <option value="behavior">Behavior</option>
                  <option value="teamwork">Teamwork</option>
                  <option value="innovation">Innovation</option>
                </select>
              </div>
              <div>
                <label htmlFor="feedback-recipient" className="block text-sm font-medium text-gray-700">Feedback Recipient</label>
                <input
                  type="text"
                  id="feedback-recipient"
                  name="feedback-recipient"
                  value={feedbackRecipient}
                  onChange={(e) => setFeedbackRecipient(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              {/* <div>
                <label htmlFor="feedback-date" className="block text-sm font-medium text-gray-700">Date of Feedback</label>
                <input
                  type="date"
                  id="feedback-date"
                  name="feedback-date"
                  value={feedbackDate}
                  onChange={(e) => setFeedbackDate(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div> */}
              <div>
                <label htmlFor="comments" className="block text-sm font-medium text-gray-700">Comments</label>
                <textarea
                  id="comments"
                  name="comments"
                  rows="5"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                ></textarea>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="anonymous"
                  name="anonymous"
                  checked={anonymous}
                  onChange={(e) => setAnonymous(e.target.checked)}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
                <label htmlFor="anonymous" className="ml-2  block text-sm text-gray-900">Submit Anonymously</label>
              </div>
              <div className='pt-6'>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Submit Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedbackForm;
