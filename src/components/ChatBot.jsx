import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCommentDots,
  faXmark,
  faPaperPlane,
  faFire,
} from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import styles from './ChatBot.module.css';

const DICTIONARY = [
    {
    keys: ['servicios', 'servicio', 'saber', 'informacion', 'conocer', 'mas'],
    response: [
        '¡Claro! Nuestros servicios son:',
        '🧯 Venta de Extintores: PQS, CO₂, agua, espuma, mangueras, hidrantes y accesorios.',
        '🔧 Recarga y Mantenimiento: recarga periódica con revisión técnica completa.',
        '📋 Capacitaciones certificadas: seguridad industrial y prevención de riesgos.',
        '📑 Consultoría SYSO: PSST, carga de fuego y normativas NFPA10 y NB58006.',
        '¿Cuál te interesa?',
    ],
  },
  {
    keys: ['hola', 'buenas', 'buenos días', 'buenas tardes', 'buenas noches', 'hey'],
    response: '¡Hola! 👋 Soy el asistente de Prever Services. ¿En qué te puedo ayudar hoy?',
  },
  
  {
    keys: ['extintores', 'extintor', 'venta', 'comprar', 'precio', 'costo', 'cuanto cuesta'],
    response: 'Vendemos extintores certificados para todo tipo de riesgo: PQS, CO₂, agua, espuma y más. Para precios y disponibilidad, contáctanos directamente. 🧯',
  },
  {
    keys: ['recarga', 'recargar', 'mantenimiento', 'mantener', 'revisión'],
    response: 'Ofrecemos servicio de recarga y mantenimiento periódico con insumos de calidad y revisión técnica completa. 🔧',
  },
  {
    keys: ['capacitación', 'capacitaciones', 'curso', 'cursos', 'formación', 'entrenamiento'],
    response: 'Brindamos capacitaciones certificadas en seguridad industrial y prevención de riesgos. ¡Ideal para tu equipo de trabajo! 📋',
  },
  {
    keys: ['syso', 'consultoría', 'consultoria', 'seguridad ocupacional', 'salud ocupacional', 'nfpa', 'normativa'],
    response: 'Ofrecemos Consultoría SYSO: PSST, estudio de carga de fuego y cumplimiento de normativas (NFPA10 y NB58006). 📑',
  },
  {
    keys: ['ubicación', 'ubicacion', 'donde', 'dirección', 'direccion', 'están', 'estan'],
    response: 'Estamos en Santa Cruz de la Sierra, Bolivia. ¡Y también vamos hasta donde estés! 📍',
  },
  {
    keys: ['contacto', 'contactar', 'llamar', 'teléfono', 'telefono', 'whatsapp', 'escribir', 'hablar', 'llamada'],
    response: 'Puedes contactarnos por WhatsApp o llamada al +591 70492410. ¡Respondemos en menos de 24 horas! 📞',
  },
  {
    keys: ['horario', 'horarios', 'atienden', 'atención', 'cuando'],
    response: 'Tenemos soporte disponible. Para emergencias y cotizaciones, escríbenos al WhatsApp y te respondemos a la brevedad. ⏰',
  },
  {
    keys: ['experiencia', 'años', 'tiempo', 'cuánto llevan', 'cuanto llevan'],
    response: 'Llevamos más de 5 años protegiendo empresas, hospitales, colegios y hogares en Bolivia. 🏆',
  },
  {
    keys: ['industria', 'industrial', 'fábrica', 'fabrica', 'planta'],
    response: 'Atendemos el sector industrial con soluciones completas: venta, recarga, inspección y capacitación. 🏭',
  },
  {
    keys: ['hogar', 'casa', 'apartamento', 'condominio', 'domicilio'],
    response: 'También protegemos hogares. Un extintor en casa puede salvar vidas. 🏠',
  },
  {
    keys: ['certificado', 'certificación', 'certificados', 'norma', 'calidad'],
    response: 'Todos nuestros equipos están certificados bajo normas bolivianas e internacionales. Documentación y trazabilidad completa. ✅',
  },
  {
    keys: ['gracias', 'muchas gracias', 'ok', 'perfecto', 'entendido', 'listo'],
    response: '¡Con gusto! Si necesitas algo más, aquí estamos. 😊',
  },
  {
    keys: ['adiós', 'adios', 'chau', 'hasta luego', 'bye'],
    response: '¡Hasta luego! Recuerda que estamos a tu disposición cuando lo necesites. 🔥',
  },
];

