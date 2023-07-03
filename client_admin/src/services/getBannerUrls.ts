import axios from "axios";

export default async function getBannerUrls() {
  try {
    const { data } = await axios.get("http://localhost:8080/store/api/banner");
    return data.bannerUrl ? JSON.parse(data.bannerUrl) : [];
  } catch (error) {}

  return [];
}
