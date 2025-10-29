import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

class MiCalculadora extends LitElement {
    static properties = {
        numero1: { type: Number },
        numero2: { type: Number },
        resultado: { type: String },
        operacion: { type: String }
    };

    constructor() {
        super();
        this.numero1 = 0;
        this.numero2 = 0;
        this.resultado = '0';
        this.operacion = '+';
    }

    render() {
        return html`
            <div class="calculadora">
                <h2>🧮 Calculadora Simple</h2>
                
                <div class="inputs">
                    <input 
                        type="number" 
                        @input=${(e) => {
                            const valor = e.target.value;
                            this.numero1 = valor === '' ? 0 : parseFloat(valor);
                        }}
                        placeholder="Número 1"
                    >
                    
                    <select @change=${(e) => {
                            this.operacion = e.target.value;
                        }}>
                        <option value="+">+</option>
                        <option value="-">-</option>
                        <option value="*">×</option>
                        <option value="/">÷</option>
                    </select>
                    
                    <input 
                        type="number" 
                        @input=${(e) => {
                            const valor = e.target.value;
                            this.numero2 = valor === '' ? 0 : parseFloat(valor);
                        }}
                        placeholder="Número 2"
                    >
                </div>

                <div class="botones">
                    <button @click=${() => {
                        let resultado;
                        switch (this.operacion) {
                            case '+': 
                                resultado = this.numero1 + this.numero2;
                                break;
                            case '-': 
                                resultado = this.numero1 - this.numero2;
                                break;
                            case '*': 
                                resultado = this.numero1 * this.numero2;
                                break;
                            case '/': 
                                if (this.numero2 === 0) {
                                    resultado = 'Error: No ÷ 0';
                                } else {
                                    resultado = this.numero1 / this.numero2;
                                }
                                break;
                            default: 
                                resultado = 'Error';
                        }
                        
                        if (typeof resultado === 'number') {
                            this.resultado = Number.isInteger(resultado) 
                                ? resultado.toString() 
                                : resultado.toFixed(2);
                        } else {
                            this.resultado = resultado;
                        }
                    }} class="calcular">
                        Calcular
                    </button>
                    
                    <button @click=${() => {
                        this.numero1 = 0;
                        this.numero2 = 0;
                        this.resultado = '0';
                        this.operacion = '+';
                        // Limpiar inputs después de que se actualice el DOM
                        setTimeout(() => {
                            const inputs = this.shadowRoot?.querySelectorAll('input[type="number"]');
                            const select = this.shadowRoot?.querySelector('select');
                            if (inputs) {
                                inputs.forEach(input => input.value = '');
                            }
                            if (select) {
                                select.value = '+';
                            }
                        }, 0);
                    }} class="limpiar">
                        Limpiar
                    </button>
                </div>

                <div class="resultado">
                    <h3>${this.resultado}</h3>
                </div>

                <div class="info">
                    <small>${this.numero1} ${this.operacion} ${this.numero2}</small>
                </div>
            </div>
        `;
    }

    static styles = css`
        .calculadora {
            background: white;
            padding: 25px;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            min-width: 300px;
            max-width: 400px;
            margin: 20px auto;
            text-align: center;
            font-family: 'Segoe UI', Arial, sans-serif;
        }

        h2 {
            color: #2c3e50;
            margin: 0 0 20px 0;
            font-size: 1.5em;
        }

        .inputs {
            display: flex;
            gap: 8px;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
            flex-wrap: wrap;
        }

        input, select {
            padding: 10px 12px;
            border: 2px solid #dcdfe6;
            border-radius: 6px;
            font-size: 14px;
            transition: all 0.3s ease;
            box-sizing: border-box;
        }

        input:focus, select:focus {
            outline: none;
            border-color: #4CAF50;
            box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
        }

        input {
            width: 90px;
        }

        select {
            background-color: white;
            cursor: pointer;
            width: 60px;
        }

        .botones {
            display: flex;
            gap: 10px;
            justify-content: center;
            margin-bottom: 20px;
        }

        button {
            padding: 10px 20px;
            border: none;
            border-radius: 6px;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 600;
            flex: 1;
        }

        .calcular {
            background-color: #4CAF50;
            color: white;
        }

        .calcular:hover {
            background-color: #45a049;
            transform: translateY(-1px);
            box-shadow: 0 3px 8px rgba(76, 175, 80, 0.3);
        }

        .limpiar {
            background-color: #f44336;
            color: white;
        }

        .limpiar:hover {
            background-color: #da190b;
            transform: translateY(-1px);
            box-shadow: 0 3px 8px rgba(244, 67, 54, 0.3);
        }

        .resultado {
            padding: 15px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 8px;
            margin-bottom: 15px;
            color: white;
        }

        .resultado h3 {
            margin: 0;
            font-size: 1.6em;
            font-weight: 600;
        }

        .info {
            color: #7f8c8d;
            font-size: 12px;
            font-style: italic;
        }
    `;
}

// Registrar el componente
customElements.define('mi-calculadora', MiCalculadora);