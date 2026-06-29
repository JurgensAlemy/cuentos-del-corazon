let audioCtx = null

function getCtx() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    }
    return audioCtx
}

function tono(frecuencia, duracion, tipo = 'sine', volumenInicial = 0.15) {
    try {
        const ctx = getCtx()
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = tipo
        osc.frequency.value = frecuencia
        gain.gain.value = volumenInicial
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start()
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duracion)
        osc.stop(ctx.currentTime + duracion)
    } catch {
        // Si el navegador bloquea audio, simplemente no sonará. No rompe nada.
    }
}

export function sonidoGuardar() {
    tono(880, 0.12)
}

export function sonidoClickSuave() {
    tono(600, 0.08)
}

export function sonidoExito() {
    // Mini melodía ascendente de 3 notas, tipo "logro"
    tono(523, 0.12)
    setTimeout(() => tono(659, 0.12), 100)
    setTimeout(() => tono(784, 0.18), 200)
}

export function sonidoError() {
    tono(220, 0.2, 'triangle')
}