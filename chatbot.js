let step = 0;
let userData = {};

const chat = document.getElementById("chat");
const input = document.getElementById("userInput");

/* Agregar mensaje al chat */
function addMessage(sender, text) {
  const div = document.createElement("div");
  div.classList.add("message");

  if (sender === "Tú") {
    div.classList.add("user");
    div.innerHTML = text;
  } else {
    div.classList.add("bot");
    div.innerHTML = `<strong>${sender}:</strong><br>${text}`;
  }

  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

/* Enviar mensaje */
function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  addMessage("Tú", text);
  input.value = "";

  setTimeout(() => nugoReply(text), 400);
}

/* Reiniciar chat */
function reiniciarChat() {
  step = 0;
  userData = {};
  chat.innerHTML = `
    <div class="message bot">
      <strong>Nugo 🦦:</strong><br>
      ¡Hola! 👋 Soy Nugo la nutria, tu guía en NutriGo 🥗<br>
      ¿Te gustaría comenzar tu análisis nutricional?
    </div>
  `;
  input.value = "";
}

/* Lógica del chatbot */
function nugoReply(text) {
  switch (step) {
    case 0: {
      const edad = parseInt(text);
      if (isNaN(edad) || edad < 10 || edad > 80) {
        addMessage("Nugo 🦦", "Necesito una edad válida (ejemplo: 18, 21, 25) 🦦");
        return;
      }
      userData.edad = edad;
      addMessage("Nugo 🦦", "Perfecto 😊 ¿Cuál es tu sexo? (masculino / femenino)");
      step++;
      break;
    }

    case 1: {
      const sexo = text.toLowerCase();
      if (!["masculino", "femenino"].includes(sexo)) {
        addMessage("Nugo 🦦", "Escribe *masculino* o *femenino* por favor 🦦💚");
        return;
      }
      userData.sexo = sexo;
      addMessage("Nugo 🦦", "Gracias 🦦 ¿Cuál es tu peso en kg?");
      step++;
      break;
    }

    case 2: {
      const peso = parseFloat(text);
      if (isNaN(peso) || peso < 30 || peso > 200) {
        addMessage("Nugo 🦦", "Ese peso no parece válido 🤔 (30–200 kg)");
        return;
      }
      userData.peso = peso;
      addMessage("Nugo 🦦", "Muy bien 💪 ¿Cuál es tu altura en cm?");
      step++;
      break;
    }

    case 3: {
      const altura = parseFloat(text);
      if (isNaN(altura) || altura < 120 || altura > 220) {
        addMessage("Nugo 🦦", "Necesito una altura válida en cm (ejemplo: 170)");
        return;
      }
      userData.altura = altura;
      addMessage(
        "Nugo 🦦",
        "¿Cuál es tu nivel de actividad física?\n(sedentario, ligero, moderado, intenso)"
      );
      step++;
      break;
    }

    case 4: {
      const actividad = text.toLowerCase();
      if (!["sedentario", "ligero", "moderado", "intenso"].includes(actividad)) {
        addMessage("Nugo 🦦", "Elige: sedentario, ligero, moderado o intenso 🏃");
        return;
      }
      userData.actividad = actividad;
      calcularNutricion();
      step++;
      break;
    }

    case 5: {
      const horasValidas = ["11:00", "12:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00"];
      const hora = text.replace("a.m.", "").replace("p.m.", "").trim();

      if (!horasValidas.some(h => hora.startsWith(h))) {
        addMessage("Nugo 🦦", "Elige una hora entre 11:00 a.m. y 6:00 p.m. ⏰");
        return;
      }

      userData.hora = text;
      mostrarResultadoFinal();
      step++;
      break;
    }
  }
}

/* Cálculo nutricional */
function calcularNutricion() {
  const { edad, sexo, peso, altura, actividad } = userData;

  let tmb =
    sexo === "masculino"
      ? 10 * peso + 6.25 * altura - 5 * edad + 5
      : 10 * peso + 6.25 * altura - 5 * edad - 161;

  const factores = {
    sedentario: 1.2,
    ligero: 1.375,
    moderado: 1.55,
    intenso: 1.725
  };

  const calorias = Math.round(tmb * factores[actividad]);

  userData.calorias = calorias;
  userData.carbs = Math.round((calorias * 0.5) / 4);
  userData.proteinas = Math.round((calorias * 0.25) / 4);
  userData.grasas = Math.round((calorias * 0.25) / 9);

  addMessage(
    "Nugo 🦦",
    `
    ¡Listo! 🦦 Aquí están tus recomendaciones nutricionales:<br><br>
    🔥 <strong>Calorías:</strong> ${userData.calorias} kcal<br><br>
    🥖 Carbohidratos: ${userData.carbs} g<br>
    🍗 Proteínas: ${userData.proteinas} g<br>
    🥑 Grasas saludables: ${userData.grasas} g<br><br>
    🍝 <strong>Menú de hoy:</strong> Lasagna<br><br>
    ¿A qué hora recogerás tu comida? ⏰
    `
  );
}

/* Mensaje final */
function mostrarResultadoFinal() {
  const codigo = "NG-" + Math.floor(1000 + Math.random() * 9000);

  addMessage(
    "Nugo 🦦",
    `
    <strong>¡Listo! 🦦</strong><br><br>
    🔥 Calorías diarias estimadas: ${userData.calorias} kcal<br><br>
    🥖 Carbohidratos: ${userData.carbs} g<br>
    🍗 Proteínas: ${userData.proteinas} g<br>
    🥑 Grasas saludables: ${userData.grasas} g<br><br>
    🍝 Menú de hoy: Lasagna<br><br>
    ⏰ Recogida: ${userData.hora}<br>
    🔑 Código de verificación: ${codigo}<br><br>
    ¡Te espero para que disfrutes tu comida saludable en NutriGo! 🥗💚
    `
  );
}