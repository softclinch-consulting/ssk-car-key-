import { FormEvent, useEffect, useState } from "react";

type IconName =
  | "arrow"
  | "bike"
  | "building"
  | "camera"
  | "car"
  | "check"
  | "clock"
  | "close"
  | "door"
  | "gate"
  | "key"
  | "location"
  | "menu"
  | "phone"
  | "shield"
  | "spark"
  | "user"
  | "whatsapp";

const PHONE_NUMBER = (import.meta.env.VITE_PHONE_NUMBER || "7358333459").trim();
const WHATSAPP_NUMBER = (import.meta.env.VITE_WHATSAPP_NUMBER || "917358333459").replace(/\D/g, "");
const QUOTE_ENDPOINT = (import.meta.env.VITE_QUOTE_ENDPOINT || "").trim();
const BUSINESS_NAME =
  (import.meta.env.VITE_BUSINESS_NAME || "").trim() || "SSK Keys Shop";

const services = [
  {
    icon: "door" as IconName,
    number: "01",
    title: "House Duplicate Keys",
    image: "/images/house-keys.jpg",
    text: "Get duplicate keys for compatible homes, apartments, rooms, doors and gates.",
    cta: "Check Availability",
  },
  {
    icon: "building" as IconName,
    number: "02",
    title: "Office & Commercial Keys",
    image: "/images/office-keys.jpg",
    text: "Additional keys for compatible offices, shops and commercial spaces.",
    cta: "Enquire Now",
  },
  {
    icon: "gate" as IconName,
    number: "03",
    title: "Shop & Gate Keys",
    image: "/images/shutter-keys.jpg",
    text: "Duplicate keys for compatible shops, gates, shutters and padlocks.",
    cta: "Check Availability",
  },
  {
    icon: "car" as IconName,
    number: "04",
    title: "Car Duplicate Keys",
    image: "/images/car-keys.jpg",
    text: "Vehicle key duplication depends on the model, key type and programming requirements.",
    cta: "Check Car Key Availability",
  },
  {
    icon: "bike" as IconName,
    number: "05",
    title: "Bike & Scooter Keys",
    image: "/images/bike-keys.jpg",
    text: "Duplicate or replacement options for compatible two-wheeler keys.",
    cta: "Check Availability",
  },
  {
    icon: "spark" as IconName,
    number: "06",
    title: "Specialised Keys",
    image: "/images/specialised-keys.jpg",
    text: "Selected specialised key services based on compatibility and security requirements.",
    cta: "Ask About Your Key",
  },
];

const processSteps = [
  ["01", "Your Original Key", "Share your key requirement and the type of key you need."],
  ["02", "Key Check", "The key type, design and duplication requirements are assessed."],
  ["03", "Service & Price", "Confirm the available service and applicable pricing."],
  ["04", "Duplicate Key", "The appropriate duplication process is carried out."],
  ["05", "Final Check", "The finished key is checked before completion."],
];

const faqs = [
  [
    "Can every key be duplicated?",
    "No. Duplication depends on the key design, lock system, security features and applicable restrictions.",
  ],
  [
    "How much does a duplicate key cost?",
    "Pricing depends on the key type, design and duplication requirements. Contact us for an accurate quote.",
  ],
  [
    "How long does it take to make a duplicate key?",
    "Standard keys may be completed quickly, while specialised or programmed keys may require additional time.",
  ],
  [
    "Do I need the original key?",
    "For standard duplication, the original key is normally required. Other options depend on the key and lock system.",
  ],
  [
    "Can you duplicate car keys?",
    "Vehicle key service depends on the vehicle model, key type and programming requirements.",
  ],
  [
    "Can you duplicate bike keys?",
    "Compatible bike and scooter keys can be duplicated depending on the key type.",
  ],
  [
    "Can a broken key be duplicated?",
    "It depends on the condition of the key and the lock system. Contact us to check the available option.",
  ],
];

