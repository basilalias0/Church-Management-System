import React, { useEffect, useState, useRef } from 'react';
import { getVirtualId } from '../Services/VirtualidService';
import { getuserToken } from '../Utiles/storageHandler';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Virtualid = () => {
  const [virtualIdData, setVirtualIdData] = useState(null);
  const [photoBase64, setPhotoBase64] = useState('');
  const [error, setError] = useState('');
  const cardRef = useRef();

  useEffect(() => {
    const fetchVirtualId = async () => {
      try {
        const token = getuserToken();
        const data = await getVirtualId(token);
        setVirtualIdData(data);
        setError('');

        if (data.photo) {
          const response = await fetch(data.photo);
          const blob = await response.blob();

          const reader = new FileReader();
          reader.onloadend = () => {
            setPhotoBase64(reader.result); // Base64 string
          };
          reader.readAsDataURL(blob);
        }

      } catch (err) {
        console.error(err);
        setError(err?.response?.data?.message || 'Virtual ID not found.');
      }
    };

    fetchVirtualId();
  }, []);

  const handleDownload = async () => {
    const element = cardRef.current;
    const canvas = await html2canvas(element, { scale: 2 }); // better quality
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = 100; // mm - reduced size
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    const x = (pdf.internal.pageSize.getWidth() - pdfWidth) / 2;
    const y = 30;

    pdf.addImage(imgData, 'PNG', x, y, pdfWidth, pdfHeight);
    pdf.save('VirtualID.pdf');
  };

  if (error) return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;
  if (!virtualIdData) return <p style={{ textAlign: 'center' }}>Loading Virtual ID...</p>;

  return (
    <div style={{ textAlign: 'center', marginTop: '30px' }}>
      <div
        ref={cardRef}
        style={{
          width: '340px',
          margin: '0 auto',
          padding: '20px',
          border: '2px solid #0d6efd',
          borderRadius: '12px',
          backgroundColor: '#f0faff',
          fontFamily: 'Arial, sans-serif',
          boxShadow: '0 6px 18px rgba(0, 0, 0, 0.15)',
        }}
      >
        <h3 style={{ color: '#0d6efd', marginBottom: '18px' }}>Virtual ID Card</h3>

        {photoBase64 && (
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <img
              src={photoBase64}
              alt="Profile"
              style={{
                width: '110px',
                height: '110px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '4px solid #0d6efd',
                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
                display: 'block',
                margin: '0 auto',
              }}
            />
            <p style={{ marginTop: '10px', fontSize: '14px', color: '#555' }}>Profile Photo</p>
          </div>
        )}

        <p><strong>Name:</strong> {virtualIdData.fullName}</p>
        <p><strong>DOB:</strong> {new Date(virtualIdData.dateOfBirth).toLocaleDateString()}</p>
        <p><strong>Age:</strong> {virtualIdData.age}</p>
        <p><strong>Contact:</strong> {virtualIdData.contactNumber}</p>
        <p><strong>Blood Group:</strong> {virtualIdData.bloodType || 'N/A'}</p>
        <p><strong>Unique ID:</strong> {virtualIdData.uniqueID}</p>
      </div>

      <button
        onClick={handleDownload}
        style={{
          marginTop: '25px',
          padding: '10px 24px',
          fontSize: '16px',
          backgroundColor: '#0d6efd',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          transition: '0.3s ease',
        }}
        onMouseOver={e => e.target.style.backgroundColor = '#0b5ed7'}
        onMouseOut={e => e.target.style.backgroundColor = '#0d6efd'}
      >
        Download as PDF
      </button>
    </div>
  );
};

export default Virtualid;
