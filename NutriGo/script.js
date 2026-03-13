function calcularPlan() {
  const peso = document.getElementById('peso').value;
  const altura = document.getElementById('altura').value;
  const objetivo = document.getElementById('objetivo').value;

  if (!peso || !altura) {
    document.getElementById('resultado').innerText = 'Completa todos los campos';
    return;
  }

  let plan = '';
  if (objetivo === 'bajar') plan = 'Dieta hipocalórica equilibrada';
  if (objetivo === 'mantener') plan = 'Dieta balanceada de mantenimiento';
  if (objetivo === 'subir') plan = 'Dieta alta en proteínas y calorías';

  document.getElementById('resultado').innerText = 'Plan recomendado: ' + plan;
}