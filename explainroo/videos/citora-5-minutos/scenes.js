// Citora · "Tu app de reservas en 5 minutos". Video vertical para Reels.
// Datos sacados del asistente "Crear mi app" (src/pages/Create.tsx): tipo de negocio,
// nombre/enlace/color, moneda (CUP o USD), servicios sugeridos, horario y cuenta.
// La app NO cobra: no se muestra ningún pago.
import { backdrop, beats, fact, hookFrame, payoff, punch } from './format.js';

export default {
  hook(s) {
    s.camera([...punch(s, 'WhatsApp', { zoom: 1.12 }), ...punch(s, 'salón', { zoom: 1.15 })]);
    hookFrame(s, 'Tu app de reservas en *5 minutos*', { icon: 'message-circle-more', color: 'green', kicker: 'Para tu salón' });
    fact(s, '¿Por *WhatsApp*?', { at: 'turnos', out: '#cinco' });
    fact(s, '*5* min', { at: '#cinco' });
  },

  pasos(s) {
    s.camera(punch(s, 'color', { zoom: 1.15 }));
    backdrop(s);
    s.short.step(1, 3);
    beats(s, [
      { at: '#tipo', icon: 'store', label: 'Tu tipo de negocio', color: 'orange' },
      { at: '#unas', icon: 'sparkles', label: 'Uñas', color: 'pink' },
      { at: 'peluquería', icon: 'scissors', label: 'Peluquería', color: 'purple' },
      { at: 'barbería', icon: 'user', label: 'Barbería', color: 'blue' },
      { at: 'pestañas', icon: 'eye', label: 'Pestañas', color: 'pink' },
      { at: '#nombre', icon: 'type', label: 'Tu nombre', color: 'yellow' },
      { at: '#enlace', icon: 'link', label: 'Tu enlace', color: 'blue' },
      { at: '#color', icon: 'palette', label: 'Tu color', color: 'pink' },
    ]);
  },

  servicios(s) {
    s.camera([...punch(s, 'sugeridos', { zoom: 1.12 }), ...punch(s, '#cuenta', { zoom: 1.12 })]);
    backdrop(s);
    s.short.step(2, 3);
    beats(s, [
      { at: '#servicios', icon: 'list-checks', label: 'Servicios sugeridos', color: 'green' },
      { at: '#precios', icon: 'tag', label: 'Tus precios', color: 'orange' },
      { at: '#moneda', icon: 'banknote', label: 'Pesos o dólares', color: 'green' },
      { at: '#horario', icon: 'clock', label: 'Tu horario', color: 'blue' },
      { at: '#cuenta', icon: 'user-plus', label: 'Tu cuenta', color: 'purple' },
    ]);
  },

  turn(s) {
    s.camera([...punch(s, '#manda', { zoom: 1.1 }), ...punch(s, 'horas', { zoom: 1.1 })]);
    s.short.interrupt('#turn', { flash: false });
    backdrop(s, { glow: '#fb6b47', pattern: 'rays' });
    s.short.step(3, 3);
    beats(s, [
      { at: '#turn', icon: 'sparkles', label: 'Lo bueno', color: 'yellow' },
      { at: '#manda', icon: 'send', label: 'Mandas tu enlace', color: 'blue' },
      { at: '#solas', icon: 'calendar-check', label: 'Reservan solas', color: 'green' },
      { at: '#libres', icon: 'clock-check', label: 'Solo horas libres', color: 'orange' },
    ]);
    fact(s, 'Sin *escribirte*', { at: 'libres' });
  },

  tip(s) {
    s.camera([...punch(s, 'agenda', { zoom: 1.06 }), ...punch(s, 'mensajes', { zoom: 1.08 }), ...punch(s, 'DM', { zoom: 1.08 })]);
    payoff(s, 'Menos mensajes, más uñas', [
      { text: 'La cita llega a tu agenda', at: 'cita' },
      { text: 'Escríbeme al DM', at: '#dm' },
    ], { icon: 'calendar-check' });
  },
};
