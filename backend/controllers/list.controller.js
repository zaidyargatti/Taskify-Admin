import XLSX from 'xlsx';
import Agent from '../models/agent.model.js';
import Listitem from '../models/list.model.js';
import cloudinary from '../config/cloudinary.config.js';
import streamifier from 'streamifier';

const uploadlist = async (req, res) => {
  try {
    const fileBuffer = req.file.buffer;

    // Upload to Cloudinary (raw file type)
    const cloudinaryUpload = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: 'raw', folder: 'uploads' },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        streamifier.createReadStream(fileBuffer).pipe(stream);
      });

    const result = await cloudinaryUpload(); // 🔼 cloud upload done

    // Parse spreadsheet
    const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet);

    if (!rows.length) {
      return res.status(400).json({ message: 'Empty file' });
    }

    const agents = await Agent.find();
    if (!agents.length) {
      return res.status(400).json({ message: 'No agents available for assignment' });
    }

    const distributed = [];
    const totalItems = rows.length;
if (agents.length === 5) {
  // ✅ Equal distribution for exactly 5 agents
  const perAgent = Math.floor(totalItems / 5);
  const remainder = totalItems % 5;

  let start = 0;
  for (let i = 0; i < 5; i++) {
    const end = start + perAgent + (i < remainder ? 1 : 0); // balance remainder
    const chunk = rows.slice(start, end);

    chunk.forEach(row => {
      distributed.push({
        firstName: row.FirstName || row.first_name || row.firstName,
        phone: row.Phone || row.phone,
        notes: row.Notes || row.notes,
        assigneTo: agents[i]._id, // ✅ FIXED here
      });
    });

    start = end;
  }
} else {
  // ✅ Round-robin for <5 or >5 agents
  rows.forEach((row, index) => {
    const agent = agents[index % agents.length];
    distributed.push({
      firstName: row.FirstName || row.first_name || row.firstName,
      phone: row.Phone || row.phone,
      notes: row.Notes || row.notes,
      assigneTo: agent._id, // ✅ FIXED here too
    });
  });
}


    await Listitem.insertMany(distributed);

    return res.status(201).json({
      message: 'List distributed successfully',
      fileUrl: result.secure_url,
      count: distributed.length,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'Error while uploading',
      error: error.message,
    });
  }
};

export { uploadlist };
