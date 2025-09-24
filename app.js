// Sovereign Triad Interactive Simulator
// Main application logic

class TriadSimulator {
    constructor() {
        this.currentSection = 'overview';
        this.currentStage = 'act';
        this.iterationCount = 1;
        this.currentScenario = 'climate';
        this.feedbackData = {
            policies: [],
            metrics: [],
            insights: [],
            adaptations: []
        };
        
        this.scenarios = {
            climate: {
                title: "Climate Crisis Response",
                description: "Global temperatures are rising, and immediate action is needed. Design policies that balance environmental protection with economic stability and social equity.",
                challenges: ["Carbon reduction", "Just transition", "International cooperation", "Economic impact"],
                samplePolicy: "Implement carbon pricing mechanism with revenue recycling to support affected communities and green technology investments."
            },
            inequality: {
                title: "Economic Inequality",
                description: "Wealth disparity is increasing, threatening social cohesion. Create policies that promote inclusive growth while maintaining economic dynamism.",
                challenges: ["Wealth redistribution", "Opportunity access", "Skills development", "Social mobility"],
                samplePolicy: "Establish universal basic services combined with progressive taxation and education reform to ensure equal opportunity."
            },
            ai: {
                title: "AI Governance",
                description: "Artificial intelligence is rapidly advancing, requiring governance frameworks that ensure benefits while minimizing risks.",
                challenges: ["AI safety", "Job displacement", "Privacy protection", "Democratic oversight"],
                samplePolicy: "Create AI Ethics Board with mandatory impact assessments for high-risk AI systems and worker transition support programs."
            },
            healthcare: {
                title: "Healthcare Reform",
                description: "Healthcare costs are rising while outcomes vary significantly. Design a system that ensures universal access while controlling costs.",
                challenges: ["Universal access", "Cost control", "Quality improvement", "Innovation incentives"],
                samplePolicy: "Implement single-payer system with competitive provider networks and outcome-based payment models."
            }
        };

        this.initializeApp();
    }

    initializeApp() {
        this.setupNavigation();
        this.setupFeedbackLoop();
        this.setupScenarios();
        this.setupMetaMonitor();
        this.updatePrincipleScores();
        this.renderDriftChart();
    }

