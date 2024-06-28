import {useState} from 'react'
import ClientForm from './ClientForm'

export default function ClientInfo({client, onClose}) {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleFormClose = () => {
    setIsEditing(false);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white w-3/4 h-3/4 p-6 rounded-lg shadow-lg overflow-auto relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
          >
            Close
          </button>
          {isEditing ? (
            <ClientForm client={client} onClose={handleFormClose} />
          ) : (
            <>
              <button
                onClick={handleEdit}
                className="absolute top-4 right-24 text-gray-700 hover:text-gray-900"
              >
                Edit
              </button>
              <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300">
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Client Name:
                      </label>
                      <p className="mt-1 text-sm text-gray-900">
                        {client.client_name}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Client ID:
                      </label>
                      <p className="mt-1 text-sm text-gray-900">{client.client_id}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Location:
                      </label>
                      <p className="mt-1 text-sm text-gray-900">{client.location}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Currency:
                      </label>
                      <p className="mt-1 text-sm text-gray-900">{client.currency}</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
