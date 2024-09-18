const RAILWAY_ENDPOINT = import.meta.env.VITE_RAILWAY_ENDPOINT;
const LOCAL_ENDPOINT = import.meta.env.VITE_LOCAL_ENDPOINT;

const CURRENT_ENDPOINT = LOCAL_ENDPOINT;

const endpoint = {
  account: {
    getAllAccounts: `${CURRENT_ENDPOINT}/account`,
    getAccountById: (id) => `${CURRENT_ENDPOINT}/account/${id}`,
    createAccount: `${CURRENT_ENDPOINT}/account`,
    updateAccount: (id) => `${CURRENT_ENDPOINT}/account/${id}`,
    deleteAccount: (id) => `${CURRENT_ENDPOINT}/account/${id}`,
  },
  client: {
    getAllClients: `${CURRENT_ENDPOINT}/client`,
    getClientById: (id) => `${CURRENT_ENDPOINT}/client/${id}`,
    createClient: `${CURRENT_ENDPOINT}/client`,
    updateClient: (id) => `${CURRENT_ENDPOINT}/client/${id}`,
    deleteClient: (id) => `${CURRENT_ENDPOINT}/client/${id}`,
  },
  employee: {
    getAllEmployees: `${CURRENT_ENDPOINT}/employee`,
    getEmployeeById: (id) => `${CURRENT_ENDPOINT}/employee/${id}`,
    createEmployee: `${CURRENT_ENDPOINT}/employee`,
    updateEmployee: (id) => `${CURRENT_ENDPOINT}/employee/${id}`,
    deleteEmployee: (id) => `${CURRENT_ENDPOINT}/employee/${id}`,
  },
  project: {
    getAllProjects: `${CURRENT_ENDPOINT}/project`,
    getProjectById: (id) => `${CURRENT_ENDPOINT}/project/${id}`,
    createProject: `${CURRENT_ENDPOINT}/project`,
    updateProject: (id) => `${CURRENT_ENDPOINT}/project/${id}`,
    deleteProject: (id) => `${CURRENT_ENDPOINT}/project/${id}`,
  },
  user: {
    getAllUsers: `${CURRENT_ENDPOINT}/user`,
    getUserById: (id) => `${CURRENT_ENDPOINT}/user/${id}`,
    createUser: `${CURRENT_ENDPOINT}/user`,
    updateUser: (id) => `${CURRENT_ENDPOINT}/user/${id}`,
    deleteUser: (id) => `${CURRENT_ENDPOINT}/user/${id}`,
  },
};

export default endpoint;
