import { useEffect, useState } from 'react';
import {
  Menu,
  X,
  Cloud,
  ShieldCheck,
  Server,
  Award,
  FolderGit2,
  Mail,
  Linkedin,
  Github,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Circle,
  ChevronDown,
} from 'lucide-react';

const NAV_LINKS = [
  { id: 'about', label: 'Über mich' },
  { id: 'skills', label: 'Skills' },
  { id: 'certifications', label: 'Zertifizierungen' },
  { id: 'projects', label: 'Projekte' },
  { id: 'contact', label: 'Kontakt' },
];

const SKILLS = [
  { name: 'Microsoft Azure', level: 85 },
  { name: 'Windows Server & Active Directory', level: 80 },
  { name: 'PowerShell & Scripting', level: 70 },
  { name: 'Networking & Security', level: 75 },
  { name: 'Identity & Access Management', level: 78 },
  { name: 'Git & GitHub', level: 72 },
];

type CertStatus = 'passed' | 'in-progress' | 'planned';

const CERTIFICATIONS: {
  name: string;
  short: string;
  status: CertStatus;
  note: string;
}[] = [
  { name: 'AZ-900 – Azure Fundamentals', short: 'AZ-900', status: 'passed', note: 'Bestanden' },
  { name: 'AB-900 – Microsoft 365 Certified: Copilot and Agent Administration Fundamentals ', short: 'AB-900', status: 'passed', note: 'Bestanden' },
  {name: 'AZ-104 Foundation', short: 'AZ-104', status: 'in-progress', note: 'In Vorbereitung'  },
  { name: 'AZ-800 – Azure Administrator', short: 'AZ-800', status: 'in-progress', note: 'In Vorbereitung' },
  { name: 'AZ-801 – Azure Administrator', short: 'AZ-801', status: 'in-progress', note: 'In Vorbereitung' },
  {name: 'ITIL Foundation', short: 'ITIL', status: 'in-progress', note: 'Abschluss Anfang Oktober'} 
];


const PROJECTS: {
  title: string;
  description: string;
  tags: string[];
  icon: typeof Cloud;
}[] = [
  {
    title: 'Azure Static Web App Portfolio',
    description:
      'Dieses Portfolio, deployed als Azure Static Web App mit React, Vite und Tailwind CSS. Vollständig responsiv und GitHub-verbunden.',
    tags: ['Azure Static Web Apps', 'React', 'Vite', 'Tailwind'],
    icon: Cloud,
  },
  {
    title: 'Azure Identity & Access Management Demo',
    description:
      'Demonstration von Entra ID (Azure AD) Benutzerverwaltung, RBAC-Rollen, bedingtem Zugriff und Sicherheitsrichtlinien.',
    tags: ['Entra ID', 'RBAC', 'Conditional Access', 'Security'],
    icon: ShieldCheck,
  },
  {
    title: 'Windows Server & AD Lab',
    description:
      'Lokales Lab mit Windows Server, Active Directory, DNS, DHCP und Group Policy zur Administration in einer isolierten Umgebung.',
    tags: ['Windows Server', 'Active Directory', 'GPO', 'DNS'],
    icon: Server,
  },
  {
    title: 'Azure VM Deployment',
    description:
      'Automatisierte Bereitstellung einer Azure-VM inkl. Netzwerksicherheitsgruppe, Speicherkonto und Diagnoseeinstellungen via Portal & CLI.',
    tags: ['Azure VM', 'NSG', 'CLI', 'IaC'],
    icon: Cloud,
  },
];

