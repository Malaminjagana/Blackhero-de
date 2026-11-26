"use client";

import Image from "next/image";
import {
  createContext,
  type KeyboardEvent,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";
import { Cookie, LockKeyhole, Settings2, ShieldCheck, X } from "lucide-react";
import { GoogleTagManager } from "@next/third-parties/google";
import { assetPath } from "@/lib/asset-path";

const CONSENT_STORAGE_KEY = "black-heroes-cookie-consent";
const CONSENT_VERSION = 1;
const GTM_CONTAINER_ID = "GTM-WSCD2KW9";
const deniedGoogleConsent: GoogleConsentState = {
  analytics_storage: "denied",
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied"
};

export type CookiePreferences = {
  necessary: true;
  statistics: boolean;
  marketing: boolean;
  updatedAt: string;
};

type StoredConsent = CookiePreferences & { version: number };
type OptionalPreferences = Pick<CookiePreferences, "statistics" | "marketing">;
type GoogleConsentState = {
  analytics_storage: "granted" | "denied";
  ad_storage: "granted" | "denied";
  ad_user_data: "granted" | "denied";
  ad_personalization: "granted" | "denied";
};

type CookieConsentContextValue = {
  preferences: CookiePreferences | null;
  openPreferences: () => void;
};

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

function isStoredConsent(value: unknown): value is StoredConsent {
  if (typeof value !== "object" || value === null) return false;
  const consent = value as Record<string, unknown>;

  return consent.version === CONSENT_VERSION
    && consent.necessary === true
    && typeof consent.statistics === "boolean"
    && typeof consent.marketing === "boolean"
    && typeof consent.updatedAt === "string"
    && !Number.isNaN(Date.parse(consent.updatedAt));
}

function readStoredConsent(): CookiePreferences | null {
  try {
    const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!stored) return null;

    const parsed: unknown = JSON.parse(stored);
    if (!isStoredConsent(parsed)) {
      window.localStorage.removeItem(CONSENT_STORAGE_KEY);
      return null;
    }

    return {
      necessary: true,
      statistics: parsed.statistics,
      marketing: parsed.marketing,
      updatedAt: parsed.updatedAt
    };
  } catch (error) {
    console.error("Cookie-Einstellungen konnten nicht gelesen werden.", error);
    return null;
  }
}

function pushGoogleConsent(selection: OptionalPreferences, initialize = false) {
  const dataLayer = window.dataLayer = window.dataLayer || [];
  const gtag: (command: string, action: "default" | "update", consent: GoogleConsentState) => void =
    function () {
      // Google Consent Mode uses the arguments object as its dataLayer command.
      // eslint-disable-next-line prefer-rest-params
      dataLayer.push(arguments);
    };

  if (initialize) {
    gtag("consent", "default", deniedGoogleConsent);
  }

  gtag("consent", "update", {
    analytics_storage: selection.statistics ? "granted" : "denied",
    ad_storage: selection.marketing ? "granted" : "denied",
    ad_user_data: selection.marketing ? "granted" : "denied",
    ad_personalization: selection.marketing ? "granted" : "denied"
  });
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error("useCookieConsent muss innerhalb des CookieConsentProvider verwendet werden.");
  }
  return context;
}

export function CookieSettingsLink() {
  const { openPreferences } = useCookieConsent();

  return (
    <button
      type="button"
      onClick={openPreferences}
      className="text-left transition-colors hover:text-[#dfc58e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#dfc58e]"
    >
      Cookie Einstellungen
    </button>
  );
}

