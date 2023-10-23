import axios from 'axios'

export async function uploadToS3(e: any) {
  const formData = new FormData(e.target);

  const file = formData.get("file");

  if (!file) {
    return null;
  }
  // @ts-ignore
  const fileType = encodeURIComponent(file.type);

  const { data } = await axios.get(`/api/media?fileType=${fileType}`);

  const { uploadUrl, key } = data;

  await axios.put(uploadUrl, file);

  return key;
}