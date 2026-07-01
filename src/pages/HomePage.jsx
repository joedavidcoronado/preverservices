import { Link } from 'react-router';
import { useState, useEffect } from 'react';
import styles from './HomePage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faTiktok, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import ChatBot from '../components/ChatBot';
import {
  faShieldHalved,
  faFire,
  faCircleCheck,
  faIndustry,
  faBuilding,
  faHospital,
  faGraduationCap,
  faStore,
  faPhone,
  faEnvelope,
  faLocationDot,
  faChevronDown,
  faArrowRight,
  faStar,
  faAward,
  faHandshake,        // nuevo
  faClipboardList,    // nuevo
  faRocket,           // nuevo
  faChevronRight,     // nuevo
} from '@fortawesome/free-solid-svg-icons';

const HERO_PHOTOS = Array.from({ length: 5 }, (_, i) => `/heroPhotos/${i + 1}.jpg`);

const SERVICES = [
  {
    icon: faFire,
    title: 'Venta de Extintores y equipamiento contra incendios',
    desc: 'Equipos certificados para todo tipo de riesgo: PQS, CO₂, agua, espuma y más. Mangueras, hidrantes y sus accesorios.',
    img: '/servicesPhotos/1.jpg',
  },
  {
    icon: faShieldHalved,
    title: 'Recarga y Mantenimiento',
    desc: 'Recarga periódica con insumos de calidad y revisión técnica completa.',
    img: '/servicesPhotos/2.jpg',
  },
  {
    icon: faGraduationCap,
    title: 'Capacitaciones certificadas',
    desc: 'Seguridad industrial y prevención de riesgos.',
    img: '/servicesPhotos/3.jpg',
  },
  {
    icon: faShieldHalved,
    title: 'Consultoría SYSO',
    desc: 'Seguridad y salud ocupacional. PSST, estudio de carga de fuego y cumplimiento de normativas de los entes regulatorios (NFPA10 y NB58006).',
    img: '/servicesPhotos/4.jpg',
  },
];