export function ConsentAwareGoogleTagManager() {
  const { preferences } = useCookieConsent();

  if (!preferences || (!preferences.statistics && !preferences.marketing)) return null;

  return <GoogleTagManager gtmId={GTM_CONTAINER_ID} />;
}

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<CookiePreferences | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [draft, setDraft] = useState<OptionalPreferences>({ statistics: false, marketing: false });
  const [saveError, setSaveError] = useState("");
  const googleConsentInitialized = useRef(false);

  useEffect(() => {
    const storedConsent = readStoredConsent();
    if (!googleConsentInitialized.current) {
      pushGoogleConsent(storedConsent ?? { statistics: false, marketing: false }, true);
      googleConsentInitialized.current = true;
    }
    setPreferences(storedConsent);
    setBannerOpen(storedConsent === null);
    setHasLoaded(true);
  }, []);

  const openPreferences = useCallback(() => {
    setDraft({
      statistics: preferences?.statistics ?? false,
      marketing: preferences?.marketing ?? false
    });
    setSaveError("");
    setSettingsOpen(true);
  }, [preferences]);

  const saveConsent = useCallback((selection: OptionalPreferences) => {
    const consent: StoredConsent = {
      necessary: true,
      statistics: selection.statistics,
      marketing: selection.marketing,
      updatedAt: new Date().toISOString(),
      version: CONSENT_VERSION
    };

    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));
    } catch (error) {
      console.error("Cookie-Einstellungen konnten nicht gespeichert werden.", error);
      setSaveError("Ihre Auswahl konnte nicht gespeichert werden. Bitte prüfen Sie die Speichereinstellungen Ihres Browsers und versuchen Sie es erneut.");
      return;
    }

    pushGoogleConsent(selection, !googleConsentInitialized.current);
    googleConsentInitialized.current = true;

    setPreferences({
      necessary: true,
      statistics: consent.statistics,
      marketing: consent.marketing,
      updatedAt: consent.updatedAt
    });
    setBannerOpen(false);
    setSettingsOpen(false);
    setSaveError("");
  }, []);

  const acceptAll = () => saveConsent({ statistics: true, marketing: true });
  const acceptNecessary = () => saveConsent({ statistics: false, marketing: false });

  const handleDialogKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      setSettingsOpen(false);
      return;
    }

    if (event.key !== "Tab") return;
    const focusable = event.currentTarget.querySelectorAll<HTMLElement>(
      'button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <CookieConsentContext.Provider value={{ preferences, openPreferences }}>
      {children}
      {hasLoaded && bannerOpen && (
        <aside
          aria-labelledby="cookie-banner-title"
          className="cookie-panel-enter fixed inset-x-0 bottom-0 z-[70] border-t-2 border-[#c6a052] bg-[#171717] text-white shadow-[0_-16px_60px_rgba(0,0,0,.32)]"
        >
          <div className="container grid gap-6 py-6 sm:py-7 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-10">
            <div className="flex items-start gap-4 sm:gap-5">
              <span className="hidden h-14 w-14 shrink-0 items-center justify-center border border-[#c6a052]/40 bg-white/[0.04] sm:flex">
                <Image
                  src={assetPath("/images/black-heroes-logo-transparent.webp")}
                  alt=""
                  width={1680}
                  height={1504}
                  sizes="40px"
                  className="h-10 w-10 object-contain"
                />
              </span>
              <div>
                <p className="mb-1 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.18em] text-[#dfc58e]">
                  <Cookie size={15} aria-hidden="true" />
                  Black Heroes Security
                </p>
                <h2 id="cookie-banner-title" className="text-lg font-extrabold tracking-tight sm:text-xl">
                  Ihre Privatsphäre ist uns wichtig
                </h2>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-white/70">
                  Wir verwenden Cookies und ähnliche Technologien, um die technische Funktionsfähigkeit unserer
                  Website sicherzustellen. Google Tag Manager wird erst geladen, wenn Sie mindestens eine optionale
                  Kategorie zulassen. Sie entscheiden selbst, welche optionalen Dienste Sie freigeben möchten; Ihre
                  Auswahl können Sie jederzeit ändern.
                </p>
                <p className="mt-3 flex items-center gap-2 text-xs font-semibold text-white/55">
                  <LockKeyhole size={14} className="text-[#dfc58e]" aria-hidden="true" />
                  Notwendige Technologien sind immer aktiv; ohne optionale Einwilligung bleibt GTM deaktiviert.
                </p>
                {saveError && (
                  <p role="alert" className="mt-3 border border-red-300 bg-red-950/60 px-3 py-2 text-xs leading-5 text-red-100">
                    {saveError}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-3 lg:w-[430px] lg:grid-cols-1">
              <button
                type="button"
                onClick={acceptAll}
                className="min-h-11 border border-[#c6a052] bg-[#c6a052] px-4 py-2.5 text-sm font-extrabold text-[#171717] transition-colors hover:bg-[#dfc58e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Alle akzeptieren
              </button>
              <button
                type="button"
                onClick={acceptNecessary}
                className="min-h-11 border border-white/35 bg-white/[0.06] px-4 py-2.5 text-sm font-extrabold text-white transition-colors hover:border-white/70 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#dfc58e]"
              >
                Nur notwendige akzeptieren
              </button>
              <button
                type="button"
                onClick={openPreferences}
                className="flex min-h-11 items-center justify-center gap-2 border border-[#dfc58e]/70 px-4 py-2.5 text-sm font-extrabold text-[#dfc58e] transition-colors hover:bg-[#c6a052]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <Settings2 size={16} aria-hidden="true" />
                Einstellungen
              </button>
            </div>
            {saveError && <p role="alert" className="text-sm leading-5 text-red-200 lg:col-start-2">{saveError}</p>}
          </div>
        </aside>
      )}

      {hasLoaded && settingsOpen && (
        <PreferencesDialog
          draft={draft}
          error={saveError}
          onChange={setDraft}
          onClose={() => setSettingsOpen(false)}
          onKeyDown={handleDialogKeyDown}
          onSave={() => saveConsent(draft)}
          onAcceptAll={acceptAll}
          onAcceptNecessary={acceptNecessary}
        />
      )}
    </CookieConsentContext.Provider>
  );
}

function PreferencesDialog({
  draft,
  error,
  onChange,
  onClose,
  onKeyDown,
  onSave,
  onAcceptAll,
  onAcceptNecessary
}: {
  draft: OptionalPreferences;
  error: string;
  onChange: (selection: OptionalPreferences) => void;
  onClose: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;
  onSave: () => void;
  onAcceptAll: () => void;
  onAcceptNecessary: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    dialogRef.current?.querySelector<HTMLElement>("[data-dialog-initial-focus]")?.focus();
    return () => previousFocus?.focus();
  }, []);

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-5">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-settings-title"
        aria-describedby="cookie-settings-description"
        onKeyDown={onKeyDown}
        className="cookie-panel-enter max-h-[92dvh] w-full overflow-y-auto border-t-2 border-[#c6a052] bg-[#faf9f6] text-[#202020] shadow-2xl sm:max-w-2xl sm:border sm:border-[#c6a052]/45"
      >
        <div className="flex items-start justify-between gap-5 border-b border-[#202020]/10 bg-[#171717] px-5 py-5 text-white sm:px-7">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center border border-[#c6a052]/40 text-[#dfc58e]">
              <ShieldCheck size={22} aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[.17em] text-[#dfc58e]">Datenschutz</p>
              <h2 id="cookie-settings-title" className="mt-1 text-xl font-extrabold">Cookie-Einstellungen</h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cookie-Einstellungen schließen"
            data-dialog-initial-focus
            className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/20 text-white/75 transition-colors hover:border-[#dfc58e] hover:text-[#dfc58e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#dfc58e]"
          >
            <X size={19} aria-hidden="true" />
          </button>
        </div>

        <div className="space-y-4 p-5 sm:p-7">
          <p id="cookie-settings-description" className="text-sm leading-6 text-[#66635d]">
            Wählen Sie aus, welche optionalen Kategorien Sie zulassen möchten. Ihre Auswahl können Sie jederzeit
            über den Link „Cookie-Einstellungen“ im Footer ändern.
          </p>

          <PreferenceOption
            title="Notwendige Cookies"
            description="Immer aktiv. Die Speicherung Ihrer Datenschutzauswahl und grundlegende Funktionen der Website sind ohne diese notwendige Speicherung nicht möglich."
            checked
            disabled
            onChange={() => undefined}
          />
          <PreferenceOption
            title="Statistik und Analyse"
            description="Optional. Analyse-Tags im Google Tag Manager dürfen nur mit Ihrer Zustimmung zu dieser Kategorie messen."
            checked={draft.statistics}
            onChange={(checked) => onChange({ ...draft, statistics: checked })}
          />
          <PreferenceOption
            title="Marketing und externe Dienste"
            description="Optional. Marketing-Tags im Google Tag Manager dürfen nur mit Ihrer Zustimmung zu dieser Kategorie aktiv werden."
            checked={draft.marketing}
            onChange={(checked) => onChange({ ...draft, marketing: checked })}
          />

          {error && <p role="alert" className="border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}

          <div className="grid gap-2 border-t border-[#202020]/10 pt-5 sm:grid-cols-3">
            <button
              type="button"
              onClick={onAcceptAll}
              className="min-h-11 border border-[#c6a052] bg-[#c6a052] px-4 py-2.5 text-sm font-extrabold text-[#171717] transition-colors hover:bg-[#dfc58e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#96702f]"
            >
              Alle akzeptieren
            </button>
            <button
              type="button"
              onClick={onAcceptNecessary}
              className="min-h-11 border border-[#202020]/25 bg-white px-4 py-2.5 text-sm font-extrabold text-[#202020] transition-colors hover:border-[#96702f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#96702f]"
            >
              Nur notwendige
            </button>
            <button
              type="button"
              onClick={onSave}
              className="min-h-11 border border-[#202020] bg-[#202020] px-4 py-2.5 text-sm font-extrabold text-white transition-colors hover:bg-[#333] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#96702f]"
            >
              Auswahl speichern
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PreferenceOption({
  title,
  description,
  checked,
  disabled = false,
  onChange
}: {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
}) {
  const id = title === "Notwendige Cookies"
    ? "cookie-preference-necessary"
    : title === "Statistik und Analyse"
      ? "cookie-preference-statistics"
      : "cookie-preference-marketing";

  return (
    <div className="flex items-start justify-between gap-4 border border-[#202020]/10 bg-white p-4 sm:p-5">
      <div>
        <label htmlFor={id} className="text-sm font-extrabold">{title}</label>
        <p className="mt-1 text-xs leading-5 text-[#6d6961] sm:text-sm sm:leading-6">{description}</p>
      </div>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
        aria-label={disabled ? `${title}, immer aktiv` : title}
        className="mt-0.5 h-5 w-5 shrink-0 accent-[#96702f] disabled:cursor-not-allowed"
      />
    </div>
  );
}
