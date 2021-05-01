let frase = document.querySelector("#fraseTXT");
const analizar = document.querySelector("#btnAnalizar");
const limpiar = document.querySelector("#btnLimpiar");
const lista = document.querySelector("#resultado");

const isEmpty = (str) => !str.trim().length;
analizar.addEventListener("click", async () => {
  let fraseAnalizar = frase.value;
  if (isEmpty(fraseAnalizar)) {
    presentAlert();
    return;
  }
  fraseAnalizar = fraseAnalizar.toLowerCase();
  fraseAnalizar = fraseAnalizar.replace(/ /g, "");
  fraseAnalizar = removeAccents(fraseAnalizar);
  let doubleLinkedList = new DoubleLinkedList();
  let arreglo = fraseAnalizar.split("");

  arreglo.forEach((element) => {
    doubleLinkedList.addToTail(element);
  });
  let recorrido = doubleLinkedList.print();
  let recorrido2 = doubleLinkedList.reversePrint();

  if (recorrido == recorrido2) {
    const ionCard = document.createElement("ion-card");
    const newResultado = document.createElement("ion-card-content");
    newResultado.innerText =
      "Es un palindromo \n" +
      "Derecho=" +
      recorrido +
      "\n Reves...=  " +
      recorrido2;
    ionCard.appendChild(newResultado);
    lista.appendChild(ionCard);
  } else {
    const ionCard = document.createElement("ion-card");
    const newResultado = document.createElement("ion-card-content");
    newResultado.innerText = "Tu frase no es un palindromo lo siento :c";
    ionCard.appendChild(newResultado);
    lista.appendChild(ionCard);
  }
});

limpiar.addEventListener("click", () => {
  frase.value = "";
});

const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};
class Node {
  constructor(data, next, prev) {
    this.data = data;
    this.next = next;
    this.prev = prev;
  }
}

class DoubleLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  addToTail(data) {
    const newNode = new Node(data, null, this.tail);

    if (this.tail) {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    } else {
      this.tail = newNode;
      this.head = newNode;
    }
    this.size++;
  }

  print() {
    let current = this.head;
    let result = "";
    while (current) {
      result += current.data;
      current = current.next;
    }

    return result;
  }

  reversePrint() {
    let current = this.tail;
    let result = "";
    while (current) {
      result += current.data;
      current = current.prev;
    }

    return result;
  }
}
const presentAlert = () => {
  const alert = document.createElement("ion-alert");
  alert.header = "No escribiste nada";
  alert.subHeader = "Por favor escribe algo";

  alert.buttons = ["OK"];

  document.body.appendChild(alert);
  return alert.present();
};
