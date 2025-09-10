let selectedPresent = null;
let selectedPrice = null;

// Adicionar event listeners para seleção de presentes
document.querySelectorAll(".present-item").forEach((item) => {
  item.addEventListener("click", function () {
    // Remover seleção anterior
    document
      .querySelectorAll(".present-item")
      .forEach((i) => i.classList.remove("selected"));

    // Adicionar seleção atual
    this.classList.add("selected");

    // Atualizar dados selecionados
    selectedPresent = this.dataset.item;
    selectedPrice = this.dataset.price;

    // Mostrar presente selecionado
    const selectedDiv = document.getElementById("selectedPresent");
    const selectedText = document.getElementById("selectedPresentText");
    selectedText.textContent = `${selectedPresent} - ${selectedPrice}`;
    selectedDiv.classList.add("show");

    // Habilitar botão de envio
    document.getElementById("submitBtn").disabled = false;
  });
});

// Formulário de envio
document
  .getElementById("presentForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    if (!selectedPresent) {
      alert("Por favor, selecione um presente primeiro!");
      return;
    }

    const formData = {
      present: selectedPresent,
      price: selectedPrice,
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      message: document.getElementById("message").value,
    };

    // Simular envio (aqui você integraria com seu backend)
    console.log("Dados enviados:", formData);

    // Mostrar mensagem de sucesso
    document.getElementById("successMessage").style.display = "block";

    // Limpar formulário
    this.reset();
    document
      .querySelectorAll(".present-item")
      .forEach((i) => i.classList.remove("selected"));
    document.getElementById("selectedPresent").classList.remove("show");
    document.getElementById("submitBtn").disabled = true;
    selectedPresent = null;
    selectedPrice = null;

    // Rolar para a mensagem de sucesso
    document
      .getElementById("successMessage")
      .scrollIntoView({ behavior: "smooth" });
  });