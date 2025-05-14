const chat = document.getElementById("chat");
const input = document.getElementById("userInput");

const fakeDB = {
  75839: { date: "20 de maio", time: "14h", doctor: "Dr. João Silva" },
  12345: { date: "22 de maio", time: "10h", doctor: "Dra. Ana Costa" },
  30001: {
    date: "23 de maio",
    time: "09h",
    doctor: "Dr. Pedro Ramos",
    patient: "Yan Souza",
  },
  30002: {
    date: "24 de maio",
    time: "11h",
    doctor: "Dra. Marina Lopes",
    patient: "Giovane",
  },
  30003: {
    date: "25 de maio",
    time: "15h",
    doctor: "Dr. Carlos Nunes",
    patient: "Isabella",
  },
  30004: {
    date: "26 de maio",
    time: "13h",
    doctor: "Dra. Fernanda Silva",
    patient: "Rhaiane",
  },
};

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.className = "msg " + sender;
  msg.textContent = text;
  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}

function preencherConsulta() {
  input.value = "Quero informações sobre a minha consulta que está agendada";
  input.focus();
}

function enviarConsulta() {
  input.value = "Quero informações sobre a minha consulta que está agendada";
  sendMessage();
}

function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";
  handleBotResponse(text);
}

function handleBotResponse(message) {
  const codeMatch = message.match(/\b\d{5}\b/);

  if (codeMatch) {
    const id = codeMatch[0];
    addMessage("Ok! Vou dar uma olhadinha para você. 👀", "bot");

    setTimeout(() => {
      const result = fakeDB[id];
      if (result) {
        addMessage(
          `Sua consulta está confirmada para o dia ${result.date} às ${result.time} com o ${result.doctor}, paciente ${result.patient}. 💙`,
          "bot"
        );
      } else {
        addMessage(
          "Tentei localizar sua consulta com esse código, mas não encontrei nada. Pode confirmar pra mim?",
          "bot"
        );
      }
    }, 1000);
  } else {
    addMessage(
      "Ola! Você pode me passar o código da consulta? Com ele consigo verificar direitinho. 😄",
      "bot"
    );
  }
}
