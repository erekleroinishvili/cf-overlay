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

## Home

* <https://github.com/erekleroinishvili/cf-overlay>

## Demo

* <https://erekleroinishvili.github.io/cf-overlay/demo.html>
* <https://erekle.uk/cf-overlay/demo.html>

**Note:** See [Testing](#testing) for more info.

## Contents

* [Descriptioin](#description)
* [Disclaimer](#disclaimer)
* [How to Use](#how-to-use)
* [Changing User](#changing-user)
* [Testing](testing)
* [Development](#-development)
* [Notes](#notes)
* [License](#license)

## Disclaimer

<details>
   <summary>Show disclaimer</summary>

   Not affiliated with Codeforces. Use at your own risk.

   This project is not affiliated with or endorsed by Codeforces.

   The project depends on undocumented features of Codeforces and may become unavailable or stop functioning without warning.

   This software is provided "as is", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and noninfringement.

   In no event shall the authors be liable for any claim, damages, or other liability arising from the use of this software.
</details>

## How to Use

### 1. Add overlay to your streaming software

Add a **Browser Source** with one of the following URLs:

* <https://erekleroinishvili.github.io/cf-overlay/>
* <https://erekle.uk/cf-overlay/>

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

Enter your WebSocket URL and press **Go**. The URL will be stored in the browsers `Local Storage` and will be made available automatically next time.

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

## Changing User

The WebSocket URL is what connects the overlay to your Codeforces session. This URL is stored in your browser’s `localStorage`.

To switch to a different user, you need to remove this stored value.

### Steps to Remove the Stored WebSocket URL

1. Open your browser’s **DevTools**
2. Go to the **Application** tab  
3. Expand **Local Storage** in the sidebar  
4. Select the current site (URL will be listed)  
5. Find the stored WebSocket entry  
6. Right-click it and select **Delete**

After refreshing the page, you will be prompted to enter a new WebSocket URL.

## Testing

### Testing with Codeforces (Recommended)

The most reliable way to test the overlay is in a real-life scenario by submitting problems on Codeforces and observing the overlay inside your streaming software.

See [How to Use](#how-to-use) for setup instructions.

You can also open the overlay in a regular browser, but note that its behavior may differ from a streaming software browser source. In particular, audio playback may be blocked until the user interacts with the page.

### Testing without Codeforces (Simulation)

This method is intended for demonstration rather than full testing. It does not connect to Codeforces or verify the actual WebSocket connection. Instead, it allows you to manually trigger events and observe how the overlay responds.

There are two ways to simulate events:

1. [Split-Screen](#split-screen-simulation) — simple setup  
2. [Separate Browser Tabs](#separate-browser-tabs-simulation) — more realistic  

#### Split-Screen Simulation

Open the split-screen demo:

* <https://erekleroinishvili.github.io/cf-overlay/demo.html>  
* <https://erekle.uk/cf-overlay/demo.html>  

Use the buttons to trigger events and observe the overlay behavior.

#### Separate Browser Tabs Simulation

Open both the **Overlay** and the **Trigger Demon** (a page with buttons that simulate events).

⚠️ Both pages must be:

* opened from the same domain
* in the same browser (e.g. Chrome)

You can open multiple instances of either page — they will communicate with each other.

* [Overlay](https://erekleroinishvili.github.io/cf-overlay/) ↔
  [Trigger Demon](https://erekleroinishvili.github.io/cf-overlay/demon.html)
* [Overlay](https://erekle.uk/cf-overlay/) ↔
  [Trigger Demon](https://erekle.uk/cf-overlay/demon.html)

### 🔊 Audio Note

Browsers may block audio playback until the user interacts with the page.

* In a browser: click anywhere in the overlay tab  
* In streaming software: interaction may require using the browser source “Interact” feature  

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
* Uses undocumented real-time WebSocket events from Codeforces
* Designed to be lightweight and low-latency

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