const SECTORS = [
  { icon: faIndustry, label: 'Industria' },
  { icon: faBuilding, label: 'Edificios corporativos' },
  { icon: faHospital, label: 'Salud' },
  { icon: faGraduationCap, label: 'Educación' },
  { icon: faStore, label: 'Retail y comercio' },
];

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [visibleStats, setVisibleStats] = useState(false);
  const [countedStats, setCountedStats] = useState([0, 0, 0, 0]);
  const [currentPhoto, setCurrentPhoto] = useState(0);

  const [visibleWhyUs, setVisibleWhyUs] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisibleWhyUs(true); },
      { threshold: 0.15 }
    );
    const el = document.getElementById('why-us');
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setVisibleStats(true);

        const targets =   [5,    500,   15000, 24];
        const duration = 2000;
        const steps    = 60;
        const interval = duration / steps;

        targets.forEach((target, i) => {
          let current = 0;
          const increment = target / steps;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            setCountedStats(prev => {
              const next = [...prev];
              next[i] = Math.floor(current);
              return next;
            });
          }, interval);
        });
      }
    },
    { threshold: 0.3 }
  );
  const el = document.getElementById('stats-band');
  if (el) observer.observe(el);
  return () => observer.disconnect();
}, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhoto(prev => (prev + 1) % HERO_PHOTOS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.root}>

      <ChatBot />

      {/* NAV */}
      <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}>
        <div className={styles.navInner}>
          <Link to="/" className={styles.navLogo}>
            <img src="/favicon.png" alt="Prever Services" className={styles.navLogoImg} />
            <img src="/frames/frame4.svg" alt="" className={`${styles.logoNav}`} />
          </Link>
          {/*<h1 className={styles.comments}>Header</h1>*/}
          <ul className={styles.navLinks}>
            <li><a href="#sectores">Sectores</a></li>
            <li><a href="#servicios">Servicios</a></li>
            <li><a href="#nosotros">Nosotros</a></li>
            <li><a href="#contacto" className={styles.navCta}>Cotizar</a></li>
          </ul>
        </div>
      </nav>

      {/* HERO */}
      <section className={styles.heroWrapper}>

        {/* CARRUSEL DE FONDO */}
        <div className={styles.heroCarousel}>
          {HERO_PHOTOS.map((src, i) => (
            <div
              key={i}
              className={styles.heroCarouselSlide}
              style={{
                backgroundImage: `url(${src})`,
                opacity: i === currentPhoto ? 1 : 0,
              }}
            />
          ))}
        </div>

        {/* DEGRADADO */}
        <div className={styles.heroGradientOverlay} />

        {/* HUMO VIDEO */}
        <video
          className={styles.smokeVideo}
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/smoke.mp4" type="video/mp4" />
        </video>
        <video
          className={styles.smokeVideo}
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/fire.mp4" type="video/mp4" />
        </video>
          
        {/* CONTENIDO */}
        <div className={styles.hero}>
          <div className={styles.heroContent}>
            {/*<h1 className={styles.comments}>HeroSection</h1>*/}
            <p className={styles.heroEyebrow}>+5 años anticipando tu bienestar</p>
            <h1 className={styles.heroTitle}>
              Donde hay fuego,<br />
              <span className={styles.heroAccent}>nosotros llegamos primero.</span>
            </h1>
            <p className={styles.heroSub}>
              Extintores y equipamento de lucha contra incendios, servicios de seguridad y salud ocupacional
              y capacitaciones certificadas para aquellos que no se pueden dar el lujo de improvisar en seguridad.
            </p>
            <div className={styles.heroCtas}>
              <a href="#contacto" className={styles.btnPrimary}>
                Solicitar cotización <FontAwesomeIcon icon={faArrowRight} />
              </a>
              <a href="#servicios" className={styles.btnGhost}>Ver servicios</a>
            </div>
          </div>

          {/* reemplaza el div.heroVisual completo */}
          <div className={styles.heroVisual}>
            <div className={styles.heroGlow} />

            {/* Contenedor apilado: frame1, frame3, frame2 */}
            <div className={styles.logoStack}>
              <img src="/frames/frame1.svg" alt="" className={`${styles.logoFrame} ${styles.logoFrame1}`} />
              <img src="/frames/frame2.svg" alt="" className={`${styles.logoFrame} ${styles.logoFrame2}`} />
              <img src="/frames/frame3.svg" alt="" className={`${styles.logoFrame} ${styles.logoFrame3}`} />
            </div>

            {/* frame4: letras, separado 20px abajo */}
            <img src="/frames/frame4.svg" alt="Prever Services" className={`${styles.logoFrame} ${styles.logoFrame4}`} />
          </div>

          <a href="#stats-band" className={styles.heroScroll}>
            <FontAwesomeIcon icon={faChevronDown} />
          </a>
        </div>
      </section>

      {/* CÓMO TE AYUDAMOS */}
      <section id="sectores" className={styles.helpSection}>
        <div className={styles.helpInner}>
          <p className={styles.helpEyebrow}>Encuentra tu solución</p>
          <h2 className={styles.helpTitle}>
            ¿Cómo te podemos <span className={styles.helpAccent}>ayudar?</span>
          </h2>

          <div className={styles.helpGrid}>
            {[
              {
                label: 'Industria',
                sub: 'Plantas, fábricas y almacenes',
                img: '/helpPhotos/1.jpg',
                msg: 'Hola, necesito información sobre servicios para industria.',
              },
              {
                label: 'Comercial',
                sub: 'Edificios, oficinas y PyMES',
                img: '/helpPhotos/2.jpg',
                msg: 'Hola, necesito información sobre servicios para sector comercial.',
              },
              {
                label: 'Hogar',
                sub: 'Casas, apartamentos y condominios',
                img: '/helpPhotos/3.jpg',
                msg: 'Hola, necesito información sobre seguridad para mi hogar.',
              },
              {
                label: 'Otros',
                sub: 'Comercios, restaurantes y más',
                img: '/helpPhotos/4.jpg',
                msg: 'Hola, necesito información sobre servicios para mi negocio.',
              },
            ].map((item, i) => (
              <a
                key={i}
                href={`https://wa.me/59170492410?text=${encodeURIComponent(item.msg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.helpCard}
                style={{ '--img': `url(${item.img})`, '--delay': `${i * 120}ms` }}
              >
              
                {/* foto de fondo */}
                <div className={styles.helpCardBg} />

                {/* overlay oscuro que se levanta en hover */}
                <div className={styles.helpCardOverlay} />

                {/* número decorativo */}
                <span className={styles.helpCardNumber}>0{i + 1}</span>

                {/* contenido */}
                <div className={styles.helpCardContent}>
                  <h3 className={styles.helpCardLabel}>{item.label}</h3>
                  <p className={styles.helpCardSub}>{item.sub}</p>

                  {/* botón whatsapp que aparece en hover */}
                  <div className={styles.helpCardCta}>
                    <FontAwesomeIcon icon={faWhatsapp} />
                    <span>Escribir ahora</span>
                  </div>
                </div>

                {/* línea naranja inferior animada */}
                <div className={styles.helpCardLine} />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section id="why-us" className={styles.whyUs}>
        <div className={styles.sectionInner}>

          <p className={styles.sectionEyebrow}>¿Por qué nosotros?</p>
          <h2 className={styles.sectionTitle}>
            Atención profesional y personalizada<br />
            <span className={styles.whyUsAccent}>con resultados consistentes.</span>
          </h2>
          {/* PASOS */}
          <div className={styles.whyUsSteps}>

            {[
              { icon: faPhone,         label: 'Nos contactas'},
              { icon: faHandshake,     label: 'Nos reunimos'},
              { icon: faClipboardList, label: 'Planificamos'},
              { icon: faRocket,        label: 'Ejecutamos'},
            ].map((step, i) => (
              <div key={i} className={styles.whyUsStepWrapper}>

                {/* PASO */}
                <div
                  className={`${styles.whyUsStep} ${visibleWhyUs ? styles.whyUsStepVisible : ''}`}
                  style={{ transitionDelay: `${i * 200}ms` }}
                >

                  {/* icono con anillo animado */}
                  <div className={styles.whyUsIconWrap}>
                    <div className={styles.whyUsIconRing} />
                    <div className={styles.whyUsIconInner}>
                      <FontAwesomeIcon icon={step.icon} className={styles.whyUsIcon} />
                    </div>
                  </div>

                  <span className={styles.whyUsStepLabel}>{step.label}</span>
                </div>

                {/* FLECHA */}
                {i < 3 && (
                  <div
                    className={`${styles.whyUsArrow} ${visibleWhyUs ? styles.whyUsArrowVisible : ''}`}
                    style={{ transitionDelay: `${i * 200 + 300}ms` }}
                  >
                    <FontAwesomeIcon icon={faChevronRight} />
                    <FontAwesomeIcon icon={faChevronRight} className={styles.whyUsArrow2} />
                  </div>
                )}

              </div>
            ))}
          </div>

          {/* LÍNEA DIVISORA */}
          <div className={`${styles.whyUsDivider} ${visibleWhyUs ? styles.whyUsDividerVisible : ''}`} />

          {/* FRASE CIERRE */}
          <div className={`${styles.whyUsClosing} ${visibleWhyUs ? styles.whyUsClosingVisible : ''}`}>
            <FontAwesomeIcon icon={faLocationDot} className={styles.whyUsClosingIcon} />
            <p className={styles.whyUsClosingText}>
              "Capacitamos, hacemos seguimiento{' '}
              <span className={styles.whyUsClosingAccent}>y vamos hasta donde estés."</span>
            </p>
          </div>

        </div>
      </section>

      {/* STATS BAND */}
      <section id="stats-band" className={styles.statsBand}>
        <div className={styles.statsGrid}>
          {[
            { suffix: '+',  label: 'Años de experiencia',    idx: 0 },
            { suffix: '+',  label: 'Clientes activos',       idx: 1 },
            { suffix: 'K+', label: 'Extintores certificados', idx: 2 },
            { suffix: '/7', label: 'Soporte de emergencia',  idx: 3 },
          ].map((s) => (
            <div key={s.idx} className={styles.statItem} style={{ opacity: 1, transform: 'none' }}>
              <span className={styles.statValue}>
                {s.idx === 2
                  ? `${Math.floor(countedStats[s.idx] / 1000)}${s.suffix}`
                  : `${countedStats[s.idx]}${s.suffix}`
                }
              </span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="servicios" className={styles.services}>
        <div className={styles.sectionInner}>
          <p className={styles.sectionEyebrow}>Lo que hacemos</p>
          <h2 className={styles.sectionTitle}>Servicios integrales<br />de protección contra incendios</h2>
          <div className={styles.servicesGrid}>
            {SERVICES.map((svc, i) => (
              <div
                key={i}
                className={styles.serviceCard}
                style={{ backgroundImage: `url(${svc.img})` }}
              >
                {/* degradado: sólido abajo-izquierda → transparente arriba-derecha */}
                <div className={styles.serviceCardOverlay} />

                {/* contenido adelante */}
                <div className={styles.serviceCardContent}>
                  <div className={styles.serviceCardHeader}>
                    <div className={styles.serviceIconWrap}>
                      <FontAwesomeIcon icon={svc.icon} className={styles.serviceIcon} />
                    </div>
                    <h3 className={styles.serviceTitle}>{svc.title}</h3>
                  </div>
                  <p className={styles.serviceDesc}>{svc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* SEPARADOR CON PNG */}
      <div className={styles.sectionDivider}>
        <img src="/ext.png" alt="Prever Services" className={styles.extSeparator} />
      </div>

      {/* NOSOTROS */}
      <section id="nosotros" className={styles.about}>
        <div className={styles.aboutInner}>
          <div className={styles.aboutText}>
            <p className={styles.sectionEyebrow2}>Quiénes somos</p>
            <h2 className={styles.sectionTitle}>5 años anticipando<br />tu bienestar.</h2>
            <p className={styles.aboutBody}>
              Nacimos en Bolivia con una misión clara: que cada empresa, hospital, colegio y edificio del país tenga la capacidad de prevenir y actuar contra incendios y emergencias
            </p>
            <p className={styles.aboutBody}>
              Hoy somos el referente de confianza para clientes que manejan operaciones críticas.
              No vendemos extintores. Vendemos la tranquilidad de que el plan B está listo.
            </p>
            <a href="#contacto" className={styles.btnPrimary} style={{ marginTop: '2rem', display: 'inline-flex' }}>
              Hablar con un asesor <FontAwesomeIcon icon={faArrowRight} />
            </a>
          </div>
          <div className={styles.aboutFeatures}>
            {[
              'Técnicos certificados',
              'Equipos con norma boliviana e internacional',
              'Documentación y trazabilidad completa',
              'Contratos de mantenimiento anuales',
              'Cobertura a nivel nacional',
            ].map((f, i) => (
              <div key={i} className={styles.aboutFeatureItem}>
                <FontAwesomeIcon icon={faCircleCheck} className={styles.aboutFeatureIcon} />
                <span>{f}</span>
              </div>
            ))}

  {/* REDES SOCIALES */}
  <div className={styles.aboutSocials}>
    <a href="https://facebook.com/preverservices" target="_blank" rel="noopener noreferrer" className={styles.aboutSocialLink}>
      <FontAwesomeIcon icon={faFacebookF} />
    </a>
    <a href="https://instagram.com/preverservices" target="_blank" rel="noopener noreferrer" className={styles.aboutSocialLink}>
      <FontAwesomeIcon icon={faInstagram} />
    </a>
    <a href="https://tiktok.com/@preverservices" target="_blank" rel="noopener noreferrer" className={styles.aboutSocialLink}>
      <FontAwesomeIcon icon={faTiktok} />
    </a>
  </div>
</div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contacto" className={styles.contact}>
        <div className={styles.contactInner}>
          <p className={styles.sectionEyebrow}>Contacto</p>
          <h2 className={styles.contactTitle}>¿Listo para proteger<br />lo que importa?</h2>
          <p className={styles.contactSub}>Nos ponemos en contacto en menos de 24 horas.</p>
          <div className={styles.contactCards}>
            <a href="tel:+59170492410" className={styles.contactCard}>
              <FontAwesomeIcon icon={faPhone} className={styles.contactCardIcon} />
              <span className={styles.contactCardLabel}>Llámanos</span>
              <span className={styles.contactCardValue}>+591 70492410</span>
            </a>
            <a href="mailto:info@preverservices.bo" className={styles.contactCard}>
              <FontAwesomeIcon icon={faEnvelope} className={styles.contactCardIcon} />
              <span className={styles.contactCardLabel}>Escríbenos</span>
              <span className={styles.contactCardValue}>prever.services@outlook.com</span>
            </a>
            <div className={styles.contactCard}>
              <FontAwesomeIcon icon={faLocationDot} className={styles.contactCardIcon} />
              <span className={styles.contactCardLabel}>Ubicación</span>
              <span className={styles.contactCardValue}>Santa Cruz de la Sierra, Bolivia</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <span className={styles.footerBrand}>PREVER SERVICES</span>
          <span className={styles.footerCopy}>© {new Date().getFullYear()} · Bolivia · Todos los derechos reservados</span>
        </div>
      </footer>

    </div>
  );
}