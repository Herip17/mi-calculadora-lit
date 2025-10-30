import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

class MiReloj extends LitElement {
  static properties = {
    hora: { type: String },
    fecha: { type: String },
    formato24h: { type: Boolean }
  };

  constructor() {
    super();
    this.hora = '--:--:--';
    this.fecha = 'Cargando...';
    this.formato24h = true;
    this.actualizarHora();
  }

  connectedCallback() {
    super.connectedCallback();
    this.intervalo = setInterval(() => this.actualizarHora(), 1000);
  }

  disconnectedCallback() {  // ✅ corregido (antes: disconectedCallback)
    super.disconnectedCallback();
    if (this.intervalo) clearInterval(this.intervalo);
  }

  actualizarHora() {
    const ahora = new Date();
    this.hora = this.formatearHora(ahora);
    this.fecha = this.formatearFecha(ahora);
  }

  formatearHora(fecha) {
    let horas = fecha.getHours();
    let minutos = fecha.getMinutes();
    let segundos = fecha.getSeconds();
    let ampm = '';

    if (!this.formato24h) {
      ampm = horas >= 12 ? 'PM' : 'AM';
      horas = horas % 12 || 12;
    }

    const horasStr = horas.toString().padStart(2, '0');
    const minutosStr = minutos.toString().padStart(2, '0');
    const segundosStr = segundos.toString().padStart(2, '0');

    return `${horasStr}:${minutosStr}:${segundosStr}${ampm}`;
  }

  formatearFecha(fecha) {
    const opciones = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return fecha.toLocaleDateString('es-ES', opciones); // ✅ corregido ('es-ES' entre comillas)
  }

  toggleFormato = () => {
    this.formato24h = !this.formato24h;
    this.actualizarHora();
  };

  render() {
    return html`
      <div class="reloj">
        <div class="fecha">${this.fecha}</div>
        <div class="hora">${this.hora}</div>
        <div class="controles">
          <button @click=${this.toggleFormato} class="boton-formato">
            Cambiar a ${this.formato24h ? '12h' : '24h'}
          </button>
        </div>
        <div class="info">Reloj en tiempo real 100% real no fake</div>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }

    .reloj {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px;
      border-radius: 20px;
      text-align: center;
      font-family: 'Arial', sans-serif;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      max-width: 400px;
      margin: 20px auto;
    }

    .fecha {
      font-size: 1.2rem;
      margin-bottom: 10px;
      opacity: 0.9;
      text-transform: capitalize;
    }

    .hora {
      font-size: 3rem;
      font-weight: bold;
      margin: 20px 0;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
      font-family: 'Courier New', monospace;
    }

    .controles {
      margin: 20px 0;
    }

    .boton-formato {
      background: rgba(255, 255, 255, 0.3);
      color: white;
      border: 2px solid rgba(255, 255, 255, 0.5);
      padding: 10px 20px;
      border-radius: 25px;
      cursor: pointer;
      font-size: 1rem;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);
    }

    .boton-formato:hover {
      background: rgba(255, 255, 255, 0.3);
      border-color: rgba(255, 255, 255, 0.8);
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }

    .info {
      font-size: 0.9rem;
      opacity: 0.7;
      margin-top: 15px;
    }
  `;
}

customElements.define('mi-reloj', MiReloj);
