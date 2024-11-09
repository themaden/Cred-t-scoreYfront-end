import React, { useState } from 'react';

const ConnectWallet = () => {
  const [walletAddress, setWalletAddress] = useState('');

  const connectWallet = async (walletAddress) => {
    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ walletAddress }),
      });
      const userData = await response.json();
      // Kullanıcı verilerini state'e kaydedin
    } catch (error) {
      console.error('Cüzdan bağlantı hatası:', error);
    }
  };

  const handleConnect = () => {
    // Burada cüzdan adresini alıp connectWallet fonksiyonunu çağırabilirsiniz
    const address = '0xYourWalletAddress'; // Örnek cüzdan adresi
    setWalletAddress(address);
    connectWallet(address);
  };

  return (
    <div>
      <button onClick={handleConnect}>Cüzdanı Bağla</button>
    </div>
  );
};

export default ConnectWallet;
