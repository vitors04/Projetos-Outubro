function calculate() {
    const hourlyRate = 
    parseFloat(document.getElementById('hourlyRate').value) || 0;
    const days = [
        { in: 'monIn', out: 'monOut' },
        { in: 'tueIn', out: 'tueOut' },
        { in: 'wedIn', out: 'wedOut' },
        { in: 'thuIn', out: 'thuOut' },
        { in: 'friIn', out: 'friOut' },
    ];
    let totalHours = 0;
    let dailyEarnings = 0; // Contém o ganho do último dia válido no loop
    let weeklyEarnings = 0;
    
    days.forEach(day => {
        const inTime = document.getElementById(day.in).value;
        const outTime = document.getElementById(day.out).value;
        
        if (inTime && outTime) {
            // A data 1970-01-01 é usada como base, o que é um método padrão para cálculos de tempo
            const inDate = new Date(`1970-01-01 ${inTime}`);
            const outDate = new Date(`1970-01-01 ${outTime}`);
            
            // Verifica se o tempo de saída é maior que o de entrada (assumindo que não há jornada noturna que cruza a meia-noite)
            if (outDate > inDate) {
                // Cálculo das horas em um formato de número decimal
                const hours = (outDate - inDate) / (1000 * 60 * 60);
                totalHours += hours;
                
                const dailyEarn = hours * hourlyRate;
                dailyEarnings = dailyEarn; // Sobrescreve a cada dia (o que é o motivo da ressalva)
                weeklyEarnings += dailyEarn;
            }
        }
    });

    // Atualiza os elementos de resultado
    document.getElementById('totalHours').
    textContent = totalHours.toFixed(1);
    document.getElementById('dailyTotal').
    textContent = `R$ ${dailyEarnings.toFixed(2)}`;
    document.getElementById('weeklyTotal').
    textContent = `R$ ${weeklyEarnings.toFixed(2)}`;
} // Fechamento correto da função calculate()

// Configura os listeners de evento para recalcular automaticamente
document.getElementById('hourlyRate').addEventListener
('input', calculate);
['monIn', 'monOut', 'tueIn', 'tueOut', 'wedIn', 'wedOut', 
    'thuIn', 'thuOut', 'friIn', 'friOut'].forEach(id => {
    document.getElementById(id).addEventListener('change', calculate);
});

// Executa o cálculo na carga da página (ou após a configuração dos listeners)
calculate();