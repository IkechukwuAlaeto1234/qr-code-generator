import React, { useState, CSSProperties, useEffect } from 'react';
import { QrCodeIcon, DownloadIcon, ZapIcon, SunIcon, MoonIcon } from './components/icons';

// A function to get styles based on the current theme (dark or light).
const getStyles = (isDarkMode: boolean): { [key: string]: CSSProperties } => {
  const darkTheme = {
    mainBg: '#111827',
    mainColor: '#F9FAFB',
    cardBg: '#1F2937',
    cardBorder: 'rgba(255, 255, 255, 0.1)',
    titleColor: '#FFFFFF',
    subtitleColor: '#9CA3AF',
    inputBg: '#374151',
    inputBorder: '#4B5563',
    inputColor: '#F9FAFB',
    secondaryBtnBg: '#374151',
    secondaryBtnColor: '#F9FAFB',
    secondaryBtnBorder: '#4B5563',
    placeholderBg: '#374151',
    placeholderColor: '#9CA3AF',
    placeholderBorder: '#4B5563',
    qrWrapperBg: '#FFFFFF',
    footerColor: '#6B7280',
    themeToggleBg: '#374151',
    themeToggleBorder: '#4B5563',
    themeToggleColor: '#9CA3AF',
  };

  const lightTheme = {
    mainBg: '#F3F4F6',
    mainColor: '#111827',
    cardBg: '#FFFFFF',
    cardBorder: 'rgba(0, 0, 0, 0.08)',
    titleColor: '#111827',
    subtitleColor: '#4B5563',
    inputBg: '#FFFFFF',
    inputBorder: '#D1D5DB',
    inputColor: '#111827',
    secondaryBtnBg: '#E5E7EB',
    secondaryBtnColor: '#1F2937',
    secondaryBtnBorder: '#D1D5DB',
    placeholderBg: '#F3F4F6',
    placeholderColor: '#6B7280',
    placeholderBorder: '#E5E7EB',
    qrWrapperBg: '#FFFFFF',
    footerColor: '#4B5563',
    themeToggleBg: '#F9FAFB',
    themeToggleBorder: '#F3F4F6',
    themeToggleColor: '#4B5563',
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return {
    mainContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: theme.mainBg,
      color: theme.mainColor,
      fontFamily: '"Inter", system-ui, sans-serif',
      padding: '1rem',
      transition: 'background-color 0.3s, color 0.3s',
    },
    generatorCard: {
      position: 'relative',
      backgroundColor: theme.cardBg,
      padding: '2.5rem 2rem',
      borderRadius: '1.5rem',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.08) inset',
      width: '100%',
      maxWidth: '480px',
      textAlign: 'center',
      border: `1px solid ${theme.cardBorder}`,
      transition: 'background-color 0.3s, border-color 0.3s',
    },
    headerTitle: {
      fontSize: '2.25rem',
      fontWeight: 700,
      color: theme.titleColor,
      margin: '0 0 0.5rem 0',
    },
    subtitle: {
      color: theme.subtitleColor,
      marginBottom: '2rem',
      fontSize: '1rem',
      marginTop: 0,
    },
    inputField: {
      width: '100%',
      padding: '1rem',
      borderRadius: '0.75rem',
      border: `1px solid ${theme.inputBorder}`,
      backgroundColor: theme.inputBg,
      color: theme.inputColor,
      fontSize: '1rem',
      boxSizing: 'border-box',
      transition: 'border-color 0.2s, box-shadow 0.2s, background-color 0.3s',
    },
    colorPickerWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: theme.inputBg,
      border: `1px solid ${theme.inputBorder}`,
      borderRadius: '0.75rem',
      padding: '0.5rem 0.5rem 0.5rem 1rem',
      margin: '1rem 0',
      transition: 'border-color 0.2s, background-color 0.3s',
    },
    colorPickerLabel: {
      fontSize: '1rem',
      fontWeight: 500,
      color: theme.subtitleColor,
    },
    colorPickerInput: {
      width: '40px',
      height: '40px',
      border: 'none',
      backgroundColor: 'transparent',
      borderRadius: '0.5rem',
      cursor: 'pointer',
      padding: 0,
    },
    buttonGroup: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
    button: {
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
      padding: '0.875rem 1.5rem', borderRadius: '0.75rem', border: 'none', cursor: 'pointer',
      fontWeight: 600, fontSize: '1rem', transition: 'all 0.2s ease-in-out', width: '100%',
    },
    primaryButton: { backgroundColor: '#4F46E5', color: '#FFFFFF' },
    secondaryButton: {
      backgroundColor: theme.secondaryBtnBg, color: theme.secondaryBtnColor,
      border: `1px solid ${theme.secondaryBtnBorder}`,
    },
    qrCodeWrapper: {
      marginTop: '2rem', padding: '1rem', backgroundColor: isDarkMode ? '#1F2937' : theme.qrWrapperBg,
      borderRadius: '1rem', display: 'inline-block',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out',
    },
    qrCodeImage: { display: 'block', width: '256px', height: '256px', borderRadius: '0.5rem' },
    qrCodePlaceholder: {
      width: '256px', height: '256px', backgroundColor: theme.placeholderBg,
      borderRadius: '0.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', color: theme.placeholderColor, border: `2px dashed ${theme.placeholderBorder}`,
      textAlign: 'center', padding: '1rem', margin: '0 auto', transition: 'background-color 0.3s, color 0.3s, border-color 0.3s'
    },
    spinner: {
      border: '4px solid rgba(255, 255, 255, 0.2)', borderLeftColor: '#4F46E5', borderRadius: '50%',
      width: '50px', height: '50px', animation: 'spin 1s linear infinite',
    },
    errorMessage: {
      color: '#F87171', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)',
      padding: '0.75rem', borderRadius: '0.5rem', marginTop: '1rem', marginBottom: '1rem', fontSize: '0.9rem',
    },
    footer: { marginTop: '3rem', color: theme.footerColor, fontSize: '0.875rem', textAlign: 'center' },
    themeToggle: {
      position: 'absolute', top: '1rem', right: '1rem', background: theme.themeToggleBg,
      border: `1px solid ${theme.themeToggleBorder}`, color: theme.themeToggleColor, cursor: 'pointer',
      width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center',
      justifyContent: 'center', transition: 'background-color 0.3s, color 0.3s, border-color 0.3s',
    }
  };
};