    setupNavigation() {
        const navButtons = document.querySelectorAll('.nav-btn');
        navButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const section = e.target.dataset.section;
                this.switchSection(section);
            });
        });
    }

    switchSection(sectionName) {
        // Update navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');

        // Update sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionName).classList.add('active');

        this.currentSection = sectionName;

        // Initialize section-specific functionality
        if (sectionName === 'fractal') {
            this.setupFractalInteraction();
        } else if (sectionName === 'scenarios') {
            this.loadScenario(this.currentScenario);
        }
    }

    setupFractalInteraction() {
        const fractalLevels = document.querySelectorAll('.fractal-level');
        fractalLevels.forEach(level => {
            level.addEventListener('click', () => {
                // Add click interaction for fractal levels
                level.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    level.style.transform = 'scale(1)';
                }, 200);
            });
        });
    }

    setupFeedbackLoop() {
        // Initialize feedback loop with sample data
        this.loadSampleMetrics();
        this.loadSampleInsights();
    }

    nextStage(stage) {
        const stages = ['act', 'measure', 'learn', 'adapt'];
        const currentIndex = stages.indexOf(this.currentStage);
        const nextIndex = stages.indexOf(stage);

        // Update active stage
        document.querySelectorAll('.feedback-stage').forEach(s => s.classList.remove('active'));
        document.querySelector(`[data-stage="${stage}"]`).classList.add('active');
        
        this.currentStage = stage;

        // Update progress bar
        const progress = ((nextIndex + 1) / stages.length) * 100;
        document.getElementById('loop-progress').style.width = `${progress}%`;

        // Handle stage-specific logic
        if (stage === 'measure') {
            this.generateMetrics();
        } else if (stage === 'learn') {
            this.generateInsights();
        } else if (stage === 'adapt') {
            this.showAdaptationSuggestions();
        }
    }

    generateMetrics() {
        const metricsContainer = document.getElementById('metrics-display');
        const metrics = [
            { label: 'Participant Satisfaction', value: '78%', trend: 'up' },
            { label: 'Economic Impact', value: '+$2.3M', trend: 'up' },
            { label: 'Administrative Cost', value: '$450K', trend: 'neutral' },
            { label: 'Implementation Time', value: '6 months', trend: 'down' },
            { label: 'Coverage Rate', value: '92%', trend: 'up' },
            { label: 'Error Rate', value: '3.2%', trend: 'down' }
        ];

        metricsContainer.innerHTML = metrics.map(metric => `
            <div class="metric-item">
                <div class="metric-value">${metric.value}</div>
                <div class="metric-label">${metric.label}</div>
            </div>
        `).join('');
    }

    generateInsights() {
        const insightsContainer = document.getElementById('insights-display');
        const insights = [
            "High satisfaction scores correlate with simplified application process",
            "Rural participants show 15% better outcomes than urban counterparts",
            "Administrative costs are 23% higher than projected due to manual verification",
            "Implementation timeline exceeded expectations by 2 months",
            "Geographic clustering of non-participants suggests access barriers"
        ];

        insightsContainer.innerHTML = insights.map(insight => `
            <div class="insight-item">
                <i class="fas fa-lightbulb"></i> ${insight}
            </div>
        `).join('');
    }

    showAdaptationSuggestions() {
        const adaptInput = document.getElementById('adapt-input');
        adaptInput.value = "Based on insights:\n• Automate verification process to reduce costs\n• Expand rural outreach programs\n• Simplify urban enrollment procedures\n• Add targeted support for geographic clusters with low participation";
    }

    restartLoop() {
        this.iterationCount++;
        document.getElementById('iteration-count').textContent = this.iterationCount;
        
        // Reset to Act stage
        this.nextStage('act');
        
        // Clear previous inputs
        document.getElementById('act-input').value = '';
        document.getElementById('adapt-input').value = '';
    }

    loadSampleMetrics() {
        // This would be called when entering the measure stage
        // Implementation already in generateMetrics()
    }

    loadSampleInsights() {
        // This would be called when entering the learn stage
        // Implementation already in generateInsights()
    }

    setupScenarios() {
        const scenarioButtons = document.querySelectorAll('.scenario-btn');
        scenarioButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const scenario = e.target.dataset.scenario;
                this.switchScenario(scenario);
            });
        });

        // Load initial scenario
        this.loadScenario(this.currentScenario);
    }

    switchScenario(scenarioName) {
        // Update button states
        document.querySelectorAll('.scenario-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-scenario="${scenarioName}"]`).classList.add('active');

        this.currentScenario = scenarioName;
        this.loadScenario(scenarioName);
    }

    loadScenario(scenarioName) {
        const scenario = this.scenarios[scenarioName];
        const descriptionContainer = document.getElementById('scenario-description');
        const policyText = document.getElementById('policy-text');

        descriptionContainer.innerHTML = `
            <h3>${scenario.title}</h3>
            <p>${scenario.description}</p>
            <div class="challenges">
                <h4>Key Challenges:</h4>
                <ul>
                    ${scenario.challenges.map(challenge => `<li>${challenge}</li>`).join('')}
                </ul>
            </div>
        `;

        policyText.value = scenario.samplePolicy;
    }

    analyzePolicy() {
        const policyText = document.getElementById('policy-text').value;
        if (!policyText.trim()) {
            alert('Please enter a policy proposal to analyze.');
            return;
        }

        const analysis = this.performPolicyAnalysis(policyText);
        this.displayAlignmentResults(analysis);
    }

    performPolicyAnalysis(policyText) {
        // Simplified analysis based on keywords and structure
        const truthScore = this.analyzeTruth(policyText);
        const wisdomScore = this.analyzeWisdom(policyText);
        const humanityScore = this.analyzeHumanity(policyText);

        return {
            truth: truthScore,
            wisdom: wisdomScore,
            humanity: humanityScore,
            overall: Math.round((truthScore + wisdomScore + humanityScore) / 3),
            recommendations: this.generateRecommendations(truthScore, wisdomScore, humanityScore)
        };
    }

    analyzeTruth(text) {
        const truthKeywords = ['data', 'evidence', 'research', 'measure', 'track', 'monitor', 'assess', 'evaluate', 'transparent', 'report'];
        const words = text.toLowerCase().split(/\s+/);
        const matches = words.filter(word => truthKeywords.some(keyword => word.includes(keyword)));
        return Math.min(90, Math.max(30, 50 + (matches.length * 8)));
    }

    analyzeWisdom(text) {
        const wisdomKeywords = ['long-term', 'sustainable', 'future', 'generations', 'strategic', 'balance', 'consider', 'ethical', 'consequences', 'stakeholders'];
        const words = text.toLowerCase().split(/\s+/);
        const matches = words.filter(word => wisdomKeywords.some(keyword => word.includes(keyword)));
        return Math.min(90, Math.max(30, 45 + (matches.length * 9)));
    }

    analyzeHumanity(text) {
        const humanityKeywords = ['people', 'communities', 'dignity', 'rights', 'welfare', 'wellbeing', 'support', 'inclusive', 'equitable', 'fair', 'justice'];
        const words = text.toLowerCase().split(/\s+/);
        const matches = words.filter(word => humanityKeywords.some(keyword => word.includes(keyword)));
        return Math.min(90, Math.max(30, 55 + (matches.length * 7)));
    }

    generateRecommendations(truth, wisdom, humanity) {
        const recommendations = [];
        
        if (truth < 60) {
            recommendations.push("Add more specific metrics and data collection mechanisms");
        }
        if (wisdom < 60) {
            recommendations.push("Consider long-term consequences and stakeholder impacts");
        }
        if (humanity < 60) {
            recommendations.push("Strengthen protections for human dignity and rights");
        }
        
        return recommendations;
    }

    displayAlignmentResults(analysis) {
        const resultsContainer = document.getElementById('alignment-results');
        
        resultsContainer.innerHTML = `
            <h3>Policy Alignment Analysis</h3>
            <div class="alignment-grid">
                <div class="alignment-item">
                    <div class="alignment-score ${this.getScoreClass(analysis.truth)}">${analysis.truth}%</div>
                    <div class="alignment-label">Truth</div>
                </div>
                <div class="alignment-item">
                    <div class="alignment-score ${this.getScoreClass(analysis.wisdom)}">${analysis.wisdom}%</div>
                    <div class="alignment-label">Wisdom</div>
                </div>
                <div class="alignment-item">
                    <div class="alignment-score ${this.getScoreClass(analysis.humanity)}">${analysis.humanity}%</div>
                    <div class="alignment-label">Humanity</div>
                </div>
                <div class="alignment-item">
                    <div class="alignment-score ${this.getScoreClass(analysis.overall)}">${analysis.overall}%</div>
                    <div class="alignment-label">Overall</div>
                </div>
            </div>
            ${analysis.recommendations.length > 0 ? `
                <div class="recommendations">
                    <h4>Recommendations for Improvement:</h4>
                    <ul>
                        ${analysis.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
        `;
    }

    getScoreClass(score) {
        if (score >= 75) return 'high';
        if (score >= 50) return 'medium';
        return 'low';
    }

    setupMetaMonitor() {
        // Initialize monitor dashboard with real-time updates
        this.updateMonitorMetrics();
        
        // Set up periodic updates (every 30 seconds in a real system)
        setInterval(() => {
            this.updateMonitorMetrics();
        }, 30000);
    }

    updateMonitorMetrics() {
        // Simulate real-time metric updates
        const metrics = {
            transparency: 88 + Math.random() * 8 - 4,
            corruption: 15 + Math.random() * 10 - 5,
            adaptation: 92 + Math.random() * 6 - 3
        };

        // Update DOM elements if they exist
        const indicators = document.querySelectorAll('.indicator-fill');
        if (indicators.length > 0) {
            indicators[0].style.width = `${Math.max(0, Math.min(100, metrics.transparency))}%`;
            indicators[1].style.width = `${Math.max(0, Math.min(100, metrics.corruption))}%`;
            indicators[2].style.width = `${Math.max(0, Math.min(100, metrics.adaptation))}%`;
        }
    }

    renderDriftChart() {
        const chartContainer = document.getElementById('drift-chart');
        if (chartContainer) {
            chartContainer.innerHTML = `
                <div style="text-align: center;">
                    <i class="fas fa-chart-area" style="font-size: 2rem; color: #667eea; margin-bottom: 0.5rem;"></i>
                    <div>Principle drift trends over time</div>
                    <div style="font-size: 0.8em; color: #718096;">Interactive chart would display historical data</div>
                </div>
            `;
        }
    }

    updatePrincipleScores() {
        // Simulate dynamic principle scores
        const scores = {
            truth: 85,
            wisdom: 72,
            humanity: 90
        };

        // Update score displays
        Object.keys(scores).forEach(principle => {
            const fillElement = document.querySelector(`[data-principle="${principle}"]`);
            if (fillElement) {
                fillElement.style.width = `${scores[principle]}%`;
            }
        });

        // Update overall alignment gauge
        const overall = Math.round((scores.truth + scores.wisdom + scores.humanity) / 3);
        const gaugeFill = document.querySelector('.gauge-fill');
        if (gaugeFill) {
            const rotation = (overall / 100) * 180; // 0 to 180 degrees
            gaugeFill.style.transform = `rotate(${rotation}deg)`;
        }

        const gaugeScore = document.querySelector('.gauge-score');
        if (gaugeScore) {
            gaugeScore.textContent = `${overall}%`;
        }
    }
}

// Global functions for HTML onclick events
function nextStage(stage) {
    window.triadSimulator.nextStage(stage);
}

function restartLoop() {
    window.triadSimulator.restartLoop();
}

function analyzePolicy() {
    window.triadSimulator.analyzePolicy();
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.triadSimulator = new TriadSimulator();
    
    // Add some interactive animations
    const cards = document.querySelectorAll('.principle-card, .fractal-level, .monitor-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-4px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add typing effect for hero title
    const heroTitle = document.querySelector('.hero h2');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        setTimeout(typeWriter, 500);
    }
});

// Add smooth scrolling for better UX
document.documentElement.style.scrollBehavior = 'smooth';

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
        const keyMap = {
            '1': 'overview',
            '2': 'fractal', 
            '3': 'feedback',
            '4': 'scenarios',
            '5': 'monitor'
        };
        
        if (keyMap[e.key]) {
            e.preventDefault();
            window.triadSimulator.switchSection(keyMap[e.key]);
        }
    }
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TriadSimulator;
}