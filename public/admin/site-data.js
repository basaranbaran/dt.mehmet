/**
 * Dt. Mehmet Yağcı — Diş Hekimi Web Sitesi Yönetim Paneli Veri Katmanı
 *
 * Tek doğruluk kaynağı: src/content/config.json ve src/content/config-draft.json
 * • Tarayıcıda localStorage taslağı tutar.
 * • "Siteye Yayınla" butonu ile doğrudan GitHub REST API üzerinden commit atar.
 * • Astro & GitHub Actions entegrasyonu ile otomatik build alır.
 */
(function () {
  'use strict';

  var FALLBACK_DATA_URL = 'config-default.json';
  var DRAFT_KEY = 'dt_mehmet_admin_draft_v1';
  var GITHUB_KEY = 'dt_mehmet_github_cfg_v1';
  var DEFAULT_OWNER = 'basaranbaran';
  var DEFAULT_REPO = 'dt.mehmet';
  var DEFAULT_BRANCH = 'main';

  function isPlainObject(v) {
    return v && typeof v === 'object' && !Array.isArray(v);
  }

  function clone(value) {
    if (value === null || typeof value !== 'object') return value;
    return JSON.parse(JSON.stringify(value));
  }

  function deepMerge(base, override) {
    if (!isPlainObject(base)) return clone(override);
    var out = clone(base);
    if (!isPlainObject(override)) return out;
    Object.keys(override).forEach(function (key) {
      var val = override[key];
      if (isPlainObject(val) && isPlainObject(out[key])) {
        out[key] = deepMerge(out[key], val);
      } else {
        out[key] = clone(val);
      }
    });
    return out;
  }

  function utf8ToBase64(str) {
    var bytes = new TextEncoder().encode(str);
    var binary = '';
    var chunk = 0x8000;
    for (var i = 0; i < bytes.length; i += chunk) {
      binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
    }
    return btoa(binary);
  }

  var publishedCache = null;

  function fetchPublished(force) {
    if (publishedCache && !force) {
      return Promise.resolve(publishedCache);
    }

    var cfg = getGitHubConfig();
    // Eğer GitHub yapılandırılmışsa doğrudan oradan çekmeyi dene
    if (cfg && cfg.token) {
      return ghGetFileContent(cfg, 'src/content/config-draft.json')
        .then(function (content) {
          publishedCache = JSON.parse(content);
          return publishedCache;
        })
        .catch(function () {
          return fetchFallback();
        });
    }

    return fetchFallback();
  }

  function fetchFallback() {
    return fetch(FALLBACK_DATA_URL, { cache: 'no-cache' })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(function (data) {
        publishedCache = data;
        return data;
      })
      .catch(function (err) {
        console.warn('[DTData] Yerel veri okunamadı:', err.message);
        return null;
      });
  }

  function getDraft() {
    try {
      var raw = localStorage.getItem(DRAFT_KEY);
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      return parsed && parsed.treatments ? parsed : null;
    } catch (e) {
      console.warn('[DTData] Taslak okunamadı:', e);
      return null;
    }
  }

  function saveDraft(data) {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
      window.dispatchEvent(new CustomEvent('dt:draftUpdated', { detail: data }));
      return { ok: true };
    } catch (e) {
      var quota = e && (e.name === 'QuotaExceededError' || e.code === 22);
      return {
        ok: false,
        error: quota
          ? 'Tarayıcı depolama alanı doldu. Büyük fotoğrafları optimize edin veya taslağı yayınlayıp sıfırlayın.'
          : (e.message || 'Taslak kaydedilemedi.')
      };
    }
  }

  function clearDraft() {
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch (e) { /* ignore */ }
    window.dispatchEvent(new CustomEvent('dt:draftUpdated', { detail: null }));
  }

  function load() {
    return fetchPublished().then(function (published) {
      var draft = getDraft();
      if (!draft) return published;
      return published ? deepMerge(published, draft) : draft;
    });
  }

  function download(filename, text, mime) {
    var blob = new Blob([text], { type: mime || 'application/json;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  function exportJson(data, filename) {
    download(filename || 'config.json', JSON.stringify(data, null, 2));
  }

  function parseImported(jsonString) {
    try {
      var parsed = JSON.parse(jsonString);
      if (!parsed || !parsed.treatments || !parsed.brand) {
        return { ok: false, error: 'Geçersiz yedek dosyası: beklenen alanlar bulunamadı.' };
      }
      return { ok: true, data: parsed };
    } catch (e) {
      return { ok: false, error: 'JSON okunamadı: ' + e.message };
    }
  }

  /* ========================================================================
     GitHub Entegrasyonu
     ======================================================================== */
  function getGitHubConfig() {
    var stores = [sessionStorage, localStorage];
    for (var i = 0; i < stores.length; i++) {
      try {
        var raw = stores[i].getItem(GITHUB_KEY);
        if (raw) {
          var cfg = JSON.parse(raw);
          cfg.owner = cfg.owner || DEFAULT_OWNER;
          cfg.repo = cfg.repo || DEFAULT_REPO;
          cfg.branch = cfg.branch || DEFAULT_BRANCH;
          cfg._persistent = stores[i] === localStorage;
          return cfg;
        }
      } catch (e) { /* ignore */ }
    }
    return {
      owner: DEFAULT_OWNER,
      repo: DEFAULT_REPO,
      branch: DEFAULT_BRANCH,
      token: ''
    };
  }

  function saveGitHubConfig(cfg, persistent) {
    var payload = JSON.stringify({
      owner: (cfg.owner || DEFAULT_OWNER).trim(),
      repo: (cfg.repo || DEFAULT_REPO).trim(),
      branch: (cfg.branch || DEFAULT_BRANCH).trim(),
      token: (cfg.token || '').trim()
    });
    try {
      if (persistent) {
        localStorage.setItem(GITHUB_KEY, payload);
        sessionStorage.removeItem(GITHUB_KEY);
      } else {
        sessionStorage.setItem(GITHUB_KEY, payload);
        localStorage.removeItem(GITHUB_KEY);
      }
      return { ok: true };
    } catch (e) {
      return { ok: false, error: e.message };
    }
  }

  function clearGitHubConfig() {
    try { localStorage.removeItem(GITHUB_KEY); } catch (e) {}
    try { sessionStorage.removeItem(GITHUB_KEY); } catch (e) {}
  }

  function ghHeaders(cfg) {
    return {
      Authorization: 'Bearer ' + cfg.token,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28'
    };
  }

  function ghApi(cfg, path) {
    return 'https://api.github.com/repos/' + encodeURIComponent(cfg.owner) + '/' +
      encodeURIComponent(cfg.repo) + '/contents/' + path;
  }

  function ghVerify(cfg) {
    return fetch('https://api.github.com/repos/' + encodeURIComponent(cfg.owner) + '/' + encodeURIComponent(cfg.repo), {
      headers: ghHeaders(cfg), cache: 'no-store'
    }).then(function (res) {
      if (res.status === 401) throw new Error('Token geçersiz veya yetkisi yok.');
      if (res.status === 404) throw new Error('Depo bulunamadı ya da token bu depoya erişemiyor.');
      if (!res.ok) throw new Error('GitHub bağlantısı kurulamadı (HTTP ' + res.status + ').');
      return res.json();
    });
  }

  function ghGetSha(cfg, path) {
    return fetch(ghApi(cfg, path) + '?ref=' + encodeURIComponent(cfg.branch || 'main'), {
      headers: ghHeaders(cfg), cache: 'no-store'
    }).then(function (res) {
      if (res.status === 404) return null;
      if (!res.ok) return res.json().then(function (b) { throw new Error(b.message || ('HTTP ' + res.status)); });
      return res.json().then(function (b) { return b.sha; });
    });
  }

  function ghGetFileContent(cfg, path) {
    return fetch(ghApi(cfg, path) + '?ref=' + encodeURIComponent(cfg.branch || 'main'), {
      headers: ghHeaders(cfg), cache: 'no-store'
    }).then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json().then(function (data) {
        var base64 = data.content.replace(/\s/g, '');
        var binary = atob(base64);
        var bytes = new Uint8Array(binary.length);
        for (var i = 0; i < binary.length; i++) {
          bytes[i] = binary.charCodeAt(i);
        }
        return new TextDecoder().decode(bytes);
      });
    });
  }

  function ghPutFile(cfg, path, textOrBase64, message, isBase64) {
    return ghGetSha(cfg, path).then(function (sha) {
      var body = {
        message: message,
        content: isBase64 ? textOrBase64 : utf8ToBase64(textOrBase64),
        branch: cfg.branch || 'main'
      };
      if (sha) body.sha = sha;
      return fetch(ghApi(cfg, path), {
        method: 'PUT',
        headers: ghHeaders(cfg),
        body: JSON.stringify(body)
      }).then(function (res) {
        return res.json().then(function (payload) {
          if (!res.ok) throw new Error(payload.message || ('HTTP ' + res.status));
          return payload;
        });
      });
    });
  }

  window.DTData = {
    load: load,
    fetchPublished: fetchPublished,
    getDraft: getDraft,
    saveDraft: saveDraft,
    clearDraft: clearDraft,
    deepMerge: deepMerge,
    clone: clone,
    exportJson: exportJson,
    download: download,
    parseImported: parseImported,
    utf8ToBase64: utf8ToBase64,
    github: {
      getConfig: getGitHubConfig,
      saveConfig: saveGitHubConfig,
      clearConfig: clearGitHubConfig,
      verify: ghVerify,
      putFile: ghPutFile,
      getSha: ghGetSha
    }
  };
})();