const QRCodePlaceholder = ({ styles }: { styles: { [key: string]: CSSProperties } }) => (
    <div style={styles.qrCodePlaceholder}>
        <QrCodeIcon style={{ width: '48px', height: '48px', marginBottom: '1rem' }} />
        <p style={{ margin: 0, fontWeight: 500, lineHeight: 1.5 }}>Your QR Code will appear here</p>
    </div>
);

const LoadingSpinner = ({ styles }: { styles: { [key: string]: CSSProperties } }) => (
    <div style={styles.qrCodePlaceholder}>
        <style>{'@keyframes spin { to { transform: rotate(360deg); } }'}</style>
        <div style={styles.spinner}></div>
    </div>
);

function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [inputText, setInputText] = useState<string>('');
  const [qrColor, setQrColor] = useState<string>('#4F46E5');
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [showQr, setShowQr] = useState<boolean>(false);

  const styles = getStyles(isDarkMode);

  useEffect(() => {
    if (qrCodeUrl && inputText) {
      handleGenerate(true);
    }
  }, [isDarkMode]);
  
  const handleGenerate = (isThemeChange = false) => {
    const trimmedInput = inputText.trim();
    if (!trimmedInput) {
      setError('Please enter some text or a URL.');
      setQrCodeUrl('');
      setShowQr(false);
      return;
    }

    const hasNoSpaces = !/\s/.test(trimmedInput);
    const hasDot = trimmedInput.includes('.');
    const startsWithProtocol = /^(https?|ftp):\/\//i.test(trimmedInput);
    const isPotentiallyAUrl = startsWithProtocol || (hasNoSpaces && hasDot);

    if (isPotentiallyAUrl) {
      try {
        let urlToValidate = trimmedInput;
        if (!/^(https?|ftp):\/\//i.test(urlToValidate)) {
          urlToValidate = 'https://' + urlToValidate;
        }
        new URL(urlToValidate);
      } catch (_) {
        setError('Invalid URL format. Please check for typos (e.g., missing ".com" or "://").');
        setQrCodeUrl('');
        setShowQr(false);
        return;
      }
    }

    setError('');
    if (!isThemeChange) {
      setIsLoading(true);
      setShowQr(false);
    }

    const generate = () => {
        const encodedText = encodeURIComponent(trimmedInput);
        const bgColor = isDarkMode ? '1f2937' : 'ffffff';
        const fgColor = qrColor.substring(1);
        const url = `https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodedText}&bgcolor=${bgColor}&color=${fgColor}&qzone=1`;
        
        const img = new Image();
        img.src = url;
        img.onload = () => {
            setQrCodeUrl(url);
            if (!isThemeChange) setIsLoading(false);
            setShowQr(true);
        };
        img.onerror = () => {
            setError('Failed to generate QR code. The input may be too long or the service is unavailable.');
            if (!isThemeChange) setIsLoading(false);
        }
    };
    
    if (isThemeChange) {
      generate();
    } else {
      setTimeout(generate, 500);
    }
  };

  const handleDownload = async () => {
    if (!qrCodeUrl) {
      setError('Generate a QR code first before downloading.');
      return;
    }
    setError('');
    
    try {
        const response = await fetch(qrCodeUrl);
        if (!response.ok) throw new Error(`Network response was not ok: ${response.statusText}`);
        
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        const safeFilename = inputText.replace(/[^a-z0-9]/gi, '_').toLowerCase().slice(0, 20) || 'qrcode';
        link.download = `${safeFilename}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(downloadUrl);
    } catch (e) {
        console.error('Download failed:', e);
        setError('Could not download the QR code. Please try again.');
    }
  };
  
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') handleGenerate();
  };
  
  return (
    <main style={styles.mainContainer}>
      <div style={styles.generatorCard}>
        <button style={styles.themeToggle} onClick={() => setIsDarkMode(!isDarkMode)} aria-label="Toggle theme">
          {isDarkMode ? <SunIcon style={{width: '20px', height: '20px'}} /> : <MoonIcon style={{width: '20px', height: '20px'}} />}
        </button>

        <h1 style={styles.headerTitle}>QR Code Generator</h1>
        <p style={styles.subtitle}>Instantly create and download your custom QR codes.</p>

        <div style={{ marginBottom: '0.5rem' }}>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter URL or text here..."
            style={styles.inputField}
            aria-label="QR Code Input"
          />
        </div>

        <div style={styles.colorPickerWrapper}>
          <label htmlFor="qrColorPicker" style={styles.colorPickerLabel}>
            QR Code Color
          </label>
          <input
            id="qrColorPicker"
            type="color"
            value={qrColor}
            onChange={(e) => setQrColor(e.target.value)}
            style={styles.colorPickerInput}
            aria-label="Choose QR Code Color"
          />
        </div>

        {error && <p style={styles.errorMessage}>{error}</p>}
        
        <div style={{ ...styles.buttonGroup, marginTop: '1rem' }}>
            <button 
                style={{ ...styles.button, ...styles.primaryButton, ...(isLoading && { opacity: 0.7, cursor: 'wait' }) }} 
                onClick={() => handleGenerate()}
                disabled={isLoading}
            >
                <ZapIcon style={{width: '20px', height: '20px'}} />
                {isLoading ? 'Generating...' : 'Generate QR Code'}
            </button>
            <button 
                style={{...styles.button, ...styles.secondaryButton, ...(!qrCodeUrl && { opacity: 0.6, cursor: 'not-allowed' })}}
                onClick={handleDownload}
                disabled={!qrCodeUrl}
            >
                <DownloadIcon style={{width: '20px', height: '20px'}} />
                Download
            </button>
        </div>

        <div style={{ marginTop: '2rem', minHeight: '290px' }}>
            {showQr && qrCodeUrl ? (
                <div style={{ ...styles.qrCodeWrapper, opacity: 1, transform: 'scale(1)' }}>
                    <img src={qrCodeUrl} alt="Generated QR Code" style={styles.qrCodeImage} />
                </div>
            ) : (
                <div>
                    {isLoading ? <LoadingSpinner styles={styles} /> : <QRCodePlaceholder styles={styles} />}
                </div>
            )}
        </div>
      </div>
      <footer style={styles.footer}>
        <p>Powered by React & TypeScript</p>
      </footer>
    </main>
  );
}

export default App;
