# CF-Overlay

## Codeforces Overlay for Streamers

## Description

**CF-Overlay** is a a lightweight browser-based overlay for streaming competitive programming on Codeforces.

It displays real-time submission events such as:

* ✅ Accepted
* ❌ Wrong Answer
* ⏱️ Time Limit Exceeded
* 💥 Runtime Error
* ⚠️ Compilation Error

Perfect for live coding streams, contests, or educational content.

## Contents

* [Descriptioin](#description)
* [Disclaimer](#disclaimer)
* [How to Use](#how-to-use)
* [Development](#-development)
* [Notes](#notes)
* [License](#license)

## Disclaimer

Not affiliated with Codeforces. Use at your own risk.

This project is not affiliated with or endorsed by Codeforces.

This software is provided "as is", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and noninfringement.

In no event shall the authors be liable for any claim, damages, or other liability arising from the use of this software.

## How to Use

### 1. Add overlay to your streaming software

Add a **Browser Source** with the following URL:

<https://erekleroinishvili.github.io/cf-overlay/>

### 2. Obtain your Codeforces WebSocket address

You need your personal WebSocket connection from Codeforces.

#### Steps

1. Open a separate browser (not inside your streaming software)
2. Log in to your Codeforces account
3. Open **DevTools → Network tab**
4. Filter by **"Socket"**
5. Look for connections and hover over them to see full URLs
6. Find one that starts with: `wss://pubsub.codeforces.com/ws/`
   * Example: `
wss://pubsub.codeforces.com/ws/z7t932sd932f89s32/57b721pq832/u1zuewo2324?_=8539823913283&tag=&time=&eventid=`

⚠️ **Important:**
Do NOT share this address with anyone.

### 3. Enter the WebSocket URL

When you first open the overlay, you will see an input field.

Enter your WebSocket URL and press **Go**.

### 4. Entering input inside streaming software

If you're using OBS Studio, you have two options:

#### Option 1: Interact with Browser Source

* Right-click the browser source
* Select **"Interact"**
* Enter the WebSocket URL

#### Option 2: Use OBS Docks

* Open **Docks → Custom Browser Docks**
* Load the overlay page
* Enter the URL there

## 🛠 Development

### Clone the repository

```bash
git clone https://github.com/erekleroinishvili/cf-overlay
cd cf-overlay
npm install
```

### Run in development mode

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

## Notes

* The overlay runs entirely in the browser
* Works with any streaming software supporting browser sources
* Uses real-time WebSocket events from Codeforces
* Designed to be lightweight and low-latency

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
