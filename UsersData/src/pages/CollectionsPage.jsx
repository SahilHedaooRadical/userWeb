// src/pages/CollectionsPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CollectionsPage = () => {
  const { access_token } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserCollections = async () => {
      try {
        const response = await fetch(
          `https://money-collection-backend.syolosoft.com/api/collections/public/${access_token}`
        );
        if (!response.ok) {
          throw new Error('Invalid or expired link');
        }
        const data = await response.json();
        console.log("data", data);
        setUserData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserCollections();
  }, [access_token]);

  if (loading) return <div style={styles.centered}>Loading…</div>;
  if (error)
    return (
      <div style={styles.centered}>
        <div style={styles.errorIcon}>❌</div>
        <div style={styles.errorMessage}>{error}</div>
      </div>
    );

  return (
    <div style={styles.container}>
      <div style={styles.headerCard}>
        <h2 style={styles.title}>
          <span style={styles.userName}>{userData?.user?.name}</span>
          {"'s"} Collection Summary
        </h2>
       <p style={styles.idPkg}>
  <span style={styles.label}>User ID:</span> {userData?.user?.id}
</p>
<p style={styles.idPkg}>
  <span style={styles.label}>Package Amount:</span> ₹{userData?.user?.package_amount}
</p>
<p style={styles.idPkg}>
  <span style={styles.label}>Total Collected:</span> ₹{userData?.user?.total_collected}
</p>

      </div>
      <h3 style={styles.subheading}>Collection History</h3>
      <ul style={styles.list}>
        {userData.collections.map((col, idx) => (
          <li key={idx} style={styles.card}>
            <div>
              <span style={styles.itemLabel}>Date: </span>
              <span style={styles.value}>
                {new Date(col.collected_at).toLocaleDateString()}

              </span>
            </div>
            <div>
              <span style={styles.itemLabel}>Amount: </span>
              <span style={styles.amount}>₹{col.amount}</span>
            </div>
            <div>
              <span style={styles.itemLabel}>Frequency: </span>
              <span style={styles.value}>{col.frequency}</span>
            </div>
          </li>
        ))}
        {userData.collections.length === 0 && (
          <li style={{ color: "#666", padding: 16 }}>No collections yet.</li>
        )}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 600,
    margin: '32px auto',
    padding: '24px 8px',
    fontFamily: "'Segoe UI', Arial, sans-serif",
    background: '#fff',
    borderRadius: 20,
    boxShadow: '0 4px 24px 0 rgba(30,40,90,0.09)',
    minHeight: '70vh',
  },
  centered: {
    minHeight: '200px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Arial, sans-serif',
    fontSize: 18,
    color: '#34495e',
  },
  errorIcon: {
    fontSize: 26,
    color: '#d63031',
    marginBottom: 10,
  },
  errorMessage: {
    color: '#d63031',
    fontWeight: 'bold',
  },
  headerCard: {
    background: 'linear-gradient(90deg,#f3e7e9 0%,#e3eeff 100%)',
    padding: '20px 26px 14px 26px',
    borderRadius: 14,
    marginBottom: 22,
    boxShadow: '0 1px 8px rgba(120,120,200,0.06)',
  },
  title: {
    margin: 0,
    fontSize: '1.6rem',
    fontWeight: 600,
    color: '#333B50',
  },
  userName: {
    color: '#0064fe',
  },
  idPkg: {
    padding: 0,
    margin: '6px 0 0 0',
    fontSize: '1.06rem',
    color: '#222e4a',
    letterSpacing: '0.01em',
  },
  subheading: {
    fontSize: '1.15rem',
    fontWeight: 500,
    margin: '36px 0 18px 0',
    color: '#223368',
    letterSpacing: '0.04em',
  },
  label: {
    color: '#6471a1',
    fontWeight: 600,
    marginRight: 4,
  },
  dash: {
    color: '#aab',
    margin: '0 10px',
    fontSize: '0.95em',
  },
  amount: {
    color: '#018865',
    fontWeight: 700,
    fontSize: '1.05em',
    letterSpacing: 0.2,
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  card: {
    background: 'linear-gradient(97deg,#f9fafb 60%,#e8f3fd 100%)',
    padding: '12px 18px',
    marginBottom: 16,
    borderRadius: 11,
    boxShadow: '0 2px 8px rgba(30,40,90,0.06)',
    transition: 'box-shadow 0.2s',
    borderLeft: '6px solid #638af7',
    cursor: 'pointer',
    fontSize: '1.04rem',
    display: 'block',
  },
  itemLabel: {
    color: '#556',
    fontWeight: 500,
    marginRight: 6,
  },
  value: {
    color: '#222',
    fontWeight: 400,
    letterSpacing: '0.01em',
  },
};

// (Optional) Add slight hover effect using global CSS-in-JS (for card shadows):
if (typeof window !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    li[style*="cursor: pointer"]{transition:.2s;}
    li[style*="cursor: pointer"]:hover{box-shadow:0 8px 22px 0 #bcd9f622;}
  `;
  document.head.append(style);
}

export default CollectionsPage;