function track(eventName: string, parameters: Record<string, string> = {}) {
  window.dispatchEvent(new CustomEvent("conversion", { detail: { eventName, ...parameters } }));
  const dataLayer = (window as Window & { dataLayer?: unknown[] }).dataLayer;
  dataLayer?.push({ event: eventName, ...parameters });
}

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <><path d="M5 12h14" /><path d="m14 7 5 5-5 5" /></>,
    bike: <><circle cx="5.5" cy="17.5" r="3.5" /><circle cx="18.5" cy="17.5" r="3.5" /><path d="m9 17.5 3-7h3l3.5 7M9 17.5h5l-3.5-5H7M13 7h4" /></>,
    building: <><path d="M4 21V5l8-3 8 3v16" /><path d="M9 21v-4h6v4M8 8h.01M12 8h.01M16 8h.01M8 12h.01M12 12h.01M16 12h.01" /></>,
    camera: <><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z" /><circle cx="12" cy="13" r="4" /></>,
    car: <><path d="M5 17h14l1-5-3-5H7l-3 5 1 5Z" /><path d="M7 17v2M17 17v2M4 12h16M8 14h.01M16 14h.01" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
    door: <><path d="M5 21V3h13v18M5 21h15" /><path d="M14 12h.01" /></>,
    gate: <><path d="M4 21V8h16v13M8 8V4h8v4M8 12v9M12 12v9M16 12v9" /></>,
    key: <><circle cx="8" cy="9" r="4" /><path d="m11 12 9 9M16 17l2-2M14 15l2-2" /></>,
    location: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    menu: <><path d="M4 8h16M4 16h16" /></>,
    phone: <path d="M21 16.5v3a2 2 0 0 1-2.2 2 19.7 19.7 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.7 19.7 0 0 1 1.1 3.8 2 2 0 0 1 3.1 1.6h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.4 2.1L7.1 9.6a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.6 1.9Z" />,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></>,
    spark: <><path d="m12 3 1.3 4.7L18 9l-4.7 1.3L12 15l-1.3-4.7L6 9l4.7-1.3L12 3Z" /><path d="m19 15 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15Z" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
    whatsapp: <><path d="M20.5 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20l1.2-4.7a8.5 8.5 0 1 1 16.3-3.8Z" /><path d="M8 8.2c.5 3.1 2.6 5.2 5.8 5.8" /></>,
  };
  return (
    <svg aria-hidden="true" className="icon" fill="none" height={size} viewBox="0 0 24 24" width={size}>
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7">{paths[name]}</g>
    </svg>
  );
}

