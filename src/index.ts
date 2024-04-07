import Tonic from '@bicycle-codes/tonic'
import clipboardCopy from 'clipboard-copy'

/**
 * __props__
 *   - payload
 */
export class CopyButton extends Tonic<{ payload }> {
    constructor () {
        super()
        this.state = { success: false }
    }

    async click () {
        clipboardCopy(this.props.payload)
        this.state.success = true
        this.reRender()
        await sleep(2500)
        this.state.success = false
        this.reRender()
    }

    render () {
        const classes = ([
            'copy-button',
            this.props['no-outline'] ? 'no-outline' : '',
            this.state.success ? 'success' : '',
            this.props.class
        ])
            .filter(Boolean)
            .join(' ')

        return this.html`<button
            class="${classes}"
        >
            <span class="copy-svg-wrapper"><copy-svg></copy-svg></span>
            <span class="success-svg-wrapper"><success-svg><success-svg></span>
        </button>`
    }
}

export function CopySvg (this:Tonic) {
    return this.html`<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" class="copy-svg">
        <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
    </svg>`
}

export function SuccessSvg (this:Tonic) {
    return this.html`<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" class="success-svg">
        <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"></path>
    </svg>`
}

function sleep (ms) {
    return new Promise(resolve => {
        setTimeout(() => resolve(null), ms)
    })
}
