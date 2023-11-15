import * as lit from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';
const { html, css, LitElement } = lit

export class ReplaceGroup extends LitElement {

    static styles = css`
        .replace-group-items {
            margin-right: 12px;
            border: 1px solid #8d8d8d;
            border-radius: 4px;
            font-size: 14px;
            padding: 4px;
        }
 
        [id*="arg-1"] {
            width: 124px;
        }
        [id*="arg-2"] {
            width: 32px;
        }
        [id*="arg-3"] {
            width: 64px;
        }
    `
    static properties = {
        arg1: { type: String },
        arg2: { type: String },
        arg3: { type: String },
        id: { type: Number },
    };

    constructor() {
        super();
        this.id = this.id ?? Date.now();
        this.arg1 = '';
        this.arg2 = 'g';
        this.arg3 = '';
    }


    render() {
        return html`
        <span class="replace-group-items">
            <input
                placeholder="替换表达式"
                title="支持正则表达式"
                id="arg-1"
                value="${this.arg1}"
                @input="${this.changeArg}"
            />
            <input placeholder="flag" id="arg-2"   value="${this.arg2}" @input="${this.changeArg}"/>
            <input placeholder="代替内容" id="arg-3"  value="${this.arg3}" @input="${this.changeArg}"/>
            <button @click=${this.removeEl} >x</button>
        </span>
        `;
    }

    changeArg = (e) => {
        const { id, value } = e.target;
        const [_, arg] = id.split('-'); 
        this[`arg${arg}`] = value;
        localStorage.setItem("rg-" + this.id, JSON.stringify({
            arg1: this.arg1,
            arg2: this.arg2,
            arg3: this.arg3,
        }));
    }

    removeEl = () => { 
        localStorage.removeItem("rg-" + this.id);
        this.remove();
    }
}


customElements.define('el-replace-group', ReplaceGroup);
