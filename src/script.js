const audioElement = new Audio('mozartOP.mp3');
audioElement.src = "./src/assets/mozartOP.mp3"
audioElement.controls = true; // Show audio controls for easier playback control
document.body.appendChild(audioElement);

let audioContext;
let analyser;
let source;

const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
canvas.width = window.innerWidth / 2;
canvas.height = window.innerHeight / 2;

const canvasCtx = canvas.getContext('2d');
let c = 0;

function visualize() {
    const freqArray = new Uint8Array(analyser.frequencyBinCount);
    // Now, `dataArray` contains the frequency data.
    // You can perform FFT on this data for further analysis.

    analyser.getByteFrequencyData(freqArray);

    // Visualize the data (e.g., draw a bar graph)
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    const barWidth = (canvas.width / freqArray.length) * 2.5;
    let x = 0;

    freqArray.forEach(value => {
        const barHeight = (value / 255) * canvas.height;
        canvasCtx.fillStyle = `rgb(50, 50, ${value})`;
        canvasCtx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth + 1;
    });
    // Call requestAnimationFrame to visualize the next frame
    requestAnimationFrame(visualize);
}

audioElement.addEventListener("play", () => {
    console.log("now playing...")
    if (!audioContext) {

        audioContext = new window.AudioContext;
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 256; // Adjust FFT size as needed for your application

        console.log(analyser)
        source = audioContext.createMediaElementSource(audioElement);
        source.connect(analyser);
        analyser.connect(audioContext.destination);

        visualize();
    } else visualize();
})