export const preguntasRetadoras = [
    '¿Recuerdas un momento en que te sentiste muy distinto en la mañana y en la tarde del mismo día?',
    '¿Alguna vez sentiste dos emociones al mismo tiempo? ¿Cómo fue eso?',
    '¿Qué pasó la última vez que te sentiste muy feliz? ¿Y muy triste?',
    '¿Hay algo que te haga sentir nervioso? ¿Cómo se siente eso en tu cuerpo?',
    '¿Te ha pasado que te enojaste y luego te arrepentiste? Cuéntalo en tu cuento.',
    '¿Quién te ayuda cuando te sientes mal? ¿Qué hace esa persona?',
    '¿Qué harías diferente si pudieras volver a vivir un momento difícil?',
    '¿Cómo le explicarías a un amigo lo que sientes cuando tienes miedo?',
]

export function preguntaAleatoria() {
    return preguntasRetadoras[Math.floor(Math.random() * preguntasRetadoras.length)]
}