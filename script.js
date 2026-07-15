/**
 * IndiBreed AI - Main UI & Interaction Controller
 * Created by: Abishek BV
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- UI Elements ---
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const imagePreview = document.getElementById('imagePreview');
    const dropZoneContent = document.getElementById('dropZoneContent');
    
    const resultPlaceholder = document.getElementById('resultPlaceholder');
    const analysisLoader = document.getElementById('analysisLoader');
    const actualResults = document.getElementById('actualResults');
    
    const breedResultName = document.getElementById('breedResultName');
    const confidenceValue = document.getElementById('confidenceValue');
    const progressFill = document.getElementById('progressFill');
    const breedTraits = document.getElementById('breedTraits');
    const resetBtn = document.getElementById('resetBtn');

    // --- Mock Indigenous Breed Database ---
    // Simulates dynamic backend predictions for Indian Cattle & Buffaloes
    const mockBreedDatabase = [
        {
            name: "Gir Cattle",
            confidence: "97.4%",
            width: 97.4,
            traits: [
                "<strong>Origin:</strong> Gir hills and forests of Kathiawar, Gujarat.",
                "<strong>Trait:</strong> Renowned for its tolerance to stress, extreme heat, and tropical diseases.",
                "<strong>Feature:</strong> Prominent dome-shaped forehead, long pendulous ears hanging down like a folded leaf."
            ]
        },
        {
            name: "Murrah Buffalo",
            confidence: "98.9%",
            width: 98.9,
            traits: [
                "<strong>Origin:</strong> Rohtak, Hisar, and Jind districts of Haryana.",
                "<strong>Trait:</strong> The premier milk-producing buffalo breed in the world ('Black Gold').",
                "<strong>Feature:</strong> Jet-black tightly curled horns, short tightly curved structure, and highly responsive temperament."
            ]
        },
        {
            name: "Sahiwal Cattle",
            confidence: "95.6%",
            width: 95.6,
            traits: [
                "<strong>Origin:</strong> Montgomery region (now Pakistan/Punjab border region of India).",
                "<strong>Trait:</strong> One of the best dairy breeds in India; highly lethargic and heat resistant.",
                "<strong>Feature:</strong> Reddish-dun color, loose skin, massive hump, and heavy dewlap."
            ]
        },
        {
            name: "Jafarabadi Buffalo",
            confidence: "94.2%",
            width: 94.2,
            traits: [
                "<strong>Origin:</strong> Saurashtra region of Gujarat.",
                "<strong>Trait:</strong> Exceptionally heavy breed known for high butterfat content in milk.",
                "<strong>Feature:</strong> Drooping flat horns running down the sides of the neck, massive head structure."
            ]
        }
    ];

    // --- Event Listeners for File Selection ---
    
    // Clicking the drop zone triggers hidden file input
    dropZone.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length) {
            processImage(e.target.files[0]);
        }
    });

    // --- Drag and Drop Logic ---
    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, (e) => {
            e.preventDefault();
            dropZone.classList.add('drag-over');
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, (e) => {
            e.preventDefault();
            dropZone.classList.remove('drag-over');
        }, false);
    });

    dropZone.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;
        if (files.length) {
            processImage(files[0]);
        }
    });

    // --- Image Processing & Core AI Animation Cycle ---
    function processImage(file) {
        // Validate that it's an image file
        if (!file.type.startsWith('image/')) {
            alert('Please upload a valid image file.');
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            // Update preview image
            imagePreview.src = reader.result;
            imagePreview.hidden = false;
            dropZoneContent.style.opacity = '0'; // Soft hide the upload prompts

            // Trigger visual "laser beam scan" animation layout
            dropZone.classList.add('scanning');

            // Switch result panel to dynamic loader state
            resultPlaceholder.style.display = 'none';
            actualResults.style.display = 'none';
            analysisLoader.hidden = false;

            // Simulate deep learning model latency delay
            setTimeout(() => {
                // End laser scan animation loop
                dropZone.classList.remove('scanning');
                analysisLoader.hidden = true;

                // Pick a random breed object to display for interactive display demonstration
                const randomBreed = mockBreedDatabase[Math.floor(Math.random() * mockBreedDatabase.length)];
                renderResults(randomBreed);
            }, 2500); // 2.5 seconds of simulated parsing time
        };
    }

    // --- Render Results to UI ---
    function renderResults(breed) {
        breedResultName.textContent = breed.name;
        confidenceValue.textContent = breed.confidence;
        
        // Populate the dynamic traits array
        breedTraits.innerHTML = '';
        breed.traits.forEach(trait => {
            const li = document.createElement('li');
            li.innerHTML = trait;
            breedTraits.appendChild(li);
        });

        // Show the result container element
        actualResults.hidden = false;
        actualResults.style.display = 'flex';

        // Trigger dynamic width change to trigger CSS transitional progress bar animation
        setTimeout(() => {
            progressFill.style.width = `${breed.width}%`;
        }, 100);
    }

    // --- Reset System Session ---
    resetBtn.addEventListener('click', () => {
        // Clear inputs and images
        fileInput.value = '';
        imagePreview.src = '';
        imagePreview.hidden = true;
        dropZoneContent.style.opacity = '1';

        // Animate structures back to base placeholder states
        progressFill.style.width = '0%';
        actualResults.style.display = 'none';
        actualResults.hidden = true;
        
        resultPlaceholder.style.display = 'flex';
    });
});