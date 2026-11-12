import express from 'express';
import multer from 'multer';
import { getDbStatus } from '../config/db.js';
import { cloudinary, configureCloudinary } from '../config/cloudinary.js';
import Movie from '../models/Movie.js';
import PoliticalMilestone from '../models/PoliticalMilestone.js';
import Award from '../models/Award.js';
import GalleryItem from '../models/GalleryItem.js';
import MediaItem from '../models/MediaItem.js';
import Enquiry from '../models/Enquiry.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

router.get('/health', (req, res) => {
  res.json({
    ok: true,
    mongodbConnected: getDbStatus(),
    cloudinaryConfigured: configureCloudinary(),
  });
});

// Returns database collections if MongoDB is connected; otherwise returns empty arrays so frontend keeps local verified demo data.
router.get('/bootstrap', async (req, res) => {
  if (!getDbStatus()) {
    return res.json({
      mode: 'demo-fallback',
      movies: [],
      timeline: [],
      awards: [],
      gallery: [],
      media: [],
    });
  }

  try {
    const [movies, timeline, awards, gallery, media] = await Promise.all([
      Movie.find().sort({ year: 1 }).lean(),
      PoliticalMilestone.find().sort({ year: 1 }).lean(),
      Award.find().sort({ year: -1 }).lean(),
      GalleryItem.find().sort({ createdAt: -1 }).lean(),
      MediaItem.find().sort({ createdAt: -1 }).lean(),
    ]);

    return res.json({
      mode: 'mongodb',
      movies,
      timeline,
      awards,
      gallery,
      media,
    });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to load portfolio collections', details: err.message });
  }
});

// CRUD Endpoints (require MongoDB connection)
const requireDb = (req, res, next) => {
  if (!getDbStatus()) {
    return res.status(503).json({
      success: false,
      message: 'MongoDB is not connected. Running in stateless demo mode.',
    });
  }
  return next();
};

router.get('/movies', requireDb, async (req, res) => {
  const docs = await Movie.find().sort({ year: 1 }).lean();
  res.json(docs);
});

router.post('/movies', requireDb, async (req, res) => {
  const created = await Movie.create(req.body);
  res.status(201).json(created);
});

router.get('/timeline', requireDb, async (req, res) => {
  const docs = await PoliticalMilestone.find().sort({ year: 1 }).lean();
  res.json(docs);
});

router.post('/timeline', requireDb, async (req, res) => {
  const created = await PoliticalMilestone.create(req.body);
  res.status(201).json(created);
});

router.get('/awards', requireDb, async (req, res) => {
  const docs = await Award.find().lean();
  res.json(docs);
});

router.post('/awards', requireDb, async (req, res) => {
  const created = await Award.create(req.body);
  res.status(201).json(created);
});

router.get('/gallery', requireDb, async (req, res) => {
  const docs = await GalleryItem.find().sort({ createdAt: -1 }).lean();
  res.json(docs);
});

router.post('/gallery', requireDb, async (req, res) => {
  const created = await GalleryItem.create(req.body);
  res.status(201).json(created);
});

router.get('/media', requireDb, async (req, res) => {
  const docs = await MediaItem.find().sort({ createdAt: -1 }).lean();
  res.json(docs);
});

router.post('/media', requireDb, async (req, res) => {
  const created = await MediaItem.create(req.body);
  res.status(201).json(created);
});

router.post('/enquiries', async (req, res) => {
  const { name, email, category, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Name, email, and message are required.' });
  }

  if (!getDbStatus()) {
    return res.status(201).json({
      success: true,
      mode: 'stateless-demo',
      message: 'Enquiry received in API demo mode (configure MONGODB_URI to persist).',
    });
  }

  const saved = await Enquiry.create({ name, email, category, message });
  return res.status(201).json({
    success: true,
    mode: 'mongodb',
    message: 'Enquiry saved successfully.',
    enquiryId: saved._id,
  });
});

// Cloudinary image upload endpoint
router.post('/upload', upload.single('image'), async (req, res) => {
  if (!configureCloudinary()) {
    return res.status(503).json({
      success: false,
      message: 'Cloudinary credentials are not configured on the server.',
    });
  }

  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No image file provided.' });
  }

  try {
    const base64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
    const result = await cloudinary.uploader.upload(base64, {
      folder: 'babu-mohan-portfolio',
      resource_type: 'image',
    });

    return res.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Cloudinary upload failed', details: err.message });
  }
});

export default router;

