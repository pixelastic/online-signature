import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import './PdfUploader.css';

/**
 *
 * @param root0
 * @param root0.onPdfLoad
 */
function PdfUploader({ onPdfLoad }) {
  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file) return;

      const arrayBuffer = await file.arrayBuffer();
      // Create independent copies: one for react-pdf viewing, one for pdf-lib manipulation
      const uint8ArrayForPdfLib = new Uint8Array(arrayBuffer).slice();
      onPdfLoad({
        arrayBuffer,
        uint8Array: uint8ArrayForPdfLib,
        name: file.name,
      });
    },
    [onPdfLoad],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`uploader ${isDragActive ? 'uploader-active' : ''}`}
    >
      <input {...getInputProps()} />
      <div className="uploader-content">
        <svg
          className="uploader-icon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
        <p className="uploader-title">Upload PDF</p>
        <p className="uploader-hint">
          {isDragActive
            ? 'Drop the PDF file here'
            : 'Click or drag and drop your PDF file'}
        </p>
      </div>
    </div>
  );
}

export default PdfUploader;
