import axios from "axios";

export default async function getAdmins() {
  const { data } = await axios.get("http://localhost:8080/store/api/admins");

  return JSON.parse(data.admins);
}
