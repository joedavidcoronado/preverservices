import { Link } from 'react-router';
import { useState, useEffect } from 'react';
import styles from './HomePage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
} from '@fortawesome/free-solid-svg-icons';

const STATS = [
  { value: '5+', label: 'Años de experiencia' },
  { value: '500+', label: 'Clientes activos' },
  { value: '10K+', label: 'Extintores certificados' },
  { value: '24/7', label: 'Soporte de emergencia' },
];

const SERVICES = [
  {
    icon: faFire,
    title: 'Venta de Extintores',
    desc: 'Equipos certificados para todo tipo de riesgo: PQS, CO₂, agua, espuma y más.',
  },
  {
    icon: faShieldHalved,
    title: 'Recarga y Mantenimiento',
    desc: 'Recarga periódica con insumos de calidad y revisión técnica completa.',
  },
  {
    icon: faCircleCheck,
    title: 'Inspección y Certificación',
    desc: 'Auditorías de seguridad contra incendios con documentación oficial.',
  },
  {
    icon: faAward,
    title: 'Capacitación',
    desc: 'Entrenamiento al personal para el uso correcto de equipos contra incendios.',
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisibleStats(true); },
      { threshold: 0.3 }
    );
    const el = document.getElementById('stats-band');
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.root}>

      {/* NAV */}
      <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}>
        <div className={styles.navInner}>
          <Link to="/" className={styles.navLogo}>
            <img src="/logo.png" alt="Prever Services" className={styles.navLogoImg} />
            <span className={styles.navBrand}>PREVER<span className={styles.navBrandSub}>SERVICES</span></span>
          </Link>
          <ul className={styles.navLinks}>
            <li><a href="#servicios">Servicios</a></li>
            <li><a href="#sectores">Sectores</a></li>
            <li><a href="#nosotros">Nosotros</a></li>
            <li><a href="#contacto" className={styles.navCta}>Cotizar</a></li>
          </ul>
        </div>
      </nav>

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>Bolivia · 5 años protegiendo lo que importa</p>
          <h1 className={styles.heroTitle}>
            Donde hay fuego,<br />
            <span className={styles.heroAccent}>nosotros llegamos primero.</span>
          </h1>
          <p className={styles.heroSub}>
            Extintores, recargas, inspecciones y certificaciones para empresas grandes
            que no se pueden dar el lujo de improvisar en seguridad.
          </p>
          <div className={styles.heroCtas}>
            <a href="#contacto" className={styles.btnPrimary}>
              Solicitar cotización <FontAwesomeIcon icon={faArrowRight} />
            </a>
            <a href="#servicios" className={styles.btnGhost}>Ver servicios</a>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.heroGlow} />
          <img
            src="/logo.png"
            alt="Prever Services Logo"
            className={styles.heroLogo}
          />
        </div>
        
      </section>

      {/* STATS BAND */}
      <section id="stats-band" className={styles.statsBand}>
        <div className={styles.statsGrid}>
          {STATS.map((s, i) => (
            <div key={i} className={`${styles.statItem} ${visibleStats ? styles.statVisible : ''}`} style={{ transitionDelay: `${i * 100}ms` }}>
              <span className={styles.statValue}>{s.value}</span>
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
              <div key={i} className={styles.serviceCard}>
                <div className={styles.serviceIconWrap}>
                  <FontAwesomeIcon icon={svc.icon} className={styles.serviceIcon} />
                </div>
                <h3 className={styles.serviceTitle}>{svc.title}</h3>
                <p className={styles.serviceDesc}>{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTORS */}
      <section id="sectores" className={styles.sectors}>
        <div className={styles.sectionInner}>
          <p className={styles.sectionEyebrow}>¿A quién servimos?</p>
          <h2 className={styles.sectionTitle}>Clientes que no<br />pueden fallar.</h2>
          <p className={styles.sectorsSubtitle}>
            Trabajamos con empresas e instituciones donde la seguridad no es opcional,
            es parte del contrato.
          </p>
          <div className={styles.sectorsRow}>
            {SECTORS.map((sec, i) => (
              <div key={i} className={styles.sectorPill}>
                <FontAwesomeIcon icon={sec.icon} className={styles.sectorIcon} />
                <span>{sec.label}</span>
              </div>
            ))}
          </div>
          <div className={styles.testimonialBox}>
            <FontAwesomeIcon icon={faStar} className={styles.testimonialStar} />
            <blockquote className={styles.testimonialQuote}>
              "Prever Services ha sido el aliado que necesitábamos. Respuesta rápida, equipos certificados
              y trato profesional. No trabajamos con nadie más."
            </blockquote>
            <cite className={styles.testimonialAuthor}>— Gerente de Operaciones, empresa industrial en Santa Cruz</cite>
          </div>
        </div>
      </section>

      {/* NOSOTROS */}
      <section id="nosotros" className={styles.about}>
        <div className={styles.aboutInner}>
          <div className={styles.aboutText}>
            <p className={styles.sectionEyebrow}>Quiénes somos</p>
            <h2 className={styles.sectionTitle}>5 años siendo<br />la primera llamada.</h2>
            <p className={styles.aboutBody}>
              Nacimos en Bolivia con una misión clara: que cada empresa, hospital, colegio
              y edificio del país tenga equipos de extinción que realmente funcionen cuando se necesitan.
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
              'Cobertura en todo Santa Cruz',
            ].map((f, i) => (
              <div key={i} className={styles.aboutFeatureItem}>
                <FontAwesomeIcon icon={faCircleCheck} className={styles.aboutFeatureIcon} />
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contacto" className={styles.contact}>
        <div className={styles.contactInner}>
          <p className={styles.sectionEyebrow}>Contacto</p>
          <h2 className={styles.sectionTitle}>¿Listo para proteger<br />tu empresa?</h2>
          <p className={styles.contactSub}>Nos ponemos en contacto en menos de 24 horas.</p>
          <div className={styles.contactCards}>
            <a href="tel:+59170000000" className={styles.contactCard}>
              <FontAwesomeIcon icon={faPhone} className={styles.contactCardIcon} />
              <span className={styles.contactCardLabel}>Llámanos</span>
              <span className={styles.contactCardValue}>+591 7 000 0000</span>
            </a>
            <a href="mailto:info@preverservices.bo" className={styles.contactCard}>
              <FontAwesomeIcon icon={faEnvelope} className={styles.contactCardIcon} />
              <span className={styles.contactCardLabel}>Escríbenos</span>
              <span className={styles.contactCardValue}>info@preverservices.bo</span>
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