const FALLBACK = '¿No encontré esa información, pero puedo ayudarte con extintores, recargas, capacitaciones, consultoría SYSO o datos de contacto. ¿Qué necesitas? 😊';

const WELCOME = '¡Hola! 👋 Soy el asistente de **Prever Services**. Puedo ayudarte con información sobre nuestros servicios, ubicación, contacto y más. ¿En qué te ayudo?';

function getResponse(input) {
  const normalized = input.toLowerCase().trim();
  for (const entry of DICTIONARY) {
    if (entry.keys.some(key => normalized.includes(key))) {
      return entry.response;
    }
  }
  return FALLBACK;
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: WELCOME },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const send = () => {
    const text = input.trim();
    if (!text) return;

    setMessages(prev => [...prev, { from: 'user', text }]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, { from: 'bot', text: getResponse(text) }]);
    }, 900);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') send();
  };

  return (
    <>
      {/* BOTÓN FLOTANTE */}
      <button
        className={`${styles.fab} ${open ? styles.fabOpen : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-label="Abrir chat"
      >
        <FontAwesomeIcon icon={open ? faXmark : faCommentDots} />
      </button>

      {/* VENTANA DE CHAT */}
      <div className={`${styles.chatWindow} ${open ? styles.chatWindowOpen : ''}`}>

        {/* HEADER */}
        <div className={styles.chatHeader}>
          <div className={styles.chatHeaderIcon}>
            <img src="/favicon.png" alt="Prever Services" className={styles.chatLogoImg} />
          </div>
          <div>
            <p className={styles.chatHeaderTitle}>Prever Services</p>
            <p className={styles.chatHeaderSub}> <span className={styles.chatDOt}>●</span> Asistente virtual · En línea</p>
          </div>
          <button className={styles.chatClose} onClick={() => setOpen(false)}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        {/* MENSAJES */}
        <div className={styles.chatMessages}>
          {messages.map((msg, i) => (
            <div    
                key={i}
                className={`${styles.msg} ${msg.from === 'user' ? styles.msgUser : styles.msgBot}`}
            >
                {Array.isArray(msg.text)
                ? msg.text.map((line, j) => <p key={j} className={styles.msgLine}>{line}</p>)
                : msg.text
                }
            </div>
            ))}

          {/* TYPING INDICATOR */}
          {typing && (
            <div className={`${styles.msg} ${styles.msgBot} ${styles.msgTyping}`}>
              <span /><span /><span />
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* SUGERENCIAS RÁPIDAS */}
        <div className={styles.chatSuggestions}>
          {['Extintores', 'Recarga', 'Capacitación', 'Contacto'].map((s, i) => (
            <button
              key={i}
              className={styles.suggestion}
              onClick={() => {
                setMessages(prev => [...prev, { from: 'user', text: s }]);
                setTyping(true);
                setTimeout(() => {
                  setTyping(false);
                  setMessages(prev => [...prev, { from: 'bot', text: getResponse(s) }]);
                }, 900);
              }}
            >
              {s}
            </button>
          ))}
        </div>

        {/* INPUT */}
        <div className={styles.chatInputRow}>
          <input
            className={styles.chatInput}
            type="text"
            placeholder="Escribe tu pregunta..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
          />
          <button className={styles.chatSend} onClick={send}>
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>

        {/* FOOTER WHATSAPP */}
        <a
          href="https://wa.me/59170492410"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.chatWhatsapp}
        >
          <FontAwesomeIcon icon={faWhatsapp} />
          Hablar con una persona real
        </a>

      </div>
    </>
  );
}