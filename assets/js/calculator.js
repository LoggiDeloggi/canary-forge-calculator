// This file contains the JavaScript code for the functionality of the chance calculator.

let chart = null;

// Presets
const presets = {
    ruse: {
        a: 0.0307576,
        b: 1.440697,
        c: 0.026
    },
    onslaught: {
        a: 0.05,
        b: 1.7,
        c: 0.05
    },
    momentum: {
        a: 0.05,
        b: 1.9,
        c: 0.05
    },
    transcendance: {
        a: 0.0127,
        b: 1.0271,
        c: 0.0073
    }
};

function loadPreset(presetName) {
    const preset = presets[presetName];
    if (preset) {
        document.getElementById('coefA').value = preset.a;
        document.getElementById('coefB').value = preset.b;
        document.getElementById('coefC').value = preset.c;
        calcularChance();
        gerarTabelaTiers();
    }
}

// Function to calculate the chance
function quadraticPoly(a, b, c, tier) {
    return a * tier * tier + b * tier + c;
}

function calcularChance() {
    const a = parseFloat(document.getElementById('coefA').value);
    const b = parseFloat(document.getElementById('coefB').value);
    const c = parseFloat(document.getElementById('coefC').value);
    const tier = parseInt(document.getElementById('tier').value);
    
    if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(tier) || tier < 1 || tier > 10) {
        document.getElementById('chanceResult').innerHTML = "Valores inválidos. Verifique os campos.";
        return;
    }
    
    const chance = quadraticPoly(a, b, c, tier);
    document.getElementById('chanceResult').innerHTML = `Chance para Tier ${tier}: ${chance.toFixed(2)}%`;
    
    // Update chart
    criarGrafico(a, b, c);
}

function gerarTabelaTiers() {
    const a = parseFloat(document.getElementById('coefA').value);
    const b = parseFloat(document.getElementById('coefB').value);
    const c = parseFloat(document.getElementById('coefC').value);
    
    if (isNaN(a) || isNaN(b) || isNaN(c)) {
        document.getElementById('tierTableBody').innerHTML = "<tr><td colspan='2'>Valores inválidos</td></tr>";
        return;
    }
    
    let tableHtml = '';
    
    for (let tier = 1; tier <= 10; tier++) {
        const chance = quadraticPoly(a, b, c, tier);
        tableHtml += `<tr><td>${tier}</td><td>${chance.toFixed(2)}%</td></tr>`;
    }
    
    document.getElementById('tierTableBody').innerHTML = tableHtml;
}

function criarGrafico(a, b, c) {
    const ctx = document.getElementById('chanceChart').getContext('2d');
    
    // Data for the chart
    const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const data = labels.map(tier => quadraticPoly(a, b, c, tier));
    
    // Destroy existing chart if there is one
    if (chart) {
        chart.destroy();
    }
    
    // Create new chart
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Chance por Tier (%)',
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Chance (%)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Tier'
                    }
                }
            }
        }
    });
}

// Function to solve the system of equations and find coefficients A, B, C
function calcularCoeficientes() {
    const tier1 = parseInt(document.getElementById('tier1').value);
    const tier2 = parseInt(document.getElementById('tier2').value);
    const tier3 = parseInt(document.getElementById('tier3').value);
    
    const chance1 = parseFloat(document.getElementById('chance1').value);
    const chance2 = parseFloat(document.getElementById('chance2').value);
    const chance3 = parseFloat(document.getElementById('chance3').value);
    
    // Basic validation
    if (isNaN(tier1) || isNaN(tier2) || isNaN(tier3) || 
        isNaN(chance1) || isNaN(chance2) || isNaN(chance3) || 
        tier1 < 1 || tier2 < 1 || tier3 < 1 ||
        tier1 > 10 || tier2 > 10 || tier3 > 10) {
        document.getElementById('coefResult').innerHTML = "Valores inválidos. Verifique os campos.";
        return;
    }
    
    // Check for repeated tiers
    if (tier1 === tier2 || tier1 === tier3 || tier2 === tier3) {
        document.getElementById('coefResult').innerHTML = "Os tiers devem ser diferentes.";
        return;
    }
    
    // Set up the matrix
    const matrix = [
        [tier1*tier1, tier1, 1],
        [tier2*tier2, tier2, 1],
        [tier3*tier3, tier3, 1]
    ];
    
    const vector = [chance1, chance2, chance3];
    
    // Solve the system using Gaussian elimination
    const n = 3;
    
    for (let i = 0; i < n; i++) {
        // Find the pivot
        let maxEl = Math.abs(matrix[i][i]);
        let maxRow = i;
        
        for (let k = i + 1; k < n; k++) {
            if (Math.abs(matrix[k][i]) > maxEl) {
                maxEl = Math.abs(matrix[k][i]);
                maxRow = k;
            }
        }
        
        // Swap rows if necessary
        if (maxRow !== i) {
            for (let k = i; k < n; k++) {
                const tmp = matrix[i][k];
                matrix[i][k] = matrix[maxRow][k];
                matrix[maxRow][k] = tmp;
            }
            const tmp = vector[i];
            vector[i] = vector[maxRow];
            vector[maxRow] = tmp;
        }
        
        // Eliminate values below the pivot
        for (let k = i + 1; k < n; k++) {
            const factor = -matrix[k][i] / matrix[i][i];
            for (let j = i; j < n; j++) {
                if (i === j) {
                    matrix[k][j] = 0;
                } else {
                    matrix[k][j] += factor * matrix[i][j];
                }
            }
            vector[k] += factor * vector[i];
        }
    }
    
    // Solve the upper triangular system
    const coef = new Array(n);
    
    for (let i = n - 1; i >= 0; i--) {
        coef[i] = vector[i];
        for (let j = i + 1; j < n; j++) {
            coef[i] -= matrix[i][j] * coef[j];
        }
        coef[i] /= matrix[i][i];
    }
    
    // Display results
    const resultHtml = `
        <p>Coeficiente A: ${coef[0].toFixed(7)}</p>
        <p>Coeficiente B: ${coef[1].toFixed(7)}</p>
        <p>Coeficiente C: ${coef[2].toFixed(7)}</p>
        <pre>
ruseChanceFormulaA = ${coef[0].toFixed(7)}
ruseChanceFormulaB = ${coef[1].toFixed(7)}
ruseChanceFormulaC = ${coef[2].toFixed(7)}
        </pre>
    `;
    document.getElementById('coefResult').innerHTML = resultHtml;
    
    // Fill values in the first calculator
    document.getElementById('coefA').value = coef[0].toFixed(7);
    document.getElementById('coefB').value = coef[1].toFixed(7);
    document.getElementById('coefC').value = coef[2].toFixed(7);
    
    // Update table and chart
    calcularChance();
    gerarTabelaTiers();
}

// Initialize with default values
window.onload = () => {
    loadPreset('ruse');
    gerarTabelaTiers();
};