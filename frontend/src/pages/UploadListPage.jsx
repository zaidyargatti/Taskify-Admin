import { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import axios from '../services/Axios';

export default function UploadListPage() {
  const [file, setFile] = useState(null);
  const [rows, setRows] = useState([]);
  const [error, setError] = useState('');
  const [uploadMsg, setUploadMsg] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const requiredHeaders = ['FirstName', 'Phone', 'Notes'];

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setError('');
    setRows([]);
    setUploadMsg('');

    if (!selected) return;

    const allowed = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      'text/csv',
    ];

    if (!allowed.includes(selected.type)) {
      setError('Only CSV, XLSX, or XLS files are allowed');
      return;
    }

    setFile(selected);
    const reader = new FileReader();

    reader.onload = (evt) => {
      const data = evt.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const parsed = XLSX.utils.sheet_to_json(sheet);

      if (!parsed.length) {
        setError('Uploaded file is empty');
        return;
      }

      const headers = Object.keys(parsed[0]);
      const hasAllHeaders = requiredHeaders.every((header) => headers.includes(header));

      if (!hasAllHeaders) {
        setError(`Missing required columns. Required: ${requiredHeaders.join(', ')}`);
        return;
      }

      setRows(parsed);
    };

    reader.readAsBinaryString(selected);
  };

  const handleUpload = async () => {
    setError('');
    setUploadMsg('');
    setUploading(true);

    if (!file) {
      setError('No file selected');
      setUploading(false);
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('/file/upload', formData);
      setUploadMsg(`${res.data.message} (${res.data.count} rows)`);
      setRows([]);
      setFile(null);
      fileInputRef.current.value = '';
    } catch (err) {
      setError(err?.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleCancel = () => {
    if (uploading) return;
    setFile(null);
    setRows([]);
    setError('');
    setUploadMsg('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-3xl bg-white mt-10 p-8 rounded-xl shadow-lg space-y-6">
        <h2 className="text-2xl font-inter font-semibold text-gray-800">Upload List</h2>

        <input
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="block w-full border border-gray-300 rounded p-2"
        />

        {error && <div className="bg-red-100 text-red-700 px-4 py-2 rounded">{error}</div>}
        {uploadMsg && <div className="bg-green-100 text-green-700 px-4 py-2 rounded">{uploadMsg}</div>}

        {rows.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold text-gray-700 mb-2">Preview ({rows.length} rows)</h3>
            <div className="max-h-64 overflow-y-auto border rounded">
              <table className="w-full text-sm text-left border-collapse">
                <thead className="bg-gray-200">
                  <tr>
                    {requiredHeaders.map((h) => (
                      <th key={h} className="p-2 border">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.slice(0, 10).map((row, idx) => (
                    <tr key={idx} className="odd:bg-white even:bg-gray-50">
                      {requiredHeaders.map((h) => (
                        <td key={h} className="p-2 border">{row[h]}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex gap-4">
              <button
                onClick={handleUpload}
                disabled={uploading}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition flex items-center justify-center"
              >
                {uploading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Uploading...
                  </>
                ) : (
                  'Upload to Server'
                )}
              </button>

              <button
                onClick={handleCancel}
                disabled={uploading}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
