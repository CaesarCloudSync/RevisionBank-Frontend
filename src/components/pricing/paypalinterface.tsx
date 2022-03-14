declare global {
    interface Window {
        paypal:any;
    }
}

export let paypal = window.paypal;