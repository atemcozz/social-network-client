import api, {
  CLOUDINARY_API_KEY,
  CLOUDINARY_UPLOAD_PRESET,
} from "../api/cloudinary";

export default class CloudinaryService {
  static uploadImage(data) {
    const formData = new FormData();
    formData.append("file", data);
    formData.append("api_key", CLOUDINARY_API_KEY);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    return api.post("/image/upload", formData);
  }
}
