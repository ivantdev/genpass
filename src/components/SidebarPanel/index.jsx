import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import PlusIcon from "../../assets/icons/Plus";
import RemoveIcon from "../../assets/icons/Remove";
import {
  formatRelativeTime,
  getPasswordStrength,
  historyRetentionOptions,
} from "../../utils";

function SidebarPanel() {
  const {
    settings,
    preferences,
    history,
    updatePreferences,
    clearHistory,
    removeHistoryEntry,
    pruneExpiredHistory,
  } = useContext(GlobalContext);
  const [now, setNow] = useState(Date.now());
  const [isControlExpanded, setIsControlExpanded] = useState(false);

  useEffect(() => {
    if (!preferences?.store_history) {
      return;
    }

    pruneExpiredHistory();
    const intervalId = window.setInterval(() => {
      setNow(Date.now());
      pruneExpiredHistory();
    }, 60000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [preferences?.store_history, pruneExpiredHistory]);

  if (!settings || !preferences) {
    return null;
  }

  const handleToggleAutoCopy = () => {
    updatePreferences({
      auto_copy: !preferences.auto_copy,
    });
  };

  const handleToggleHistory = () => {
    updatePreferences({
      store_history: !preferences.store_history,
    });
  };

  return (
    <div className="sidebar-stack">
      <section className="sidebar-card sidebar-card--control">
        <div className="sidebar-card__header">
          <div>
            <p className="sidebar-card__eyebrow">Configuración local</p>
            <h2>Centro de control</h2>
          </div>
          <button
            type="button"
            className="sidebar-toggle"
            aria-expanded={isControlExpanded}
            aria-controls="sidebar-control-panel"
            onClick={() => setIsControlExpanded((currentValue) => !currentValue)}
          >
            <span>{isControlExpanded ? "Ocultar" : "Mostrar"}</span>
            {isControlExpanded ? <RemoveIcon fill="currentColor" /> : <PlusIcon fill="currentColor" />}
          </button>
        </div>

        {isControlExpanded ? (
          <div className="sidebar-controls" id="sidebar-control-panel">
            <div className="sidebar-control">
              <div className="sidebar-control__content">
                <h3>Auto-copiar al regenerar</h3>
                <p>Copia la nueva clave al portapapeles cuando pulses regenerar.</p>
              </div>
              <button
                type="button"
                className={`sidebar-switch ${preferences.auto_copy ? "is-active" : ""}`.trim()}
                aria-pressed={preferences.auto_copy}
                aria-label={preferences.auto_copy ? "Desactivar auto-copiado" : "Activar auto-copiado"}
                onClick={handleToggleAutoCopy}
              >
                <span className="sidebar-switch__thumb" />
              </button>
            </div>

            <div className="sidebar-control">
              <div className="sidebar-control__content">
                <h3>Historial local</h3>
                <p>Guarda temporalmente claves recientes en este dispositivo para recuperarlas rápido.</p>
              </div>
              <button
                type="button"
                className={`sidebar-switch ${preferences.store_history ? "is-active" : ""}`.trim()}
                aria-pressed={preferences.store_history}
                aria-label={preferences.store_history ? "Desactivar historial local" : "Activar historial local"}
                onClick={handleToggleHistory}
              >
                <span className="sidebar-switch__thumb" />
              </button>
            </div>

            {preferences.store_history && 
              <div className="sidebar-control sidebar-control--stacked">
                <div className="sidebar-control__content">
                  <h3>Auto-borrado</h3>
                  <p>Caduca las entradas guardadas usando una ventana de retención local.</p>
                </div>
                <label className="sidebar-select-label" htmlFor="history_ttl_minutes">
                  Ventana de retención
                </label>
                <select
                  id="history_ttl_minutes"
                  className="sidebar-select"
                  value={preferences.history_ttl_minutes}
                  onChange={(event) => {
                    updatePreferences({
                      history_ttl_minutes: Number(event.target.value),
                    });
                  }}
                >
                  {historyRetentionOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <p className="sidebar-footnote">
                  La limpieza automática solo puede ejecutarse mientras esta pestaña siga abierta o cuando vuelvas a entrar.
                </p>
              </div>
            }
          </div>
        ) : null}
      </section>

      <section className="sidebar-card sidebar-card--history">
        <div className="sidebar-card__header">
          <div>
            <p className="sidebar-card__eyebrow">Registro reciente</p>
            <h2>Claves generadas</h2>
          </div>
          <span className="sidebar-card__badge">{history.length}</span>
        </div>

        {preferences.store_history ? (
          history.length > 0 ? (
            <div className="history-list">
              {history.map((entry) => {
                const strength = getPasswordStrength(entry.value);
                return (
                  <article className="history-item" key={entry.id}>
                    <div className="history-item__top">
                      <p className="history-item__value">{entry.value}</p>
                      <button
                        type="button"
                        className="history-item__remove"
                        aria-label="Eliminar esta clave del historial"
                        onClick={() => removeHistoryEntry(entry.id)}
                      >
                        Quitar
                      </button>
                    </div>
                    <div className="history-item__meta">
                      <span className={`history-item__strength history-item__strength--${strength.tone}`.trim()}>
                        {strength.label}
                      </span>
                      <span>{formatRelativeTime(entry.createdAt, now)}</span>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="sidebar-empty">
              <p>Aún no hay claves guardadas.</p>
              <span>Activa el historial y usa el botón de regenerar para poblar esta zona.</span>
            </div>
          )
        ) : (
          <div className="sidebar-empty">
            <h3>El historial local está desactivado.</h3>
            <p>Así evitas guardar contraseñas en el navegador. Si lo activas, seguirá siendo solo local.</p>
          </div>
        )}

        <button
          type="button"
          className="sidebar-burn"
          onClick={clearHistory}
          disabled={history.length === 0}
        >
          Incinerar historial
        </button>
      </section>
    </div>
  );
}

export default SidebarPanel;