function LogoMark() {
  return (
    <svg
      aria-hidden="true"
      className="logo-mark"
      fill="none"
      viewBox="0 0 44 44"
    >
      <path
        d="M9 8h17.5a8.5 8.5 0 0 1 0 17H17l-5 5H7v-7l5-5h14.5a1.5 1.5 0 0 0 0-3H9V8Z"
        fill="currentColor"
      />
      <path
        d="M17 25h19v5h-4v5h-5v-5h-5v5h-5V25Z"
        fill="currentColor"
      />
      <path
        d="M12 12.5h13.5"
        stroke="#0b0e0c"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function MetallicKey({ compact = false }: { compact?: boolean }) {
  return (
    <svg
      aria-label={compact ? "Metallic key approaching a lock" : "Floating metallic duplicate key"}
      className={compact ? "metal-key metal-key--compact" : "metal-key"}
      role="img"
      viewBox="0 0 760 420"
    >
      <defs>
        <linearGradient id={`steel-${compact}`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#555b62" />
          <stop offset=".18" stopColor="#f8fbff" />
          <stop offset=".36" stopColor="#7b8288" />
          <stop offset=".57" stopColor="#e6ebef" />
          <stop offset=".75" stopColor="#4e545b" />
          <stop offset="1" stopColor="#c5cbd0" />
        </linearGradient>
        <linearGradient id={`edge-${compact}`} x1="0" x2="0" y1="0" y2="1">
          <stop stopColor="#fff" stopOpacity=".85" />
          <stop offset=".5" stopColor="#626970" />
          <stop offset="1" stopColor="#1f2429" />
        </linearGradient>
        <filter id={`shadow-${compact}`} height="180%" width="180%" x="-40%" y="-40%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="18" />
          <feOffset dy="22" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0.5 0 0 0 0 0.4 0 0 0 .28 0" />
          <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <g className="key-float" filter={`url(#shadow-${compact})`}>
        <path d="M154 105a100 100 0 1 0 0 200 100 100 0 0 0 0-200Zm0 47a53 53 0 1 1 0 106 53 53 0 0 1 0-106Z" fill={`url(#steel-${compact})`} stroke={`url(#edge-${compact})`} strokeWidth="7" />
        <path d="M242 179h390l62 27-62 28h-49l-22 35h-52l-20-35H242c10-17 10-38 0-55Z" fill={`url(#steel-${compact})`} stroke={`url(#edge-${compact})`} strokeLinejoin="round" strokeWidth="7" />
        <path className="key-shine" d="M246 189h376l28 12H246Z" fill="#fff" opacity=".52" />
        <path d="M274 224h206" opacity=".3" stroke="#1b2025" strokeWidth="5" />
      </g>
    </svg>
  );
}

function ActionButtons({
  onQuote,
  source,
  compact = false,
}: {
  onQuote: () => void;
  source: string;
  compact?: boolean;
}) {
  const call = () => {
    track("phone_click", { source });
    if (PHONE_NUMBER) window.location.href = `tel:${PHONE_NUMBER}`;
    else onQuote();
  };
  const whatsapp = () => {
    track("whatsapp_click", { source });
    if (WHATSAPP_NUMBER) {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello, I need a duplicate key in Nungambakkam. Please share availability and pricing.")}`, "_blank", "noopener,noreferrer");
    } else onQuote();
  };
  if (compact) {
    return (
      <>
        <button className="sticky-action sticky-action--whatsapp" onClick={whatsapp}><Icon name="whatsapp" size={18} /><span>WhatsApp 73583 33459</span></button>
        <button className="sticky-action sticky-action--call" onClick={call}><Icon name="phone" size={18} /><span>Call</span></button>
        <button className="sticky-action sticky-action--primary" onClick={onQuote}><Icon name="arrow" size={18} /><span>Get Quote</span></button>
      </>
    );
  }
  return (
    <div className="button-row">
      <button className="button button--whatsapp" onClick={whatsapp}><Icon name="whatsapp" />WhatsApp 73583 33459</button>
      <button className="button button--primary" onClick={call}><Icon name="phone" />Call 73583 33459</button>
      <button className="button button--glass" onClick={onQuote}>Get a Quote <Icon name="arrow" /></button>
    </div>
  );
}

function QuoteModal({ onClose, initialKey = "" }: { onClose: () => void; initialKey?: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    track("quote_submit", { key_type: String(data.keyType || "Not specified") });
    setStatus("sending");
    try {
      if (QUOTE_ENDPOINT) {
        const response = await fetch(QUOTE_ENDPOINT, {
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
          method: "POST",
        });
        if (!response.ok) throw new Error("Quote request failed");
        setStatus("sent");
      } else if (WHATSAPP_NUMBER) {
        const message = `Duplicate key quote request\nKey: ${data.keyType}\nName: ${data.name}\nPhone: ${data.phone}\nDetails: ${data.details || "Not provided"}`;
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
        setStatus("sent");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };
  return (
    <div aria-labelledby="quote-title" aria-modal="true" className="modal-backdrop" role="dialog" onMouseDown={onClose}>
      <div className="quote-modal" onMouseDown={(event) => event.stopPropagation()}>
        <button aria-label="Close quote form" className="modal-close" onClick={onClose}><Icon name="close" /></button>
        <span className="eyebrow modal-eyebrow">
          <img src="/ssk-logo.jpg" alt="SSK Keys Shop" className="modal-logo" />
          <span>QUICK QUOTE · SSK KEYS SHOP</span>
        </span>
        <h2 id="quote-title">Tell us about your key</h2>
        <p>Share a few details so the right availability and pricing can be checked.</p>
        {status === "sent" ? (
          <div className="success-state"><span><Icon name="check" size={28} /></span><h3>Request prepared</h3><p>Your enquiry has been sent or opened in WhatsApp. We’ll continue there.</p><button className="button button--primary" onClick={onClose}>Done</button></div>
        ) : (
          <form className="quote-form" onSubmit={submit}>
            <label>Name<input name="name" placeholder="Your name" required /></label>
            <label>Phone number<input inputMode="tel" name="phone" placeholder="Your contact number" required /></label>
            <label>Key type<select defaultValue={initialKey || ""} name="keyType" required><option disabled value="">Select key type</option><option>House key</option><option>Office or commercial key</option><option>Shop, gate or padlock key</option><option>Car key</option><option>Bike or scooter key</option><option>Specialised or other key</option></select></label>
            <label>Details <span>(optional)</span><textarea name="details" placeholder="Key design, vehicle model, or anything else that helps" rows={3} /></label>
            {status === "error" && <p className="form-error">Online contact is not configured yet. Please add a quote endpoint or WhatsApp number in the environment settings.</p>}
            <button className="button button--primary form-submit" disabled={status === "sending"} type="submit">{status === "sending" ? "Preparing request…" : "Request a Quote"}<Icon name="arrow" /></button>
            <small>Your details are used only to respond to this enquiry.</small>
          </form>
        )}
      </div>
    </div>
  );
}

interface KeyItem {
  id: string;
  name: string;
  category: "all" | "car" | "bike" | "home" | "security";
  categoryName: string;
  image: string;
  badge: string;
  visualIdentifier: string;
  speed: string;
  tech: string;
  brands: string[];
  description: string;
  whatsappMessage: string;
}

const keyTypesData: KeyItem[] = [
  {
    id: "car-flip",
    name: "Car Smart Remote & Flip Key",
    category: "car",
    categoryName: "Car Key",
    image: "/images/car-keys.jpg",
    badge: "Most Popular",
    visualIdentifier: "Plastic fob with lock/unlock remote buttons & flip blade with embedded chip",
    speed: "15 - 30 mins",
    tech: "Laser CNC Cutting + Transponder & Remote Programming",
    brands: ["Maruti Suzuki", "Hyundai", "Honda", "Toyota", "Tata", "Mahindra", "Kia", "Ford"],
    description: "Full duplicate car key solution including precision blade laser cut, transponder immobilizer chip cloning, and remote frequency syncing.",
    whatsappMessage: "Hello SSK Keys Shop, I need a Car Smart Remote / Flip Key duplicated. Please check availability for my car model.",
  },
  {
    id: "dimple-security",
    name: "High-Security Computer Dimple Key",
    category: "security",
    categoryName: "High Security",
    image: "/images/dimple-keys.jpg",
    badge: "High Precision",
    visualIdentifier: "Flat key blade with round dimple depressions/indentations on both faces",
    speed: "5 - 10 mins",
    tech: "Computerised 3D Vertical Dimple Milling",
    brands: ["Godrej Nav-Tal", "Yale", "Europa", "Mul-T-Lock", "Harrison", "Atom"],
    description: "Computerized duplicate key cutting for main door entrance locks, safety latches, and branded security deadbolts.",
    whatsappMessage: "Hello SSK Keys Shop, I need a Computer Dimple Key duplicated for my home lock. Sending photo on WhatsApp.",
  },
  {
    id: "bike-ignition",
    name: "Bike & Scooter Ignition Key",
    category: "bike",
    categoryName: "Bike / 2-Wheeler",
    image: "/images/bike-keys.jpg",
    badge: "Fast 5 Mins",
    visualIdentifier: "Grooved brass/steel blade with rubber/moulded head, optional magnet shutter key",
    speed: "5 - 8 mins",
    tech: "Dual-Edge Profile Calibration & Shutter Magnet Setup",
    brands: ["Honda Activa", "Royal Enfield", "Yamaha", "TVS Jupiter", "Bajaj Pulsar", "Hero Splendor", "KTM"],
    description: "Quick duplicate keys for scooters, motorcycles, petrol tank caps, helmet locks, and magnetic anti-theft shutter ignition slots.",
    whatsappMessage: "Hello SSK Keys Shop, I need a duplicate key for my Bike/Scooter. How quickly can I get it made?",
  },
  {
    id: "laser-sidewinder",
    name: "Laser Wave / Sidewinder Track Key",
    category: "car",
    categoryName: "Laser CNC",
    image: "/images/laser-cutting.jpg",
    badge: "Zero Margin CNC",
    visualIdentifier: "Thick rectangular blade with a wavy continuous channel carved into the flat face",
    speed: "10 - 20 mins",
    tech: "Automated Silca Futura CNC Laser Cutting",
    brands: ["Volkswagen", "Skoda", "Audi", "BMW", "Mahindra XUV", "Honda City", "Premium Locks"],
    description: "Cut on high-end computerised CNC equipment replicating factory specifications down to fractions of a millimeter.",
    whatsappMessage: "Hello SSK Keys Shop, I have a Laser Wave / Sidewinder key that needs duplicate cutting.",
  },
  {
    id: "standard-house",
    name: "Standard House & Room Door Key",
    category: "home",
    categoryName: "House / Door",
    image: "/images/house-keys.jpg",
    badge: "Instant 3 Mins",
    visualIdentifier: "Traditional brass or nickel key with jagged saw-tooth teeth along the bottom edge",
    speed: "3 - 5 mins",
    tech: "Calibrated Rotary Profile Duplication",
    brands: ["Godrej", "Link", "Yale", "Brass Padlocks", "Room Doors", "Cupboards"],
    description: "Instant duplication while you wait for front doors, bedroom locks, balcony grills, and standard padlocks.",
    whatsappMessage: "Hello SSK Keys Shop, I need duplicate house and room keys made. What are your timings today?",
  },
  {
    id: "shutter-commercial",
    name: "Office Shutter & Heavy Padlock Key",
    category: "home",
    categoryName: "Commercial / Shop",
    image: "/images/shutter-keys.jpg",
    badge: "Heavy Duty",
    visualIdentifier: "Heavy thick brass shank, cruciform cross blade, or deep pin tumbler profile",
    speed: "5 - 10 mins",
    tech: "Heavy-Gauge Solid Brass Key Milling",
    brands: ["Shop Rolling Shutters", "Heavy Iron Padlocks", "Steel Almirahs", "Cash Drawers"],
    description: "Robust duplicate keys made from heavy-gauge blanks to resist bending and wear in daily commercial usage.",
    whatsappMessage: "Hello SSK Keys Shop, I need heavy-duty shop shutter / padlock keys duplicated.",
  },
];

const galleryShowcase = [
  {
    title: "Computerised CNC Laser Key Cutting",
    tag: "PRECISION MACHINERY",
    image: "/images/laser-cutting.jpg",
    desc: "High-speed automated CNC laser milling equipment providing 100% original-spec accuracy.",
  },
  {
    title: "Car Transponder & Smart Key Programming",
    tag: "CAR KEY CODING",
    image: "/images/key-programming.jpg",
    desc: "Advanced diagnostic tablet key programming and transponder chip cloning station for all car models.",
  },
  {
    title: "5,000+ Key Blanks Inventory & Master Craftsmen",
    tag: "SSK WORKSHOP",
    image: "/images/workshop-inventory.jpg",
    desc: "Huge selection of original key blanks for all automobiles, door locks, and padlocks cut by veteran technicians.",
  },
  {
    title: "Specialised High-Security & Calibrated Keys",
    tag: "SECURITY LOCKS",
    image: "/images/specialised-keys.jpg",
    desc: "Precision milling setup for Godrej dimple keys, tubular ace keys, and cruciform 4-way cross keys.",
  },
];

function KeyIdentifierWidget({ onSelectKey }: { onSelectKey: (keyName: string) => void }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeKeyId, setActiveKeyId] = useState<string>("car-flip");

  const categories = [
    { id: "all", label: "All Key Types" },
    { id: "car", label: "🚗 Car Keys" },
    { id: "bike", label: "🏍️ Bike Keys" },
    { id: "security", label: "🛡️ Dimple / Security" },
    { id: "home", label: "🔑 House & Shutter" },
  ];

  const filteredKeys = selectedCategory === "all"
    ? keyTypesData
    : keyTypesData.filter((k) => k.category === selectedCategory);

  const activeKey = keyTypesData.find((k) => k.id === activeKeyId) || keyTypesData[0];

  const openWhatsApp = (msg: string) => {
    track("key_identifier_whatsapp", { key_id: activeKey.id });
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="section key-identifier-section" id="key-identifier">
      <div className="section-heading centered">
        <div>
          <span className="eyebrow"><span />VISUAL KEY FINDER & ESTIMATOR</span>
          <h2>Not Sure What Key You Have? Identify It Here.</h2>
        </div>
        <p>Match your key shape, blade grooves, and features below to see instant turnaround times, cutting methods, and connect with our master key maker on WhatsApp.</p>
      </div>

      <div className="category-pills">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`pill-btn ${selectedCategory === cat.id ? "pill-btn--active" : ""}`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="identifier-layout">
        <div className="key-selector-grid">
          {filteredKeys.map((item) => (
            <div
              key={item.id}
              className={`key-select-card ${item.id === activeKey.id ? "key-select-card--active" : ""}`}
              onClick={() => setActiveKeyId(item.id)}
            >
              <div className="key-card-thumb">
                <img src={item.image} alt={item.name} loading="lazy" />
                <span className="key-badge">{item.badge}</span>
              </div>
              <div className="key-card-body">
                <span className="key-category-tag">{item.categoryName}</span>
                <h3>{item.name}</h3>
                <p className="key-identifier-hint">
                  <strong>Look for:</strong> {item.visualIdentifier}
                </p>
                <div className="key-meta-pills">
                  <span><Icon name="clock" size={13} />Ready in {item.speed}</span>
                  <span className="key-avail-tag"><Icon name="check" size={13} />Available</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="key-inspector-panel">
          <div className="inspector-header">
            <span className="eyebrow">KEY SPECIFICATION</span>
            <h3>{activeKey.name}</h3>
            <span className="badge-highlight">{activeKey.tech}</span>
          </div>

          <div className="inspector-image-wrap">
            <img src={activeKey.image} alt={activeKey.name} />
            <div className="inspector-image-overlay">
              <span className="overlay-pill"><Icon name="clock" size={13} />Ready in {activeKey.speed}</span>
              <span className="overlay-pill overlay-pill--highlight"><Icon name="check" size={13} />Precision Guaranteed</span>
            </div>
          </div>

          <div className="inspector-details">
            <div className="detail-item">
              <strong>🔍 How to identify:</strong>
              <p>{activeKey.visualIdentifier}</p>
            </div>
            <div className="detail-item">
              <strong>🛠️ Technology & Process:</strong>
              <p>{activeKey.description}</p>
            </div>
            <div className="detail-item">
              <strong>🏷️ Common Compatible Brands:</strong>
              <div className="brand-tags">
                {activeKey.brands.map((b) => <span key={b}>{b}</span>)}
              </div>
            </div>
          </div>

          <div className="inspector-actions">
            <button
              className="button button--whatsapp"
              onClick={() => openWhatsApp(activeKey.whatsappMessage)}
            >
              <Icon name="whatsapp" size={20} />
              <span>WhatsApp 73583 33459</span>
            </button>
            <button
              className="button button--glass"
              onClick={() => onSelectKey(activeKey.name)}
            >
              Request Quote for this Key <Icon name="arrow" />
            </button>
          </div>
        </div>
      </div>

      <div className="photo-whatsapp-banner">
        <div className="banner-icon">
          <Icon name="camera" size={34} />
        </div>
        <div className="banner-copy">
          <h3>Can't Find Your Key? Just Send a Photo on WhatsApp!</h3>
          <p>Snap a quick picture of your key with your phone and send it to <strong>73583 33459</strong>. Our master key technician will identify the exact blank and give you an instant quote in 2 minutes!</p>
        </div>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello SSK Keys Shop, I am sending a photo of my key. Please check availability and price.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="button button--whatsapp banner-btn"
          onClick={() => track("banner_whatsapp_photo_click")}
        >
          <Icon name="whatsapp" size={20} />
          <span>Send Photo to 73583 33459</span>
        </a>
      </div>
    </section>
  );
}

function GalleryShowcase() {
  return (
    <section className="section gallery-section" id="gallery">
      <div className="section-heading centered">
        <div>
          <span className="eyebrow"><span />WORKSHOP & EQUIPMENT SHOWCASE</span>
          <h2>Real Workmanship, Advanced Machinery</h2>
        </div>
        <p>Take a look inside SSK Keys Shop. From computerised laser CNC machines to an inventory of 5,000+ key blanks, your keys are cut with factory perfection.</p>
      </div>

      <div className="gallery-grid">
        {galleryShowcase.map((item) => (
          <article className="gallery-card" key={item.title}>
            <div className="gallery-media">
              <img src={item.image} alt={item.title} loading="lazy" />
              <span className="gallery-tag">{item.tag}</span>
            </div>
            <div className="gallery-info">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hello SSK Keys Shop, I would like to enquire about ${item.title}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="gallery-whatsapp-link"
              >
                <Icon name="whatsapp" size={16} />
                <span>Enquire via WhatsApp 73583 33459</span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function FloatingWhatsApp() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello SSK Keys Shop, I need a duplicate key in Nungambakkam. Please help!")}`}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-whatsapp"
      aria-label="Chat on WhatsApp 73583 33459"
      onClick={() => track("floating_whatsapp_click")}
    >
      <span className="floating-whatsapp-pulse" />
      <span className="floating-whatsapp-icon">
        <Icon name="whatsapp" size={24} />
      </span>
      <span className="floating-whatsapp-text">
        <strong>WhatsApp Us</strong>
        <small>73583 33459</small>
      </span>
    </a>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [initialKey, setInitialKey] = useState("");

  const openQuote = (keyType = "") => {
    setInitialKey(keyType);
    setQuoteOpen(true);
    setMenuOpen(false);
  };

  useEffect(() => {
    const sent = new Set<number>();
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const percentage = max > 0 ? (window.scrollY / max) * 100 : 0;
      [50, 90].forEach((point) => {
        if (percentage >= point && !sent.has(point)) {
          sent.add(point);
          track(`scroll_${point}`);
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = quoteOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [quoteOpen]);

  useEffect(() => {
    const canonical = document.querySelector<HTMLLinkElement>("link[rel='canonical']");
    if (canonical) canonical.href = `${window.location.origin}/duplicate-key/`;
    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": ["Locksmith", "LocalBusiness", "Store"],
          name: BUSINESS_NAME,
          image: `${window.location.origin}/ssk-logo.jpg`,
          logo: `${window.location.origin}/ssk-logo.jpg`,
          ...(PHONE_NUMBER ? { telephone: PHONE_NUMBER } : {}),
          priceRange: "₹₹",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Nungambakkam High Road",
            addressLocality: "Nungambakkam",
            addressRegion: "Tamil Nadu",
            postalCode: "600034",
            addressCountry: "IN",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 13.0569,
            longitude: 80.2425,
          },
          areaServed: [
            { "@type": "Place", name: "Nungambakkam, Chennai" },
            { "@type": "Place", name: "Chennai" },
          ],
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: "184",
          },
          url: `${window.location.origin}/duplicate-key/`,
        },
        {
          "@type": "Service",
          name: "Duplicate Key & Car Key Service in Nungambakkam",
          areaServed: "Nungambakkam, Chennai",
          description: "Duplicate and spare keys for home, office, shop, gate, car sensor keys and bike keys.",
          provider: { "@type": "LocalBusiness", name: BUSINESS_NAME },
        },
        {
          "@type": "FAQPage",
          mainEntity: faqs.map(([question, answer]) => ({
            "@type": "Question",
            name: question,
            acceptedAnswer: { "@type": "Answer", text: answer },
          })),
        },
      ],
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => script.remove();
  }, []);

  return (
    <div className="site-shell">
      <header className="header">
        <a aria-label="Duplicate key service home" className="brand" href="#top">
          <span className="brand-logo-wrap">
            <img src="/ssk-logo.jpg" alt="SSK Keys Shop Logo" className="brand-logo-img" />
          </span>
          <span><strong>SSK KEYS SHOP</strong><small>NUNGAMBAKKAM, CHENNAI</small></span>
        </a>
        <nav aria-label="Primary navigation" className={menuOpen ? "nav nav--open" : "nav"}>
          <a href="#key-identifier" onClick={() => setMenuOpen(false)}>Key Finder</a>
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#gallery" onClick={() => setMenuOpen(false)}>Gallery</a>
          <a href="#process" onClick={() => setMenuOpen(false)}>How It Works</a>
          <a href="#faqs" onClick={() => setMenuOpen(false)}>FAQs</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello SSK Keys Shop, I need duplicate key service.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-whatsapp-btn"
            onClick={() => setMenuOpen(false)}
          >
            <Icon name="whatsapp" size={16} />
            <span>WhatsApp 73583 33459</span>
          </a>
          <button className="button button--primary nav-cta" onClick={() => openQuote()}>Get a Duplicate Key</button>
        </nav>
        <button aria-expanded={menuOpen} aria-label="Toggle menu" className="menu-button" onClick={() => setMenuOpen(!menuOpen)}><Icon name={menuOpen ? "close" : "menu"} /></button>
      </header>

      <main>
        <section className="hero" id="top">
          <div className="hero-glow" />
          <div className="hero-grid" />
          <div className="hero-content">
            <div className="eyebrow hero-reveal hero-reveal--1"><span />SSK KEYS SHOP · DUPLICATE KEY SERVICE · NUNGAMBAKKAM</div>
            <h1 className="hero-reveal hero-reveal--2">Need a Duplicate Key?<br /><span>Fast Key Maker in Nungambakkam</span></h1>
            <p className="hero-sub hero-reveal hero-reveal--3">Fast, precision duplicate keys for cars, bikes, homes, shutters & sensor smart keys. 10-minute turnaround and best prices in Chennai.</p>
            <div className="location-line hero-reveal hero-reveal--3"><Icon name="location" />Nungambakkam, Chennai</div>
            <div className="button-row hero-reveal hero-reveal--4">
              <button className="button button--primary" onClick={() => { track("hero_cta_click"); openQuote(); }}>Get a Duplicate Key <Icon name="arrow" /></button>
              <a
                className="button button--whatsapp"
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello SSK Keys Shop, I need a duplicate key in Nungambakkam.")}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("whatsapp_click", { source: "hero" })}
              >
                <Icon name="whatsapp" /> WhatsApp 73583 33459
              </a>
              <a
                className="button button--glass"
                href={`tel:${PHONE_NUMBER}`}
                onClick={() => track("phone_click", { source: "hero" })}
              >
                <Icon name="phone" /> Call 73583 33459
              </a>
            </div>
            <p className="microcopy hero-reveal hero-reveal--4"><Icon name="shield" size={17} />Check key availability, service options and pricing based on your key type.</p>
          </div>
          <div className="hero-visual">
            <div className="visual-orbit visual-orbit--1" />
            <div className="visual-orbit visual-orbit--2" />
            <MetallicKey />
            <div className="vehicle-key-types">
              <span><Icon name="car" size={18} /><strong>CAR KEYS</strong></span>
              <span><Icon name="bike" size={18} /><strong>BIKE KEYS</strong></span>
            </div>
            <div className="spec-label spec-label--top"><small>SERVICE AREA</small><strong>NUNGAMBAKKAM</strong></div>
            <div className="spec-label spec-label--bottom"><small>KEY SERVICES</small><strong>HOME · AUTO · OFFICE</strong></div>
          </div>
          <a className="scroll-cue" href="#search-match"><span />SCROLL TO EXPLORE</a>
        </section>

        <section className="search-match" id="search-match">
          <div>
            <span className="eyebrow">LOCAL KEY SERVICE</span>
            <h2>Looking for a Duplicate Key Near You?</h2>
            <p>If you're searching for a duplicate key maker near Nungambakkam, Chennai, contact us with your key requirement. Check availability, pricing and the right duplication option for your key.</p>
            <button className="button button--dark" onClick={() => openQuote()}>Check Key Availability <Icon name="arrow" /></button>
          </div>
          <div aria-label="Popular key service searches" className="search-chips">
            {["Duplicate Key Near Me", "Duplicate Key Nungambakkam", "Duplicate Key Maker", "Spare Key Near Me", "Key Cutting", "Duplicate Key Chennai"].map((chip, index) => (
              <span key={chip} style={{ "--i": index } as React.CSSProperties}><Icon name="key" size={16} />{chip}</span>
            ))}
          </div>
        </section>

        <KeyIdentifierWidget onSelectKey={(key) => openQuote(key)} />

        <section className="section services" id="services">
          <div className="section-heading">
            <div><span className="eyebrow">WHAT WE HELP WITH</span><h2>Duplicate Key Services</h2></div>
            <p>From everyday house keys to selected vehicle keys, find the service that matches your requirement.</p>
          </div>
          <div className="service-grid">
            {services.map((service) => (
              <article className="service-card" key={service.title}>
                <div className="service-card-media">
                  <img src={service.image} alt={service.title} loading="lazy" />
                  <span className="service-card-badge">{service.number}</span>
                </div>
                <div className="card-top">
                  <span className="service-icon"><Icon name={service.icon} size={24} /></span>
                </div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <button onClick={() => { track("service_click", { service: service.title }); openQuote(service.title.replace("Duplicate Keys", "key").replace("Keys", "key")); }}>{service.cta}<Icon name="arrow" size={18} /></button>
              </article>
            ))}
          </div>
        </section>

        <GalleryShowcase />

        <section className="process-section" id="process">
          <div className="section-heading process-heading">
            <div><span className="eyebrow">THE PROCESS</span><h2>From Original Key to Duplicate Key</h2></div>
            <p>The exact process varies by key type. Here is a clear overview of how your requirement is assessed.</p>
          </div>
          <div className="process-layout">
            <div className="process-visual">
              <div className="scan-line" />
              <span className="scan-label">KEY PROFILE ANALYSIS</span>
              <MetallicKey />
              <div className="measurement measurement--a" />
              <div className="measurement measurement--b" />
            </div>
            <ol className="process-list">
              {processSteps.map(([number, title, text]) => (
                <li key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></li>
              ))}
            </ol>
          </div>
          <p className="process-note"><Icon name="shield" size={18} />Process and availability depend on the actual key, lock system, security features and any programming requirements.</p>
        </section>

        <section className="section needs">
          <div className="section-heading centered">
            <div><span className="eyebrow">BE PREPARED</span><h2>Why Do You Need a Spare Key?</h2></div>
          </div>
          <div className="needs-grid">
            {[
              ["key", "Need an Extra Key?", "Create an additional compatible key for an authorised user."],
              ["shield", "Want a Backup?", "Keep a spare key available before the original is lost or damaged."],
              ["user", "Family Members?", "Get additional compatible house keys for authorised family members."],
              ["building", "Office Access?", "Provide additional keys for authorised staff."],
              ["spark", "Lost or Damaged Key?", "Replacement options may be available depending on the key and lock system."],
            ].map(([icon, title, text]) => (
              <article className="need-card" key={title}><Icon name={icon as IconName} size={24} /><h3>{title}</h3><p>{text}</p></article>
            ))}
          </div>
        </section>

        <section className="location-section">
          <div className="location-map">
            <div className="map-grid" />
            <div className="location-pin"><span><Icon name="location" size={28} /></span><i /><i /><i /></div>
            <span className="map-label">NUNGAMBAKKAM</span>
          </div>
          <div className="location-copy">
            <span className="eyebrow">LOCAL SEARCH. DIRECT ANSWER.</span>
            <h2>Duplicate Key Service in Nungambakkam, Chennai</h2>
            <p>Looking for a duplicate key maker in Nungambakkam? Contact us with your key requirement and check the available service, pricing and next steps.</p>
            <div className="keyword-list">{["NUNGAMBAKKAM", "CHENNAI", "DUPLICATE KEY", "SPARE KEY", "KEY CUTTING"].map((item) => <span key={item}>{item}</span>)}</div>
            <button className="button button--primary" onClick={() => openQuote()}>Check Availability <Icon name="arrow" /></button>
          </div>
        </section>

        <section className="section trust">
          <div className="section-heading">
            <div><span className="eyebrow">STRAIGHTFORWARD SUPPORT</span><h2>A Simple Way to Get the Right Key Service</h2></div>
          </div>
          <div className="trust-grid">
            {[
              ["01", "Clear Information", "Know what service is available before proceeding."],
              ["02", "Key-Based Support", "The duplication option depends on the actual key type and requirements."],
              ["03", "Transparent Quotation", "Understand the applicable pricing before proceeding."],
              ["04", "Easy Enquiry", "Call or WhatsApp to discuss your requirement."],
            ].map(([number, title, text]) => <article key={title}><span>{number}</span><h3>{title}</h3><p>{text}</p><Icon name="check" /></article>)}
          </div>
        </section>

        <section className="section faq-section" id="faqs">
          <div className="faq-intro"><span className="eyebrow">HELPFUL ANSWERS</span><h2>Duplicate Key FAQs</h2><p>Clear answers about compatibility, pricing and what to expect.</p><button className="button button--dark" onClick={() => openQuote()}>Ask About Your Key <Icon name="arrow" /></button></div>
          <div className="faq-list">
            {faqs.map(([question, answer], index) => (
              <details key={question} open={index === 0}><summary><span>0{index + 1}</span>{question}<i /></summary><p>{answer}</p></details>
            ))}
          </div>
        </section>

        <section className="final-cta" id="contact">
          <div className="final-visual">
            <div className="lock-body"><span /><i /></div>
            <MetallicKey compact />
          </div>
          <div className="final-copy">
            <span className="eyebrow">READY WHEN YOU ARE</span>
            <h2>Need a Duplicate Key in Nungambakkam?</h2>
            <p>Tell us what type of key you need and check availability, pricing and the next step.</p>
            <ActionButtons onQuote={() => openQuote()} source="final_cta" />
          </div>
        </section>
      </main>

      <footer>
        <a className="brand" href="#top">
          <span className="brand-logo-wrap">
            <img src="/ssk-logo.jpg" alt="SSK Keys Shop Logo" className="brand-logo-img" />
          </span>
          <span><strong>SSK KEYS SHOP</strong><small>NUNGAMBAKKAM, CHENNAI</small></span>
        </a>
        <p>SSK Keys Shop – Precision duplicate keys, car sensor keys, bike keys & locksmith service in Nungambakkam, Chennai.</p>
        <div>
          <a href="#key-identifier">Key Finder</a>
          <a href="#services">Services</a>
          <a href="#gallery">Gallery</a>
          <a href="#process">How It Works</a>
          <a href="#faqs">FAQs</a>
        </div>
      </footer>

      <div className="mobile-sticky"><ActionButtons compact onQuote={() => openQuote()} source="mobile_sticky" /></div>
      <FloatingWhatsApp />
      {quoteOpen && <QuoteModal initialKey={initialKey} onClose={() => setQuoteOpen(false)} />}
    </div>
  );
}
