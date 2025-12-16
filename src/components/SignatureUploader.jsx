import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './SignatureUploader.css';

/**
 *
 * @param root0
 * @param root0.onSignatureLoad
 */
function SignatureUploader({ onSignatureLoad }) {
  const [preview, setPreview] = useState(null);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target.result;
        setPreview(dataUrl);
        onSignatureLoad(dataUrl);
      };
      reader.readAsDataURL(file);
    },
    [onSignatureLoad],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/gif': ['.gif'],
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
        {preview ? (
          <div className="signature-preview">
            <img src={preview} alt="Signature preview" />
            <p className="uploader-hint">Click to change signature</p>
          </div>
        ) : (
          <>
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
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="uploader-title">Upload Signature</p>
            <p className="uploader-hint">
              {isDragActive
                ? 'Drop the image here'
                : 'Click or drag and drop your signature image'}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default SignatureUploader;
