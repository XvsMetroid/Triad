document.addEventListener('DOMContentLoaded', async () => {
    console.log('Sovereign Triad Simulator Loaded');

    // --- Load Corpus Data ---
    let corpusData = [];
    try {
        const response = await fetch('../triad_corpus.json');
        corpusData = await response.json();
        console.log('Corpus data loaded successfully.');
    } catch (error) {
        console.error('Error loading corpus data:', error);
    }

    // --- Fractal Architecture ---
    const canvas = document.getElementById('fractal-canvas');
    const ctx = canvas.getContext('2d');
    const fractalLevelSelect = document.getElementById('fractal-level');

    const drawFractal = (level) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';

        const levels = {
            individual: { color: '#1877f2', text: 'Individual' },
            organizational: { color: '#36a420', text: 'Organizational' },
            societal: { color: '#f7b928', text: 'Societal' },
            global: { color: '#d92828', text: 'Global' }
        };

        const selectedLevel = levels[level];

        // Simple representation of a tetrahedron
        const points = [
            { x: canvas.width / 2, y: 50 },
            { x: 50, y: 250 },
            { x: canvas.width - 50, y: 250 },
        ];

        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        ctx.lineTo(points[1].x, points[1].y);
        ctx.lineTo(points[2].x, points[2].y);
        ctx.closePath();
        
        ctx.strokeStyle = selectedLevel.color;
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.fillStyle = '#333';
        ctx.fillText('Truth', points[0].x, points[0].y - 10);
        ctx.fillText('Wisdom', points[1].x - 20, points[1].y + 20);
        ctx.fillText('Humanity', points[2].x + 20, points[2].y + 20);
        
        ctx.fillStyle = selectedLevel.color;
        ctx.font = 'bold 20px Arial';
        ctx.fillText(selectedLevel.text, canvas.width / 2, canvas.height / 2);
    };

    fractalLevelSelect.addEventListener('change', (e) => drawFractal(e.target.value));
    drawFractal(fractalLevelSelect.value); // Initial draw

    // --- Feedback Loop ---
    const stages = ['act', 'measure', 'learn', 'adapt'];
    let currentStage = 0;

    const animateFeedbackLoop = () => {
        stages.forEach(stageId => document.getElementById(stageId).style.backgroundColor = '#e7f3ff');
        
        const activeStage = document.getElementById(stages[currentStage]);
        if (activeStage) {
            activeStage.style.backgroundColor = '#1877f2';
        }
        
        currentStage = (currentStage + 1) % stages.length;
    };

    setInterval(animateFeedbackLoop, 1500);

    // --- Policy Simulation & Scoring ---
    const runButton = document.getElementById('run-simulation');
    const policyEditor = document.getElementById('policy-editor');
    const truthScoreEl = document.getElementById('truth-score');
    const wisdomScoreEl = document.getElementById('wisdom-score');
    const humanityScoreEl = document.getElementById('humanity-score');
    const systemStatusEl = document.getElementById('system-status');
    const alignmentDriftEl = document.getElementById('alignment-drift');
    const examplesContainer = document.getElementById('examples-container');

    const keywords = {
        truth: ['data', 'evidence', 'transparent', 'verifiable', 'fact', 'analysis', 'measure', 'audit'],
        wisdom: ['ethical', 'long-term', 'consequence', 'context', 'balance', 'sustainable', 'holistic', 'foresight'],
        humanity: ['dignity', 'agency', 'flourishing', 'wellbeing', 'rights', 'individual', 'community', 'purpose']
    };

    const calculateScore = (text, principleKeywords) => {
        const words = text.toLowerCase().split(/\s+/);
        let score = 0;
        words.forEach(word => {
            if (principleKeywords.includes(word.replace(/[.,!?;:]/g, ''))) {
                score++;
            }
        });
        // Normalize score to a percentage based on keyword density
        const maxScore = Math.max(1, Math.floor(words.length / 5)); // Assume a decent policy mentions a keyword every 5 words
        return Math.min(100, (score / maxScore) * 100);
    };

    const findExample = (lowestPrinciple) => {
        if (corpusData.length === 0) return 'Corpus not loaded. Cannot provide examples.';
        
        const relevantParagraphs = corpusData.filter(item => 
            item.paragraph.toLowerCase().includes(lowestPrinciple)
        );

        if (relevantParagraphs.length > 0) {
            const randomIndex = Math.floor(Math.random() * relevantParagraphs.length);
            const example = relevantParagraphs[randomIndex];
            return `<strong>From "${example.subsection}":</strong><p>${example.paragraph}</p>`;
        }
        return `No specific examples found for "${lowestPrinciple}". Try to incorporate concepts related to it.`;
    };

    runButton.addEventListener('click', () => {
        const policyText = policyEditor.value;
        if (!policyText.trim()) {
            alert('Please enter a policy scenario.');
            return;
        }

        const truthScore = calculateScore(policyText, keywords.truth);
        const wisdomScore = calculateScore(policyText, keywords.wisdom);
        const humanityScore = calculateScore(policyText, keywords.humanity);
        
        truthScoreEl.textContent = `${truthScore.toFixed(1)}%`;
        wisdomScoreEl.textContent = `${wisdomScore.toFixed(1)}%`;
        humanityScoreEl.textContent = `${humanityScore.toFixed(1)}%`;

        const scores = { truth: truthScore, wisdom: wisdomScore, humanity: humanityScore };
        const lowestPrinciple = Object.keys(scores).reduce((a, b) => scores[a] < scores[b] ? a : b);
        
        examplesContainer.innerHTML = findExample(lowestPrinciple);

        const averageScore = (truthScore + wisdomScore + humanityScore) / 3;
        const drift = (100 - averageScore).toFixed(1);

        alignmentDriftEl.textContent = `${drift}%`;

        if (averageScore < 50) {
            systemStatusEl.textContent = 'Critical';
            systemStatusEl.style.color = '#d92828';
        } else if (averageScore < 80) {
            systemStatusEl.textContent = 'Warning';
            systemStatusEl.style.color = '#f7b928';
        } else {
            systemStatusEl.textContent = 'Nominal';
            systemStatusEl.style.color = '#36a420';
        }
    });
});
