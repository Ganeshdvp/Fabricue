import multer, {StorageEngine} from "multer";

const storage: StorageEngine = multer.memoryStorage();

const upload: multer.Multer = multer({
  storage,
});

export default upload;