import { fetchUsers as loginUser } from "./api/users";
import { registerUser } from "./api/users";
import { fetchLedger } from "./api/ledger";

const api = {
  loginUser,
  fetchLedger,
  registerUser
};

export default api;