function useScrollSpy() {
  const [active, setActive] = useState('about');
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    NAV_LINKS.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return active;
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useScrollSpy();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-ink-950/85 backdrop-blur-xl border-b border-ink-800'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <button
            onClick={() => handleClick('about')}
            className="group flex items-center gap-2.5"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-accent-500 to-accent-600 font-mono text-sm font-bold text-white shadow-lg shadow-accent-500/20 transition-transform group-hover:scale-105">
              DS
            </span>
            <span className="text-sm font-semibold tracking-tight text-ink-100">
              Dritan Shehaj
            </span>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => handleClick(link.id)}
                className={`relative px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                  active === link.id
                    ? 'text-white'
                    : 'text-ink-400 hover:text-ink-100'
                }`}
              >
                {link.label}
                {active === link.id && (
                  <span className="absolute inset-x-3 -bottom-px h-px bg-accent-500" />
                )}
              </button>
            ))}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleClick('contact');
              }}
              className="ml-2 rounded-lg bg-accent-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-accent-500/20 transition-all hover:bg-accent-400 hover:shadow-accent-500/30"
            >
              Kontakt
            </a>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-lg text-ink-200 hover:bg-ink-800"
            aria-label="Menü"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-4 animate-fade-in">
            <div className="flex flex-col gap-1 rounded-2xl border border-ink-800 bg-ink-900/95 p-2 backdrop-blur-xl">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleClick(link.id)}
                  className={`px-4 py-3 text-left text-sm font-medium rounded-xl transition-colors ${
                    active === link.id
                      ? 'bg-ink-800 text-white'
                      : 'text-ink-300 hover:bg-ink-800'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section
      id="about"
      className="relative flex min-h-screen items-center overflow-hidden pt-16"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-accent-500/10 blur-3xl" />
        <div className="absolute top-1/3 -right-40 h-96 w-96 rounded-full bg-accent-600/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6 w-full">
        <div className="max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-ink-700 bg-ink-900/60 px-3.5 py-1.5 text-xs font-medium text-ink-300 backdrop-blur animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success-500" />
            </span>
            Verfügbar für neue Projekte
          </div>

          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl animate-fade-in-up">
            IT-Administrator mit
            <span className="block bg-gradient-to-r from-accent-400 via-accent-500 to-accent-600 bg-clip-text text-transparent">
              Fokus auf Azure
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-300 sm:text-lg animate-fade-in-up [animation-delay:100ms] opacity-0">
            Hallo, ich bin Dritan Shehaj. Ich arbeite an Azure- und
            Server-Deployments, Identity Management und IT-Infrastruktur.
            Hier finden Sie meine Projekte, Zertifizierungen und Beispiele
            meiner Arbeit.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 animate-fade-in-up [animation-delay:200ms] opacity-0">
            <button
              onClick={() =>
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="group inline-flex items-center gap-2 rounded-xl bg-accent-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-accent-500/20 transition-all hover:bg-accent-400 hover:shadow-accent-500/30"
            >
              Projekte ansehen
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <button
              onClick={() =>
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="inline-flex items-center gap-2 rounded-xl border border-ink-700 bg-ink-900/50 px-5 py-3 text-sm font-semibold text-ink-100 backdrop-blur transition-all hover:border-ink-600 hover:bg-ink-800"
            >
              Kontakt aufnehmen
            </button>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-4 sm:gap-8 max-w-md animate-fade-in-up [animation-delay:300ms] opacity-0">
            {[
              { value: '4+', label: 'Zertifizierungen' },
              { value: '4', label: 'Projekte' },
              { value: '100%', label: 'Azure Fokus' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-white sm:text-3xl">{stat.value}</div>
                <div className="mt-1 text-xs text-ink-400 sm:text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={() =>
          document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })
        }
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-ink-500 hover:text-ink-300 transition-colors animate-bounce"
        aria-label="Nach unten scrollen"
      >
        <ChevronDown size={24} />
      </button>
    </section>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-12 max-w-2xl">
      <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent-400">
        {eyebrow}
      </div>
      <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-sm text-ink-400 sm:text-base">{description}</p>
      )}
    </div>
  );
}

function Skills() {
  return (
    <section id="skills" className="py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading
          eyebrow="Fähigkeiten"
          title="Technische Skills"
          description="Schwerpunkt auf Cloud-Infrastruktur, Identity Management und Server-Administration."
        />
        <div className="grid gap-x-12 gap-y-6 sm:grid-cols-2">
          {SKILLS.map((skill) => (
            <div key={skill.name}>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-ink-200">{skill.name}</span>
                <span className="font-mono text-xs text-ink-400">{skill.level}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-accent-500 to-accent-400 transition-all duration-700"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Certifications() {
  const statusConfig: Record<
    CertStatus,
    { icon: typeof CheckCircle2; label: string; classes: string }
  > = {
    passed: {
      icon: CheckCircle2,
      label: 'Bestanden',
      classes: 'text-success-400 bg-success-500/10 border-success-500/20',
    },
    'in-progress': {
      icon: Clock,
      label: 'In Arbeit',
      classes: 'text-warning-400 bg-warning-500/10 border-warning-500/20',
    },
    planned: {
      icon: Circle,
      label: 'Geplant',
      classes: 'text-ink-400 bg-ink-800/50 border-ink-700',
    },
  };

  return (
    <section id="certifications" className="py-24 border-t border-ink-900">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading
          eyebrow="Qualifikationen"
          title="Zertifizierungen"
          description="Meine aktuellen und geplanten Microsoft- und ITIL-Zertifizierungen."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {CERTIFICATIONS.map((cert) => {
            const cfg = statusConfig[cert.status];
            const Icon = cfg.icon;
            return (
              <div
                key={cert.name}
                className="group relative overflow-hidden rounded-2xl border border-ink-800 bg-ink-900/50 p-5 transition-all hover:border-ink-700 hover:bg-ink-900"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-ink-800 to-ink-700 text-accent-400">
                      <Award size={20} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white leading-snug">
                        {cert.name}
                      </h3>
                      <p className="mt-1 text-xs text-ink-400">{cert.note}</p>
                    </div>
                  </div>
                  <span
                    className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${cfg.classes}`}
                  >
                    <Icon size={12} />
                    {cfg.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="py-24 border-t border-ink-900">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading
          eyebrow="Arbeiten"
          title="Projekte"
          description="Ausgewählte Projekte rund um Azure, Server-Administration und Identity Management."
        />
        <div className="grid gap-5 sm:grid-cols-2">
          {PROJECTS.map((project) => {
            const Icon = project.icon;
            return (
              <article
                key={project.title}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-ink-800 bg-gradient-to-b from-ink-900/60 to-ink-950 p-6 transition-all hover:border-accent-500/40 hover:from-ink-900 hover:to-ink-900"
              >
                <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-accent-500/5 blur-2xl transition-opacity group-hover:bg-accent-500/10" />
                <div className="relative">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-ink-800 text-accent-400 transition-colors group-hover:bg-accent-500/10 group-hover:text-accent-300">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {project.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-400">
                    {project.description}
                  </p>
                </div>
                <div className="relative mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-ink-700 bg-ink-800/50 px-2.5 py-1 font-mono text-xs text-ink-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-24 border-t border-ink-900">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-ink-800 bg-gradient-to-br from-ink-900 to-ink-950 p-8 sm:p-12">
          <div className="pointer-events-none absolute -right-32 -top-32 h-64 w-64 rounded-full bg-accent-500/10 blur-3xl" />
          <div className="relative max-w-xl">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent-400">
              Kontakt
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Lassen Sie uns sprechen
            </h2>
            <p className="mt-3 text-sm text-ink-300 sm:text-base">
              Interesse an einer Zusammenarbeit oder haben Sie Fragen zu meinen
              Projekten? Schreiben Sie mir gerne.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="mailto:dritan.shehaj@example.com"
                className="inline-flex items-center gap-2 rounded-xl bg-accent-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-accent-500/20 transition-all hover:bg-accent-400"
              >
                <Mail size={16} />
                E-Mail senden
              </a>
              <a
                href="https://github.com/dritanshehaj"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-ink-700 bg-ink-800/50 px-5 py-3 text-sm font-semibold text-ink-100 transition-all hover:border-ink-600 hover:bg-ink-800"
              >
                <Github size={16} />
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/dritanshehaj"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-ink-700 bg-ink-800/50 px-5 py-3 text-sm font-semibold text-ink-100 transition-all hover:border-ink-600 hover:bg-ink-800"
              >
                <Linkedin size={16} />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-ink-900 py-10">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent-500 to-accent-600 font-mono text-xs font-bold text-white">
              DS
            </span>
            <span className="text-sm font-medium text-ink-300">
              Dritan Shehaj
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/dritanshehaj"
              target="_blank"
              rel="noreferrer"
              className="text-ink-500 transition-colors hover:text-ink-200"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href="https://linkedin.com/in/dritanshehaj"
              target="_blank"
              rel="noreferrer"
              className="text-ink-500 transition-colors hover:text-ink-200"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="mailto:dritan.shehaj@example.com"
              className="text-ink-500 transition-colors hover:text-ink-200"
              aria-label="E-Mail"
            >
              <Mail size={18} />
            </a>
          </div>
          <p className="text-xs text-ink-500">
            © {new Date().getFullYear()} Dritan Shehaj. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-ink-950">
      <Navbar />
      <main>
        <Hero />
        <Skills />
        <Certifications />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
